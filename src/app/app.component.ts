import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MP06EXUF3';
  imageSize: string = "200";
  ngOnInit() {
    let artworks = this.getArtworks();
    artworks.forEach((row: any[]) => {
      let id = row[0];
      let title = row[1];
      let image_id = row[2];
      let artist_id = row[3];
      let image = "https://www.artic.edu/iiif/2/" + image_id + "/full/" + this.imageSize + ",/0/default.jpg";
      let artist = "https://www.artic.edu/artists/" + artist_id;
      //let html = "<div class='card' style='width: 18rem;'><img src='" + image + "' class='card-img-top' alt='...'><div class='card-body'><h5 class='card-title'>" + title + "</h5><p class='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p><a href='" + link + "' class='btn btn-primary'>Go somewhere</a></div></div>";
      //document.getElementById("artworks")!.innerHTML += html;
      document.write("<table><tr><td><img src='" + image + "'></td><td>" + artist_id + "</td><td>" + title + "</td></tr></table>");
    });
  }

  getArtworks() {
    let obres: any[][] = []
    fetch("https://api.artic.edu/api/v1/artworks?page=1&limit=2")
      .then(response => response.text())
      .then(data => JSON.parse(data).data.forEach((row: { id: any; title: any; image_id: any; artist_id: any; }) => {
        obres.push([row.id, row.title, row.image_id, row.artist_id])
      }))
      .catch(error => console.error(error));
    return obres
  }
}
