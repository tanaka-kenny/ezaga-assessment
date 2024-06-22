import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements OnInit {

  @Input({ required: true })
    formGroup!: FormGroup;
  @Input({ required: true })
    control!: string;
  @Input() type = 'text'
  @Input({ required: true}) label!: string;
  @Input() readOnly = false;

  errorMessages!: Record<string, string>;

  ngOnInit(): void {
    this.errorMessages = {
      required: this.control.charAt(0).toUpperCase() + this.control.slice(1) + ' is required',
      email: this.control.charAt(0).toUpperCase() + this.control.slice(1) + ' must be a valid email'
    }
  }

  get formGroupControls() {
    return this.formGroup.controls;
  }

}
