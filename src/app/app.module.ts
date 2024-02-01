// SPDX-FileCopyrightText: 2024 Stichting Health-RI
// SPDX-FileContributor: PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SearchComponent } from './components/search/search.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { CkanService } from './services/ckan.service';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ItemDetailsComponent } from './components/dataset-details/dataset-details.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { FilterComponent } from './components/filter/filter.component';
import { PortalStatisticsComponent } from './components/portal-statistics/portal-statistics.component';
import { AuthConfigModule } from './auth/auth-config.module';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchResultsComponent,
    ItemDetailsComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    PortalStatisticsComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatGridListModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    MatMenuModule,
    MatChipsModule,
    AuthConfigModule,
  ],
  providers: [
    CkanService,
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'dd MMMM YYYY' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
