Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    "click li": "selectPokemonFromList"
  },

  initialize: function () {
    this.collection = new Pokedex.Collections.Pokemon({ model: Pokedex.Models.Pokemon });
    this.refreshPokemon();
    // debugger

  },

  addPokemonToList: function (pokemon) {
    this.$el.append(JST["pokemonListItem"]({pokemon: pokemon}));
  },

  refreshPokemon: function (options) {
    this.collection.fetch( {
      success: (function () {
        // console.log(this.collection)
        this.render();
      }).bind(this)
    })
  },

  render: function () {
    this.$el.empty();
    this.collection.each(this.addPokemonToList.bind(this));
  },

  selectPokemonFromList: function (event) {
    console.log(event.currentTarget);

    var $target = $(event.currentTarget);

    var pokeId = $target.data('id');
    var pokemon = this.collection.get(pokeId);

    // JST["pokemonDetail"]({pokemon: pokemon});

    // this.renderPokemonDetail(pokemon);
    console.log(pokemon);
    var pokemonDetail = new Pokedex.Views.PokemonDetail(pokemon);

    var temp = $("#pokedex .pokemon-detail");
    temp.html(pokemonDetail.$el);
    pokemonDetail.refreshPokemon();
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({

  events: {
    "click li": "selectToyFromList"
  },

  initialize: function (options) {
    this.pokemon = options;
  },

  refreshPokemon: function (options) {
    this.pokemon.fetch({
      success: (function() {
        this.render();
      }).bind(this)
    })
  },

  render: function () {
    var that = this;
    this.$el.append(JST["pokemonDetail"]({pokemon: this.pokemon}));
    this.pokemon.toys().forEach( function (toy) {
      that.$el.append(JST["toyListItem"]({toy: toy}));
    })
  },

  selectToyFromList: function (event) {
    var $target = $(event.currentTarget);
    var toyId = $target.data('id');
    var toy = this.pokemon.toys().get(toyId)
    var toyDetail = new Pokedex.Views.ToyDetail(toy);

    $("#pokedex .toy-detail").html(toyDetail);
    toyDetail.render();
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  initialize: function (toy) {
    this.toy = toy;
    debugger;
  },

  render: function () {
    var pokes = new Pokedex.Collection.Pokemon();
    this.$el.append(JST["toyDetail"]({toy: that.toy, pokes: pokes}));
  }
});


// $(function () {
//   var pokemonIndex = new Pokedex.Views.PokemonIndex({ model: Pokedex.Models.Pokemon });
//   pokemonIndex.refreshPokemon();
//   $("#pokedex .pokemon-list").html(pokemonIndex.$el);
// });
