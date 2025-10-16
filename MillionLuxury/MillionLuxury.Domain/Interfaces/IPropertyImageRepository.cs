using MillionLuxury.Domain.Entities;

namespace MillionLuxury.Domain.Interfaces;

public interface IPropertyImageRepository
{
    Task<List<PropertyImage>> GetByPropertyIdAsync(string propertyId);
    Task<PropertyImage?> GetMainImageAsync(string propertyId);
    Task<PropertyImage> CreateAsync(PropertyImage image);
    Task<bool> DeleteAsync(string id);
}
