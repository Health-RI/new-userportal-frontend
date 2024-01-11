import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalStatisticsComponent } from './portal-statistics.component';

describe('PortalStatisticsComponent', () => {
  let component: PortalStatisticsComponent;
  let fixture: ComponentFixture<PortalStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortalStatisticsComponent],
    });
    fixture = TestBed.createComponent(PortalStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
