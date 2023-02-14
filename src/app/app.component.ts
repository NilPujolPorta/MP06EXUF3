import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MP06EXUF3';
  imageSize: string = "15";
  limit: string = "12";
  page: string = "1";
  artworks: any[][] = [];
  staticArtworks: any[][] = [];
  async ngOnInit() {
    this.imageSize = "15";
    this.limit = "12";
    this.page = "1"
    await this.getArtworks();
    await this.getStaticArtworks();
  }

  async getArtworks() {
    let obres: any[][] = []
    await fetch("https://api.artic.edu/api/v1/artworks?page=" + this.page + "&limit" + this.limit)
      .then(response => response.text())
      .then(data => JSON.parse(data).data.forEach((row: { id: any; title: any; image_id: any; artist_id: any; birth: any; death: any; }) => {
        obres.push([row.id, row.title, row.image_id, row.artist_id])
      }))
      .catch(error => console.error(error));
    this.artworks = obres;
    this.showArtworks();
  }
  async getStaticArtworks() {
    let obres: any[][] = []
    await fetch("https://api.artic.edu/api/v1/artworks?page=1&limit12")
      .then(response => response.text())
      .then(data => JSON.parse(data).data.forEach(async (row: { id: any; title: any; image_id: any; artist_id: any; birth: any; death: any; }) => {
        row.image_id = "https://www.artic.edu/iiif/2/" + row.image_id + "/full/" + this.imageSize + ",/0/default.jpg";
        await fetch("https://api.artic.edu/api/v1/artists/" + row.artist_id)
          .then(response => response.text())
          .then(data => row.artist_id = JSON.parse(data).data.birth_date + " - " + JSON.parse(data).data.death_date + "-" + JSON.parse(data).data.title)
          .catch(error => console.error(error));
        console.log(row.artist_id)
        row.birth = row.artist_id.split("-")[0] == null ? "" : row.artist_id.split("-")[0];
        row.death = row.artist_id.split("-")[1] == null ? "" : row.artist_id.split("-")[1];;
        row.artist_id = row.artist_id.split("-")[2];
        obres.push([row.id, row.title, row.image_id, row.artist_id, row.artist_id, row.birth, row.death])
      }))
      .catch(error => console.error(error));
    this.staticArtworks = obres;
  }
  showArtworks() {
    this.artworks.forEach((row: any[]) => {
      if (row[2] == null) {
        row[2] = "";
      } else {
        row[2] = "https://www.artic.edu/iiif/2/" + row[2] + "/full/15,/0/default.jpg";
      }

      let artist_id = row[3];
      let artist = "https://www.artic.edu/artists/" + artist_id;
    });
  }
}
