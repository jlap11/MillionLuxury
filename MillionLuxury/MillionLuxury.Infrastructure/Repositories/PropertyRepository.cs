using MongoDB.Bson;
using MongoDB.Driver;
using MillionLuxury.Domain.Entities;
using MillionLuxury.Domain.Interfaces;
using MillionLuxury.Infrastructure.Data;

namespace MillionLuxury.Infrastructure.Repositories;

public class PropertyRepository : IPropertyRepository
{
    private readonly IMongoDbContext _context;

    public PropertyRepository(IMongoDbContext context)
    {
        _context = context;
    }

    public async Task<(List<Property> Items, int TotalCount)> GetFilteredPropertiesAsync(
        string? name,
        string? address,
        decimal? minPrice,
        decimal? maxPrice,
        int page,
        int pageSize)
    {
        var filterBuilder = Builders<Property>.Filter;
        var filters = new List<FilterDefinition<Property>>();

        if (!string.IsNullOrEmpty(name))
        {
            filters.Add(filterBuilder.Regex(p => p.Name, new BsonRegularExpression(name, "i")));
        }

        if (!string.IsNullOrEmpty(address))
        {
            filters.Add(filterBuilder.Regex(p => p.Address, new BsonRegularExpression(address, "i")));
        }

        if (minPrice.HasValue)
        {
            filters.Add(filterBuilder.Gte(p => p.Price, minPrice.Value));
        }

        if (maxPrice.HasValue)
        {
            filters.Add(filterBuilder.Lte(p => p.Price, maxPrice.Value));
        }

        var finalFilter = filters.Any()
            ? filterBuilder.And(filters)
            : filterBuilder.Empty;

        var totalCount = await _context.Properties.CountDocumentsAsync(finalFilter);

        var items = await _context.Properties
            .Find(finalFilter)
            .Skip((page - 1) * pageSize)
            .Limit(pageSize)
            .ToListAsync();

        return (items, (int)totalCount);
    }

    public async Task<Property?> GetByIdAsync(string id)
    {
        var filter = Builders<Property>.Filter.Eq(p => p.IdProperty, id);
        return await _context.Properties.Find(filter).FirstOrDefaultAsync();
    }

    public async Task<Property> CreateAsync(Property property)
    {
        property.CreatedAt = DateTime.UtcNow;
        await _context.Properties.InsertOneAsync(property);
        return property;
    }

    public async Task<bool> UpdateAsync(string id, Property property)
    {
        property.UpdatedAt = DateTime.UtcNow;
        var filter = Builders<Property>.Filter.Eq(p => p.IdProperty, id);
        var result = await _context.Properties.ReplaceOneAsync(filter, property);
        return result.ModifiedCount > 0;
    }

    public async Task<bool> DeleteAsync(string id)
    {
        var filter = Builders<Property>.Filter.Eq(p => p.IdProperty, id);
        var result = await _context.Properties.DeleteOneAsync(filter);
        return result.DeletedCount > 0;
    }
}
