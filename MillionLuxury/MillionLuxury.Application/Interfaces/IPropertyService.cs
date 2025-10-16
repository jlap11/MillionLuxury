using MillionLuxury.Application.DTOs;

namespace MillionLuxury.Application.Interfaces;

public interface IPropertyService
{
    Task<PagedResult<PropertyListDto>> GetFilteredPropertiesAsync(PropertyFilterDto filter);
    Task<PropertyDetailDto?> GetPropertyDetailAsync(string id);
}
