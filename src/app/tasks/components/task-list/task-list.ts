import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task';
import { Modal, ModalData } from '../../../shared/components/modal/modal';
import { TaskFormComponent } from '../task-form/task-form';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';
import { TaskFilters } from '../task-filters/task-filters';

function firestoreTimestampToDate(ts: any): Date {
  if (ts && typeof ts._seconds === 'number') {
    return new Date(ts._seconds * 1000);
  }
  return new Date(ts);
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
  standalone: false,
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  currentFilters: TaskFilters = {
    dateOrder: 'desc',
    statusFilter: 'all'
  };

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks(this.currentFilters).subscribe({
      next: (tasks) => {
        this.tasks = tasks.map(task => ({
          ...task,
          createdAt: firestoreTimestampToDate(task.createdAt)
        }));
      },
      error: (err) => this.errorHandler.handleError(err, 'Error al cargar tareas')
    });
  }

  onFiltersChange(filters: TaskFilters) {
    this.currentFilters = filters;
    this.loadTasks();
  }

  addTask() {
    this.openTaskModal();
  }

  editTask(task: Task) {
    this.openTaskModal(task);
  }

  deleteTask(task: Task) {
    this.showDeleteConfirmationModal(task);
  }

  toggleTaskStatus(event: { task: Task; completed: boolean }) {
    const { task, completed } = event;
    
    const taskIndex = this.tasks.findIndex(t => t.id === task.id);
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = { ...this.tasks[taskIndex], completed, updating: true };
    }

    this.taskService.updateTask(task.id.toString(), { completed }).subscribe({
      next: () => {
        if (taskIndex !== -1) {
          this.tasks[taskIndex] = { ...this.tasks[taskIndex], updating: false };
        }
      },
      error: (err) => {
        if (taskIndex !== -1) {
          this.tasks[taskIndex] = { ...this.tasks[taskIndex], completed: !completed, updating: false };
        }
        this.errorHandler.handleError(err, 'Error al actualizar tarea');
      }
    });
  }

  private openTaskModal(task?: Task) {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '600px',
      data: { task, mode: task ? 'edit' : 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (task) {
          this.taskService.updateTask(task.id.toString(), result).subscribe({
            next: () => {
              this.loadTasks();
              this.showSuccessModal('Tarea actualizada correctamente');
            },
            error: err => this.errorHandler.handleValidationError(err, 'Error al actualizar tarea')
          });
        } else {
          this.taskService.createTask(result).subscribe({
            next: () => {
              this.loadTasks();
              this.showSuccessModal('Tarea creada correctamente');
            },
            error: err => this.errorHandler.handleValidationError(err, 'Error al crear tarea')
          });
        }
      }
    });
  }

  private showDeleteConfirmationModal(task: Task) {
    const modalData: ModalData = {
      title: 'Confirmar eliminación',
      message: `¿Estás seguro de que quieres eliminar la tarea "${task.title}"?`,
      primaryButtonText: 'Eliminar',
      secondaryButtonText: 'Cancelar',
      showPrimaryButton: true,
      showSecondaryButton: true
    };

    const dialogRef = this.dialog.open(Modal, {
      width: '500px',
      data: modalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.deleteTask(task.id.toString()).subscribe({
          next: () => {
            this.loadTasks();
            this.showSuccessModal('Tarea eliminada correctamente');
          },
          error: err => this.errorHandler.handleError(err, 'Error al eliminar tarea')
        });
      }
    });
  }

  private showSuccessModal(message: string) {
    const modalData: ModalData = {
      title: 'Éxito',
      message: message,
      primaryButtonText: 'Aceptar',
      showPrimaryButton: true,
      showSecondaryButton: false
    };

    this.dialog.open(Modal, {
      width: '400px',
      data: modalData
    });
  }
}
