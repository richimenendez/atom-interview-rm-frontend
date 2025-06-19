import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { from, Observable, throwError } from 'rxjs';
import { IAuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService implements IAuthService {
  constructor(private auth: Auth) {}

  register(data: { email: string; password?: string; name?: string }): Observable<UserCredential> {
    if (!data.password) throw new Error('Password es requerido para registro con Firebase');
    return from(createUserWithEmailAndPassword(this.auth, data.email, data.password));
  }

  login(data: { email: string; password?: string }): Observable<UserCredential> {
    if (!data.password) throw new Error('Password es requerido para login con Firebase');
    return from(signInWithEmailAndPassword(this.auth, data.email, data.password));
  }

  refreshToken(): Observable<any> {
    // Firebase maneja la renovación automáticamente
    // Este método es para compatibilidad con la interfaz
    return throwError(() => new Error('Firebase Auth maneja la renovación automáticamente'));
  }

  logout(): void {
    // Firebase maneja el logout automáticamente
    // Este método es para compatibilidad con la interfaz
    console.log('Firebase Auth maneja el logout automáticamente');
  }
} 