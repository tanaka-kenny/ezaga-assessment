import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {

  @Input({ required: true })
    formGroup!: FormGroup;
  @Input({ required: true })
    control!: string;
  @Input() type = 'text'
  @Input({ required: true}) label!: string;
  @Input() readOnly = false;

}
