import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hall } from './model/hall';
import { Seat } from './model/seat';

@Injectable({
  providedIn: 'root'
})
export class HallsService {

  constructor(private httpClient: HttpClient) { }

  public getHall(hallId: number): Observable<Hall> {
    return this.httpClient.get<Hall>(`https://localhost:7204/api/Halls/getHall/${hallId}`);
  }
  public getSeats(hallId: number): Observable<Seat[]> {
    return this.httpClient.get<Seat[]>(`https://localhost:7204/api/Halls/getSeats/${hallId}`);
  }
  
}