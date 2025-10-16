import {
  PropertyListDto,
  PropertyDetailDto,
  PropertyFilterDto,
  PagedResult,
} from '@/types/property.types';

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

class PropertyService {

  async getProperties(
    filters?: PropertyFilterDto
  ): Promise<PagedResult<PropertyListDto>> {
    const params = new URLSearchParams();

    if (filters?.name) params.append('name', filters.name);
    if (filters?.address) params.append('address', filters.address);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.pageSize) params.append('pageSize', filters.pageSize.toString());

    const queryString = params.toString();
    const endpoint = queryString ? `/properties?${queryString}` : '/properties';
    const url = `${BASE_API_URL}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const jsonData = await response.json();

      if (jsonData && typeof jsonData === 'object' && 'data' in jsonData) {
        return (jsonData as ApiResponse<PagedResult<PropertyListDto>>).data;
      }

      return jsonData as PagedResult<PropertyListDto>;
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  }

  async getPropertyById(id: string): Promise<PropertyDetailDto> {
    const url = `${BASE_API_URL}/properties/${id}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Property not found');
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const jsonData = await response.json();

      if (jsonData && typeof jsonData === 'object' && 'data' in jsonData) {
        return (jsonData as ApiResponse<PropertyDetailDto>).data;
      }
      return jsonData as PropertyDetailDto;
    } catch (error) {
      console.error(`Error fetching property ${id}:`, error);
      throw error;
    }
  }
}

export const propertyService = new PropertyService();
