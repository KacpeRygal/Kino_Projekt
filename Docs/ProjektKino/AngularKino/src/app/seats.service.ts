import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SeatRequest } from './model/seat-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeatsService {

  constructor(private httpClient: HttpClient) { }

  public post(body: SeatRequest):Observable<void>{
    return this.httpClient.post<void>('https://localhost:7204/api/Seats',body);
  }
}
