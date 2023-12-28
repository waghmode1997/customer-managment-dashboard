import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailValidator } from '../../validators/email-validatos';
import { TOAST_MSG} from '../../index.ts/constant';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr:ToastrService) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, EmailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.signInForm.controls;
  }

  submit() {
    if (this.signInForm.valid) {
      this.signInForm.reset();
      this.toastr.success(TOAST_MSG.LOGIN);
      this.router.navigate(['dashboard']);
    }
  }
}
