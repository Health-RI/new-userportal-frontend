// SPDX-FileCopyrightText: 2024 Stichting Health-RI
// SPDX-FileContributor: PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailsComponent } from './dataset-details.component';

describe('ItemDetailsComponent', () => {
  let component: ItemDetailsComponent;
  let fixture: ComponentFixture<ItemDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemDetailsComponent],
    });
    fixture = TestBed.createComponent(ItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
