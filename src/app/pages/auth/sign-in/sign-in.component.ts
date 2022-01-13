import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SigninRequest } from 'src/app/models/SigninRequest';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  flag: boolean = true;
  loading: boolean;
  request: SigninRequest;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkUserAuthState();
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  private checkUserAuthState() {
    if(this.authService.isLoggedIn) {
      this.router.navigate(['home']);
    }
  }

  saveDetails(form) {

    this.loading = true;

    this.request = {
      email: this.form.get("email").value,
      password: this.form.get("password").value,
    }

    this.authService.signIn(this.request).subscribe({
      next: (response) => {
        this.loading = false;
        this.toastr.success("Successfully logged in!", "Success");

        localStorage.setItem("token", response.token);
        localStorage.setItem("token_type", response.type);
        localStorage.setItem("roles", response.roles);
        localStorage.setItem("rental", JSON.stringify(response.rental));
        localStorage.setItem("email", response.email);
        localStorage.setItem("lastname", response.lastname);
        localStorage.setItem("firstname", response.firstname);
        localStorage.setItem("id", response.id);
      },
      error: (error) => {
        const msg = error.status === 403 ? 'Username and/or Password is incorrect.' : error.error.message;
        this.toastr.error(msg, "Error");
      },
      complete: () => location.href = '/dashboard'
    });
  }

}
