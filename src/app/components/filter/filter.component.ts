import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Filter } from 'src/app/interfaces/filter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnChanges {
  @Input() label: string = "";
  @Input() data: any;
  @Input() parentFilters: Filter[] = [];
  @Input() prop: any;
  @Output() filterEmitter: EventEmitter<any> = new EventEmitter<any>();

  filterValues: string[] = [];
  currentValues: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.filterValues = this.getUniqueFilterValues();
    if (changes["parentFilters"] && this.parentFilters.length === 0) {
      this.currentValues = [];
    }
  }
  
  onSelectChange(e: MatSelectChange): void {
    this.currentValues = e.value;
    this.sendFilterToParent();
  }
  
  sendFilterToParent(): void {
    this.filterEmitter.emit(this.createFilter());
  }

  createFilter(): Filter {
    return {
      label: this.label,
      values: this.currentValues,
      ckanLabel: this.prop
    }
  }
    
  getUniqueFilterValues(): string[] {
    return [...new Set(this.data.flatMap((item:any) => item[this.prop]))] as string[];
  }
}