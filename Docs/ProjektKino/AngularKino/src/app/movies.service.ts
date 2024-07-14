import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './model/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClient: HttpClient) { }

  public getMovie(movieId: number): Observable<Movie> {
    return this.httpClient.get<Movie>(`https://localhost:7204/api/Movies/get1/${movieId}`);
  }
}
