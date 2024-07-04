
export interface Pokemon {
    id: number;
    name: string;
    photo: string;
    types: string[];
    abilities: string[];
    height: number;
    weight: number;
    number: number;
    stats?: { name: string; base_stat: number }[];
  }
  