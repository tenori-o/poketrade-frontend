$(document).ready(() => {
  $('#maketrade').click(() => {
    if (validateTradeItems()) {
       makePokemonTrade();
    }
  });
});

function validateTradeItems() {
  let valid = true;

  const player1Length = $('#player1').children().length;
  const player2Length = $('#player2').children().length;

  if (player1Length <= 0 && player2Length <= 0) {
    alert('Both players has no pokemons to trade')
    valid = false;
  } else {
    if (player1Length <= 0) {
      alert('Player 1 has no pokemons to trade')
      valid = false;
    }
    if (player2Length <= 0) {
      alert('Player 2 has no pokemons to trade')
      valid = false;
    }
  }
  
  return valid;
}

function makePokemonTrade() {
  let pokeReq = createPokemonRequest();

  makeTrade(pokeReq).then(data => {
    if (data)
      alert('The trading was succeded');
    else {
      alert('Error while making the trade: ');
    }
    getPokemonTradeHistory();
  }).catch(error => {
    alert("Could not make the trading operation: " + error);
  });
}

function createPokemonRequest() {
  let pokemonReq = {
    PokemonsP1: [],
    BaseExperienceP1: 0,
    PokemonsP2: [],
    BaseExperienceP2: 0
  };

  let player1 = $('#player1').children();
  let player2 = $('#player2').children();

  let infoP1 = mapInfoForPlayer(player1);
  let infoP2 = mapInfoForPlayer(player2);

  pokemonReq.PokemonsP1 = infoP1.Pokemons;
  pokemonReq.BaseExperienceP1 = infoP1.BaseExperience;

  pokemonReq.PokemonsP2 = infoP2.Pokemons;
  pokemonReq.BaseExperienceP2 = infoP2.BaseExperience;

  return pokemonReq;
}

function mapInfoForPlayer(list) {
  let player = {
    Pokemons: [],
    BaseExperience: 0
  };

  for (let index = 0; index < list.length; index++) {
    const div = $(list[index]).children()[1];
    const pName = $($(div).children()[0]).html();
    const baseExp = $($($(div).children()[1]).children()[0]).html()

    player.Pokemons.push(pName);
    player.BaseExperience += parseInt(baseExp);
  }

  return player;
}