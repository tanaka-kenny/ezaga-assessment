import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from '../../shared/service/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);
  user!: User;

  ngOnInit(): void {
    this.userService.getUser()
      .subscribe(user => this.user = user)
  }

  viewProfile() {
    this.router.navigate(['profile']);
  }

}
