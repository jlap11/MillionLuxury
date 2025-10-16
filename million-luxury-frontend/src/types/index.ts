export type {
  PropertyListDto,
  PropertyDetailDto,
  PropertyInfoDto,
  OwnerDto,
  PropertyImageDto,
  PropertyTraceDto,
  PropertyFilterDto,
  PagedResult,
} from './property.types';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export interface LoadingState {
  loading: boolean;
  error: string | null;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface SearchFilters {
  query?: string;
  sortBy?: 'price' | 'name' | 'date';
  sortOrder?: 'asc' | 'desc';
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}
