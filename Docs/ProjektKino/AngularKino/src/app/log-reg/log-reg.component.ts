import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TokenService } from '../token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-log-reg',
  templateUrl: './log-reg.component.html',
  styleUrl: './log-reg.component.css'
})
export class LogRegComponent {
  registerData = { login: '', password: '', repeatPassword: '', name: '' };
  firstTimeLogin: boolean=true;
  invalidLogin: boolean=false;
  password: string | undefined;

  constructor(private apiToken: TokenService, private http: HttpClient, private router: Router, private app: AppComponent) { }

  ngOnInit(): void {
    localStorage.removeItem("jwt");
    this.apiToken.setToken("");
    console.log(this.apiToken);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/loginger' && this.firstTimeLogin) {
          this.firstTimeLogin = false;
        }
      }
    });
  }


  //logowanie
  login(form: NgForm) {
    const credentials = JSON.stringify({
      username: form.value.login,
      password: form.value.password
    });

    this.http.post("https://localhost:7204/api/Authorization/login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe({
      next: (res) => {
        const token = (<any>res).token;
        console.log("Token received:", token);
        localStorage.setItem("jwt", token.toString());
        this.invalidLogin = false;
        this.app.isLoggedIn = true;
        this.apiToken.setToken(token);
        this.router.navigate(["/profil"]);
      },
      error: (err) => {
        console.error("Login error:", err);
        this.invalidLogin = true;
        alert("Invalid username or password. Please try again.");
      }
    });
  }

//rejestracja
  register() {
    if (this.registerData.password !== this.registerData.repeatPassword) {
      alert("Passwords do not match!");
      return;
    }
    const user = {
      login: this.registerData.login,
      password: this.registerData.password,
      type:0,
      name: this.registerData.name,
      canReduce:false
    };

    this.http.post('https://localhost:7204/api/Users', user)
    .subscribe(response => {
      console.log('User created successfully', response);
      alert('User created successfully');
    }, error => {
      console.error('Error creating user', error);
      alert('Error creating user');
    });
  }
}
