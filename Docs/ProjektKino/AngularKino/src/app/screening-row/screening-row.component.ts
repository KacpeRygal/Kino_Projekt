import { Component, inject, OnInit } from '@angular/core';
import { Screening } from '../model/screening';
import { Input } from '@angular/core';
import { ScreeningsService } from '../screenings.service';
import { MoviesService } from '../movies.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from '../model/movie';

@Component({
  selector: '[app-screening-row]',
  templateUrl: './screening-row.component.html',
  styleUrl: './screening-row.component.css'
})

export class ScreeningRowComponent implements OnInit{

  @Input('app-screening-row') screening!: Screening;
  date: Date = new Date(Date.now()-200)
  dateString: string = ''
  name: string = ''
  id: number = NaN

  private readonly apiMovies = inject(MoviesService)
  submit: any

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.id = this.screening.movieID
    let m: Observable<Movie> = this.apiMovies.getMovie(this.id)
    m.subscribe({
      next: (res)=>{
        this.name = res.name
      }
    })
    this.date = new Date(this.screening.date)
    this.dateString = this.date.getHours()+":"+this.date.getMinutes()
  }

  movieDetails(id:number):void{
    this.router.navigate(['/movie/'+id])
  }
  buyTicket(id:number):void{
    this.router.navigate(['/seats/'+id])
  }
}
