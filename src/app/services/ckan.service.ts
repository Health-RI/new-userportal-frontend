import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CkanService {
  // For Development: Proxy redirects traffic to the backend to avoid CORS issues
  private apiUrl = ''; // Replace with your CKAN API URL

  constructor(private http: HttpClient) { }

  searchDatasets(query: string): Observable<any[]> {
    const url = `${this.apiUrl}/api/action/package_search?q=${encodeURIComponent(query)}`;
    return this.http.get<any>(url).pipe(
      map(response => response.result.results.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.notes,
        modified: item.metadata_modified,
        organizationName: item.organization.title,
        publisher_name: item.publisher_name
      }))),
      catchError(error => {
        console.error(error);
        return of([]);
      })
    );
  }

  getSchemingPackageShow(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/action/scheming_package_show?type=dataset&id=${id}`);
  }
}
