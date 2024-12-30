import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { RegistrationService } from '../../services/register.auth';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import {Router, RouterLink} from '@angular/router';
import {futureDateValidator} from "../../services/date.check";


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
    private registrationService: RegistrationService,
    private router: Router
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
      licenseExpirationDate : ['',
        [Validators.required, futureDateValidator()]
      ],
    });
  }

  onSubmit(): void {
    console.log(this.registrationForm.value);
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);

      this.registrationService.register(this.registrationForm.value).subscribe({
        next: ()=> {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Registration failed', error);
        }
      });
    }
  }
}
