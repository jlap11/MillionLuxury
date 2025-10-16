export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7153',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000
} as const;

export const UI_CONFIG = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50,
  DEBOUNCE_DELAY: 300,
  LOADING_TIMEOUT: 30000,
} as const;

export const ROUTES = {
  HOME: '/',
  PROPERTIES: '/properties',
  PROPERTY_DETAIL: (id: string) => `/properties/${id}`,
} as const;

export const ERROR_MESSAGES = {
  LOADING_PROPERTIES: 'Error al cargar las propiedades. Por favor intenta nuevamente.',
  LOADING_PROPERTY_DETAILS: 'Error al cargar los detalles de la propiedad. Por favor intenta nuevamente.',
  PROPERTY_NOT_FOUND: 'Propiedad no encontrada.',
  
  NETWORK_ERROR: 'Error de conexión. Verifica tu conexión a internet.',
  TIMEOUT_ERROR: 'La solicitud ha tardado demasiado. Por favor intenta nuevamente.',
  SERVER_ERROR: 'Error interno del servidor. Por favor, intenta más tarde.',

  UNKNOWN_ERROR: 'Ha ocurrido un error inesperado. Por favor intenta nuevamente.',
  VALIDATION_ERROR: 'Los datos proporcionados no son válidos.',
} as const;

export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

export const FILTER_CONFIG = {
  MIN_PRICE_STEP: 1000,
  MAX_PRICE_LIMIT: 100000000,
  MIN_NAME_LENGTH: 2,
  MIN_ADDRESS_LENGTH: 3,
} as const;
