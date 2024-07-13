import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Screening } from '../model/screening';
import { ScreaningsService } from '../screanings.service';
import { MoviesService } from '../movies.service';
import { Movie } from '../model/movie';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css' 
})
export class HomeComponent implements OnInit {
  screenings: Screening[]=[]
  movies: Movie[]=[]
  isLoggedIn = false; 
  pages: string[] = ['Screenings at: ', 'Screenings at:', 'Screenings at:', 'Screenings at:', 'Screenings at:'];
  pagesDates: Date[] = []
  currentPageIndex: number = 0;
  allFields: string[] = [
    'Field 1.1', 'Field 1.2', 'Field 1.3', 'Field 1.4',
    'Field 2.1', 'Field 2.2', 'Field 2.3', 'Field 2.4',
    'Field 3.1', 'Field 3.2', 'Field 3.3', 'Field 3.4',
    'Field 4.1', 'Field 4.2', 'Field 4.3', 'Field 4.4',
    'Field 5.1', 'Field 5.2', 'Field 5.3', 'Field 5.4',
  ];
  currentFields: string[] = [];

  constructor(private router: Router, private screeningService: ScreaningsService,private moviesService: MoviesService) {
      this.getData()

      for (let i = 0; i < 5; i++) {
        let date: Date = new Date(Date.now() + ( 3600 * 1000 * 24 * i))
        this.pagesDates.push(date)
        this.pages[i] += date.getDate()+"."+(date.getMonth() + 1)
      }
      console.log(this.pagesDates)
   }

  getData(){
    this.moviesService.getMovies().subscribe({
      next: (res)=>{
        res.forEach(item=>{
          this.movies.push(item)
        })
      },
      error: (err) => console.error(err),
      complete: () => console.log('complete')
    })
    console.log(this.movies);
    this.screeningService.getScreenings().subscribe({
      next: (res)=>{
        res.forEach(item=>{
          this.screenings.push(item)
        })
      },
      error: (err) => console.error(err),
      complete: () => console.log('complete')
    })
    console.log(this.screenings)
  }

  ngOnInit() {
    this.setPage(1);
  }

  navigate() {
    if (this.isLoggedIn) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/log-reg']);
    }
  }

  setPage(page: number) {
    const startIndex = (page - 1) * 4;
    this.currentFields = this.allFields.slice(startIndex, startIndex + 4);
  }
}
