import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRequest } from './model/user-request';
import { Observable } from 'rxjs';
import { User } from './model/user';
import { Ticket } from './model/ticket';
import { Screening } from './model/screening';
import { Opinion } from './model/opinion';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  public put(body: UserRequest,id :number):Observable<void>{
    return this.httpClient.put<void>('https://localhost:7204/api/Users/'+ id, body)
  }


  public post(body: UserRequest):Observable<void>{
    return this.httpClient.post<void>('https://localhost:7204/api/Users',body);

  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>('https://localhost:7204/api/Users/'+id);
  }

  public getUsers():Observable<User[]>{
    return this.httpClient.get<User[]>('https://localhost:7204/api/Users/Users');
  }

  public getUser(userId: number): Observable<User> {
    return this.httpClient.get<User>(`https://localhost:7204/api/Users/User/${userId}`);
  }

  public getTickets(id: number){
    return this.httpClient.get<Ticket[]>(`https://localhost:7204/api/Users/Tickets/${id}`);

  }

  public getScreenings(id: number){
    return this.httpClient.get<Screening[]>('https://localhost:7204/api/Users/getOpinions/'+id)
  }

  public getOpinions(userId:number):Observable<Opinion[]> {
      return this.httpClient.get<Opinion[]>(`https://localhost:7204/api/Users/Opinions/${userId}`);
  }
}
