document.writeln("HW!");

Function.prototype.method = function (name, func) {
  this.prototype[name] = func;
  return this;
};

var empty_object = {};

var stooge = {
    "first-name": "Jerome",
    "last-name": "Howard"
};
