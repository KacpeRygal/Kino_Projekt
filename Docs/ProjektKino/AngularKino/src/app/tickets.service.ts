import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from './model/ticket';
import { Observable } from 'rxjs';
import { Seat } from './model/seat';
import { TicketRequest } from './model/ticket-request';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private httpClient: HttpClient) { }

  public getSeat(ticketId:number):Observable<Seat>{
    return this.httpClient.get<Seat>("https://localhost:7204/api/Tickets/getSeat/"+ticketId);
  }
  public post(body: TicketRequest):Observable<void>{
    return this.httpClient.post<void>('https://localhost:7204/api/Tickets',body);
  }
  public getTicketForSeats(userId:number,screeningId:number,date:string):Observable<Ticket>{
    return this.httpClient.get<Ticket>(`https://localhost:7204/api/Tickets/TicketForSeat/${userId}/${screeningId}/${date}`);
  }
}
