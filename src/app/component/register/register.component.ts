import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { RegistrationService } from '../../services/register.auth';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: 'app-registration',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, ReactiveFormsModule],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService
  ) {
    // @ts-ignore

    this.registrationForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9]+$/)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        ]
      ],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cin: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z0-9]+$/)
        ]
      ],
      nationality: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      licenseExpiration : ['',Validators.required],
    });
  }

  onSubmit(): void {
    console.log(this.registrationForm.value);
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);

      this.registrationService.register(this.registrationForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
        },
        error: (error) => {
          console.error('Registration failed', error);
        }
      });
    }
  }
}
