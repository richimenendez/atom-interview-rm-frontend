import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthStateService } from '../../shared/services/auth-state.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { AppError, extractErrorMessage } from '../../shared/models/error.model';

export interface IAuthService {
  register(data: { email: string; password?: string; name?: string }): Observable<any>;
  login(data: { email: string; password?: string }): Observable<any>;
  refreshToken(): Observable<any>;
  logout(): void;
}

interface AuthResponse {
  user: any;
  token: string;
  userId: string;
}

interface RefreshTokenResponse {
  token: string;
  userId: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {
  private readonly apiUrl = 'https://api-7l3aizeqha-uc.a.run.app/api/users';

  constructor(
    private http: HttpClient,
    private authStateService: AuthStateService,
    private errorHandler: ErrorHandlerService
  ) { }

  register(data: { email: string; password?: string; name?: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap(response => {
        if (response.token) {
          this.authStateService.updateAuthState(response.token, data.email);
        }
      }),
      catchError(this.handleError.bind(this))
    );
  }

  login(data: { email: string; password?: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      tap(response => {
        if (response.token) {
          this.authStateService.updateAuthState(response.token, data.email);
        }
      }),
      catchError(this.handleError.bind(this))
    );
  }

  refreshToken(): Observable<RefreshTokenResponse> {
    const token = this.authStateService.getToken();
    if (!token) {
      return throwError(() => new Error('No token available'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<RefreshTokenResponse>(`${this.apiUrl}/refresh-token`, {}, { headers }).pipe(
      tap(response => {
        if (response.token) {
          this.authStateService.updateToken(response.token);
        }
      }),
      catchError(this.handleError.bind(this))
    );
  }

  logout(): void {
    this.authStateService.logout();
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    let errorData: AppError = errorMessage;
    
    if (error.error) {
      // Error de validación con Joi
      if (error.error.code === 'VALIDATION_ERROR' && error.error.details) {
        errorData = error.error;
      } 
      // Error de API estándar
      else if (error.error.message) {
        errorMessage = error.error.message;
        errorData = errorMessage;
      } else if (error.error.error) {
        errorMessage = error.error.error;
        errorData = errorMessage;
      }
    } else if (error.message) {
      errorMessage = error.message;
      errorData = errorMessage;
    }
    
    // Usar el nuevo sistema de manejo de errores
    this.errorHandler.handleValidationError(errorData, 'Autenticación');
    
    return throwError(() => new Error(errorMessage));
  }
}
