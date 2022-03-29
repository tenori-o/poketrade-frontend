window.onload = function () {
  /* Custom Dragula JS */
  dragula([
    document.getElementById("player1"),
    document.getElementById("player2"),
    document.getElementById("trash")
  ])
    .on("drag", function(el) {
      el.className.replace("ex-moved", "");
    })
    .on("drop", function(el) {
      el.className += "ex-moved";
    })
    .on("over", function(el, container) {
      container.className.replace("ex-over", "ex-over");
    })
    .on("out", function(el, container) {
      container.className.replace("ex-over", "");
    });

}

function addTask() {
  if ($('#player1').children().length < 6) {
    var pokemonName = $('#taskText').val().toLowerCase();
    if (!validateText(pokemonName))
      alert('A pokemon name must be informed')
    else
      addPokemon(pokemonName)
  } else
    alert('Max number of pokemons per player is 6')
}

function validateText(value) {
  if(typeof value == "undefined" || value  == '' || value == null)
    return false;
  return true;
}

function addPokemon(pokemonName) {
  getPokemonInfo(pokemonName).then(data => {
    renderPokemonItem(data);
  }).catch(error => {
    alert("Pokemon not found or unavailable server");
  });
}

function renderPokemonItem(data) {
  let img = $('<img class="pokeImg">');
  let div = $('<div>');

  img.attr("src",`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`);

  div.append($('<p class="pokeName">').text(data.name))
                      .append($('<p>').html('BaseExp:').append($('<span class="pokeExp">').html(data.exp)));

  let li = $('<li class="task">');
  li.append(img);
  li.append(div);

  if (!$('#flexSwitchCheckDefault').is(":checked"))
    $('#player1').append(li)
  else
    $('#player2').append(li)
  
  $('#taskText').val("");
}

function clearPlayerLists() {
  $('#player1').empty();
  $('#player2').empty();
}

/* Vanilla JS to delete tasks in 'Trash' column */  
function emptyTrash() {
  document.getElementById("trash").innerHTML = "";
}

$(document).ready(() => {
  $("#flexSwitchCheckDefault").change(function() {
    if(!this.checked)
      $('#labelCheckBox').html('Player 1')
    else
      $('#labelCheckBox').html('Player 2')
  });

  $('#add').click(() => {
    addTask()
  })
});