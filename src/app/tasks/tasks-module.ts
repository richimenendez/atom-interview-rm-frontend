import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './components/task/task';
import { TaskListComponent } from './components/task-list/task-list';
import { TaskFormComponent } from './components/task-form/task-form';
import { TaskFiltersComponent } from './components/task-filters/task-filters';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared-module';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [
  {
    path: '',
    component: TaskListComponent
  }
];

@NgModule({
  declarations: [
    TaskComponent,
    TaskListComponent,
    TaskFormComponent,
    TaskFiltersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports: [
  ]
})
export class TasksModule { }
