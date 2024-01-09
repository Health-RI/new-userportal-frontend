import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { PartialDataset } from 'src/app/interfaces/dataset';
import { Filter } from 'src/app/interfaces/filter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnChanges {
  @Input() label!: string;
  @Input() data!: PartialDataset[];
  @Input() parentFilters!: Filter[];
  @Input() prop!: keyof PartialDataset;
  @Output() filterEmitter: EventEmitter<Filter> = new EventEmitter<Filter>();

  filterValues: string[] = [];
  currentValues: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.filterValues = this.getUniqueFilterValues();
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
      values: this.currentValues,
      ckanLabel: this.prop,
    };
  }

  private getUniqueFilterValues(): string[] {
    return [
      ...new Set(
        this.data
          .filter((item: PartialDataset) => !!item[this.prop])
          .flatMap((item: PartialDataset) => item[this.prop])
      ),
    ].sort() as string[];
  }
}
