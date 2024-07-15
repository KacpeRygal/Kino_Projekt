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
import { __makeTemplateObject } from 'tslib';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent implements OnInit{
  public movie: Movie[]=[]
  public movieTime: string =''
  public movieScore:number = NaN

  public movieId: number = -1000
  public opinions: Opinion[]=[]
  private readonly apiToken = inject(TokenService);
  currentUserID: number = -1000;
  user!: User;
  constructor(private moviesService: MoviesService, private route: ActivatedRoute, private router: Router,
              private userService: UsersService, private app: AppComponent, private opinionsService: OpinionsService) {
    let id: number =  (Number(this.route.snapshot.paramMap.get('id')))
    console.log(id)
    this.getMovieWithOpinions(id)
  }

  ngOnInit(): void {
    this.getCurrentUser()
  }

  private getMovieWithOpinions(id: number):void{
    this.movie = []
    this.movieScore = NaN
    this.movieTime = ''
    this.moviesService.getMovie(id).subscribe({
      next: (res)=>{
        this.movie.push(res)
        this.movieId = res.id
        let date: Date = new Date(res.time)
        let minutes:number = date.getHours() * 60 + date.getMinutes()
        this.movieTime += minutes + " min"
        this.movieScore = res.score
      },
      error: (err) => console.error(err),
      complete: () => console.log('complete')
    })
    console.log(this.movie)

    this.opinions = []
    this.moviesService.getOpinions(id).subscribe({
      next: (res)=>{
        res.forEach(item=>{
          this.opinions.push(item)
        })
        this.movieScore /= res.length
        this.movieScore = (Number)(this.movieScore.toPrecision(2))
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

  public opinionToAdd: OpinionRequest = {
    content: null,
    movieId: null,
    userId: null,
    value: null
  };

  onSubmit(event: any): void{
    this.opinionToAdd.movieId = this.movieId
    this.opinionToAdd.userId = this.currentUserID
    this.opinionsService.post(this.opinionToAdd).subscribe()
    this.getMovieWithOpinions(this.movieId)
  }

}
