import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from './snackbar.service';
import { ErrorHandlerService } from './error-handler.service';
import { ValidationError, ApiError } from '../models/error.model';
import { of } from 'rxjs';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  let mockSnackBar: jasmine.SpyObj<SnackbarService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    const snackBarSpy = jasmine.createSpyObj('SnackbarService', ['showError', 'showSuccess', 'showInfo']);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    
    // Configurar el mock del dialog para que retorne un objeto con afterClosed
    const mockDialogRef = {
      afterClosed: () => of(true)
    };
    dialogSpy.open.and.returnValue(mockDialogRef);
    
    TestBed.configureTestingModule({
      providers: [
        ErrorHandlerService,
        { provide: SnackbarService, useValue: snackBarSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    });
    
    service = TestBed.inject(ErrorHandlerService);
    mockSnackBar = TestBed.inject(SnackbarService) as jasmine.SpyObj<SnackbarService>;
    mockDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('handleError', () => {
    it('should show error message in snackbar', () => {
      // Arrange
      const error = 'Error de prueba';
      const context = 'Test Context';
      
      // Act
      service.handleError(error, context);
      
      // Assert
      expect(mockSnackBar.showError).toHaveBeenCalledWith('Test Context: Error de prueba');
    });

    it('should show error message without context', () => {
      // Arrange
      const error = 'Error de prueba';
      
      // Act
      service.handleError(error);
      
      // Assert
      expect(mockSnackBar.showError).toHaveBeenCalledWith('Error de prueba');
    });
  });

  describe('handleValidationError', () => {
    it('should show modal for validation errors', () => {
      // Arrange
      const validationError: ValidationError = {
        code: 'VALIDATION_ERROR',
        error: 'Validation error',
        details: [
          { field: 'email', message: 'Email debe ser válido' },
          { field: 'title', message: 'Título es requerido' }
        ]
      };
      
      // Act
      service.handleValidationError(validationError, 'Test');
      
      // Assert
      expect(mockDialog.open).toHaveBeenCalled();
      const callArgs = mockDialog.open.calls.mostRecent().args;
      const modalData = callArgs[1]?.data as any;
      expect(modalData?.title).toBe('Error de Validación');
      expect(modalData?.message).toContain('Validation error');
      expect(modalData?.message).toContain('• Correo electrónico: Email debe ser válido');
      expect(modalData?.message).toContain('• Título: Título es requerido');
    });

    it('should show snackbar for non-validation errors', () => {
      // Arrange
      const simpleError = 'Error simple';
      
      // Act
      service.handleValidationError(simpleError, 'Test');
      
      // Assert
      expect(mockSnackBar.showError).toHaveBeenCalledWith('Test: Error simple');
    });
  });

  describe('handleAuthError', () => {
    it('should show auth error modal', () => {
      // Arrange
      const authError: ApiError = {
        error: 'Authentication failed',
        message: 'Credenciales inválidas'
      };
      
      // Act
      service.handleAuthError(authError);
      
      // Assert
      expect(mockDialog.open).toHaveBeenCalled();
      const callArgs = mockDialog.open.calls.mostRecent().args;
      const modalData = callArgs[1]?.data as any;
      expect(modalData?.title).toBe('Error de Autenticación');
      expect(modalData?.message).toBe('Credenciales inválidas');
    });
  });

  describe('handleNetworkError', () => {
    it('should show network error modal with retry option', () => {
      // Arrange
      const networkError = 'Network error';
      
      // Act
      const result = service.handleNetworkError(networkError);
      
      // Assert
      expect(mockDialog.open).toHaveBeenCalled();
      const callArgs = mockDialog.open.calls.mostRecent().args;
      const modalData = callArgs[1]?.data as any;
      expect(modalData?.title).toBe('Error de Conexión');
      expect(modalData?.message).toContain('No se pudo conectar con el servidor');
      expect(modalData?.primaryButtonText).toBe('Reintentar');
      expect(modalData?.secondaryButtonText).toBe('Cancelar');
      expect(result).toBeDefined();
    });
  });

  describe('formatValidationDetails', () => {
    it('should format validation details correctly', () => {
      // Arrange
      const details = [
        { field: 'email', message: 'Email inválido' },
        { field: 'password', message: 'Contraseña requerida' }
      ];
      
      // Act
      const result = service.formatValidationDetails(details);
      
      // Assert
      expect(result).toContain('• Correo electrónico: Email inválido');
      expect(result).toContain('• Contraseña: Contraseña requerida');
    });

    it('should return empty string for empty details', () => {
      // Arrange
      const details: any[] = [];
      
      // Act
      const result = service.formatValidationDetails(details);
      
      // Assert
      expect(result).toBe('');
    });
  });
}); 