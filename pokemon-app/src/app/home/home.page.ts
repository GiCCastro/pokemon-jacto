import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  searchTerm: string = '';
  selectedType: string | null = null;
  pokemonTypes: string[] = [];
  limit: number = 20; 
  offset: number = 0;

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons(event?: any) {
    this.pokemonService.getPokemons(this.offset, this.limit).subscribe(data => {
      this.pokemons = data;
      this.filteredPokemons = this.pokemons;

      this.pokemons.sort((a, b) => a.id - b.id);

      this.pokemonTypes = this.extractPokemonTypes(data);

      if (event) {
        event.target.complete();
      }
    });
  }

  loadMorePokemons() {
    this.offset += this.limit;
    this.loadPokemons();
  }

  filterPokemons() {
    this.filteredPokemons = this.pokemons.filter(pokemon => {
      const matchesSearch = pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType = !this.selectedType || pokemon.types.includes(this.selectedType);
      return matchesSearch && matchesType;
    });
  }

  viewPokemonDetails(pokemon: Pokemon) {
    this.router.navigate(['/pokemon-details', pokemon.id]);
  }

  getBackgroundColor(type: string): string {
    const colors: { [key: string]: string } = {
      normal: '#a6a877',
      grass: '#77c850',
      fire: '#ee7f30',
      water: '#678fee',
      electric: '#f7cf2e',
      ice: '#98d5d7',
      ground: '#dfbf69',
      flying: '#a98ff0',
      poison: '#a040a0',
      fighting: '#bf3029',
      psychic: '#f65687',
      dark: '#725847',
      rock: '#b8a137',
      bug: '#a8b720',
      ghost: '#6e5896',
      steel: '#b9b7cf',
      dragon: '#6f38f6',
      fairy: '#f9acc7',
    };
    return colors[type] || '#fff';
  }

  private extractPokemonTypes(pokemons: Pokemon[]): string[] {
    const typesSet = new Set<string>();
    pokemons.forEach(pokemon => {
      pokemon.types.forEach(type => typesSet.add(type));
    });
    return Array.from(typesSet);
  }
}


