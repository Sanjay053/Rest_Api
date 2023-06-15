import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // accessToken = '306b77bc3d93a6ebeeb94b251884f74bdcfd611ede2b6c746b1ae21627c7c9df'; // Replace with your actual access token

  private apiUrl = 'https://gorest.co.in/public/v2/users';
  private accessToken = '306b77bc3d93a6ebeeb94b251884f74bdcfd611ede2b6c746b1ae21627c7c9df'; // Replace with your actual access token

  constructor(private http: HttpClient) { }

  login(name: string, email: string): Observable<any> {
    const payload = { name, email };
    return this.http.get(`${this.apiUrl}`);
  }

  userlist(page: number = 1, perPage: number = 20): Observable<any> {
    const url = `${this.apiUrl}`;
  
    // Set the query parameters
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());
  
    // Make the HTTP GET request
    return this.http.get(url, { params });
  }

  addUser(user: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
    return this.http.post(`${this.apiUrl}`, user, { headers });
  }

  putUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
    return this.http.put(url, {}, { headers });
  }

  getUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get(url);
  }
  
  updateUser(user: any): Observable<any> {
    const url = `${this.apiUrl}/${user.id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
    return this.http.put(url, user, { headers });
  }

  deleteUser(userId: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
    const url = `${this.apiUrl}/${userId}`;
  
    return this.http.delete(url, { headers });
  }
}


  