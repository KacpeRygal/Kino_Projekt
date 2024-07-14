import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/user';
import { UserRequest } from './model/user-request';
import { Ticket } from './model/ticket';
import { Opinion } from './model/opinion';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  public getUser(userId: number): Observable<User> {
    return this.httpClient.get<User>(`https://localhost:7204/api/Users/User/${userId}`);
  }
  public getUsers():Observable<User[]>{
    return this.httpClient.get<User[]>('https://localhost:7204/api/Users/Users');
  }
  public postUser(user: UserRequest): Observable<void>{
    return this.httpClient.post<void>('https://localhost:7204/api/Users', user);
  }
  public getTickets(userId:number):Observable<Ticket[]>{
    return this.httpClient.get<Ticket[]>(`https://localhost:7204/api/Users/Tickets/${userId}`);
  }
  public getOpinions(userId:number):Observable<Opinion[]>{
    return this.httpClient.get<Opinion[]>(`https://localhost:7204/api/Users/Opinions/${userId}`);
  }
}
