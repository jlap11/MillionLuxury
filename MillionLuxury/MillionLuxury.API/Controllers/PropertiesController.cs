using Microsoft.AspNetCore.Mvc;
using MillionLuxury.Application.DTOs;
using MillionLuxury.Application.Interfaces;

namespace MillionLuxury.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class PropertiesController : ControllerBase
{
    private readonly IPropertyService _propertyService;
    private readonly ILogger<PropertiesController> _logger;

    public PropertiesController(
        IPropertyService propertyService,
        ILogger<PropertiesController> logger)
    {
        _propertyService = propertyService;
        _logger = logger;
    }

    [HttpGet]
    [ProducesResponseType(typeof(PagedResult<PropertyListDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ApiResponse<PagedResult<PropertyListDto>>>> GetProperties(
        [FromQuery] PropertyFilterDto filter)
    {
        try
        {
            _logger.LogInformation("Getting properties with filters: {@Filter}", filter);
            
            var result = await _propertyService.GetFilteredPropertiesAsync(filter);
            
            return Ok(new ApiResponse<PagedResult<PropertyListDto>>
            {
                Success = true,
                Data = result,
                Message = "Properties retrived successfully"
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting properties");
            return BadRequest(new ApiResponse<object>
            {
                Success = false,
                Message = "Error retrieving properties",
                Errors = new List<string> { ex.Message }
            });
        }
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(ApiResponse<PropertyDetailDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ApiResponse<PropertyDetailDto>>> GetPropertyById(string id)
    {
        try
        {
            _logger.LogInformation("Getting property details for ID: {PropertyId}", id);
            
            var result = await _propertyService.GetPropertyDetailAsync(id);
            
            if (result == null)
            {
                return NotFound(new ApiResponse<object>
                {
                    Success = false,
                    Message = $"Property with ID {id} not found"
                });
            }
            
            return Ok(new ApiResponse<PropertyDetailDto>
            {
                Success = true,
                Data = result,
                Message = "Property details retrived successfully"
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting property details for ID: {PropertyId}", id);
            return BadRequest(new ApiResponse<object>
            {
                Success = false,
                Message = "Error retrieving property details",
                Errors = new List<string> { ex.Message }
            });
        }
    }
}
