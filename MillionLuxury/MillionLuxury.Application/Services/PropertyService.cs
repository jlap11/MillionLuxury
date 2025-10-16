using AutoMapper;
using MillionLuxury.Application.DTOs;
using MillionLuxury.Application.Interfaces;
using MillionLuxury.Domain.Interfaces;

namespace MillionLuxury.Application.Services;

public class PropertyService : IPropertyService
{
    private readonly IPropertyRepository _propertyRepository;
    private readonly IOwnerRepository _ownerRepository;
    private readonly IPropertyImageRepository _imageRepository;
    private readonly IPropertyTraceRepository _traceRepository;
    private readonly IMapper _mapper;

    public PropertyService(
        IPropertyRepository propertyRepository,
        IOwnerRepository ownerRepository,
        IPropertyImageRepository imageRepository,
        IPropertyTraceRepository traceRepository,
        IMapper mapper)
    {
        _propertyRepository = propertyRepository;
        _ownerRepository = ownerRepository;
        _imageRepository = imageRepository;
        _traceRepository = traceRepository;
        _mapper = mapper;
    }

    public async Task<PagedResult<PropertyListDto>> GetFilteredPropertiesAsync(PropertyFilterDto filter)
    {
        var (items, totalCount) = await _propertyRepository.GetFilteredPropertiesAsync(
            filter.Name,
            filter.Address,
            filter.MinPrice,
            filter.MaxPrice,
            filter.Page,
            filter.PageSize);

        var propertyListDtos = new List<PropertyListDto>();

        foreach (var property in items)
        {
            var dto = _mapper.Map<PropertyListDto>(property);
            
            var owner = await _ownerRepository.GetByIdAsync(property.IdOwner);
            if (owner != null)
            {
                dto.OwnerName = owner.Name;
            }

            var mainImage = await _imageRepository.GetMainImageAsync(property.IdProperty);
            if (mainImage != null)
            {
                dto.Image = mainImage.File;
            }

            propertyListDtos.Add(dto);
        }

        return new PagedResult<PropertyListDto>
        {
            Items = propertyListDtos,
            TotalCount = totalCount,
            Page = filter.Page,
            PageSize = filter.PageSize
        };
    }

    public async Task<PropertyDetailDto?> GetPropertyDetailAsync(string id)
    {
        var property = await _propertyRepository.GetByIdAsync(id);
        if (property == null)
        {
            return null;
        }

        var owner = await _ownerRepository.GetByIdAsync(property.IdOwner);
        var images = await _imageRepository.GetByPropertyIdAsync(id);
        var traces = await _traceRepository.GetByPropertyIdAsync(id);

        return new PropertyDetailDto
        {
            Property = _mapper.Map<PropertyInfoDto>(property),
            Owner = owner != null ? _mapper.Map<OwnerDto>(owner) : new OwnerDto(),
            Images = _mapper.Map<List<PropertyImageDto>>(images),
            Traces = _mapper.Map<List<PropertyTraceDto>>(traces)
        };
    }
}
