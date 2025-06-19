import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-task',
  templateUrl: './task.html',
  styleUrl: './task.scss',
  standalone: false,
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(50px)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() toggleStatus = new EventEmitter<{ task: Task; completed: boolean }>();

  onEdit() {
    this.editTask.emit(this.task);
  }

  onDelete() {
    this.deleteTask.emit(this.task);
  }

  onToggleStatus(event: any) {
    const newStatus = event.checked;
    this.toggleStatus.emit({ task: this.task, completed: newStatus });
  }
}
