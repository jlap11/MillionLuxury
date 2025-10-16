using MongoDB.Driver;
using MillionLuxury.Domain.Entities;
using MillionLuxury.Domain.Interfaces;
using MillionLuxury.Infrastructure.Data;

namespace MillionLuxury.Infrastructure.Repositories;

public class PropertyImageRepository : IPropertyImageRepository
{
    private readonly IMongoDbContext _context;

    public PropertyImageRepository(IMongoDbContext context)
    {
        _context = context;
    }

    public async Task<List<PropertyImage>> GetByPropertyIdAsync(string propertyId)
    {
        var filter = Builders<PropertyImage>.Filter.Eq(img => img.IdProperty, propertyId);
        return await _context.PropertyImages.Find(filter).ToListAsync();
    }

    public async Task<PropertyImage?> GetMainImageAsync(string propertyId)
    {
        var filter = Builders<PropertyImage>.Filter.And(
            Builders<PropertyImage>.Filter.Eq(img => img.IdProperty, propertyId),
            Builders<PropertyImage>.Filter.Eq(img => img.Enabled, true)
        );
        return await _context.PropertyImages.Find(filter).FirstOrDefaultAsync();
    }

    public async Task<PropertyImage> CreateAsync(PropertyImage image)
    {
        image.CreatedAt = DateTime.UtcNow;
        await _context.PropertyImages.InsertOneAsync(image);
        return image;
    }

    public async Task<bool> DeleteAsync(string id)
    {
        var filter = Builders<PropertyImage>.Filter.Eq(img => img.IdPropertyImage, id);
        var result = await _context.PropertyImages.DeleteOneAsync(filter);
        return result.DeletedCount > 0;
    }
}
