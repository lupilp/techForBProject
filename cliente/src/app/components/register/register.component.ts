import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = {
    name: '',
    tipoDocumento: '',
    numDocumento: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  userRegister() {
    this.authService.userRegister(this.user).subscribe(
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

  validarNombre() {
    return !!this.user.name;
  }

  validarDni() {
    return this.user.numDocumento.length === 8;
  }
}
