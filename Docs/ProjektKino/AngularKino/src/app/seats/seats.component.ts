import { Component, inject } from '@angular/core';
import { ScreeningsService } from '../screenings.service';
import { ActivatedRoute } from '@angular/router';
import { Screening } from '../model/screening';
import { UsersService } from '../users.service';
import { AppComponent } from '../app.component';
import { TokenService } from '../token.service';
import { User } from '../model/user';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrl: './seats.component.css'
})
export class SeatsComponent {

  screening: Screening[] = []
  currentUserID: number = -1000;
  user!: User;
  private readonly apiToken = inject(TokenService);

  constructor(private screeningsService: ScreeningsService, private userService: UsersService,private app: AppComponent, private route: ActivatedRoute){
    let id: number =  (Number(this.route.snapshot.paramMap.get('id')))
    this.getScreening(id)
  }

  ngOnInit(): void {
    this.getCurrentUser()
  }

  getScreening(id:number){
    this.screeningsService.getScreening(id).subscribe({
      next: (res)=>{
        this.screening.push(res)
      }
    })
  }

  getCurrentUser() {
    this.currentUserID = this.apiToken.decode();
    if(this.currentUserID != null) {
      this.userService.getUser(this.currentUserID).subscribe({
        next: (res) => {
          this.user = res;
          this.app.user=res;
        },
        error: (err) => console.log('Error fetching logged user: ', err)
      });
    }
  }
}
