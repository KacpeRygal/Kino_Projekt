import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Opinion } from './model/opinion';
import { OpinionRequest } from './model/opinion-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpinionsService {

  constructor(private httpClient: HttpClient) { }
  public get(id: number){
    return this.httpClient.get<Opinion>('https://localhost:7204/api/Opinions/get1/'+id)
  }

  public put(body: OpinionRequest,id :number):Observable<void>{
    return this.httpClient.put<void>('https://localhost:7204/api/Opinions/'+ id, body)
  }

  public post(body: OpinionRequest):Observable<void>{
    return this.httpClient.post<void>('https://localhost:7204/api/Opinions',body);
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>('https://localhost:7204/api/Opinions/'+id);
  }
}
