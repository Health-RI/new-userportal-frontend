import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ItemDetailsComponent } from './item-details/item-details.component';

const routes: Routes = [
  { path: 'search-results', component: SearchResultsComponent },
  { path: 'item-details/:id', component: ItemDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
