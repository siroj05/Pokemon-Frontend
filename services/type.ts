export type ListPokemonModel = {
    count : number
    next : string
    previous : string | null
    results : PokemonModel[]
}

export type PokemonModel = {
    colors : string
    id : number
    image : string
    name : string
    url : string
}

export type pokemonListType =  {
  count : number,
  next : string,
  previous : string | null
  results : results[]
}

export type results = {
  name : string
  url : string
  image : string
  id : number
  colors : string
}

export type detailPokemonType = {
  sprites:{
    other:{
      'official-artwork' : {
        front_default : string
        front_shiny : string
      }
    }
  }
  stats : stat[]
  types : typesPokemon[]
  weight : number
  height : number
  species : {
    name : string
    url : string
  }
  color : {
    name : string
  }
  abilities : abilities[]
  genera : genus[]
  flavor_text_entries : flavorTextEntries[]
  evolution_chain : {
    name : string
    url : string
    image : string
  }
}

export type genus = {
  genus : string
  language : {
    name : string
    url : string
  }
}

export type flavorTextEntries = {
  flavor_text : string
  language : {
    name : string
    url : string
  }
  version : {
    name : string
    url : string
  }
}

export type typesPokemon = {
  slot : number
    type : {
      name : string
      url : string
  }
}

export type stat = {
  base_stat : number
    stat : {
      name : string
      url : string
    }
}

export type abilities = {
  ability : {
    name : string
  }
}