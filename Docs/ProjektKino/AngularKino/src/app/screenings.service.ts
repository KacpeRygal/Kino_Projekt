import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Screening } from './model/screening';

@Injectable({
  providedIn: 'root'
})
export class ScreeningsService {

  constructor(private httpClient: HttpClient) { }
  public getScreening(screeningId: number): Observable<Screening> {
    return this.httpClient.get<Screening>(`https://localhost:7204/api/Screenings/get1/${screeningId}`);
  }
}
