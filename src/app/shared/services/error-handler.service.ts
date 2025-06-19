import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from './snackbar.service';
import { Modal, ModalData } from '../components/modal/modal';
import { 
  AppError, 
  ValidationErrorDetail, 
  extractErrorMessage, 
  extractValidationDetails,
  isValidationError 
} from '../models/error.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private snackbarService: SnackbarService,
    private dialog: MatDialog
  ) { }

  /**
   * Maneja errores mostrando un snackbar simple
   */
  handleError(error: AppError, context?: string): void {
    const message = extractErrorMessage(error);
    const fullMessage = context ? `${context}: ${message}` : message;
    
    this.snackbarService.showError(fullMessage);
  }

  /**
   * Maneja errores mostrando un modal con detalles de validación
   */
  handleErrorWithModal(error: AppError, title?: string, context?: string): void {
    const message = extractErrorMessage(error);
    const validationDetails = extractValidationDetails(error);
    
    let modalMessage = message;
    
    // Si hay detalles de validación, agregarlos al mensaje
    if (validationDetails.length > 0) {
      modalMessage += '\n\nDetalles de validación:';
      validationDetails.forEach(detail => {
        modalMessage += `\n• ${this.formatFieldName(detail.field)}: ${detail.message}`;
      });
    }

    const modalData: ModalData = {
      title: title || 'Error',
      message: modalMessage,
      primaryButtonText: 'Entendido',
      showPrimaryButton: true,
      showSecondaryButton: false
    };

    this.dialog.open(Modal, {
      width: '500px',
      data: modalData
    });
  }

  /**
   * Maneja errores de validación específicamente
   */
  handleValidationError(error: AppError, context?: string): void {
    if (isValidationError(error) || extractValidationDetails(error).length > 0) {
      // Para errores de validación, mostrar modal con detalles
      this.handleErrorWithModal(error, 'Error de Validación', context);
    } else {
      // Para otros errores, mostrar snackbar
      this.handleError(error, context);
    }
  }

  /**
   * Maneja errores de autenticación
   */
  handleAuthError(error: AppError): void {
    const message = extractErrorMessage(error);
    
    const modalData: ModalData = {
      title: 'Error de Autenticación',
      message: message,
      primaryButtonText: 'Entendido',
      showPrimaryButton: true,
      showSecondaryButton: false
    };

    this.dialog.open(Modal, {
      width: '400px',
      data: modalData
    });
  }

  /**
   * Maneja errores de red/conexión
   */
  handleNetworkError(error: AppError): Observable<any> {
    const modalData: ModalData = {
      title: 'Error de Conexión',
      message: 'No se pudo conectar con el servidor. Verifica tu conexión a internet e intenta de nuevo.',
      primaryButtonText: 'Reintentar',
      secondaryButtonText: 'Cancelar',
      showPrimaryButton: true,
      showSecondaryButton: true
    };

    const dialogRef = this.dialog.open(Modal, {
      width: '400px',
      data: modalData
    });

    return dialogRef.afterClosed();
  }

  /**
   * Formatea detalles de validación para mostrar en UI
   */
  formatValidationDetails(details: ValidationErrorDetail[]): string {
    if (details.length === 0) return '';
    
    return details.map(detail => 
      `• ${this.formatFieldName(detail.field)}: ${detail.message}`
    ).join('\n');
  }

  /**
   * Formatea nombres de campos para mostrar en UI
   */
  private formatFieldName(field: string): string {
    const fieldMap: { [key: string]: string } = {
      'email': 'Correo electrónico',
      'password': 'Contraseña',
      'title': 'Título',
      'description': 'Descripción',
      'completed': 'Estado',
      'userId': 'Usuario'
    };

    return fieldMap[field] || field;
  }
} 