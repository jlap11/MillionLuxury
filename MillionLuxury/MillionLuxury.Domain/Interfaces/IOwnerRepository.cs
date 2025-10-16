using MillionLuxury.Domain.Entities;

namespace MillionLuxury.Domain.Interfaces;

public interface IOwnerRepository
{
    Task<Owner?> GetByIdAsync(string id);
    Task<Owner> CreateAsync(Owner owner);
    Task<bool> UpdateAsync(string id, Owner owner);
    Task<bool> DeleteAsync(string id);
}
