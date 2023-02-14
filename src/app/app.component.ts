import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MP06EXUF3';
  ngOnInit() {
    fetch("https://api.artic.edu/api/v1/artworks?page=1&limit=1")
      .then(response => response.text())
      .then(data => console.log(JSON.parse(data).data[0].artist_id))
      .catch(error => console.error(error));
  }
}
