import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegistrationData } from '../../components/models/RegistrationData';
import * as JsonToXML from 'js2xmlparser';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  sendRegistrationRequest(data: RegistrationData): Observable<any> {
    let xml = JsonToXML.parse('registrationDTO', data);
    let url = `${environment.baseUrl}/user/register`;
    return this.http.post(url, xml, {
      responseType: 'text',
    });
  }
}
