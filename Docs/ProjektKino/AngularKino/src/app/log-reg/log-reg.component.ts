import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-reg',
  templateUrl: './log-reg.component.html',
  styleUrl: './log-reg.component.css'
})
export class LogRegComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) { }

  login() {
    // Replace this with actual authentication logic
    if (this.username === 'admin' && this.password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/profile']);
    } else {
      alert('Invalid username or password');
    }
  }
}
