const pokeapi = {}

function convertPokeApiDetailsToPokemon(pokemonsDetails){
    const pokemon = new Pokemon();
    pokemon.number = pokemonsDetails.id
    pokemon.name = pokemonsDetails.name
    
    const types = pokemonsDetails.types.map((typeSlot) => typeSlot.type.name)
    const  [type] = types

    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokemonsDetails.sprites.other.dream_world.front_default

    return pokemon
}

pokeapi.getDetails = (pokemon) => {
    return fetch(pokemon.url).then((response) => response.json())
    .then(convertPokeApiDetailsToPokemon)
}

pokeapi.getPokemons = (offset = 0, limit = 5) =>{
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeapi.getDetails))
        .then((detailsRequest) => Promise.all(detailsRequest))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.error(error))
}

