import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Screening } from '../model/screening';
import { ScreeningsService } from '../screenings.service';
import { MoviesService } from '../movies.service';
import { Movie } from '../model/movie';
import { ScreeningRowComponent } from '../screening-row/screening-row.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css' 
})
export class HomeComponent implements OnInit {
  screenings: Screening[]=[]
  currentScreenings: Screening[] = []
  isLoggedIn = false
  pages: string[] = ['Screenings at: ', 'Screenings at:', 'Screenings at:', 'Screenings at:', 'Screenings at:']
  pagesDates: Date[] = []
  currentPageIndex: number = 0
  
  constructor(private router: Router, private screeningService: ScreeningsService,private moviesService: MoviesService) {
      this.getData()

      for (let i = 0; i < 5; i++) {
        let date: Date = new Date(Date.now() + ( 3600 * 1000 * 24 * i))
        this.pagesDates.push(date)
        this.pages[i] += date.getDate()+"."+(date.getMonth() + 1)
      }
      console.log(this.pagesDates)
   }

  getData(){
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
    this.setPage(0);
  }

  navigate() {
    if (this.isLoggedIn) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/logreg']);
    }
  }

  setPage(page: number) {
    let sc:Screening[]=[]
    let checkedDate: Date = this.pagesDates[page]
    this.screenings.forEach(item=>{
      let date: Date = new Date(item.date.toString())
      if(date.getDay() == checkedDate.getDay() && date.getMonth() == checkedDate.getMonth() && date.getFullYear() == checkedDate.getFullYear()) {
        sc.push(item)
      }
    })
    this.currentScreenings = sc
  }
}
