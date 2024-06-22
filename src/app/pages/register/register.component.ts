import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/service/auth.service';
import { RegisterRequest } from '../../shared/model/auth.model';
import { InputComponent } from "../../shared/component/input/input.component";

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
    imports: [RouterModule, ReactiveFormsModule, InputComponent]
})
export class RegisterComponent {

  formGroup: FormGroup;

  private router = inject(Router);
  private authService = inject(AuthService);

  constructor() {
    this.formGroup = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  register() {
    this.authService.register(this.formGroup.value as RegisterRequest)
      .subscribe(() => this.router.navigate(['home']));
  }

}