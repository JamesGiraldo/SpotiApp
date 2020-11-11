import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient ) { }

  getQuery( query: string){
    
    const url = `https://api.spotify.com/v1/${ query }`;
    const headers = new HttpHeaders({
        'Authorization': 'Bearer BQBaWigeBWRbeN4JHSnMmvts3ZmeVf4JuBkaiFCc5DhEKv_7F6WF5ODQFRotVLfQgW3uKzaMTz6GQiSxEkCzFzysbIwxb6TzxV1sabC0-3Z3DlKIiv77T02xK4vyTZhQ_CzA1i2n23mSVDk0Eu6N5kDnZ4_PXPk'
    });
    return this.http.get(url, { headers });
  }

  getNewReleases(){
    return this.getQuery('browse/new-releases?limit=20')
                .pipe( map( (data: any) => {
                    return data.albums.items;
                }));
  }

  getArtistas( termino: string){
    return this.getQuery(`search?q=${ termino }&type=artist&limit=20`)
               .pipe( map( (data: any) => data.artists.items));
  }

  getArtista( id: string){
    return this.getQuery(`artists/${ id }`);
               // .pipe( map( (data: any) => data.artists.items));
  }

  getTopTracks( id: string){
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
               .pipe( map( (data: any) => data.tracks));
  }

}
