import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Opinion } from './model/opinion';

@Injectable({
  providedIn: 'root'
})
export class OpinionsService {

  constructor(private httpClient: HttpClient) { }

}
