import { Component, inject, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Movie } from '../model/movie';
import { Opinion } from '../model/opinion';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../token.service';
import { User } from '../model/user';
import { UsersService } from '../users.service';
import { AppComponent } from '../app.component';
import { OpinionsService } from '../opinions.service';
import { OpinionRequest } from '../model/opinion-request';
import { min } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent implements OnInit{
  public movie: Movie[]=[]
  public movieTime: string =''
  public movieId: number = -1000
  public opinions: Opinion[]=[]
  private readonly apiToken = inject(TokenService);
  currentUserID: number = -1000;
  user!: User;

  constructor(private moviesService: MoviesService, private route: ActivatedRoute, private router: Router,
              private userService: UsersService, private app: AppComponent, private opinionsService: OpinionsService) {
    let id: number =  (Number(this.route.snapshot.paramMap.get('id')))
    console.log(id)
    this.getMovie(id)
    this.getOpinions(id)
  }

  ngOnInit(): void {
    this.getCurrentUser()
  }

  private getMovie(id: number):void{
    this.movie = []
    this.movieTime = ''
    this.moviesService.getMovie(id).subscribe({
      next: (res)=>{
        this.movie.push(res)
        this.movieId = res.id
        let date: Date = new Date(res.time)
        let minutes:number = date.getHours() * 60 + date.getMinutes()
        this.movieTime += minutes + " min"
      },
      error: (err) => console.error(err),
      complete: () => console.log('complete')
    })
    console.log(this.movie)
  }

  private getOpinions(id: number):void{
    this.opinions = []
    this.moviesService.getOpinions(id).subscribe({
      next: (res)=>{
        res.forEach(item=>{
          this.opinions.push(item)
        })
      },
      error: (err) => console.error(err),
      complete: () => console.log('complete')
    })
    console.log(this.opinions);
  }

  navigate() {
    this.router.navigate(['/home'])
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

  addOpinion(){
    let opinion: OpinionRequest = { content: null, movieId: null, userId: null, value: null }
    opinion.content = "nowa opinia"
    opinion.movieId = this.movieId
    opinion.value = 123123
    opinion.userId = this.currentUserID
    this.opinionsService.post(opinion).subscribe()
    this.getOpinions(this.movieId)
    this.getMovie(this.movieId)
  }

}
