import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { Observable } from 'rxjs';

const api = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  Create(data: User) {
    return this.http.post(`${api}/register`, data);
  }
}
