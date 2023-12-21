import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of , from , mergeMap, toArray} from 'rxjs';
import { environment } from 'src/environment/environment';
import { Dataset } from '../interfaces/dataset-details.interface';

@Injectable({
  providedIn: 'root'
})
export class CkanService {
  ckanToDcat: Map<string, string> = new Map(Object.entries({package: "Dataset", organization: "Catalogue", tag: "Keyword", group: "Theme"}));

  constructor(private http: HttpClient) { }

  searchDatasets(query: string, start: number = 0, rows: number = 12): Observable<{ results: any[], count: number }> {
    const url = `${environment.backendUrl}/api/action/package_search?q=${encodeURIComponent(query)}&start=${start}&rows=${rows}`;
    return this.http.get<any>(url).pipe(
      map(response => {

        const items = response.result.results.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.notes,
          modified: item.metadata_modified,
          organizationName: item.organization.title,
          publisher_name: item.publisher_name
        }));

        return {
          results: items,
          count: response.result.count
        };
      }),
      catchError(error => {
        console.error(error);
        return of({ results: [], count: 0 });
      })
    );
  }

  getSchemingPackageShow(id: string): Observable<Dataset> {
    return this.http.get<Dataset>(`${environment.backendUrl}/api/action/scheming_package_show?type=dataset&id=${id}`);
  }

  getCatalogueDetails(): Observable<any> {
    const urls = [...this.ckanToDcat.keys()].map(item => `${environment.backendUrl}/api/3/action/${item}_list`);

    return from(urls).pipe(
      mergeMap(url => this.getCatalogueDetail(url)),
      toArray(), 
    );
  }

  getCatalogueDetail(url: string): Observable<any> {
    let itemCategory: string = this.ckanToDcat.get(url.split("/").pop()?.split("_")?.[0] ?? "") ?? "";
    
    return this.http.get<any>(url).pipe(map(response => {
      const itemCount = response.result.length;
      itemCategory = itemCount > 1 ? itemCategory + "s": itemCategory;
      return { [itemCategory]: itemCount };
      }),
      
      catchError(error => {
        console.error(error);
        return of({ [itemCategory]: 0 });
      })
    );
  }
}


