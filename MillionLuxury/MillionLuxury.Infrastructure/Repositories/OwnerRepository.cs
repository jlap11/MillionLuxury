using MongoDB.Driver;
using MillionLuxury.Domain.Entities;
using MillionLuxury.Domain.Interfaces;
using MillionLuxury.Infrastructure.Data;

namespace MillionLuxury.Infrastructure.Repositories;

public class OwnerRepository : IOwnerRepository
{
    private readonly IMongoDbContext _context;

    public OwnerRepository(IMongoDbContext context)
    {
        _context = context;
    }

    public async Task<Owner?> GetByIdAsync(string id)
    {
        var filter = Builders<Owner>.Filter.Eq(o => o.IdOwner, id);
        return await _context.Owners.Find(filter).FirstOrDefaultAsync();
    }

    public async Task<Owner> CreateAsync(Owner owner)
    {
        owner.CreatedAt = DateTime.UtcNow;
        await _context.Owners.InsertOneAsync(owner);
        return owner;
    }

    public async Task<bool> UpdateAsync(string id, Owner owner)
    {
        owner.UpdatedAt = DateTime.UtcNow;
        var filter = Builders<Owner>.Filter.Eq(o => o.IdOwner, id);
        var result = await _context.Owners.ReplaceOneAsync(filter, owner);
        return result.ModifiedCount > 0;
    }

    public async Task<bool> DeleteAsync(string id)
    {
        var filter = Builders<Owner>.Filter.Eq(o => o.IdOwner, id);
        var result = await _context.Owners.DeleteOneAsync(filter);
        return result.DeletedCount > 0;
    }
}
