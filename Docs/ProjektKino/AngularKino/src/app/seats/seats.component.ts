import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../token.service';
import { User } from '../model/user';
import { UsersService } from '../users.service';
import { AppComponent } from '../app.component';
import { Movie } from '../model/movie';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrl: './seats.component.css'
})
export class SeatsComponent {
  
  private readonly apiToken = inject(TokenService);
  movieID=-1;
  currentUserID: number =0;
  user!: User;

  movie:Movie | undefined;



  seats: string[][] = [
    ['occupied', 'occupied', 'available', 'available', 'available', 'available', 'available', 'available'],
    ['occupied', 'occupied', 'available', 'selected', 'available', 'available', 'available', 'available'],
    ['available', 'available', 'available', 'available', 'available', 'available', 'available', 'available']
  ];
  ngOnInit(): void {
    if(this.apiToken.getToken()=="") this.router.navigateByUrl("logreg");
    this.getCurrentUser();
    this.getMovie();
  }


  constructor(private route: ActivatedRoute,private router: Router ,private userService: UsersService, private app: AppComponent,
    private movieService: MoviesService
  ){
    let id: number =  (Number(this.route.snapshot.paramMap.get('id')))
    this.movieID=id;
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

  getMovie(){
      this.movieService.getMovie(this.movieID).subscribe({
        next: (res) => {
           this.movie=res;
        },
        error: (err) => console.log('Error fetching movie: ', err)
      })
    }


  toggleSeat(rowIndex: number, seatIndex: number) {
    const currentSeatState = this.seats[rowIndex][seatIndex];
    if (currentSeatState === 'occupied') return;

    if (currentSeatState === 'available') {
      this.seats[rowIndex][seatIndex] = 'selected';
    } else if (currentSeatState === 'selected') {
      this.seats[rowIndex][seatIndex] = 'available';
    }
  }
}
