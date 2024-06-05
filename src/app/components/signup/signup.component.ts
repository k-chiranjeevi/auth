import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthserviceService } from 'src/app/services/auth-service/authservice.service';
import { passwordValidator, phoneNumberValidator } from 'src/app/utils/utils';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  signUpForm!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: AuthserviceService,
    private router: Router) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      user_firstname: ['', Validators.required],
      user_lastname: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(10), phoneNumberValidator]],
      user_password: ['', [Validators.required, passwordValidator]],
      termsandconditions: [false, [Validators.requiredTrue]]
    })
  }

  get fields() {
    return this.signUpForm.controls;
  }

  register() {
    const {
      user_firstname,
      user_lastname,
      user_email,
      phone,
      user_password
    } = this.signUpForm.value;
    const payload = {
      user_firstname: user_firstname,
      user_email: user_email,
      user_phone: phone,
      user_password: user_password,
      user_lastname: user_lastname,
      user_city: "Hyderabad",
      user_zipcode: "500072"
    }
    this.signUpForm.markAllAsTouched();

    if (this.signUpForm.valid) {
      this.subscription = this.service.register(payload).subscribe((res: any) => {
        if (res) {
          this.router.navigate(['/signin']);
          this.signUpForm.reset();
        }
      }, (err: any) => {
        console.log(err);
      })
    }
  }

  toggle() {
    this.showPassword = !this.showPassword;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
