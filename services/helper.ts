import { api } from "./api";

export async function getPokemonExtra(id: number) {
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const { data } = await api.get(`/pokemon-species/${id}`);

  return {
    image,
    colors: data.color.name,
  };
}

export function formatString(str : string) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function formatFirstLetter(str? : string){
  if(str){
    return str
    .charAt(0)
    .toUpperCase() + str.slice(1)
  }else{
    return ''
  }
}

export function formattedText(str:string){
  return str.replace(/[\n\f]/g, ' ')
}

export function typeColor(str : string){
  switch(str.toLowerCase()){
    case 'normal' : return 'color-normal text-white'
    case 'fire' : return 'color-fire text-white'
    case 'water' : return 'color-water text-white'
    case 'electric' : return 'color-electric text-white'
    case 'grass' : return 'color-grass text-white'
    case 'ice' : return 'color-ice text-white'
    case 'fighting' : return 'color-fighting text-white'
    case 'poison' : return 'color-poison text-white'
    case 'ground' : return 'color-ground text-white'
    case 'flying' : return 'color-flying text-white'
    case 'psychic' : return 'color-psychic text-white'
    case 'bug' : return 'color-bug text-white'
    case 'rock' : return 'color-rock text-white'
    case 'ghost' : return 'color-ghost text-white'
    case 'dragon' : return 'color-dragon text-white'
    case 'dark' : return 'color-dark text-white'
    case 'steel' : return 'color-steel text-white'
    case 'fairy' : return 'color-fairy text-white'
    default : return 'bg-white text-black'
  }
}

export function getAllSpecies(chain:any) {
  const speciesList = []
  if (chain?.species) {
    speciesList.push(chain.species)
  }
  chain.evolves_to.forEach((evolution:any) => {
    speciesList.push(...getAllSpecies(evolution))
  });
  return speciesList;
}

export function convertGramToKilogram(grams?:number) {
  if(grams)return grams / 10
  else return 0
}

export function convertToMeter(value?:number){
  if(value) return value/10
  else return 0
}