using MillionLuxury.Domain.Entities;

namespace MillionLuxury.Domain.Interfaces;

public interface IPropertyTraceRepository
{
    Task<List<PropertyTrace>> GetByPropertyIdAsync(string propertyId);
    Task<PropertyTrace> CreateAsync(PropertyTrace trace);
}
