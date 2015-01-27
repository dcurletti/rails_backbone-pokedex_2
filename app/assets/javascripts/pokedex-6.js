Pokedex.Router = Backbone.Router.extend({
  routes: {
    rootURL: "pokemon"
  },

  pokemonDetail: function (id, callback) {
  },

  pokemonIndex: function (callback) {
  },

  toyDetail: function (pokemonId, toyId) {
  },

  pokemonForm: function () {
  }
});


$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});
