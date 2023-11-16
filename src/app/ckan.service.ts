import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CkanService {
  private apiUrl = 'http://localhost:5500/api/action'; // Replace with your CKAN API URL

  constructor(private http: HttpClient) { }

  searchDatasets(query: string): Observable<any[]> {
    const url = `${this.apiUrl}/package_search?q=${encodeURIComponent(query)}`;
    return this.http.get<any>(url).pipe(
      map(response => response.result.results.map((item: any) => ({
        title: item.title,
        description: item.notes
      }))),
      catchError(error => {
        console.error(error);
        return of([]);
      })
    );
  }


}