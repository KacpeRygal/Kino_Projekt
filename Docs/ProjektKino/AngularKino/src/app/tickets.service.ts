import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from './model/ticket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private httpClient: HttpClient) { }

}
