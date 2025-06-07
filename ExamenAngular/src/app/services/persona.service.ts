// src/app/services/persona.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiUrl = 'http://localhost:5285/api/Personas';

  constructor(private http: HttpClient) {}

  // Reemplaza esto por una función real para obtener el token si usas login
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // o de AuthService
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getPersonas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getPersona(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createPersona(persona: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, persona, { headers: this.getHeaders() });
  }

  updatePersona(id: number, persona: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, persona, { headers: this.getHeaders() });
  }

  deletePersona(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  addPersona(persona: any): Observable<any> {
  return this.http.post(`${this.apiUrl}`, persona);
}

 
}