// SPDX-FileCopyrightText: 2024 Stichting Health-RI
// SPDX-FileContributor: PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CkanService } from '../../services/ckan.service';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { DatasetDetails } from '../../interfaces/dataset-details';
import * as moment from 'moment';

@Component({
  selector: 'app-dataset-details',
  templateUrl: './dataset-details.component.html',
  styleUrls: ['./dataset-details.component.scss'],
})
export class ItemDetailsComponent implements OnInit {
  faFile = faFile;
  datasetDetails: DatasetDetails = {};
  currentLanguage: string = 'en'; // Current language
  sorted_details = [
    'metadata_created',
    'metadata_modified',
    'url',
    'language',
    'publisher_name',
    'identifier',
    'spatial_uri',
    'has_version',
    'contact_uri',
    'access_rights',
    'conforms_to',
    'provenance',
    'license_title',
  ];

  constructor(
    private route: ActivatedRoute,
    private ckanService: CkanService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const itemId = params['id'];
      this.ckanService.getSchemingPackageShow(itemId).subscribe((response) => {
        this.datasetDetails = response.result;
      });
    });
  }

  getThemes(): string[] {
    const themes = this.datasetDetails['theme'];
    if (!!themes && Array.isArray(themes.value)) {
      return themes.value;
    }
    return [];
  }

  getKeywords(): any[] {
    const keywords = this.datasetDetails['tags'];
    if (!!keywords && Array.isArray(keywords.value)) {
      return keywords.value;
    }
    return [];
  }

  getLabel(field: any): string {
    return field.field_label[this.currentLanguage] ?? field.field_label;
  }

  getValue(value: any): string {
    const date = moment(value, moment.ISO_8601);
    if (date.isValid()) {
      return date.format('D MMMM YYYY');
    }
    return value;
  }

  isNotEmtpy() {
    return !!this.datasetDetails && Object.keys(this.datasetDetails).length > 0;
  }

  getDistributions(): any[] {
    const distributions = this.datasetDetails['resources'];
    if (!!distributions && Array.isArray(distributions.value)) {
      return distributions.value;
    }
    return [];
  }
}
