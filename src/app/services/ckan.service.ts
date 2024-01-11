import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, forkJoin } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Dataset } from '../interfaces/dataset-details';
import { PartialDataset } from '../interfaces/dataset';
import { PortalStatistics } from '../interfaces/portal-statistics';

@Injectable({
  providedIn: 'root',
})
export class CkanService {
  private static readonly CKAN_FIELDS_TO_DCAT_PROPS: { [ckanField: string]: string } = {
    package: 'Dataset',
    organization: 'Catalogue',
    tag: 'Keyword',
    group: 'Theme',
  };
  public static readonly MAX_RESULT_PAGES: number = 1000;

  constructor(private http: HttpClient) {}

  searchDatasets(
    query: string,
    filter: string = '',
    start: number = 0,
    rows: number = 12
  ): Observable<{ results: PartialDataset[]; count: number }> {
    const url = `${environment.backendUrl}/api/action/package_search?q=${encodeURIComponent(
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
            ? JSON.parse(item.theme[0]).map((theme: string) => theme.replaceAll(/https?:\/\//g, ''))
            : null,
          format: item.resources[0]?.format,
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

  getPortalStatistics(): Observable<PortalStatistics> {
    const observables = Object.entries(CkanService.CKAN_FIELDS_TO_DCAT_PROPS).map(
      ([ckanField, dcatProp]) => this.getSingleStatistic(ckanField, dcatProp)
    );

    return forkJoin(observables).pipe(
      map((results: PortalStatistics[]) =>
        results.reduce((statistics, singleStat) => ({ ...statistics, ...singleStat }), {})
      )
    );
  }

  private getSingleStatistic(ckanField: string, dcatProp: string): Observable<PortalStatistics> {
    const url = `${environment.backendUrl}/api/3/action/${ckanField}_list`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        const count = new Set(response.result).size;
        const dcatPropCorrected = count > 1 ? dcatProp + 's' : dcatProp;
        return { [dcatPropCorrected]: count };
      }),

      catchError((error) => {
        console.error(error);
        return of({ [dcatProp]: 0 });
      })
    );
  }
}
