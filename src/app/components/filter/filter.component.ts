// SPDX-FileCopyrightText: 2024 Stichting Health-RI
// SPDX-FileContributor: PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { PartialDataset } from 'src/app/interfaces/dataset';
import { Filter } from 'src/app/interfaces/filter';
import { CkanService } from 'src/app/services/ckan.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnInit, OnChanges {
  @Input() label!: string;
  @Input() ckanProp!: keyof PartialDataset;
  @Input() parentFilters!: Filter[];
  @Output() filterEmitter: EventEmitter<Filter> = new EventEmitter<Filter>();

  filterValues: string[] = [];
  currentValues: string[] = [];

  constructor(private ckanService: CkanService) {}

  ngOnInit() {
    const prop = this.label[0].toLowerCase() + this.label.slice(1, -1);
    this.ckanService.getPropList(prop).subscribe((data: { count: number; values: string[] }) => {
      this.filterValues = data.values.sort(FilterComponent.sortData).map((value) => this.transformValuesIfNecessary(value));
    });
  }

  private static sortData(a: string | Date, b: string | Date): number {
    if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
    else if (typeof a === 'string' && typeof b === 'string') return a.localeCompare(b);
    else throw new Error('PartialDataset fields must be either of type string or Date');
  }

  private transformValuesIfNecessary(value: string): string {
    return this.label === 'Catalogues' ? value[0].toUpperCase() + value.slice(1).replaceAll('-', ' ') : value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parentFilters'] && this.parentFilters.length === 0) {
      this.currentValues = [];
    }
  }

  onSelectChange(e: MatSelectChange): void {
    this.currentValues = e.value;
    this.sendFilterToParent();
  }

  private sendFilterToParent(): void {
    this.filterEmitter.emit(this.createFilter());
  }

  private createFilter(): Filter {
    return {
      label: this.label,
      values: this.escapeValuesIfNecessary(),
      ckanProp: this.ckanProp,
    };
  }

  private escapeValuesIfNecessary(): string[] {
    return this.label === 'Themes' ? this.currentValues.map((value) => `"${value}"`) : this.currentValues;
  }
}
