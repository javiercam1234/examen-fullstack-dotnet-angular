import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuestoService {
  private apiUrl = 'http://localhost:5285/api/Puesto';

  constructor(private http: HttpClient) {}

  getPuestos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
