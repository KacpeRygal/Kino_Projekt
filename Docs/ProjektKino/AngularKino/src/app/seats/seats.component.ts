import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../token.service';
import { User } from '../model/user';
import { UsersService } from '../users.service';
import { AppComponent } from '../app.component';
import { Movie } from '../model/movie';
import { MoviesService } from '../movies.service';
import { ScreeningsService } from '../screenings.service';
import { Screening } from '../model/screening';
import { HallsService } from '../halls.service';
import { Hall } from '../model/hall';
import { TicketsService } from '../tickets.service';
import { TicketRequest } from '../model/ticket-request';
import { SeatsService } from '../seats.service';
import { Seat } from '../model/seat';
import { Ticket } from '../model/ticket';
import { SeatRequest } from '../model/seat-request';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent {

  private readonly apiToken = inject(TokenService);
  movieID = -1;
  currentUserID: number = 0;
  user!: User;

  movie: Movie | undefined;
  screening: Screening = {
    id: -1,
    hallID: -1,
    movieID: -1,
    date: ""
  }
  seat:SeatRequest|undefined;
  hall!: Hall;
  Date: Date=new Date(Date.now()-200);
  seats: Seat[] = [];
  dateString: string = '';
  hourString: string='';
  ticketReq: TicketRequest | undefined;
  zakupiono:boolean=false;

  seatsDisplay: string[][] = [];
  selectedSeatRow: number|undefined;
  selectedSeatColumn: number|undefined;
  
  date: Date = new Date(Date.now()-200);

  ngOnInit(): void {
    if (this.apiToken.getToken() == "") this.router.navigateByUrl("logreg");
    this.getCurrentUser();
    this.getMovie();
    this.setSeats();
  }

  constructor(private route: ActivatedRoute, private router: Router, private userService: UsersService, private app: AppComponent,
    private movieService: MoviesService, private screeningService: ScreeningsService, private hallService: HallsService, private ticketService: TicketsService,
    private seatsService: SeatsService) {
    let id: number = (Number(this.route.snapshot.paramMap.get('id')))
    this.movieID = id;
  }

  getCurrentUser() {
    this.currentUserID = this.apiToken.decode();
    if (this.currentUserID != null) {
      this.userService.getUser(this.currentUserID).subscribe({
        next: (res) => {
          this.user = res;
          this.app.user = res;
        },
        error: (err) => console.log('Error fetching logged user: ', err)
      });
    }
  }

  getMovie() {
    this.movieService.getMovie(this.movieID).subscribe({
      next: (res) => {
        this.movie = res;
        this.getScreening();
      },
      error: (err) => console.log('Error fetching movie: ', err)
    })
  }

  getScreening() {
    this.screeningService.getScreening(this.movieID).subscribe({
      next: (res) => {
        this.screening = res;
        this.date = new Date(this.screening?.date)
        this.dateString=this.date.getDay()+"."+this.date.getMonth()+"."+this.date.getFullYear();
        this.hourString = this.date.getHours()+":"+this.date.getMinutes();
        this.getHalls();
      },
      error: (err) => console.log('Error fetching screening: ', err)
    })
  }

  getHalls() {
    if (this.screening != null) {
      this.hallService.getHall(this.screening?.hallID).subscribe({
        next: (res) => {
          this.hall = res;
          this.setSeat();
          this.setDisplay();
        },
        error: (err) => console.log('Error fetching screening: ', err)
      })
    }
  }

  buyTicket() {
    this.Date = new Date(Date.now()-200);
    this.zakupiono=true;
    this.ticketReq = {
      userID: this.user.id,
      screeningID: this.screening?.id,
      price: 57,
      date:this.Date.toISOString()
    }
    console.log(this.Date);
    this.ticketService.post(this.ticketReq).subscribe({
      next: (res) => {
        console.log(res);
        console.log(this.Date);
        this.setSeat();
      },
      error: (err) => console.log('Error posting Ticket', err)
    })
  }

  setSeat() {

    this.ticketService.getTicketForSeats(this.user.id, this.screening.id, this.Date.toISOString()).subscribe({
      next: (res) => {
        this.seat={
          ticketID: res.id,
          hallID: this.hall.id,
          row:this.selectedSeatRow,
          column: this.selectedSeatColumn,
          occupied: true
      }
        this.seatsService.post(this.seat).subscribe({
          next: (res)=>{

          }
        })
      },
      error: (err) => console.log('error pobierania ticketu dla siedzien', err)
    })
  }

  setSeats() {
    this.hallService.getSeats(1).subscribe({
      next: (res) => {
        this.seats = res;
      },
      error: (err) => console.log('Error fetching seats', err)
    })
  }

  setDisplay() {

    for (let i = 0; i < this.hall.rows; i++) {
      this.seatsDisplay[i] = [];  
      for (let j = 0; j < this.hall.columns; j++) {
        this.seatsDisplay[i][j] = 'available'; 
      }
    }

    for (let i = 0; i < this.hall.rows; i++) {
      for (let j = 0; j < this.hall.columns; j++) {
        if (this.seats.find(x => x.column == j && x.row == i)) {
          this.seatsDisplay[i][j] = 'occupied';
        } else {
          this.seatsDisplay[i][j] = 'available';
        }
      }
    }
  }

  toggleSeat(rowIndex: number, seatIndex: number) {
    const currentSeatState = this.seatsDisplay[rowIndex][seatIndex];
    if (currentSeatState === 'occupied') return;

    if (this.selectedSeatRow !== undefined && this.selectedSeatColumn !== undefined) {
      this.seatsDisplay[this.selectedSeatRow][this.selectedSeatColumn] = 'available';
    }

    if (currentSeatState === 'available') {
      this.seatsDisplay[rowIndex][seatIndex] = 'selected';
      this.selectedSeatRow = rowIndex;
      this.selectedSeatColumn = seatIndex;
    } else if (currentSeatState === 'selected') {
      this.seatsDisplay[rowIndex][seatIndex] = 'available';
      this.selectedSeatRow = undefined;
      this.selectedSeatColumn = undefined;
    }
  }
}
