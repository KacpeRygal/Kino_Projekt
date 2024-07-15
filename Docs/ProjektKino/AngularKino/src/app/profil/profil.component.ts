import { Component, inject } from '@angular/core';
import { TokenService } from '../token.service';
import { User } from '../model/user';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { AppComponent } from '../app.component';
import { Ticket } from '../model/ticket';
import { Opinion } from '../model/opinion';
import { TicketsService } from '../tickets.service';
import { UserTypeEnum } from '../model/user-type-enum';
import { ScreeningsService } from '../screenings.service';
import { Movie } from '../model/movie';
import { Screening } from '../model/screening';
import { MoviesService } from '../movies.service';
import { ProfilTicket } from '../model/profil-ticket';
import { ProfilOpinion } from '../model/profil-opinion';
import { tick } from '@angular/core/testing';
import { Hall } from '../model/hall';
import { HallsService } from '../halls.service';
import { forkJoin } from 'rxjs';
import { Seat } from '../model/seat';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {

private readonly apiToken = inject(TokenService);
  currentUserID: number =0;
  user!: User;
  activeTab: string ="tickets";
  
  tickets:Ticket[]=[];
  opinions:Opinion[]=[];
  movies:Movie[]=[];
  screenings:Screening[]=[];
  halls:Hall[]=[];
  seats:Seat[]=[];

  profilTickets:ProfilTicket[]=[];
  profilOpinions:ProfilOpinion[]=[];

  instProfilOpinion: ProfilOpinion= new ProfilOpinion()
  instProfilTicket: ProfilTicket = new ProfilTicket()

  screeningTemp: Screening | undefined;
  movieTemp: Movie | undefined;
  hallTemp:Hall|undefined;
  opinionTemp:Opinion|undefined;
  seatTemp:Seat|undefined;


  constructor( private route: ActivatedRoute, private userService: UsersService,
    private router: Router, private app: AppComponent,
    private screeningService: ScreeningsService,private movieService: MoviesService,private hallService:HallsService) {}

  ngOnInit(): void {
    if(this.apiToken.getToken()=="") this.router.navigateByUrl("logreg");
    this.getCurrentUser();
    console.log(this.tickets.length);
  }

  getUzytkownikTypText(rodzaj: UserTypeEnum): string {
    switch (rodzaj) {
      case UserTypeEnum.Admin:
        return 'Admin';
      case UserTypeEnum.Reviewer:
        return 'Reviewer';
      case UserTypeEnum.User:
        return 'User';
      default:
        return 'Brak';
    }

  }

  getCurrentUser() {
    this.currentUserID = this.apiToken.decode();
    if(this.currentUserID != null) {
      this.userService.getUser(this.currentUserID).subscribe({
        next: (res) => {
          this.user = res;
          this.app.user=res;
          this.getUserOpinion();
        },
        error: (err) => console.log('Error fetching logged user: ', err)
      });
    }
  }

  getUserOpinion() {
    console.log(this.apiToken.decodedToken);
    this.userService.getOpinions(this.currentUserID).subscribe({
      next: (res) => {
        this.opinions = res;
        this.getUserTickets();
      
      },
      error: (err) => console.log('Error fetching users opinions : ', err)
    });
  }

  getUserTickets() {
    console.log(this.apiToken.decodedToken);
    this.userService.getTickets(this.currentUserID).subscribe({
      next: (res) => {
        this.tickets = res;
        this.getScreenings();
      
      },
      error: (err) => console.log('Error fetching users tickets : ', err)
    });
  }
  
  getScreenings(){

    this.tickets.map(ticket=>
      this.screeningService.getScreening(ticket.screeningID).subscribe({
        next: (res) => {

           this.screenings.push(res);
           this.getMovies();
        },
        error: (err) => console.log('Error fetching screening: ', err)
      })
    );
  }

  getMovies(){

    this.screenings.map(screening=>
      this.movieService.getMovie(screening.movieID).subscribe({
        next: (res) => {
           this.movies.push(res);
           this.getHalls();
        },
        error: (err) => console.log('Error fetching screening: ', err)
      })
    );
  }

  getHalls() {
    this.screenings.map(screening=>
      this.hallService.getHall(screening.hallID).subscribe({
        next: (res) => {
           this.halls.push(res);
           this.combineTicket();
           this.combineOpinion();
        },
        error: (err) => console.log('Error fetching screening: ', err)
      })
    );
  }
  combineTicket(){
    this.tickets.forEach(ticket=>
    {
        if(this.profilTickets.length!=this.tickets.length){
          this.screeningTemp=this.screenings.find(x=>x.id==ticket.screeningID);
          if(this.screeningTemp){
            this.movieTemp=this.screeningTemp ? this.movies.find(x=>x.id==this.screeningTemp?.movieID):undefined;
            if(this.movieTemp){
              this.hallTemp=this.screeningTemp ? this.halls.find(x=>x.id==this.screeningTemp?.hallID):undefined;
              if(this.hallTemp){
                this.seatTemp=this.screeningTemp ? this.seats.find(x=>x.ticketId==ticket.id):undefined;

                this.instProfilTicket= new ProfilTicket()
                this.instProfilTicket.id=ticket.id;
                this.instProfilTicket.data=ticket.date;
                this.instProfilTicket.price=ticket.price;
                this.instProfilTicket.movieName=this.movieTemp.name;
                this.instProfilTicket.screeningData=this.screeningTemp.date;
                this.instProfilTicket.hallNumber=this.hallTemp.id;
                this.instProfilTicket.seatRow=this.hallTemp.rows;                                                                //tu będzie położenie siedzienia
                this.instProfilTicket.seatCollumn=this.hallTemp.columns;                                                         //trzeba dodać możliwość dodwawnia siedzień

                this.profilTickets.push(this.instProfilTicket);
              }
            }
          }
        }
      }
    )
  }

  combineOpinion(){
    this.opinions.forEach(opinion=>
    {
      console.log('cos');
        if(this.profilOpinions.length!=this.opinions.length){
          this.movieTemp=this.movies.find(x=>x.id==opinion.movieID);
          if(this.movieTemp){
               
                this.instProfilOpinion= new ProfilOpinion()
                this.instProfilOpinion.content=opinion.content;
                this.instProfilOpinion.movieName=this.movieTemp.name;
                this.instProfilOpinion.value=opinion.value;

                this.profilOpinions.push(this.instProfilOpinion);
          }
        }
      }
    )
  }

  showOpinions() {
    this.activeTab = 'opinions';
  }

  showTickets() {
    this.activeTab = 'tickets';
  }

}
