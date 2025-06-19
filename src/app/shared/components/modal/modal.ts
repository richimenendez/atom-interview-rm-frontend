import { Component, Input, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface ModalData {
  title: string;
  message: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  showPrimaryButton?: boolean;
  showSecondaryButton?: boolean;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
  standalone: false,
})
export class Modal implements OnInit {
  data: ModalData;

  @Output() primaryAction = new EventEmitter<void>();
  @Output() secondaryAction = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<Modal>,
    @Inject(MAT_DIALOG_DATA) public dialogData: ModalData
  ) {
    this.data = {
      title: dialogData?.title || '',
      message: dialogData?.message || '',
      primaryButtonText: dialogData?.primaryButtonText || 'Aceptar',
      secondaryButtonText: dialogData?.secondaryButtonText || 'Cancelar',
      showPrimaryButton: dialogData?.showPrimaryButton !== false,
      showSecondaryButton: dialogData?.showSecondaryButton !== false
    };
  }

  ngOnInit() {
    console.log('Modal data:', this.data);
  }

  onPrimaryAction() {
    this.primaryAction.emit();
    this.dialogRef.close(true);
  }

  onSecondaryAction() {
    this.secondaryAction.emit();
    this.dialogRef.close(false);
  }

  onClose() {
    this.dialogRef.close();
  }
}
