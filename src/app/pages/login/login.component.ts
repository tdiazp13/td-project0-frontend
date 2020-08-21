import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showModal: boolean;

  constructor(private auth: AuthService, private router: Router) { }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl(''),
  });

  onSubmit = async (): Promise<any> => {
    try {
      await this.auth.login(this.loginForm.value);
      await this.router.navigate(['/dashboard']);
    } catch (error) {
      this.showModal = true;
    }
  }
}
