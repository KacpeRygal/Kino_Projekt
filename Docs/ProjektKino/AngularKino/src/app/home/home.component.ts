import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css' 
})
export class HomeComponent implements OnInit {
  isLoggedIn = false; 
  pages: string[] = ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'];
  currentPageIndex: number = 0;
  allFields: string[] = [
    'Field 1.1', 'Field 1.2', 'Field 1.3', 'Field 1.4',
    'Field 2.1', 'Field 2.2', 'Field 2.3', 'Field 2.4',
    'Field 3.1', 'Field 3.2', 'Field 3.3', 'Field 3.4',
    'Field 4.1', 'Field 4.2', 'Field 4.3', 'Field 4.4',
    'Field 5.1', 'Field 5.2', 'Field 5.3', 'Field 5.4',
  ];
  currentFields: string[] = [];

  constructor(private router: Router) { }

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
