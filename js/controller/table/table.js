$(document).ready(() => {
  getPokemonTradeHistory();
});

function getPokemonTradeHistory() {
  // fetch data from api
  getHistory().then(data => {
    // clear table
    $('#tradeHistory tbody').empty();

    // show each item in a new column to da table
    addItensToTable(data);
  });
}

function addItensToTable(trades) {
  trades.forEach(trade => {
    let newRow = $('<tr>'); 
    newRow.append($('<td>').html(trade.pokemonsP1.join(', ')));
    newRow.append($('<td>').html(trade.baseExperienceP1));
    newRow.append($('<td>').html(trade.pokemonsP2.join(', ')));
    newRow.append($('<td>').html(trade.baseExperienceP2));
    newRow.append($('<td>').html(trade.status));

    $('#tradeHistory').append(newRow)
  });
  
}