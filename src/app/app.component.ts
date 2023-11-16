import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  onSearch(searchValue: string): void {
    console.log('Search:', searchValue);
    // Implement your search logic here, like calling a service
  }
}
