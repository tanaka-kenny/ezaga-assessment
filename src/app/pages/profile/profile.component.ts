import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User, UserService } from '../../shared/service/user.service';
import { Router } from '@angular/router';
import { InputComponent } from '../../shared/component/input/input.component';
import { ToasterService } from '../../shared/service/toaster.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  formGroup: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private toasterService: ToasterService) {
    this.formGroup = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    })
  }

  ngOnInit(): void {
    this.userService.getUser()
      .subscribe(user => {
        if (user) {
          this.formGroup.patchValue({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
          });
        }
      })
  }

  update() {
    this.userService.updateUser(this.formGroup.value as User)
      .subscribe(() => {
        this.router.navigate(['home'])
        this.toasterService.showSuccess('Profile update successful!', '');
      });
  }

}
