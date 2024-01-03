import { Component } from '@angular/core';
import { CkanService } from 'src/app/services/ckan.service';

@Component({
  selector: 'app-catalogue-details',
  templateUrl: './catalogue-details.component.html',
  styleUrls: ['./catalogue-details.component.scss']
})

export class CatalogueDetailsComponent {
  catalogueDetails: { [key: string]: number } = {};

  constructor(private ckanService: CkanService) {}

  ngOnInit(): void {
    this.ckanService
              .getCatalogueDetails()
              .subscribe(response => this.joinDetails(response));
    }
  
  joinDetails(details: { [key: string]: number }[]): void {
      for (const detail of details){
        this.catalogueDetails = {...this.catalogueDetails, ...detail}
      }
    }
}

