Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    "click li": "selectPokemonFromList"
  },

  initialize: function () {
    this.collection = new Pokedex.Collections.Pokemon({ model: Pokedex.Models.Pokemon });
    this.refreshPokemon();

  },

  addPokemonToList: function (pokemon) {
    this.$el.append(JST["pokemonListItem"]({pokemon: pokemon}));
  },

  refreshPokemon: function (callback) {
    this.collection.fetch( {
      success: (function () {
        // console.log(this.collection)
        this.render();
        callback();
      }).bind(this)
    })
  },

  render: function () {
    this.$el.empty();
    this.collection.each(this.addPokemonToList.bind(this));
  },

  selectPokemonFromList: function (event) {
    var $target = $(event.currentTarget);

    var pokeId = $target.data('id');
    var pokemon = this.collection.get(pokeId);

    // var pokemonDetail = new Pokedex.Views.PokemonDetail(pokemon);
    Backbone.history.navigate("pokemon/" + pokeId, {trigger: true})

    // var temp = $("#pokedex .pokemon-detail");
    // temp.html(pokemonDetail.$el);
    // pokemonDetail.refreshPokemon();
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({

  events: {
    "click li": "selectToyFromList"
  },

  initialize: function (options) {
    this.pokemon = options;
  },

  refreshPokemon: function (callback) {
    //error thrown here because this.pokemon is an empty object at first
    this.pokemon.fetch({
      success: (function() {
        this.render();
        if (callback) {callback()};
      }).bind(this)
    })
    return this;
  },

  render: function () {
    var that = this;
    this.$el.append(JST["pokemonDetail"]({pokemon: this.pokemon}));
    this.pokemon.toys().forEach( function (toy) {
      that.$el.append(JST["toyListItem"]({toy: toy}));
    })
    return this;
  },

  selectToyFromList: function (event) {
    var $target = $(event.currentTarget);
    var toyId = $target.data('id');
    var toy = this.pokemon.toys().get(toyId)
    // var toyDetail = new Pokedex.Views.ToyDetail(toy);
    Backbone.history.navigate("pokemon/" + this.pokemon.get("id") + "/toys/" + toyId, {trigger: true})

    // $("#pokedex .toy-detail").html(toyDetail);
    // toyDetail.render();
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  initialize: function (toy, pokes) {
    this.toy = toy;
    this.pokes = pokes;
  },

  render: function () {
    var pokes = this.pokes.collection;
    this.$el.append(JST["toyDetail"]({toy: this.toy, pokes: pokes}));
    return this;
  }
});


// $(function () {
//   var pokemonIndex = new Pokedex.Views.PokemonIndex({ model: Pokedex.Models.Pokemon });
//   pokemonIndex.refreshPokemon();
//   $("#pokedex .pokemon-list").html(pokemonIndex.$el);
// });
