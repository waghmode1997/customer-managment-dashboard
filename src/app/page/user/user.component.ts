import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserdetailsService } from 'src/app/userdetails.service';
import { EmailValidator } from '../../validators/email-validatos';
import { PhoneNumberValidator } from '../../validators/phone-number-validators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  status: string;
  edit: number;
  userForm: FormGroup;
  userId: number;
  initialFormValue: any;
  isFormUnchanged: any;
  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userDetailsService: UserdetailsService,
    private toastr: ToastrService) {
    this.userForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9\-.' ]+$")]],
      lastname: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9\-.' ]+$")]],
      email: ['', [Validators.required, EmailValidator]],
      phonenumber: ['', [Validators.required, PhoneNumberValidator()]],
    });
  }

  ngOnInit(): void {
    this.status = this.activatedRoute.snapshot.queryParams['status'];
    this.userId = this.activatedRoute.snapshot.queryParams['id'];
    if (this.userId) {
      this.patchValue();
    }

    // Store the initial form value
    this.initialFormValue = { ...this.userForm.value };

    // Subscribe to valueChanges to detect changes
    this.userForm.valueChanges.subscribe((value) => {
      this.isFormUnchanged = this.isFormUnchangedFn(value);
    });
  }

  isFormUnchangedFn(value: any): boolean {
    return JSON.stringify(value) === JSON.stringify(this.initialFormValue);
  }

  get f() {
    return this.userForm.controls;
  }

  patchValue() {
    const storedJsonString = localStorage.getItem('user');
    if (storedJsonString !== null) {
      const storedUserData = JSON.parse(storedJsonString);
      this.userForm.patchValue({
        firstname: storedUserData.firstname,
        lastname: storedUserData.lastname,
        email: storedUserData.email,
        phonenumber: storedUserData.phonenumber,
      });
    } else {
      this.toastr.error('No data found');
    }
  }


  submit() {
    if (this.userForm.valid) {
      if (this.status == 'add') {
        const formValues = this.userForm.value;
        this.userDetailsService.addRow(formValues);
        this.userForm.reset();
        this.router.navigate(['dashboard']);
      } else if (!this.isFormUnchanged) {
        const formValues = this.userForm.value;
        this.userDetailsService.updateRow(formValues, this.userId);
        this.userForm.reset();
        this.router.navigate(['dashboard']);
      }
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem('user');
  }
}
