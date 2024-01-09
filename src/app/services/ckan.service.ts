import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, from, mergeMap, toArray } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Dataset } from '../interfaces/dataset-details';
import { CatalogueDetail } from '../interfaces/catalogue-details';
import { PartialDataset } from '../interfaces/dataset';

@Injectable({
  providedIn: 'root',
})
export class CkanService {
  private static readonly ckanToDcat: Map<string, string> = new Map(
    Object.entries({
      package: 'Dataset',
      organization: 'Catalogue',
      tag: 'Keyword',
      group: 'Theme',
    })
  );

  constructor(private http: HttpClient) {}

  searchDatasets(
    query: string,
    filter: string = '',
    start: number = 0,
    rows: number = 12
  ): Observable<{ results: PartialDataset[]; count: number }> {
    const url = `${
      environment.backendUrl
    }/api/action/package_search?q=${encodeURIComponent(
      query
    )}&fq=${encodeURIComponent(filter)}&start=${start}&rows=${rows}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        const items = response.result.results.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.notes,
          modified: item.metadata_modified,
          organization: item.organization.title,
          publisher_name: item.publisher_name,
          tags: item.tags.map((tag: { name: string }) => tag.name),
          theme: item.theme[0]
            ?.slice(2, -2)
            .replaceAll(/https?:\/\//g, '')
            .replaceAll('"', '')
            .replaceAll(' ', '')
            .split(','),
          format: item.resources[0]?.format.toLowerCase(),
        }));

        return {
          results: items,
          count: response.result.count,
        };
      }),
      catchError((error) => {
        console.error(error);
        return of({ results: [], count: 0 });
      })
    );
  }

  getSchemingPackageShow(id: string): Observable<Dataset> {
    return this.http.get<Dataset>(
      `${environment.backendUrl}/api/action/scheming_package_show?type=dataset&id=${id}`
    );
  }

  getCatalogueDetails(): Observable<CatalogueDetail[]> {
    const urls = [...CkanService.ckanToDcat.keys()].map(
      (item) => `${environment.backendUrl}/api/3/action/${item}_list`
    );

    return from(urls).pipe(
      mergeMap((url) => this.getCatalogueDetail(url)),
      toArray()
    );
  }

  private getCatalogueDetail(url: string): Observable<CatalogueDetail> {
    let itemCategory: string = CkanService.ckanToDcat.get(
      url.split('/').pop()!.split('_')[0]
    )!;

    return this.http.get<any>(url).pipe(
      map((response) => {
        const itemCount: number = response.result.length;
        itemCategory = itemCount > 1 ? itemCategory + 's' : itemCategory;
        return { [itemCategory]: itemCount };
      }),

      catchError((error) => {
        console.error(error);
        return of({ [itemCategory]: 0 });
      })
    );
  }
}
