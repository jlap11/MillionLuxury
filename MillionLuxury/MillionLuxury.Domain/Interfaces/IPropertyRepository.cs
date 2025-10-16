using MillionLuxury.Domain.Entities;

namespace MillionLuxury.Domain.Interfaces;

public interface IPropertyRepository
{
    Task<(List<Property> Items, int TotalCount)> GetFilteredPropertiesAsync(
        string? name, 
        string? address, 
        decimal? minPrice, 
        decimal? maxPrice, 
        int page, 
        int pageSize);
    
    Task<Property?> GetByIdAsync(string id);
    Task<Property> CreateAsync(Property property);
    Task<bool> UpdateAsync(string id, Property property);
    Task<bool> DeleteAsync(string id);
}
