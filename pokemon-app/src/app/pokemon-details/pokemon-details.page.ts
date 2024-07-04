import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon-model';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
})
export class PokemonDetailsPage implements OnInit {
  pokemonId!: number;
  pokemonDetails: Pokemon | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeapiService: PokemonService
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== null) {
      this.pokemonId = +id;
      this.loadPokemonDetails();
    } else {
      console.error('Erro ao buscar detalhes do Pokémon.');
    }
  }

  loadPokemonDetails() {
    this.pokeapiService.getPokemonDetails(this.pokemonId).subscribe(
      (data: Pokemon) => {
        this.pokemonDetails = data;
      },
      (error) => {
        console.error('Error fetching Pokemon details:', error);
      }
    );
  }

  getBackgroundColor(type: string): string {
    // Lógica para determinar a cor de fundo com base no tipo de Pokémon
    const typeColors: { [key: string]: string } = {
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
    return typeColors[type] || '#A8A878'; // Retorna uma cor padrão se o tipo não for encontrado
  }
}
