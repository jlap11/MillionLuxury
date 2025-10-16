using AutoMapper;
using MillionLuxury.Application.DTOs;
using MillionLuxury.Application.Services;
using MillionLuxury.Domain.Entities;
using MillionLuxury.Domain.Interfaces;
using Moq;

namespace MillionLuxury.Tests.Services;

[TestFixture]
public class PropertyServiceTests
{
    private Mock<IPropertyRepository> _mockPropertyRepo;
    private Mock<IOwnerRepository> _mockOwnerRepo;
    private Mock<IPropertyImageRepository> _mockImageRepo;
    private Mock<IPropertyTraceRepository> _mockTraceRepo;
    private Mock<IMapper> _mockMapper;
    private PropertyService _propertyService;

    [SetUp]
    public void Setup()
    {
        _mockPropertyRepo = new Mock<IPropertyRepository>();
        _mockOwnerRepo = new Mock<IOwnerRepository>();
        _mockImageRepo = new Mock<IPropertyImageRepository>();
        _mockTraceRepo = new Mock<IPropertyTraceRepository>();
        _mockMapper = new Mock<IMapper>();

        _propertyService = new PropertyService(
            _mockPropertyRepo.Object,
            _mockOwnerRepo.Object,
            _mockImageRepo.Object,
            _mockTraceRepo.Object,
            _mockMapper.Object);
    }

