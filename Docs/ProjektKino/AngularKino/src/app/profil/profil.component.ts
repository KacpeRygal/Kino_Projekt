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
  instProfilTicket: ProfilTicket = new ProfilTicket()

  screeningTemp: Screening | undefined;
  movieTemp: Movie | undefined;
  hallTemp:Hall|undefined;
  opinionTemp:Opinion|undefined;


  constructor( private route: ActivatedRoute, private userService: UsersService,
    private router: Router, private app: AppComponent,
    private screeningService: ScreeningsService,private movieService: MoviesService,private hallService:HallsService) {}

  ngOnInit(): void {
    if(this.apiToken.getToken()=="") this.router.navigateByUrl("logreg");
    this.getCurrentUser();
    console.log(this.tickets.length);
       //  this.getScreenings();
      //   this.getMovies();
     //   this.getHalls();
      //   this.combine();
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
          //this.getUserTickets();

         // this.getUserData();
         // this.getScreenings();
         // this.getMovies();
         // this.getHalls();
         // this.combine();
   
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
          console.log('hhaa');
           this.halls.push(res);
           this.combine();
        },
        error: (err) => console.log('Error fetching screening: ', err)
      })
    );
  }
  combine(){
    this.tickets.forEach(ticket=>
    {
      if(this.tickets.length!=this.profilTickets.length){
      console.log("tickety test dlugosc: "+this.tickets.length);
       this.screeningTemp=this.screenings.find(x=>x.id==ticket.screeningID);
      if(this.screeningTemp){
        console.log('data screeninig: '+this.screeningTemp?.date);
       this.movieTemp=this.screeningTemp ? this.movies.find(x=>x.id==this.screeningTemp?.movieID):undefined;
       console.log("                      test:movie");
       console.log(this.movieTemp?.id);
        if(this.movieTemp){
          console.log("                      test");
       this.hallTemp=this.screeningTemp ? this.halls.find(x=>x.id==this.screeningTemp?.hallID):undefined;
       console.log('halltemp collumn: '+this.hallTemp?.columns);
          if(this.hallTemp){

            this.instProfilTicket.id=ticket.id;
            this.instProfilTicket.data=ticket.date;
            this.instProfilTicket.price=ticket.price;
            this.instProfilTicket.movieName=this.movieTemp.name;
            this.instProfilTicket.screeningData=this.screeningTemp.date;
            this.instProfilTicket.hallNumber=this.hallTemp.id;
            this.instProfilTicket.seatRow=this.hallTemp.rows;                                                                //tu będzie położenie siedzienia
            this.instProfilTicket.seatCollumn=this.hallTemp.columns;

            this.profilTickets.push(this.instProfilTicket);
          }
        }
        }
      }
    }
    )
    console.log('glugosc ticketow: '+this.profilTickets.length);
  }
    

  showOpinions() {
    this.activeTab = 'opinions';
  }

  showTickets() {
    this.activeTab = 'tickets';
  }

}
