import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/service/auth.service';
import { AuthRequest } from '../../shared/model/auth.model';
import { InputComponent } from '../../shared/component/input/input.component';
import { ToasterService } from '../../shared/service/toaster.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formGroup: FormGroup;

  private router = inject(Router);
  private authService = inject(AuthService);
  private toasterService = inject(ToasterService);

  constructor() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  login() {
    this.authService.login(this.formGroup.value as AuthRequest)
      .subscribe(() => {
        this.router.navigate(['home']);
        this.toasterService.showSuccess('Login successful!', '');
      })
  }

}
