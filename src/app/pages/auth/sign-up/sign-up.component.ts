import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignupRequest } from 'src/app/models/SignupRequest';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  flag: boolean = true;
  request: SignupRequest;
  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      street: ["", [Validators.required]],
      houseNumber: ["", [Validators.required]],
      city: ["", [Validators.required]],
      postalCode: ["", [Validators.required]],
    });
  }

  saveDetails(form) {
    this.loading = true;
    console.log(JSON.stringify(form.value, null, 4))
    this.request = {
      firstname: this.form.get("firstName").value,      
      lastname: this.form.get("lastName").value,      
      street: this.form.get("street").value,      
      houseNumber: this.form.get("houseNumber").value,      
      city: this.form.get("city").value,   
      plz: this.form.get("postalCode").value,   
      email: this.form.get("email").value,      
      password: this.form.get("password").value,      
    }
    this.authService.signUp(this.request).subscribe(response => {
      this.loading = false;
      this.toastr.success(response.message, "Success");
      this.router.navigate(["/signin"]);
    }, error => {
      this.toastr.error(error.error.message, "Error");
    });
  }

}
