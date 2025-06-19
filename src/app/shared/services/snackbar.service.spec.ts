import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from './snackbar.service';

describe('SnackbarService', () => {
  let service: SnackbarService;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    // Crear un mock del MatSnackBar
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    
    TestBed.configureTestingModule({
      providers: [
        SnackbarService,
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    });
    
    service = TestBed.inject(SnackbarService);
    mockSnackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show error message', () => {
    // Arrange
    const message = 'Error de prueba';
    
    // Act
    service.showError(message);
    
    // Assert
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      message, 
      'Cerrar', 
      {
        duration: 5000,
        panelClass: ['error-snackbar']
      }
    );
  });

  it('should show success message', () => {
    // Arrange
    const message = 'Éxito de prueba';
    
    // Act
    service.showSuccess(message);
    
    // Assert
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      message, 
      'Cerrar', 
      {
        duration: 3000,
        panelClass: ['success-snackbar']
      }
    );
  });

  it('should show info message', () => {
    // Arrange
    const message = 'Información de prueba';
    
    // Act
    service.showInfo(message);
    
    // Assert
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      message, 
      'Cerrar', 
      {
        duration: 4000,
        panelClass: ['info-snackbar']
      }
    );
  });
}); 