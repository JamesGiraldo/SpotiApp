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
        'Authorization': 'Bearer BQCLWh13rt2noUIRurpzMoFv55GUT9q3AEPvDXEMF9EOd_xkvTSal9rCYkKcL9jht_uihpQIzrb7LZz5meCrm50ur3JDvSE2uYMgFTW4FdglpAUicjFwaQZCIdkuqQeqxmXbBy34VLdsG_oRU2JiztI2yRs3tRw'
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
