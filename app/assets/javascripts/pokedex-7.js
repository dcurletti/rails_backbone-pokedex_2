Pokedex.Views = (Pokedex.Views || {});

Pokedex.Views.PokemonForm = Backbone.View.extend({

  initialize: function(model, collection) {
    this.model = model;
    this.collection = collection;
  },

  events: {
    "submit form" : "savePokemon"
  },

  render: function () {
    this.$el.append(JST["pokemonForm"]());
    return this;
  },


  savePokemon: function (event) {
    event.preventDefault();

    var that = this;
    var data = ($(event.currentTarget).serializeJSON())['pokemon'];
    // debugger;
    var pokemon = new Pokedex.Models.Pokemon(data);

    pokemon.save(data, {
      success: (function() {
        that.collection.push(pokemon);
        Backbone.history.navigate("pokemon/" + pokemon.get("id"), {trigger: true});
        // this.pokes.add(pokemon);
        // this.addPokemonToList(pokemon);
        // callback && callback.call(this, pokemon);
      }).bind(this)
    });


  }
});
