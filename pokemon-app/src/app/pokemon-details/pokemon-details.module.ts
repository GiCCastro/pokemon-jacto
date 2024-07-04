// pokemon-details.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PokemonDetailsPage } from './pokemon-details.page';

@NgModule({
  declarations: [PokemonDetailsPage],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: PokemonDetailsPage
      }
    ])
  ]
})
export class PokemonDetailsPageModule {}
