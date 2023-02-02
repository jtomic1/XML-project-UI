import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginData } from 'src/app/features/startpage/components/models/LoginData';
import { LoginResponseDTO } from 'src/app/features/startpage/components/models/LoginResponseDTO';
import { UserDTO } from 'src/app/features/startpage/components/models/UserDTO';
import { environment } from 'src/environments/environment';
import * as JsonToXML from 'js2xmlparser';

@Injectable({
  providedIn: 'root',
})
export class LoggedUserService {
  constructor(private http: HttpClient) {}

  get token(): string | null {
    return localStorage.getItem('access-token');
  }

  get user(): UserDTO | null {
    let user: string | null = localStorage.getItem('user-data');
    if (user !== null) return JSON.parse(user);
    else return null;
  }

  get isTokenPresent(): boolean {
    return this.token !== null;
  }

  sendLoginRequest(data: LoginData): Observable<any> {
    let url = `${environment.baseUrl}/user/login`;
    let xml = JsonToXML.parse('jwtAuthenticationRequest', data);
    return this.http.post(url, xml, {
      responseType: 'text',
    });
  }

  setUserData(data: LoginResponseDTO): void {
    localStorage.clear();
    localStorage.setItem('access-token', data.accessToken);
    localStorage.setItem('user-data', JSON.stringify(data.userDTO));
  }

  updateUser(dto: UserDTO): void {
    let user: UserDTO = this.user!;
    user.name = dto.name;
    user.email = dto.email;
    user.surname = dto.surname;
    user.identificationNumber = dto.identificationNumber;
    user.role = dto.role;
    user.username = dto.username;
    localStorage.setItem('user-data', JSON.stringify(user));
  }

  logout() {
    localStorage.clear();
  }
}
