import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/auth-service/authservice.service';
import { passwordValidator } from 'src/app/utils/utils';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  showPassword: boolean = false;
  signinForm!: FormGroup;
  constructor(private fb: FormBuilder, private service: AuthserviceService, private router: Router) { }

  ngOnInit() {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator]],
    })
  }

  get fields() {
    return this.signinForm.controls;
  }

  toggle() {
    this.showPassword = !this.showPassword;
  }

  login() {
    const payload: { user_email: string, user_password: string } = {
      user_email: this.signinForm.value.email,
      user_password: this.signinForm.value.password
    }
    if (this.signinForm.valid) {
      this.service.login(payload).subscribe((res: any) => {
        if (res) {
          localStorage.setItem('user', JSON.stringify(res));
          localStorage.setItem('isLogin', 'true');
          this.router.navigate(['/dashboard']);
        }
      }, (err: any) => {
        console.log(err);
      })
    }
  }

}
