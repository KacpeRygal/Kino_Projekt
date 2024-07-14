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
  movieDate:string="";
  
  tickets:Ticket[]=[];
  opinions:Opinion[]=[];
  movies:Movie[]=[];
  screenings:Screening[]=[];
  halls:Hall[]=[];

  profilTickets:ProfilTicket[]=[];
  profilOpinions:ProfilOpinion[]=[];

  instProfilOpinion!: ProfilOpinion;
  instProfilTicket!: ProfilTicket;

  screeningTemp: Screening | undefined;
  movieTemp: Screening | undefined;
  hallTemp:Hall|undefined;
  opinionTemp:Opinion|undefined;


  constructor( private route: ActivatedRoute, private userService: UsersService,
    private router: Router, private app: AppComponent,
    private screeningService: ScreeningsService,private movieService: MoviesService,private hallService:HallsService) {}

  ngOnInit(): void {
    if(this.apiToken.getToken()=="") this.router.navigateByUrl("logreg");
    this.getCurrentUser();
   
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
    console.log(this.apiToken);
    this.currentUserID = this.apiToken.decode();
    console.log(this.currentUserID);
    if(this.currentUserID != null) {
      this.userService.getUser(this.currentUserID).subscribe({
        next: (res) => {
          this.user = res;
          this.app.user=res;
          this.getUserOpinion();
          this.getUserTickets();

          this.getScreenings();
          this.getMovies();
          this.getHalls();
          this.combine();
   
        },
        error: (err) => console.log('Error fetching logged user: ', err)
      });
    }
  }



  getUserTickets() {
    console.log(this.apiToken.decodedToken);
    this.userService.getTickets(this.currentUserID).subscribe({
      next: (res) => {
        console.log(res.length);
        this.tickets = res;
      },
      error: (err) => console.log('Error fetching users tickets : ', err)
    });
  }
  
  getScreenings(){
    this.tickets.forEach(ticket=>
      this.screeningService.getScreening(ticket.screeningId).subscribe({
        next: (res) => {
          console.log(res.date);
           this.screenings.push(res);
        },
        error: (err) => console.log('Error fetching screening: ', err)
      })
    )
  }

  getMovies(){
    this.screenings.forEach(screening=>
      this.movieService.getMovie(screening.movieid).subscribe({
        next: (res) => {
           this.movies.push(res);
        },
        error: (err) => console.log('Error fetching screening: ', err)
      })
    )
  }

  getHalls() {
    this.screenings.forEach(screening=>
      this.hallService.getHall(screening.hallid).subscribe({
        next: (res) => {
           this.halls.push(res);
        },
        error: (err) => console.log('Error fetching screening: ', err)
      })
    )
  }
  combine(){
    this.tickets.forEach(ticket=>
    {
      const screeningTemp=this.screenings.find(x=>x.id==ticket.screeningId);
      if(screeningTemp){
      const movieTemp=screeningTemp ? this.movies.find(x=>x.id==this.screeningTemp?.movieid):undefined;
        if(movieTemp){
       const hallTemp=screeningTemp ? this.halls.find(x=>x.id==this.screeningTemp?.hallid):undefined;
          if(hallTemp){
            this.instProfilTicket.id=ticket.id;
            this.instProfilTicket.data=ticket.date;
            this.instProfilTicket.price=ticket.price;
            this.instProfilTicket.movieName=movieTemp.name;
            this.instProfilTicket.screeningData=screeningTemp.date;
            this.instProfilTicket.hallNumber=hallTemp.id;
            this.instProfilTicket.seatRow=hallTemp.rows;                                                                //tu będzie położenie siedzienia
            this.instProfilTicket.seatCollumn=hallTemp.columns;

            this.profilTickets.push(this.instProfilTicket);
          }
        }
      }
    }
    )



    
  }
  getUserOpinion() {
    console.log(this.apiToken.decodedToken);
    this.userService.getOpinions(this.currentUserID).subscribe({
      next: (res) => {
        this.opinions = res;
      },
      error: (err) => console.log('Error fetching users opinions : ', err)
    });
  }

  showOpinions() {
    this.activeTab = 'opinions';
  }

  showTickets() {
    this.activeTab = 'tickets';
  }

}
