import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }


  login(username: string, password: string) {
    const body = { username, password };
    return this.http.post(`${this.baseUrl}/usuario/validate`, body);
  }

  registro(usuario:User){
    return this.http.post(this.baseUrl,usuario)
  }
}
