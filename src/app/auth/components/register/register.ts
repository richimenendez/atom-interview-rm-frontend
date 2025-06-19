import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth';
import { Modal, ModalData } from '../../../shared/components/modal/modal';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: './register.scss',
  standalone: false,
})
export class Register {
  @Input() requirePassword = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private dialog: MatDialog,
    private errorHandler: ErrorHandlerService
  ) {}

  handleRegister(form: { email: string; password?: string }) {
    if (this.requirePassword) {
      this.authService.register({ email: form.email, password: form.password }).subscribe({
        next: () => this.showRegisterSuccessModal(),
        error: err => this.errorHandler.handleValidationError(err, 'Registro')
      });
    } else {
      this.authService.register({ email: form.email }).subscribe({
        next: () => this.showRegisterSuccessModal(),
        error: err => this.errorHandler.handleValidationError(err, 'Registro')
      });
    }
  }

  onModeChange(newMode: 'login' | 'register') {
    if (newMode === 'login') {
      this.router.navigate(['/auth/login']);
    }
  }

  private showRegisterSuccessModal() {
    const modalData: ModalData = {
      title: 'Registro exitoso',
      message: 'Tu cuenta ha sido creada correctamente. ¡Bienvenido!',
      primaryButtonText: 'Aceptar',
      secondaryButtonText: 'Cerrar',
      showPrimaryButton: true,
      showSecondaryButton: true
    };

    const dialogRef = this.dialog.open(Modal, {
      width: '600px',
      data: modalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // El usuario ya está autenticado automáticamente después del registro
        // Redirigir a la página principal
        this.router.navigate(['/tasks']);
      }
    });
  }
} 