import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrlEnv;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const body = { username, password };
    return this.http.post(`${this.baseUrl}/usuario/validate`, body);
  }
}
