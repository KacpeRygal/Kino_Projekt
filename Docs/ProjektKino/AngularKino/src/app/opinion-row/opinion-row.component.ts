import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Opinion } from '../model/opinion';
import { Input } from '@angular/core';
import { OpinionsService } from '../opinions.service';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: '[app-opinion-row]',
  templateUrl: './opinion-row.component.html',
  styleUrl: './opinion-row.component.css'
})
export class OpinionRowComponent  {

  @Input('app-opinion-row') opinion!: Opinion;

  private readonly apiOpinions = inject(OpinionsService)
  submit: any

  ngOnInit(){
    
  }
}
