import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './model/user';
import { TokenService } from './token.service';
import { UsersService } from './users.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'KinoAngular';

  user!: User;
  public isLoggedIn: boolean = false;

  public readonly apiToken = inject(TokenService);
  private readonly jwtHelper = inject(JwtHelperService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.isUserAuthenticated()) {
      this.router.navigate(["/logreg"]);
    } else {
      
    }
  }
  isUserAuthenticated() {
    const token: string | null = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token) && token != "") {
      this.isLoggedIn = true;
      this.apiToken.setToken(token);
      
      return true;
    }
    return false;
  }

  LoggedName():string{
    if(this.isLoggedIn){
      return "Witaj"+this.user.name;
    }
      return "";
  }

  logOut(): void {
    localStorage.removeItem("jwt");
    this.apiToken.setToken("");
    this.isLoggedIn =false;
    this.router.navigate(["/logreg"]);
  }

  navigate(){
    this.title='Profil';
    this.router.navigate(['profil']);
  }
}