    [Test]
    public async Task GetFilteredPropertiesAsync_WithNameFilter_ReturnsFilteredResults()
    {
        var filter = new PropertyFilterDto { Name = "Luxury Villa", Page = 1, PageSize = 10 };
        var properties = new List<Property>
        {
            new Property
            {
                IdProperty = "1",
                Name = "Luxury Villa",
                Address = "123 Main St",
                Price = 1000000,
                IdOwner = "owner1"
            }
        };

        _mockPropertyRepo
            .Setup(r => r.GetFilteredPropertiesAsync(
                It.IsAny<string>(),
                It.IsAny<string>(),
                It.IsAny<decimal?>(),
                It.IsAny<decimal?>(),
                It.IsAny<int>(),
                It.IsAny<int>()))
            .ReturnsAsync((properties, 1));

        _mockOwnerRepo
            .Setup(r => r.GetByIdAsync(It.IsAny<string>()))
            .ReturnsAsync(new Owner { IdOwner = "owner1", Name = "John Doe" });

        _mockImageRepo
            .Setup(r => r.GetMainImageAsync(It.IsAny<string>()))
            .ReturnsAsync((PropertyImage?)null);

        _mockMapper
            .Setup(m => m.Map<PropertyListDto>(It.IsAny<Property>()))
            .Returns(new PropertyListDto
            {
                IdProperty = "1",
                Name = "Luxury Villa",
                Address = "123 Main St",
                Price = 1000000
            });

        var result = await _propertyService.GetFilteredPropertiesAsync(filter);

        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items.Count, Is.EqualTo(1));
        Assert.That(result.TotalCount, Is.EqualTo(1));
        Assert.That(result.Items[0].Name, Is.EqualTo("Luxury Villa"));
    }

    [Test]
    public async Task GetFilteredPropertiesAsync_WithPriceRange_ReturnsCorrectResults()
    {
        var filter = new PropertyFilterDto
        {
            MinPrice = 500000,
            MaxPrice = 1500000,
            Page = 1,
            PageSize = 10
        };

        var properties = new List<Property>
        {
            new Property
            {
                IdProperty = "1",
                Name = "Property 1",
                Price = 800000,
                IdOwner = "owner1"
            },
            new Property
            {
                IdProperty = "2",
                Name = "Property 2",
                Price = 1200000,
                IdOwner = "owner2"
            }
        };

        _mockPropertyRepo
            .Setup(r => r.GetFilteredPropertiesAsync(
                It.IsAny<string>(),
                It.IsAny<string>(),
                500000,
                1500000,
                1,
                10))
            .ReturnsAsync((properties, 2));

        _mockOwnerRepo
            .Setup(r => r.GetByIdAsync(It.IsAny<string>()))
            .ReturnsAsync(new Owner { IdOwner = "owner1", Name = "Owner Name" });

        _mockImageRepo
            .Setup(r => r.GetMainImageAsync(It.IsAny<string>()))
            .ReturnsAsync((PropertyImage?)null);

        _mockMapper
            .Setup(m => m.Map<PropertyListDto>(It.IsAny<Property>()))
            .Returns((Property p) => new PropertyListDto
            {
                IdProperty = p.IdProperty,
                Name = p.Name,
                Price = p.Price
            });

        var result = await _propertyService.GetFilteredPropertiesAsync(filter);

        Assert.That(result, Is.Not.Null);
        Assert.That(result.Items.Count, Is.EqualTo(2));
        Assert.That(result.TotalCount, Is.EqualTo(2));
    }

    [Test]
    public async Task GetPropertyDetailAsync_WithValidId_ReturnsCompleteDetail()
    {
        var propertyId = "property123";
        var property = new Property
        {
            IdProperty = propertyId,
            Name = "Test Property",
            IdOwner = "owner1"
        };

        var owner = new Owner { IdOwner = "owner1", Name = "Owner Name" };
        var images = new List<PropertyImage>
        {
            new PropertyImage { IdPropertyImage = "img1", File = "image1.jpg" }
        };
        var traces = new List<PropertyTrace>
        {
            new PropertyTrace { IdPropertyTrace = "trace1", Value = 1000000 }
        };

        _mockPropertyRepo
            .Setup(r => r.GetByIdAsync(propertyId))
            .ReturnsAsync(property);

        _mockOwnerRepo
            .Setup(r => r.GetByIdAsync("owner1"))
            .ReturnsAsync(owner);

        _mockImageRepo
            .Setup(r => r.GetByPropertyIdAsync(propertyId))
            .ReturnsAsync(images);

        _mockTraceRepo
            .Setup(r => r.GetByPropertyIdAsync(propertyId))
            .ReturnsAsync(traces);

        _mockMapper
            .Setup(m => m.Map<PropertyInfoDto>(It.IsAny<Property>()))
            .Returns(new PropertyInfoDto { IdProperty = propertyId, Name = "Test Property" });

        _mockMapper
            .Setup(m => m.Map<OwnerDto>(It.IsAny<Owner>()))
            .Returns(new OwnerDto { IdOwner = "owner1", Name = "Owner Name" });

        _mockMapper
            .Setup(m => m.Map<List<PropertyImageDto>>(It.IsAny<List<PropertyImage>>()))
            .Returns(new List<PropertyImageDto>
            {
                new PropertyImageDto { IdPropertyImage = "img1", File = "image1.jpg" }
            });

        _mockMapper
            .Setup(m => m.Map<List<PropertyTraceDto>>(It.IsAny<List<PropertyTrace>>()))
            .Returns(new List<PropertyTraceDto>
            {
                new PropertyTraceDto { IdPropertyTrace = "trace1", Value = 1000000 }
            });

        var result = await _propertyService.GetPropertyDetailAsync(propertyId);

        Assert.That(result, Is.Not.Null);
        Assert.That(result.Property.IdProperty, Is.EqualTo(propertyId));
        Assert.That(result.Owner.IdOwner, Is.EqualTo("owner1"));
        Assert.That(result.Images.Count, Is.EqualTo(1));
        Assert.That(result.Traces.Count, Is.EqualTo(1));
    }

    [Test]
    public async Task GetPropertyDetailAsync_WithInvalidId_ReturnsNull()
    {
        var invalidId = "invalid123";

        _mockPropertyRepo
            .Setup(r => r.GetByIdAsync(invalidId))
            .ReturnsAsync((Property?)null);

        var result = await _propertyService.GetPropertyDetailAsync(invalidId);

        Assert.That(result, Is.Null);
    }

    [Test]
    public async Task GetFilteredPropertiesAsync_WithPagination_ReturnsCorrectPage()
    {
        var filter = new PropertyFilterDto { Page = 2, PageSize = 5 };
        var properties = new List<Property>
        {
            new Property { IdProperty = "6", Name = "Property 6", IdOwner = "owner1" },
            new Property { IdProperty = "7", Name = "Property 7", IdOwner = "owner1" }
        };

        _mockPropertyRepo
            .Setup(r => r.GetFilteredPropertiesAsync(
                It.IsAny<string>(),
                It.IsAny<string>(),
                It.IsAny<decimal?>(),
                It.IsAny<decimal?>(),
                2,
                5))
            .ReturnsAsync((properties, 15));

        _mockOwnerRepo
            .Setup(r => r.GetByIdAsync(It.IsAny<string>()))
            .ReturnsAsync(new Owner { IdOwner = "owner1", Name = "Owner Name" });

        _mockImageRepo
            .Setup(r => r.GetMainImageAsync(It.IsAny<string>()))
            .ReturnsAsync((PropertyImage?)null);

        _mockMapper
            .Setup(m => m.Map<PropertyListDto>(It.IsAny<Property>()))
            .Returns((Property p) => new PropertyListDto { IdProperty = p.IdProperty, Name = p.Name });

        var result = await _propertyService.GetFilteredPropertiesAsync(filter);

        Assert.That(result.Page, Is.EqualTo(2));
        Assert.That(result.PageSize, Is.EqualTo(5));
        Assert.That(result.TotalPages, Is.EqualTo(3));
    }
}
