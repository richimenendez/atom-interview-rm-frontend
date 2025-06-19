import { Component, Input, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../models/task.model';

interface TaskFormData {
  task?: Task;
  mode: 'create' | 'edit';
}

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
  standalone: false,
})
export class TaskFormComponent implements OnInit {
  mode: 'create' | 'edit' = 'create';
  task?: Task;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskFormData
  ) {
    this.mode = data.mode;
    this.task = data.task;
    
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      completed: [false]
    });
  }

  ngOnInit() {
    if (this.task && this.mode === 'edit') {
      this.form.patchValue({
        title: this.task.title,
        description: this.task.description,
        completed: this.task.completed
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  get titleControl() {
    return this.form.get('title');
  }

  get descriptionControl() {
    return this.form.get('description');
  }
} 