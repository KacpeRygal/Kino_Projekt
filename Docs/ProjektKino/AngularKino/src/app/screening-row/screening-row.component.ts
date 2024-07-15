import { Component, inject, OnInit } from '@angular/core';
import { Screening } from '../model/screening';
import { Input } from '@angular/core';
import { ScreeningsService } from '../screenings.service';
import { MoviesService } from '../movies.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from '../model/movie';
import { HallsService } from '../halls.service';
import { Hall } from '../model/hall';
import { HallTechnologyEnum } from '../model/hall-technology-enum';

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
  hallType: HallTechnologyEnum = HallTechnologyEnum.IMAX

  private readonly apiMovies = inject(MoviesService)
  private readonly apiHalls = inject(HallsService)
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
    let h: Observable<Hall> = this.apiHalls.getHall(this.screening.hallID)
    h.subscribe({
      next: (res)=>{
        this.hallType = res.technology
      }
    })
    this.date = new Date(this.screening.date)
    this.dateString = this.date.getHours()+":"+this.date.getMinutes()
  }

  getHallTypeText(model: HallTechnologyEnum): string {
    switch (model) {
      case HallTechnologyEnum.HDR:
        return 'HDR';
      case HallTechnologyEnum.HFR:
        return 'HFR';
      case HallTechnologyEnum.IMAX:
        return 'IMAX';
      case HallTechnologyEnum.ScreenX:
        return 'ScreenX';
      default:
        return 'Brak';
    }
  }

  movieDetails(id:number):void{
    this.router.navigate(['/movie/'+id])
  }

  buyticket(id:number):void{
    this.router.navigate(['/seats/'+id])
  }
}
