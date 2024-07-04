

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon-model';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = environment.apiUrl + 'pokemon';

  constructor(private http: HttpClient) { }

  getPokemons(offset: number = 0, limit: number = 20): Observable<Pokemon[]> {
    return this.http.get<any>(`${this.apiUrl}?offset=${offset}&limit=${limit}`).pipe(
      map(response => response.results),
      switchMap(pokemons => {
        return this.loadPokemonDetails(pokemons);
      })
    );
  }

  // private loadPokemonDetails(pokemons: any[]): Observable<Pokemon[]> {
  //   return new Observable(observer => {
  //     let loadedPokemons: Pokemon[] = [];

  //     pokemons.forEach((pokemon, index) => {
  //       this.http.get<any>(pokemon.url).subscribe(details => {
  //         loadedPokemons.push({
  //           id: details.id, 
  //           name: details.name,
  //           photo: details.sprites.other['dream_world'].front_default,
  //           types: details.types.map((typeInfo: { type: { name: string } }) => typeInfo.type.name),
  //           abilities: details.abilities.map((abilityInfo: { ability: { name: string } }) => abilityInfo.ability.name),
  //           height: details.height,
  //           weight: details.weight,
  //           number: index + 1, 
  //         });

  //         if (loadedPokemons.length === pokemons.length) {
  //           observer.next(loadedPokemons);
  //           observer.complete();
  //         }
  //       });
  //     });
  //   });
  // }

  // getPokemonDetails(id: number): Observable<Pokemon> {
  //   return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
  //     map(details => ({
  //       id: details.id,
  //       name: details.name,
  //       photo: details.sprites.other['dream_world'].front_default,
  //       types: details.types.map((typeInfo: { type: { name: string } }) => typeInfo.type.name),
  //       abilities: details.abilities.map((abilityInfo: { ability: { name: string } }) => abilityInfo.ability.name),
  //       height: details.height/10,
  //       weight: details.weight/10,
  //       number: details.order,
  //     }))
  //   );
  // }

private loadPokemonDetails(pokemons: any[]): Observable<Pokemon[]> {
  return new Observable(observer => {
    let loadedPokemons: Pokemon[] = [];

    pokemons.forEach((pokemon, index) => {
      this.http.get<any>(pokemon.url).subscribe(details => {
        this.http.get<any>(details.species.url).subscribe(species => {
          let stats = details.stats.map((statInfo: { base_stat: number, stat: { name: string } }) => ({
            name: statInfo.stat.name,
            base_stat: statInfo.base_stat
          }));

          loadedPokemons.push({
            id: details.id,
            name: details.name,
            photo: details.sprites.other['dream_world'].front_default,
            types: details.types.map((typeInfo: { type: { name: string } }) => typeInfo.type.name),
            abilities: details.abilities.map((abilityInfo: { ability: { name: string } }) => abilityInfo.ability.name),
            height: details.height,
            weight: details.weight,
            stats: stats,
            number: index + 1,
          });

          if (loadedPokemons.length === pokemons.length) {
            observer.next(loadedPokemons);
            observer.complete();
          }
        });
      });
    });
  });
}

  getPokemonDetails(id: number): Observable<Pokemon> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(details => ({
        id: details.id,
        name: details.name,
        photo: details.sprites.other['dream_world'].front_default,
        types: details.types.map((typeInfo: { type: { name: string } }) => typeInfo.type.name),
        abilities: details.abilities.map((abilityInfo: { ability: { name: string } }) => abilityInfo.ability.name),
        height: details.height / 10, // Convertendo para metros
        weight: details.weight / 10, // Convertendo para quilogramas
        number: details.order,
        stats: details.stats.map((statInfo: { base_stat: number, stat: { name: string } }) => ({
          name: statInfo.stat.name,
          base_stat: statInfo.base_stat
        })),
      }))
    );
  }

}
