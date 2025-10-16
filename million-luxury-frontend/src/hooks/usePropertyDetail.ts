import { useCallback, useEffect, useState, useRef } from 'react';

import { ERROR_MESSAGES } from '@/constants';
import { propertyService } from '@/services/property.service';
import type { PropertyDetailDto } from '@/types';

interface UsePropertyDetailResult {
  property: PropertyDetailDto | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function usePropertyDetail(id: string): UsePropertyDetailResult {
  const [property, setProperty] = useState<PropertyDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const hasFetchedRef = useRef(false);
  const lastIdRef = useRef<string | null>(null);
  const isLoadingRef = useRef(false);

  const fetchProperty = useCallback(async () => {
    if (!id || isLoadingRef.current) return;

    isLoadingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const data = await propertyService.getPropertyById(id);
      setProperty(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : ERROR_MESSAGES.LOADING_PROPERTY_DETAILS;
      setError(errorMessage);
      setProperty(null);
    } finally {
      setLoading(false);
      isLoadingRef.current = false;
    }
  }, [id]);

  const refetch = useCallback(async () => {
    await fetchProperty();
  }, [fetchProperty]);

  useEffect(() => {
    if (id && id !== lastIdRef.current) {
      lastIdRef.current = id;
      hasFetchedRef.current = true;
      fetchProperty();
    }
  }, [id, fetchProperty]);

  return { property, loading, error, refetch };
}
