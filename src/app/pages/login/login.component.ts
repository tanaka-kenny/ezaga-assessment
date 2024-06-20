import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formGroup: FormGroup;

  private router = inject(Router);

  constructor() {
    this.formGroup = new FormGroup({})
  }

  login() {
    this.router.navigate(['home']);
  }

  passwordRecovery() {
    this.router.navigate(['password', 'recovery'])
  }

}
