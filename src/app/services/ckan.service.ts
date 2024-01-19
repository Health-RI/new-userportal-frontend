import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, forkJoin, count } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Dataset } from '../interfaces/dataset-details';
import { PartialDataset } from '../interfaces/dataset';
import { PortalStatistics } from '../interfaces/portal-statistics';

@Injectable({
  providedIn: 'root',
})
export class CkanService {
  private static readonly COUNTER_PROPS: string[] = ['dataset', 'catalogue', 'keyword', 'theme'];

  constructor(private http: HttpClient) {}

  searchDatasets(
    query: string,
    filter: string = '',
    sortBy: string = '',
    start: number = 0,
    rows: number = 12
  ): Observable<{ results: PartialDataset[]; count: number }> {
    const url = `${environment.backendUrl}/api/action/package_search?q=${encodeURIComponent(
      query
    )}&fq=${encodeURIComponent(filter)}&sort=${sortBy}&start=${start}&rows=${rows}`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        const items = response.result.results.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.notes,
          modified: item.metadata_modified,
          organization: item.organization.title,
          publisher_name: item.publisher_name,
          tags: item.tags?.map((tag: { name: string }) => tag.name),
          theme: item.theme?.map((theme: string) => `"${theme}"`),
          format: item.resources?.format,
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

  getPropList(label: string): Observable<any> {
    const url = `${environment.backendUrl}/api/action/${label}_list`;
    return this.http.get<any>(url).pipe(
      map(
        (response) => ({
          count: response.result.count,
          values: response.result.values,
        }),
        catchError((error) => {
          console.error(error);
          return of({ results: [], count: 0 });
        })
      )
    );
  }

  getPortalStatistics(): Observable<PortalStatistics> {
    const observables = CkanService.COUNTER_PROPS.map((prop: string) =>
      this.getSingleStatistic(prop)
    );

    return forkJoin(observables).pipe(
      map((results: PortalStatistics[]) =>
        results.reduce((statistics, singleStat) => ({ ...statistics, ...singleStat }), {})
      )
    );
  }

  private getSingleStatistic(prop: string): Observable<PortalStatistics> {
    const url = `${environment.backendUrl}/api/3/action/${prop}_list`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        let propCorrected = prop[0].toUpperCase() + prop.slice(1);
        propCorrected = response.result.count > 1 ? propCorrected + 's' : propCorrected;
        return { [propCorrected]: response.result.count };
      }),

      catchError((error) => {
        console.error(error);
        return of({ [prop]: 0 });
      })
    );
  }
}
