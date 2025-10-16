using MongoDB.Driver;
using MillionLuxury.Domain.Entities;
using MillionLuxury.Domain.Interfaces;
using MillionLuxury.Infrastructure.Data;

namespace MillionLuxury.Infrastructure.Repositories;

public class PropertyTraceRepository : IPropertyTraceRepository
{
    private readonly IMongoDbContext _context;

    public PropertyTraceRepository(IMongoDbContext context)
    {
        _context = context;
    }

    public async Task<List<PropertyTrace>> GetByPropertyIdAsync(string propertyId)
    {
        var filter = Builders<PropertyTrace>.Filter.Eq(trace => trace.IdProperty, propertyId);
        return await _context.PropertyTraces
            .Find(filter)
            .SortByDescending(trace => trace.DateSale)
            .ToListAsync();
    }

    public async Task<PropertyTrace> CreateAsync(PropertyTrace trace)
    {
        trace.CreatedAt = DateTime.UtcNow;
        await _context.PropertyTraces.InsertOneAsync(trace);
        return trace;
    }
}
