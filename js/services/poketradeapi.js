const urlPokeTradeAPI = "https://poketradeapi-lucastenorio.herokuapp.com/api/trade/";
const urlPokeAPI = "https://pokeapi.co/api/v2/pokemon/";

let headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

function makeTrade(pokeRequest) {
  const obj = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(pokeRequest)
  };

  return fetch(urlPokeTradeAPI.concat('MakeTrade'), obj)
  .then(response => response.json());
}

function getHistory() {
  return fetch(urlPokeTradeAPI.concat('GetTradeHistory'))
    .then(response => response.json())
}

function getPokemonInfo(name) {
  return fetch(urlPokeAPI.concat(name))
    .then(response => response.json())
    .then(data => {
      foundPokemon = {
        id: data.id,
        name: data.name,
        exp: data.base_experience
      };
      return foundPokemon;
    });
}

function getAllPokemonsFromPokeApi() {
  const promises = [];

  for (i = 1; i <= 150; i++){
    promises.push(fetch(urlPokeAPI.concat(i)).then(response => response.json()));
  }

  return promises;
}