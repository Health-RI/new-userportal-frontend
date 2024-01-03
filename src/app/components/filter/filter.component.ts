import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnChanges {
  @Input() label:any;
  @Input() data: any;
  @Input() parentFilters: any;
  @Input() prop: any;
  @Output() filterEmitter: EventEmitter<any> = new EventEmitter<any>();

  filterValues: string[] = [];
  currentValues: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.filterValues = this.getUniqueFilterValues();
    if (changes["parentFilters"] && Object.keys(this.parentFilters).length === 0) {
      this.currentValues = [];
    }
  }
  
  onSelectChange(e:any){
    this.currentValues = e.value;
    this.sendFilterToParent({
      [this.prop]: e.value
    })
  }
  
  sendFilterToParent(filter:any): void {
    this.filterEmitter.emit(filter);
  }
    
  getUniqueFilterValues(): string[] {
    return [...new Set(this.data.flatMap((item:any) => item[this.prop]))] as string[];
  }
}