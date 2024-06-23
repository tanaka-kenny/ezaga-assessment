import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../shared/component/input/input.component';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../shared/service/auth.service';
import { AuthRequest } from '../../shared/model/auth.model';
import { ToasterService } from '../../shared/service/toaster.service';

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, RouterLink, NgIf],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.scss'
})
export class PasswordRecoveryComponent {

  formGroup: FormGroup;
  hasSubmittedEmail = false;

  constructor(
    private authService: AuthService,
    private toasterService: ToasterService,
    private router: Router) {
    this.formGroup = this.createForm();
  }

  submitEmail() {
    this.toasterService.showInfo("Requesting code", "Password Recovery");
    const email = this.formGroup.get('email')!.value as string;
    this.authService.requestConfirmationCode(email)
      .subscribe({
        next: () => {
          this.hasSubmittedEmail = true;
          this.formGroup.addControl('code', new FormControl('', [Validators.required]))
          this.formGroup.addControl('password', new FormControl('', [Validators.required]))
        },
        error: (error) => this.toasterService.showError("User with this email doesn't exist", "Invalid email")
        
      });    
  }

  submitCode() {
    const request: AuthRequest = { 
      email: this.formGroup.get('email')!.value,
      password: this.formGroup.get('password')!.value
    }

    this.authService.verifyConfirmationCode(this.formGroup.get('code')?.value as number, request)
      .subscribe({
        next: response => { 
          if (response == true) {
            this.toasterService.showSuccess("Successfully changed your passord!", "Success");
            this.router.navigate(['login']);
            this.formGroup = this.createForm();
          } else {
            this.toasterService.showError("Please enter the correct code sent to your email", "Invalid code")
          }
        },
        error: error => {
         
        }
      })
  }

  private createForm() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

}
