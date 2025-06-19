import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.scss',
  standalone: false,
})
export class AuthForm implements OnChanges {
  @Input() mode: 'login' | 'register' = 'login';
  @Input() requirePassword: boolean = false;
  @Output() submitForm = new EventEmitter<{ email: string; password?: string }>();
  @Output() modeChange = new EventEmitter<'login' | 'register'>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['requirePassword']) {
      if (this.requirePassword) {
        this.form.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
      } else {
        this.form.get('password')?.clearValidators();
      }
      this.form.get('password')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }

  toggleMode() {
    const newMode = this.mode === 'login' ? 'register' : 'login';
    this.modeChange.emit(newMode);
  }

  get emailControl() {
    return this.form.get('email');
  }
  get passwordControl() {
    return this.form.get('password');
  }
}
