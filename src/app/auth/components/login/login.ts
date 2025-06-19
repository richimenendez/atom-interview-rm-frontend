import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth';
import { Modal, ModalData } from '../../../shared/components/modal/modal';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: false,
})
export class Login {
  @Input() requirePassword = false; // Permite alternar entre backend y Firebase

  constructor(
    private authService: AuthService, 
    private router: Router,
    private dialog: MatDialog,
    private errorHandler: ErrorHandlerService
  ) {}

  handleLogin(form: { email: string; password?: string }) {
    if (this.requirePassword) {
      this.authService.login({ email: form.email, password: form.password }).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: err => this.errorHandler.handleValidationError(err, 'Login')
      });
    } else {
      this.authService.login({ email: form.email }).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: err => this.errorHandler.handleValidationError(err, 'Login')
      });
    }
  }

  onModeChange(newMode: 'login' | 'register') {
    if (newMode === 'register') {
      this.router.navigate(['/auth/register']);
    }
  }
}
