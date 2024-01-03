import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { CkanService } from '../../services/ckan.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  allResults: any[] = [];
  results: any[] = [];
  totalResults: number = 0;
  
  currentSearchQuery: string = '';
  currentFilters: any = {};
  currentFilterQuery: string = '';

  pageSize: number = 12;
  currentPage: number = 0;
  pageSizeOptions: number[] = [12, 24, 48];

  constructor(private route: ActivatedRoute, private ckanService: CkanService, private router: Router) {}

  ngOnInit(): void {
    this.ckanService.searchDatasets("", "", 0, this.pageSize).subscribe(data => {
      this.allResults = data.results;
      console.log(this.allResults[0].themes)
    });

    this.route.queryParams.subscribe( _ => {
      this.loadSearchResults(this.currentSearchQuery, this.currentFilterQuery);
    });
  }

  loadSearchResults(query: string, filter:string): void {
    const start = this.currentPage * this.pageSize;
    this.ckanService.searchDatasets(query, filter, start, this.pageSize).subscribe(data => {
      this.results = data.results;
      this.totalResults = data.count;
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;

    this.loadSearchResults(this.currentSearchQuery, this.currentFilterQuery);
  }

  onSelectItem(item: any): void {
    const itemId = item.id;
    this.router.navigate(['/datasets', itemId]);
  }

  onReceiveFilter(filter:any){
    this.currentFilters = {...this.currentFilters, ...filter};
    
    this.currentFilterQuery = Object.entries(this.currentFilters)
                                    .map(([label, value]) => [label, this.handleFilterValuesWithSpace(value as string[])])
                                    .map(this.createQueryFromFilter)
                                    .reduce((acc:string, str:string) => acc + str, "");
    
    this.loadSearchResults(this.currentSearchQuery, this.currentFilterQuery);
  }

  handleFilterValuesWithSpace(values: string[]) {
    return values.map((value: string) => value.includes(" ") ? `"${value}"`: value);
  }

  createQueryFromFilter(filter: any){
    const [prop, values] = filter;
    const separator =  prop === "theme" ? "": ":"
    const correctedValues = prop === "organization" ? values.map((value: string) => value.toLowerCase()): values
    return correctedValues.length === 0 ? '' : `${prop}${separator}(${correctedValues.join(" OR ")})+`;
  }

  onClearFilter(){
    this.currentFilters = {}
    this.currentFilterQuery = "";
    this.loadSearchResults(this.currentSearchQuery, this.currentFilterQuery)
  }

}