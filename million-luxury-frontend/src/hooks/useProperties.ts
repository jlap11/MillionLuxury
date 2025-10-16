import { useState, useEffect, useCallback, useRef } from 'react';
import { propertyService } from '@/services/property.service';
import { ERROR_MESSAGES } from '@/constants';
import {
  PropertyListDto,
  PropertyFilterDto,
  PagedResult,
} from '@/types/property.types';

interface UsePropertiesResult {
  properties: PropertyListDto[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
  fetchProperties: (filters?: PropertyFilterDto) => Promise<void>;
}

export function useProperties(): UsePropertiesResult {
  const [properties, setProperties] = useState<PropertyListDto[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const hasFetchedRef = useRef(false);
  const isLoadingRef = useRef(false);

  const fetchProperties = useCallback(
    async (filters?: PropertyFilterDto) => {
      if (isLoadingRef.current) return;
      
      isLoadingRef.current = true;
      setLoading(true);
      setError(null);

      try {
        const result: PagedResult<PropertyListDto> =
          await propertyService.getProperties(filters);

        setProperties(result.items);
        setTotalCount(result.totalCount);
        setTotalPages(result.totalPages);
        setCurrentPage(result.page);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : ERROR_MESSAGES.LOADING_PROPERTIES;
        setError(errorMessage);
        setProperties([]);
        setTotalCount(0);
        setTotalPages(0);
        setCurrentPage(1);
      } finally {
        setLoading(false);
        isLoadingRef.current = false;
      }
    },
    []
  );

  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchProperties({ page: 1, pageSize: 10 });
    }
  }, [fetchProperties]);

  return {
    properties,
    totalCount,
    totalPages,
    currentPage,
    loading,
    error,
    fetchProperties,
  };
}
