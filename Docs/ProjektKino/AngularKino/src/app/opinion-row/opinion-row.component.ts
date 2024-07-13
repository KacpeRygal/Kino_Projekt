import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Opinion } from '../model/opinion';
import { Input } from '@angular/core';
import { OpinionsService } from '../opinions.service';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';
import { User } from '../model/user';

@Component({
  selector: '[app-opinion-row]',
  templateUrl: './opinion-row.component.html',
  styleUrl: './opinion-row.component.css'
})
export class OpinionRowComponent implements OnInit  {

  public username: string='';
  @Input('app-opinion-row') opinion!: Opinion;

  private readonly api = inject(UsersService)
  submit: any

  ngOnInit(){
    let user: Observable<User> = this.api.getUser(this.opinion.userID);
    user.subscribe({
      next: (res)=>{
        this.username = res.name
      }
    })
  }
}
