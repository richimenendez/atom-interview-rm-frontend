import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from '../models/task.model';
import { TaskFilters } from '../components/task-filters/task-filters';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { AppError } from '../../shared/models/error.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly apiUrl = 'https://api-7l3aizeqha-uc.a.run.app/api/tasks';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) { }

  getTasks(filters?: TaskFilters): Observable<Task[]> {
    let params = new HttpParams();
    
    if (filters) {
      if (filters.dateOrder) {
        params = params.set('dateOrder', filters.dateOrder);
      }
      if (filters.statusFilter && filters.statusFilter !== 'all') {
        params = params.set('statusFilter', filters.statusFilter);
      }
      if (filters.searchTerm) {
        params = params.set('searchTerm', filters.searchTerm);
      }
      if (filters.limit) {
        params = params.set('limit', filters.limit.toString());
      }
      if (filters.page) {
        params = params.set('page', filters.page.toString());
      }
    }

    return this.http.get<Task[]>(this.apiUrl, { params }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  createTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  updateTask(id: string, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError.bind(this))
    );
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
    this.errorHandler.handleValidationError(errorData, 'Tareas');
    
    return throwError(() => new Error(errorMessage));
  }
}
