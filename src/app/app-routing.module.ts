import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'search-results', component: SearchResultsComponent },
  { path: 'item-details/:id', component: ItemDetailsComponent },
  { path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
