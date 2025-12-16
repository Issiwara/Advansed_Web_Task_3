import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { ReactiveFormsModule } from '@angular/forms';

describe('Login', () => {
  let fixture: ComponentFixture<Login>;
  let component: Login;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login, ReactiveFormsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when empty', () => {
    expect(component.form.valid).toBe(false);
  });

  it('should validate required fields', () => {
    const username = component.form.get('username');
    const password = component.form.get('password');
    username?.setValue('user');
    password?.setValue('pass');
    expect(component.form.valid).toBe(true);
  });

  it('should set submitted on submit', () => {
    component.form.get('username')?.setValue('user');
    component.form.get('password')?.setValue('pass');
    component.onSubmit();
    expect(component.submitted).toBe(true);
  });
});
