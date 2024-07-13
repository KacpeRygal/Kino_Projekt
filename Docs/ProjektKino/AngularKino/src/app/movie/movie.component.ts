import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Movie } from '../model/movie';
import { Opinion } from '../model/opinion';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {
  public movie: Movie[]=[]
  public opinions: Opinion[]=[]

  constructor(private moviesService: MoviesService, private route: ActivatedRoute){
    let id: number =  (Number(this.route.snapshot.paramMap.get('id')))
    console.log(id)
    this.getMovie(id)
    this.getOpinions(id)
  }

  private getMovie(id: number):void{
    this.moviesService.getMovie(id).subscribe({
      next: (res)=>{
        this.movie.push(res)
      },
      error: (err) => console.error(err),
      complete: () => console.log('complete')
    })
    console.log(this.movie)
  }

  private getOpinions(id: number):void{
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

}
