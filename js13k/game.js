var GameObject = {
    // abstract
    update: function () {},
    draw: function () {},

    // properties
    x: 0, y: 0,
    visible: true,
    // solid: false,
    parent: null,

    // methods
    create: function (x, y) {
        that = new object somehow;
        that.x = x;
        that.y = y;
        return that;
    },
    move: function (dx, dy) {},
    play: function (sound) {},
    destroy: function () {},

    collides: function (obj, callback) {},
}

// schrijf eerst wat objecten helemaal uit, pak dan similarities op handige wijze

// ---------------------------------------------------------------------------
// constructor with prototype
//
// Q: inheritance?
//

function Car( model, year, miles ) {

  this.model = model;
  this.year = year;
  this.miles = miles;

}


// Note here that we are using Object.prototype.newMethod rather than
// Object.prototype so as to avoid redefining the prototype object
Car.prototype.toString = function () {
  return this.model + " has done " + this.miles + " miles";
};

// Usage:

var civic = new Car( "Honda Civic", 2009, 20000 );
var mondeo = new Car( "Ford Mondeo", 2010, 5000 );

console.log( civic.toString() );
console.log( mondeo.toString() );

// ---------------------------------------------------------------------------
// prototype pattern 1
//

var vehicle = {
  getModel: function () {
    console.log( "The model of this vehicle is.." + this.model );
  }
};

var car = Object.create(vehicle, {

  "id": {
    value: MY_GLOBAL.nextId(),
    // writable:false, configurable:false by default
    enumerable: true
  },

  "model": {
    value: "Ford",
    enumerable: true
  }

});

// ---------------------------------------------------------------------------
// prototype pattern 2 / beget
//

var beget = (function () {

    function F() {}

    return function ( proto ) {
        F.prototype = proto;
        return new F();
    };
})();

// ---------------------------------------------------------------------------
// Mixin: INHERITANCE
//

var Person = function( firstName, lastName ){

  this.firstName = firstName;
  this.lastName = lastName;
  this.gender = "male";

};
