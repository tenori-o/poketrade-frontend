$(document).ready(() => {
  getAllPokemons();
});

function getAllPokemons() {
  let promises = getAllPokemonsFromPokeApi();
  Promise.all(promises)
  .then(pokemons => {
    createCards(pokemons);
  });
}

function createCards(pokemons) {
  let container = $('#pokemonContainer');
  let row;

  let countController = 0;


  for (let index = 0; index < pokemons.length; index++) {
    const pokemon = pokemons[index];

    if (countController == 0) {
      container.append(row);
      row = $('<div class="row">');
      countController = 3;
    }

    let card = $('<div class="card">');
      card.append($(`<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" class="card-img-top" alt="${pokemon.name}">`));
      
      let cardBody = $('<div class="card-body">');
        cardBody.append($('<h5 class="card-text">').html(pokemon.name));
      
        let description = $('<p class="card-text">');
        description.append('Base Exp: ');
        description.append($('<span style="font-weight: 700;">').html(pokemon.base_experience));
      
      cardBody.append(description);
    card.append(cardBody);

    row.append($('<div class="col">').append(card));

    countController--;    
  }
}