import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScreeningRequest } from './model/screening-request';
import { Observable } from 'rxjs';
import { Screening } from './model/screening';
import { Ticket } from './model/ticket';

@Injectable({
  providedIn: 'root'
})
export class ScreaningsService {

  constructor(private httpClient: HttpClient) { }

  public put(body: ScreeningRequest,id :number):Observable<void>{
    return this.httpClient.put<void>('https://localhost:7204/api/Screenings/'+ id, body)
  }

  public post(body: ScreeningRequest):Observable<void>{
    return this.httpClient.post<void>('https://localhost:7204/api/Screenings',body);
  }
  
  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>('https://localhost:7204/api/Screenings/'+id);
  }

  public getScreening(id: number){
    return this.httpClient.get<Screening>('https://localhost:7204/api/Screenings/get1/'+id)
  }

  public getTickets(id: number){
    return this.httpClient.get<Ticket[]>('https://localhost:7204/api/Screenings/getTickets/'+id)
  }

  public getScreenings(){
    return this.httpClient.get<Screening[]>('https://localhost:7204/api/Screenings/getScreenings')
  }

}
