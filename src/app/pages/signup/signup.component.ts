import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  showModal: boolean;

  constructor(private auth: AuthService, private router: Router) { }

  signupForm = new FormGroup({
    email: new FormControl('', Validators.email),
    username: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    password: new FormControl('', [
      Validators.required, Validators.minLength(8)
    ]),
    confirm_password: new FormControl(''),
  });

  onSubmit = async (): Promise<any> => {
    try {
      await this.auth.signup(this.signupForm.value);
      await this.router.navigate(['/']);
    } catch (error) {
      this.showModal = true;
    }
  }

}
