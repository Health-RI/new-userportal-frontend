import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CkanService {
  private apiUrl = 'https://localhost:8443/api/action'; // Replace with your CKAN API URL

  constructor(private http: HttpClient) { }

  searchDatasets(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/package_search`, { params: { q: query } });
  }
}