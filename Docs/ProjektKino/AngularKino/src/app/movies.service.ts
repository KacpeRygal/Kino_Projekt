import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieRequest } from './model/movie-request';
import { Observable } from 'rxjs';
import { Movie } from './model/movie';
import { Opinion } from './model/opinion';
import { Screening } from './model/screening';


@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  constructor(private httpClient: HttpClient) { }

  public put(body: MovieRequest,id :number):Observable<void>{
    return this.httpClient.put<void>('https://localhost:7204/api/Movies/'+ id, body)
  }

  public post(body: MovieRequest):Observable<void>{
    return this.httpClient.post<void>('https://localhost:7204/api/Movies',body);
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>('https://localhost:7204/api/Movies/'+id);
  }

  public getMovie(id: number){
    return this.httpClient.get<Movie>('https://localhost:7204/api/Movies/get1/'+id)

  }

  public getMovies(){
    return this.httpClient.get<Movie[]>('https://localhost:7204/api/Movies/getMovies')
  }

  public getOpinions(id: number){
    return this.httpClient.get<Opinion[]>('https://localhost:7204/api/Movies/getOpinions/'+id)
  }

  public getScreenings(id: number){
    return this.httpClient.get<Screening[]>('https://localhost:7204/api/Movies/getScreenings'+id)
  }
}
