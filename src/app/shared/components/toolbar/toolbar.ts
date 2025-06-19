import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService, AuthState } from '../../services/auth-state.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
  standalone: false,
})
export class ToolbarComponent implements OnInit, OnDestroy {
  userEmail: string | null = null;
  isLoggedIn = false;
  private authSubscription: Subscription;

  constructor(
    private authStateService: AuthStateService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
    this.authSubscription = this.authStateService.authState$.subscribe(
      (authState: AuthState) => {
        this.isLoggedIn = authState.isLoggedIn;
        this.userEmail = authState.userEmail;
      }
    );
  }

  ngOnInit() {
    // El estado se inicializa automáticamente en el servicio
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout() {
    this.authStateService.logout();
    this.snackbarService.showSuccess('Sesión cerrada correctamente');
    this.router.navigate(['/auth/login']);
  }
} 