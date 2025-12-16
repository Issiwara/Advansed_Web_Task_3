import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="login-section">
      <h2>Login</h2>
      <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
        <div class="form-group">
          <label for="username">Username</label>
          <input id="username" formControlName="username" type="text" required />
          <div class="error" *ngIf="form.get('username')?.invalid && form.get('username')?.touched">Username is required.</div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" formControlName="password" type="password" required />
          <div class="error" *ngIf="form.get('password')?.invalid && form.get('password')?.touched">Password is required.</div>
        </div>
        <button type="submit" [disabled]="form.invalid" class="nav-btn">Login</button>
      </form>
      <div *ngIf="submitted" class="success">Login submitted: {{ form.value | json }}</div>
    </section>
  `,
  styles: [
    `.login-section { max-width: 350px; margin: 2rem auto; background: linear-gradient(90deg,#fff,#f8f6ff); border-radius: 12px; box-shadow: 0 2px 12px rgba(119,2,255,0.08); padding: 2rem; }`,
    `.form-group { margin-bottom: 1.25rem; }`,
    `label { display:block; margin-bottom:0.25rem; color:#33006b; font-weight:600; }`,
    `input { width:100%; padding:0.5rem; border-radius:6px; border:1px solid #ccc; font-size:1rem; }`,
    `.error { color:#FF0060; font-size:0.85rem; margin-top:0.25rem; }`,
    `.success { margin-top:1rem; color:green; font-weight:600; }`
  ]
})
export class Login {
  form;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
  }
}
