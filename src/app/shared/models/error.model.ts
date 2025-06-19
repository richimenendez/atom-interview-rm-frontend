// Interfaces para manejo de errores
export interface ValidationErrorDetail {
  field: string;
  message: string;
}

export interface ValidationError {
  code: string;
  error: string;
  details: ValidationErrorDetail[];
}

export interface ApiError {
  error: string;
  message?: string;
  code?: string;
  details?: ValidationErrorDetail[];
}

export interface ErrorResponse {
  status: number;
  error: ApiError | ValidationError;
}

// Tipo unión para todos los tipos de errores
export type AppError = ApiError | ValidationError | string;

// Helper para verificar si es un error de validación
export function isValidationError(error: any): error is ValidationError {
  return error && 
         typeof error === 'object' && 
         error.code === 'VALIDATION_ERROR' && 
         Array.isArray(error.details);
}

// Helper para verificar si es un error de API
export function isApiError(error: any): error is ApiError {
  return error && 
         typeof error === 'object' && 
         typeof error.error === 'string';
}

// Helper para extraer mensaje de error
export function extractErrorMessage(error: any): string {
  if (typeof error === 'string') {
    return error;
  }
  
  if (isValidationError(error)) {
    return error.error || 'Error de validación';
  }
  
  if (isApiError(error)) {
    return error.message || error.error || 'Error de la aplicación';
  }
  
  if (error?.message) {
    return error.message;
  }
  
  return 'Error desconocido';
}

// Helper para extraer detalles de validación
export function extractValidationDetails(error: any): ValidationErrorDetail[] {
  if (isValidationError(error)) {
    return error.details || [];
  }
  
  if (isApiError(error) && error.details) {
    return error.details;
  }
  
  return [];
} 