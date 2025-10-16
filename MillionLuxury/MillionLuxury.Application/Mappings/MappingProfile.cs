using AutoMapper;
using MillionLuxury.Application.DTOs;
using MillionLuxury.Domain.Entities;

namespace MillionLuxury.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Property mappings
        CreateMap<Property, PropertyListDto>()
            .ForMember(dest => dest.IdProperty, opt => opt.MapFrom(src => src.IdProperty))
            .ForMember(dest => dest.Image, opt => opt.Ignore())
            .ForMember(dest => dest.OwnerName, opt => opt.Ignore());

        CreateMap<Property, PropertyInfoDto>()
            .ForMember(dest => dest.IdProperty, opt => opt.MapFrom(src => src.IdProperty));

        // Owner mappings
        CreateMap<Owner, OwnerDto>()
            .ForMember(dest => dest.IdOwner, opt => opt.MapFrom(src => src.IdOwner));

        // PropertyImage mappings
        CreateMap<PropertyImage, PropertyImageDto>()
            .ForMember(dest => dest.IdPropertyImage, opt => opt.MapFrom(src => src.IdPropertyImage));

        // PropertyTrace mappings
        CreateMap<PropertyTrace, PropertyTraceDto>()
            .ForMember(dest => dest.IdPropertyTrace, opt => opt.MapFrom(src => src.IdPropertyTrace));
    }
}
