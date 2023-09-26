const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxPokemons = 151
const limit = 10
let offset = 0;


function convertPokemonLi(pokemon) {
  return `
      <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                
            </ol>

            <img src="${pokemon.photo}"
                alt="${pokemon.name}">

        </div>
      </li>
    `
}



function loadPokemonItem(offset, limit) {

  pokeapi.getPokemons(offset, limit).then((pokemons = []) => {

    const newHTML = pokemons.map(convertPokemonLi).join('')
    pokemonList.innerHTML += newHTML


    //pokemonList.innerHTML += pokemons.map(convertPokemonLi).join('')


    // const newList = pokemons.map(pokemon => {
    //   return convertPokemonLi(pokemon)
    // })

    // const newHTML = newList.join('')

    // pokemonList.innerHTML += newHTML




    // const listaItem = [] 
    // for (let index = 0; index < pokemons.length; index++) {
    //   const pokemon = pokemons[index];
    //   listaItem.push(convertPokemonLi(pokemon))

    // }
    // console.log(listaItem)
  })

}

loadPokemonItem(offset, limit)

loadMoreButton.addEventListener('click', () => {
  offset += limit
  qtdMaxPage = offset + limit;
  if (qtdMaxPage >= maxPokemons) {
    const newLimit = maxPokemons - qtdMaxPage;
    loadPokemonItem(offset, newLimit)

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
    loadPokemonItem(offset, limit);
  }
})
