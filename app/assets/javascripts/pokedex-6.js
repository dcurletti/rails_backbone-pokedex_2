Pokedex.Router = Backbone.Router.extend({
  routes: {
    "": "pokemonIndex",
    "pokemon/:id": "pokemonDetail",
    "pokemon/:pokemonId/toys/:toyId": "toyDetail"
  },

  pokemonDetail: function (id, callback) {
    var that = this;

    if (!this._pokemonIndex) {
      this.pokemonIndex( function() {
        that.pokemonDetail(id, callback);
      })
    }

    var pokemon = this._pokemonIndex.collection.get(id)
    var detailView = new Pokedex.Views.PokemonDetail(pokemon);
    var pokeDiv = $("#pokedex .pokemon-detail");
    pokeDiv.html(detailView.refreshPokemon(callback).$el);
    this._pokemonDetail = detailView;
  },

  pokemonIndex: function (callback) {
    var indexView = new Pokedex.Views.PokemonIndex({ model: new Pokedex.Models.Pokemon });
    indexView.refreshPokemon(callback);
    $("#pokedex .pokemon-list").html(indexView.$el);

    this._pokemonIndex = indexView;

    this.pokemonForm();
  },

  toyDetail: function (pokemonId, toyId) {
    if (!this._pokemonDetail) {
      this.pokemonDetail(pokemonId, function() {
        that.toyDetail(pokemonId, toyId);
      })
    }

    var toy = this._pokemonIndex.collection.get(pokemonId).toys().get(toyId);
    var pokes = this._pokemonIndex;

    var toyDetail = new Pokedex.Views.ToyDetail(toy, pokes);
    var toyDiv = $("#pokedex .toy-detail")
    toyDiv.html(toyDetail.render().$el);

  },

  pokemonForm: function () {
    var pokes = this._pokemonIndex.collection;
    var model = Pokedex.Models.Pokemon;
    var formView = new Pokedex.Views.PokemonForm(model, pokes);
    var formDiv = $(".pokemon-form");
    // debugger;
    formDiv.append(formView.render().$el);


  },

  // _swapView: function (newView) {
  //   if (this.currentView) {
  //     this.currentView.remove();
  //   }
  //
  //   $("body").html(newView.render().$el);
  //
  //   this.currentView = newView;
  // }

});


$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});
