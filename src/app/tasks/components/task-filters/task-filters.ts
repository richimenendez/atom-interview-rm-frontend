import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

export interface TaskFilters {
  dateOrder: 'asc' | 'desc';
  statusFilter: 'all' | 'completed' | 'pending';
  searchTerm?: string;
  limit?: number;
  page?: number;
}

@Component({
  selector: 'app-task-filters',
  templateUrl: './task-filters.html',
  styleUrl: './task-filters.scss',
  standalone: false,
})
export class TaskFiltersComponent implements OnInit {
  @Output() filtersChange = new EventEmitter<TaskFilters>();

  filtersForm: FormGroup;
  searchControl: FormControl;
  showStatusDropdown = false;

  constructor(private fb: FormBuilder) {
    this.searchControl = new FormControl('');
    this.filtersForm = this.fb.group({
      dateOrder: ['desc'],
      statusFilter: ['all'],
      searchTerm: this.searchControl
    });
  }

  ngOnInit() {
    this.emitFilters();

    this.filtersForm.valueChanges.subscribe(() => {
      this.emitFilters();
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.status-filter-section')) {
      this.showStatusDropdown = false;
    }
  }

  private emitFilters() {
    const formValue = this.filtersForm.value;
    const filters: TaskFilters = {
      dateOrder: formValue.dateOrder,
      statusFilter: formValue.statusFilter
    };
    
    if (formValue.searchTerm && formValue.searchTerm.trim()) {
      filters.searchTerm = formValue.searchTerm.trim();
    }
    
    this.filtersChange.emit(filters);
  }

  toggleDateOrder() {
    const currentOrder = this.filtersForm.get('dateOrder')?.value;
    const newOrder = currentOrder === 'desc' ? 'asc' : 'desc';
    this.filtersForm.patchValue({ dateOrder: newOrder });
  }

  toggleStatusDropdown() {
    this.showStatusDropdown = !this.showStatusDropdown;
  }

  selectStatus(status: 'all' | 'completed' | 'pending') {
    this.filtersForm.patchValue({ statusFilter: status });
    this.showStatusDropdown = false;
  }

  getStatusLabel(): string {
    const status = this.filtersForm.get('statusFilter')?.value;
    switch (status) {
      case 'completed': return 'Completadas';
      case 'pending': return 'Pendientes';
      default: return 'Todas';
    }
  }

  clearFilters() {
    this.filtersForm.patchValue({
      dateOrder: 'desc',
      statusFilter: 'all',
      searchTerm: ''
    });
    this.showStatusDropdown = false;
  }
} 