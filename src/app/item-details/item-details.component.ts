import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CkanService } from '../services/ckan.service';
import {  DatasetDetails } from '../interfaces/dataset-details.interface';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent {
  datasetDetails: DatasetDetails = {}; 
  currentLanguage: string = 'en'; // Current language

  constructor(private route: ActivatedRoute, private ckanService: CkanService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const itemId = params['id'];
      this.ckanService.getSchemingPackageShow(itemId).subscribe(response => {
        this.processData(response.result);
    });
  });
}

  processData(data: any) {
    Object.keys(data).forEach(key => {
      if (data[key].visible) {
        this.datasetDetails[key] = data[key];
      }
    });
  }

  getLabel(field: any): string {
    return field.field_label && field.field_label[this.currentLanguage] ? field.field_label[this.currentLanguage] : field.field_label.en;
  }
}
