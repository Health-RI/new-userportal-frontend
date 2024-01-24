import { Component, OnInit } from '@angular/core';
import { PortalStatistics } from 'src/app/interfaces/portal-statistics';
import { CkanService } from 'src/app/services/ckan.service';

@Component({
  selector: 'app-portal-statistics',
  templateUrl: './portal-statistics.component.html',
  styleUrls: ['./portal-statistics.component.scss'],
})
export class PortalStatisticsComponent implements OnInit {
  portalStatistics!: PortalStatistics;

  constructor(private ckanService: CkanService) {}

  ngOnInit(): void {
    this.ckanService.getPortalStatistics().subscribe((response) => (this.portalStatistics = response));
  }
}
