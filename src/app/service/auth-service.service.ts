import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://gorest.co.in/public/v2/users'; // API endpoint for user-related operations
  private accessToken = '306b77bc3d93a6ebeeb94b251884f74bdcfd611ede2b6c746b1ae21627c7c9df'; // Access token for API authorization

  constructor(private http: HttpClient) { }

  // Performs login operation
  login(name: string, email: string): Observable<any> {
    const payload = { name, email }; // Payload data for the login request
    return this.http.get(`${this.apiUrl}`);
  }

  // Retrieves a list of users
  userlist(page: number, perPage: number): Observable<any> {
    const url = `${this.apiUrl}?page=${page}&per_page=${perPage}&`; // URL with query parameters for pagination
    
    // Set the query parameters
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());
  
    // Make the HTTP GET request to retrieve the user list
    return this.http.get(url, { params });
  }

  // Adds a new user
  addUser(user: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`); // Set authorization header
    return this.http.post(`${this.apiUrl}`, user, { headers }); // Make the HTTP POST request to add a user
  }

  // Updates a user
  putUser(id: number, userData: any): Observable<any> {
    const url = `${this.apiUrl}/${id}?`; // URL for updating the user
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`); // Set authorization header
    return this.http.put(url, userData, { headers }); // Make the HTTP PUT request to update the user
  }

  // Retrieves a specific user
  getUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`; // URL for getting user details
    return this.http.get(url); // Make the HTTP GET request to retrieve the user
  }
  
  // Deletes a user
  deleteUser(userId: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
    const url = `${this.apiUrl}/${userId}`;// URL for deleting a user
  
    return this.http.delete(url, { headers }); // Make the HTTP DELETE request to delete the user
  }

}
