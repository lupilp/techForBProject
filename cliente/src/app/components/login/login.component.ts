import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user = {
    name: '',
    tipoDocumento: '',
    numDocumento: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  userLogin() {
    this.authService.userLogin(this.user).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  validarDni() {
    return this.user.numDocumento.length === 8;
  }
}
