import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AuthState {
  isLoggedIn: boolean;
  userEmail: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private authStateSubject = new BehaviorSubject<AuthState>({
    isLoggedIn: false,
    userEmail: null
  });

  public authState$ = this.authStateSubject.asObservable();

  constructor() {
    this.checkAuthStatus();
  }

  private checkAuthStatus() {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    
    this.authStateSubject.next({
      isLoggedIn: !!token,
      userEmail: userEmail
    });
  }

  updateAuthState(token: string | null, userEmail: string | null) {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('userEmail', userEmail || '');
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
    }

    this.authStateSubject.next({
      isLoggedIn: !!token,
      userEmail: userEmail
    });
  }

  updateToken(token: string) {
    localStorage.setItem('token', token);
    const userEmail = localStorage.getItem('userEmail');
    
    this.authStateSubject.next({
      isLoggedIn: true,
      userEmail: userEmail
    });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    this.updateAuthState(null, null);
  }
} 