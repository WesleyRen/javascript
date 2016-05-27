document.writeln("HW!");
document.writeln("Object Literal!");
/**
 * Throughout the book, a method method is used to define new methods. This is its definition:
 */
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

/**
 * object literals
 */
var empty_object = {};
var stooge = {
    "first-name": "Jerome",
    "last-name": "Howard"
};

var flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2004-09-22 14:55",
        city: "Sydney"
    },
    arrival: {
        IATA: "LAX",
        time: "2004-09-23 10:42",
        city: "Los Angeles"
    }
};

/**
 * prototype:
 *   We will add a "create" method to the Object function. 
 *   The beget method creates a new object that uses an old object as its prototype. 
 *   There will be much more about functions in the next chapter.
 */

if (typeof Object.create !== 'function') {
     Object.create = function (o) {
         var F = function () {};
         F.prototype = o;
         return new F();
     };
}
var another_stooge = Object.create(stooge);
document.writeln("another_stooge is " + another_stooge["first-name"]);

var Stooge1 = function() {};
Stooge1.prototype.name = {
    "first-name": "Jerome",
    "last-name": "Howard"
};
var another_stooge_1 = new Stooge1;
document.writeln("another_stooge_1 is " + another_stooge_1.name["first-name"]);

stooge.profession = 'actor';
document.writeln("another_stooge.profession is " + another_stooge.profession);

another_stooge.profession = 'Haha';
document.writeln("another_stooge.profession is " + another_stooge.profession);
document.writeln("stooge.profession is " + stooge.profession);
var stooge3 = function () {};
stooge3.prototype = another_stooge;
document.writeln("stooge3.profession is " + stooge3.profession);
document.writeln("stooge3 is " + stooge3["first-name"]);

stooge3.prototype = stooge;
document.writeln("stooge3.profession is " + stooge3.profession);
document.writeln("stooge3 is " + stooge3["first-name"]);
/**
 *  reflection
 *    typeof
 *      typeof flight.number      // 'number'
 *    hasOwnProperty
 *      flight.hasOwnProperty('number')         // true
 */

/**
 *  3.9. Global Abatement
 *  One way to minimize the use of global variables is to create a single global variable for your application:
 */
var MYAPP = {};

// That variable then becomes the container for your application:

MYAPP.stooge = {
    "first-name": "Joe",
    "last-name": "Howard"
};

MYAPP.flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2004-09-22 14:55",
        city: "Sydney"
    },
    arrival: {
        IATA: "LAX",
        time: "2004-09-23 10:42",
        city: "Los Angeles"
    }
};

/**
 * Function literal
 *   A function literal has four parts. 
 *    The first part is the reserved word function.
 *    The optional second part is the function's name. 
 *        The function can use its name to call itself recursively. The name can also be used by debuggers and development tools to identify the function. If a function is not given a name, as shown in the previous example, it is said to be anonymous.
 *    The third part is the set of parameters of the function, wrapped in parentheses. 
 *        Within the parentheses is a set of zero or more parameter names, separated by commas. These names will be defined as variables in the function. Unlike ordinary variables, instead of being initialized to undefined, they will be initialized to the arguments supplied when the function is invoked.
 *    The fourth part is a set of statements wrapped in curly braces. 
 *        These statements are the body of the function. They are executed when the function is invoked.
 */
// Create a variable called add and store a function
// in it that adds two numbers.

var add = function (a, b) {
    return a + b;
};

// Create myObject. It has a value and an increment
// method. The increment method takes an optional
// parameter. If the argument is not a number, then 1
// is used as the default.

var myObject = {
    value: 0,
    increment: function (inc) {
        this.value += typeof inc === 'number' ? inc : 1;
    }
};

myObject.increment(  );
document.writeln(myObject.value);    // 1

myObject.increment(2);
document.writeln(myObject.value);    // 3

// Augment myObject with a double method.

myObject.double = function (  ) {
    var that = this;    // Workaround.

    var helper = function (  ) {
        that.value = add(that.value, that.value);
    };

    helper(  );    // Invoke helper as a function.
};

// Invoke double as a method.

myObject.double(  );
document.writeln(myObject.value);     // 6 

// Create a constructor function called Quo.
// It makes an object with a status property.

var Quo = function (string) {
    this.status = string;
};

// Give all instances of Quo a public method
// called get_status.

Quo.prototype.get_status = function (  ) {
    return this.status;
};

// Make an instance of Quo.

var myQuo = new Quo("confused");

document.writeln(myQuo.get_status(  ));  // confused

// Make an array of 2 numbers and add them.

var array = [3, 4];
var sum = add.apply(null, array);    // sum is 7

// Make an object with a status member.

var statusObject = {
    status: 'A-OK'
};

// statusObject does not inherit from Quo.prototype,
// but we can invoke the get_status method on
// statusObject even though statusObject does not have
// a get_status method.

var status = Quo.prototype.get_status.apply(statusObject);
    // status is 'A-OK'

/**
 * Arguments
 * 
 *    A bonus parameter that is available to functions when they are invoked is the arguments array. It gives the function access to all of the arguments that were supplied with the invocation, including excess arguments that were not assigned to parameters. This makes it possible to write functions that take an unspecified number of parameters:
 *    
 *    It is an array-like object. arguments has a length property, but it lacks all of the array methods. 
 */


// Make a function that adds a lot of stuff.

// Note that defining the variable sum inside of
// the function does not interfere with the sum
// defined outside of the function. The function
// only sees the inner one.

var sum = function (  ) {
    var i, sum = 0;
    for (i = 0; i < arguments.length; i += 1) {
        sum += arguments[i];
    }
    return sum;
};

document.writeln(sum(4, 8, 15, 16, 23, 42)); // 108


/**
 * A function always returns a value. If the return value is not specified, then undefined is returned.
 * If the function was invoked with the new prefix and the return value is not an object, then this (the new object) is returned instead.
 */

/**
 * 4.6. Exceptions
 */
var add = function (a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw {
            name: 'TypeError',
            message: 'add needs numbers'
        };
    }
    return a + b;
}

// Make a try_it function that calls the new add
// function incorrectly.

var try_it = function (  ) {
    try {
        add("seven");
    } catch (e) {
        document.writeln(e.name + ': ' + e.message);
    }
}

try_it(  );


/**
 * Augmenting types
 */
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

Number.method('integer', function (  ) {
    return Math[this < 0 ? 'ceil' : 'floor'](this);
});

document.writeln((-10 / 3).integer(  ));  // -3

String.method('trim', function (  ) {
    return this.replace(/^\s+|\s+$/g, '');
});

document.writeln('"' + "   neat   ".trim(  ) + '"');

// Add a method conditionally.

Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
        return this;
    }
};

/**
 * recursion
 */
var hanoi = function hanoi(disc, src, aux, dst) {
    if (disc > 0) {
        hanoi(disc - 1, src, dst, aux);
        document.writeln('Move disc ' + disc +
                ' from ' + src + ' to ' + dst);
        hanoi(disc - 1, aux, src, dst);
    }
};

hanoi(3, 'Src', 'Aux', 'Dst');


// Define a walk_the_DOM function that visits every
// node of the tree in HTML source order, starting
// from some given node. It invokes a function,
// passing it each node in turn. walk_the_DOM calls
// itself to process each of the child nodes.

var walk_the_DOM = function walk(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walk(node, func);
        node = node.nextSibling;
    }
};

// Define a getElementsByAttribute function. It
// takes an attribute name string and an optional
// matching value. It calls walk_the_DOM, passing it a
// function that looks for an attribute name in the
// node. The matching nodes are accumulated in a
// results array.

var getElementsByAttribute = function (att, value) {
    var results = [];

    walk_the_DOM(document.body, function (node) {
        var actual = node.nodeType === 1 && node.getAttribute(att);
        if (typeof actual === 'string' &&
                (actual === value || typeof value !== 'string')) {
            results.push(node);
        }
    });

    return results;
};


// Make a factorial function with tail
// recursion. It is tail recursive because
// it returns the result of calling itself.

// JavaScript does not currently optimize this form.

var factorial = function factorial(i, a) {
    a = a || 1;
    if (i < 2) {
        return a;
    }
    return factorial(i - 1, a * i);
};

document.writeln(factorial(4));    // 24

/**
 * scope
 */
var foo = function (  ) {
    var a = 3, b = 5;

    var bar = function (  ) {
        var b = 7, c = 11;

// At this point, a is 3, b is 7, and c is 11

        a += b + c;

// At this point, a is 21, b is 7, and c is 11

    };

// At this point, a is 3, b is 5, and c is not defined

    bar(  );

// At this point, a is 21, b is 5

};

/**
 * Closure
 */
var myObject = (function () {
    var value = 0;

    return {
        increment: function (inc) {
            value += typeof inc === 'number' ? inc : 1;
        },
        getValue: function (  ) {
            return value;
        }
    };
}());

// Create a maker function called quo. It makes an
// object with a get_status method and a private
// status property.

/**
 * This quo function is designed to be used without the new prefix, 
 * so the name is not capitalized. When we call quo, it returns 
 * a new object containing a get_status method. 
 * A reference to that object is stored in myQuo. 
 * The get_status method still has privileged access to quo's status property 
 * even though quo has already returned. 
 * get_status does not have access to a copy of the parameter; 
 * it has access to the parameter itself. 
 * 
 * This is possible because the function has access to the context in which it was created. 
 * This is called closure.
 */
var quo = function (status) {
    return {
        get_status: function (  ) {
            return status;
        }
    };
};

// Make an instance of quo.

var myQuo = quo("amazed");

document.writeln(myQuo.get_status(  ));


// Define a function that sets a DOM node's color
// to yellow and then fades it to white.

var fade = function (node) {
    var level = 1;
    var step = function (  ) {
        var hex = level.toString(16);
        node.style.backgroundColor = '#FFFF' + hex + hex;
        if (level < 15) {
            level += 1;
            setTimeout(step, 100);
        }
    };
    setTimeout(step, 100);
};

fade(document.body);


// BAD EXAMPLE

// Make a function that assigns event handler functions to an array of nodes the wrong way.
// When you click on a node, an alert box is supposed to display the ordinal of the node.
// But it always displays the number of nodes instead.

var add_the_handlers = function (nodes) {
    var i;
    for (i = 0; i < nodes.length; i += 1) {
        nodes[i].onclick = function (e) {
            alert(i);
        };
    }
};

// END BAD EXAMPLE

// BETTER EXAMPLE

// Make a function that assigns event handler functions to an array of nodes.
// When you click on a node, an alert box will display the ordinal of the node.

var add_the_handlers = function (nodes) {
    var helper = function (i) {
       return function (e) {
          alert(i);
       };
    };
    var i;
    for (i = 0; i < nodes.length; i += 1) {
        modes[i].onclick = helper(i);
    }
};

/**
 * Callbacks
 */
/*
request = prepare_the_request(  );
send_request_asynchronously(request, function (response) {
    display(response);
    });
*/


/**
 * Module
 */
String.method('deentityify', function (  ) {

// The entity table. It maps entity names to
// characters.

    var entity = {
        quot: '"',
        lt:   '<',
        gt:   '>'
    };

// Return the deentityify method.

    return function (  ) {

// This is the deentityify method. It calls the string
// replace method, looking for substrings that start
// with '&' and end with ';'. If the characters in
// between are in the entity table, then replace the
// entity with the character from the table. It uses
// a regular expression (Chapter 7).

        return this.replace(/&([^&;]+);/g,
            function (a, b) {
                var r = entity[b];
                return typeof r === 'string' ? r : a;
            }
        );
    };
}(  ));

document.writeln(
    '&lt;&quot;&gt;'.deentityify(  ));  // <">

//The general pattern of a module is a function that defines private variables and functions; 

var serial_maker = function (  ) {

// Produce an object that produces unique strings. A
// unique string is made up of two parts: a prefix
// and a sequence number. The object comes with
// methods for setting the prefix and sequence
// number, and a gensym method that produces unique
// strings.

    var prefix = '';
    var seq = 0;
    return {
        set_prefix: function (p) {
            prefix = String(p);
        },
        set_seq: function (s) {
            seq = s;
        },
        gensym: function ( ) {
            var result = prefix + seq;
            seq += 1;
            return result;
        }
    };
};
var seqer = serial_maker( );
seqer.set_prefix('Q');
seqer.set_seq(1000);
var unique = seqer.gensym( ); // unique is "Q1000"
var unique = seqer.gensym( ); // unique is "Q1001"

document.writeln(seqer.gensym( ) + " " + seqer.gensym( ));

/**
 * cascade
 */
/*
getElement('myBoxDiv')
    .move(350, 150)
    .width(100)
    .height(100)
    .color('red')
    .border('10px outset')
    .padding('4px')
    .appendText("Please stand by")
    .on('mousedown', function (m) {
        this.startDrag(m, this.getNinth(m));
    })
    .on('mousemove', 'drag')
    .on('mouseup', 'stopDrag')
    .later(2000, function (  ) {
        this
            .color('yellow')
            .setHTML("What hath God wraught?")
            .slide(400, 40, 200, 200);
    })
    .tip("This box is resizeable");

*/

/** 
 * curry
 */
Function.method('curry', function (  ) {
    var slice = Array.prototype.slice,
        args = slice.apply(arguments),
        that = this;
    return function (  ) {
        return that.apply(null, args.concat(slice.apply(arguments)));
    };
});

var add1 = add.curry(1);
document.writeln(add1(6));    // 7

/**
 * Memoization, tail recursion
 */
// This is doing to much work:
var fibonacci = function (n) {
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};


document.writeln('Old style fibonacci:');

var t0 = performance.now();
for (var i = 0; i <= 30; i += 1) {
    document.writeln('// ' + i + ': ' + fibonacci(i));
}
var t1 = performance.now();
document.writeln("30 recursion Execution time: " + Math.round(t1 - t0) + " milliseconds.");

var t0 = performance.now();
for (var i = 0; i <= 38; i += 1) {
    document.writeln('// ' + i + ': ' + fibonacci(i));
}
var t1 = performance.now();
document.writeln("38 recursion Execution time: " + Math.round(t1 - t0) + " milliseconds.");


// This is better
var fibonacci = (function (  ) {
    var memo = [0, 1];
    var fib = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = fib(n - 1) + fib(n - 2);
            memo[n] = result;
        }
        return result;
    };
    return fib;
}( ));

// generize:
var memoizer = function (memo, formula) {
    var recur = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = formula(recur, n);
            memo[n] = result;
        }
        return result;
    };
    return recur;
};

// Now wola
var fibonacci = memoizer([0, 1], function (recur, n) {
    return recur(n - 1) + recur(n - 2);
});

var factorial = memoizer([1, 1], function (recur, n) {
    return n * recur(n - 1);
});


document.writeln('New style fibonacci:');

var t0 = performance.now();
for (var i = 0; i <= 1000; i += 1) {
    if (i <= 20 || i > 980) {
      document.writeln('// ' + i + ': ' + fibonacci(i));
    }
}
var t1 = performance.now();
document.writeln("1000 recursion Execution time: " + Math.round((t1 - t0) * 100)/100 + " milliseconds.");


document.writeln('New style factorial:');
for (var i = 0; i <= 10; i += 1) {
    document.writeln('// ' + i + ': ' + factorial(i));
}

/**
 * Pseudoclassical
 */
Function.method('new', function (  ) {

// Create a new object that inherits from the
// constructor's prototype.

    var that = Object.beget(this.prototype);

// Invoke the constructor, binding -this- to
// the new object.

    var other = this.apply(that, arguments);

// If its return value isn't an object,
// substitute the new object.

    return (typeof other === 'object' && other) || that;
});

// We can define a constructor and augment its prototype:
var Mammal = function (name) {
    this.name = name;
};

Mammal.prototype.get_name = function (  ) {
    return this.name;
};

Mammal.prototype.says = function (  ) {
    return this.saying || '';
};

// Now, we can make an instance:

var myMammal = new Mammal('Herb the Mammal');
var name = myMammal.get_name(  ); // 'Herb the Mammal'

// We can make another pseudoclass that inherits from Mammal by defining its constructor function and replacing its prototype with an instance of Mammal:

var Cat = function (name) {
    this.name = name;
    this.saying = 'meow';
};

// Replace Cat.prototype with a new instance of Mammal
Cat.prototype = new Mammal(  );
document.writeln('cat prototype is ' + Cat.prototype);

var Mm = function () {};
Mm.prototype.type = 'mammal';
var dog = {};
/**
 * different ways and resuls of using Mm.
 */
// Pass by value:
dog = Mm;
document.writeln('1. dog is ' + dog);
dog = {};
document.writeln('2. dog is ' + dog);
document.writeln('Mm is ' + Mm);

dog = Mm();
document.writeln('3.a dog is ' + dog);
dog = new Mm(); // new instance of Mm with Mm as constructor.
document.writeln('3.b dog is ' + dog);
/**
**
*/

// Augment the new prototype with
// purr and get_name methods.

Cat.prototype.purr = function (n) {
    var i, s = '';
    for (i = 0; i < n; i += 1) {
        if (s) {
            s += '-';
        }
        s += 'r';
    }
    return s;
};
Cat.prototype.get_name = function (  ) {
    return this.says(  ) + ' ' + this.name + ' ' + this.says(  );
};

var myCat = new Cat('Henrietta');
var says = myCat.says(  ); // 'meow'
var purr = myCat.purr(5); // 'r-r-r-r-r'
var name = myCat.get_name(  );
//            'meow Henrietta meow'

// The pseudoclassical pattern was intended to look sort of object-oriented, 
// but it is looking quite alien. We can hide some of the ugliness by using the method method and defining an inherits method:

Function.method('inherits', function (Parent) {
    this.prototype = new Parent(  );
    return this;
});

// Our inherits and method methods return this, allowing us to program in a cascade style. We can now make our Cat with one statement.

var Cat = function (name) {
    this.name = name;
    this.saying = 'meow';
}.
    inherits(Mammal).
    method('purr', function (n) {
        var i, s = '';
        for (i = 0; i < n; i += 1) {
            if (s) {
                s += '-';
            }
            s += 'r';
        }
        return s;
    }).
    method('get_name', function (  ) {
        return this.says(  ) + ' ' + this.name + ' ' + this.says(  );
    });

/** 
 * 5.2. Object Specifiers
 */
/*
// instead of
var myObject = maker(f, l, m, c, s);

// we can write:
var myObject = maker({
    first: f,
    last: l,
    middle: m,
    state: s,
    city: c
});
*/


/**
 * 5.3. Prototypal
 */
// Let's start by using an object literal to make a useful object:

var myMammal = {
    name : 'Herb the Mammal',
    get_name : function (  ) {
        return this.name;
    },
    says : function (  ) {
        return this.saying || '';
    }
};

var myCat = Object.create(myMammal);
myCat.name = 'Henrietta';
myCat.saying = 'meow';
myCat.purr = function (n) {
    var i, s = '';
    for (i = 0; i < n; i += 1) {
        if (s) {
            s += '-';
        }
        s += 'r';
    }
    return s;
};
myCat.get_name = function (  ) {
    return this.says() + ' ' + this.name + ' ' + this.says();
};

// The block function is called when a left curly brace is encountered.
var block = function (  ) {

// Remember the current scope. Make a new scope that
// includes everything from the current one.

    var oldScope = scope;
    scope = Object.create(scope);

// Advance past the left curly brace.

    advance('{');

// Parse using the new scope.

    parse(scope);

// Advance past the right curly brace and discard the
// new scope, restoring the old one.

    advance('}');
    scope = oldScope;
};

/**
 * 5.4. Functional
 *     pretend privacy
 *     
We start by making a function that will produce objects. We will give it a name that starts with a lowercase letter because it will not require the use of the new prefix. The function contains four steps:

It creates a new object. There are lots of ways to make an object. It can make an object literal, or it can call a constructor function with the new prefix, or it can use the Object.create method to make a new instance from an existing object, or it can call any function that returns an object.

It optionally defines private instance variables and methods. These are just ordinary vars of the function.

It augments that new object with methods. Those methods will have privileged access to the parameters and the vars defined in the second step.

It returns that new object.

Here is a pseudocode template for a functional constructor (boldface text added for emphasis):

var constructor = function (spec, my) {
    var that, other private instance variables;
    my = my || {};

    Add shared variables and functions to my

    that = a new object;

    Add privileged methods to that

    return that;
};
*/

/** 
 * 5.4 functinal
 */
// The name and saying properties are now completely private. They are accessible only via the privileged get_name and says methods:

var mammal = function (spec) {
    var that = {};

    that.get_name = function (  ) {
        return spec.name;
    };

    that.says = function (  ) {
        return spec.saying || '';
    };

    return that;
};

var myMammal = mammal({name: 'Herb'});

// Cat constructor will call the Mammal constructor, letting Mammal do most of the work of object creation, so Cat only has to concern itself with the differences:

var cat = function (spec) {
    spec.saying = spec.saying || 'meow';
    var that = mammal(spec);
    that.purr = function (n) {
        var i, s = '';
        for (i = 0; i < n; i += 1) {
            if (s) {
                s += '-';
            }
            s += 'r';
        }
        return s;
    };
    that.get_name = function () {
        return that.says() + ' ' + spec.name + ' ' + that.says();
    };
    return that;
};

var myCat = cat({name: 'Henrietta'});

// superior
Object.method('superior', function (name) {
    var that = this,
        method = that[name];
    return function (  ) {
        return method.apply(that, arguments);
    };
});
// example:
var coolcat = function (spec) {
    var that = cat(spec),
        super_get_name = that.superior('get_name');
    that.get_name = function (n) {
        return 'like ' + super_get_name(  ) + ' baby';
    };
    return that;
};

var myCoolCat = coolcat({name: 'Bix'});
var name = myCoolCat.get_name(  );
//        'like meow Bix meow baby'


/**
 * 5.5 Parts
 */
var eventuality = function (that) {
    var registry = {};

    that.fire = function (event) {

// Fire an event on an object. The event can be either
// a string containing the name of the event or an
// object containing a type property containing the
// name of the event. Handlers registered by the 'on'
// method that match the event name will be invoked.

        var array,
            func,
            handler,
            i,
            type = typeof event === 'string' ? event : event.type;

// If an array of handlers exist for this event, then
// loop through it and execute the handlers in order.

        if (registry.hasOwnProperty(type)) {
            array = registry[type];
            for (i = 0; i < array.length; i += 1) {
                handler = array[i];

// A handler record contains a method and an optional
// array of parameters. If the method is a name, look
// up the function.

                func = handler.method;
                if (typeof func === 'string') {
                    func = this[func];
                }

// Invoke a handler. If the record contained
// parameters, then pass them. Otherwise, pass the
// event object.

                func.apply(this,
                    handler.parameters || [event]);
            }
        }
        return this;
    };

    that.on = function (type, method, parameters) {

// Register an event. Make a handler record. Put it
// in a handler array, making one if it doesn't yet
// exist for this type.

        var handler = {
            method: method,
            parameters: parameters
        };
        if (registry.hasOwnProperty(type)) {
            registry[type].push(handler);
        } else {
            registry[type] = [handler];
        }
        return this;
    };
    return that;
};

/**
 * Array:
 *   Enumeration: Unfortunately, "for in" makes no guarantee about the order of the properties
 */

// Our own is_array function:
var is_array = function (value) {
    return value && typeof value === 'object' && value.constructor === Array;
};
// post note: Unfortunately, it fails to identify arrays that were constructed in a different window or frame. 
// If we want to accurately detect those foreign arrays, we have to work a little harder:
var is_array = function (value) {
    return Object.prototype.toString.apply(value) === '[object Array]';
};


/**
 * Method
 */
Array.method('reduce', function (f, value) {
    var i;
    for (i = 0; i < this.length; i += 1) {
        value = f(this[i], value);
    }
    return value;
});
// Create an array of numbers.

var data = [4, 8, 15, 16, 23, 42];

// Define two simple functions. One will add two
// numbers. The other will multiply two numbers.

var add = function (a, b) {
    return a + b;
};

var mult = function (a, b) {
    return a * b;
};

// Invoke the data's reduce method, passing in the
// add function.

var sum = data.reduce(add, 0);    // sum is 108

// Invoke the reduce method again, this time passing
// in the multiply function.

var product = data.reduce(mult, 1);
    // product is 7418880

//Because an array is really an object, we can add methods directly to an individual array:
// Give the data array a total function.

data.total = function (  ) {
    return this.reduce(add, 0);
};

total = data.total(  );    // total is 108


// Dimension
Array.dim = function (dimension, initial) {
    var a = [], i;
    for (i = 0; i < dimension; i += 1) {
        a[i] = initial;
    }
    return a;
};

// Make an array containing 10 zeros.

var myArray = Array.dim(10, 0);

// JavaScript does not have arrays of more than one dimension, but like most C languages, it can have arrays of arrays:

var matrix = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
];
matrix[2][1]    // 7

// To make a two-dimensional array or an array of arrays, you must build the arrays yourself:

for (i = 0; i < 10; i += 1) {
    myArray[i] = [];
}

// Note: Array.dim(n, []) will not work here.
// Each element would get a reference to the same
// array, which would be very bad.

// The cells of an empty matrix will initially have the value undefined. If you want them to have a different initial value, you must explicitly set them. Again, JavaScript should have provided better support for matrixes. We can correct that, too:

Array.matrix = function (m, n, initial) {
    var a, i, j, mat = [];
    for (i = 0; i < m; i += 1) {
        a = [];
        for (j = 0; j < n; j += 1) {
            a[j] = initial;
        }
        mat[i] = a;
    }
    return mat;
};

// Make a 4 * 4 matrix filled with zeros.

var myMatrix = Array.matrix(4, 4, 0);

document.writeln(myMatrix[3][3]);    // 0

// Method to make an identity matrix.

Array.identity = function (n) {
    var i, mat = Array.matrix(n, n, 0);
    for (i = 0; i < n; i += 1) {
        mat[i][i] = 1;
    }
    return mat;
};

myMatrix = Array.identity(4);

document.writeln(myMatrix[3][3]);    // 1

/** 
 * Regular Expression
 */

var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

var url = "http://www.ora.com:80/goodparts?q#fragment";

//Let's call parse_url's exec method. If it successfully matches the string that we pass it, it will return an array containing pieces extracted from the url:

var url = "http://www.ora.com:80/goodparts?q#fragment";

var result = parse_url.exec(url);

var names = ['url', 'scheme', 'slash', 'host', 'port',
    'path', 'query', 'hash'];

var blanks = '       ';
var i;

for (i = 0; i < names.length; i += 1) {
    document.writeln(names[i] + ':' +
        blanks.substring(names[i].length), result[i]);
}

//Let's look at another example: a regular expression that matches numbers. Numbers can have an integer part with an optional minus sign, an optional fractional part, and an optional exponent part.

var parse_number = /^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i;

var test = function (num) {
    document.writeln(parse_number.test(num));
};

test('1');                // true
test('number');           // false
test('98.6');             // true
test('132.21.86.100');    // false
test('123.45E-67');       // true
test('123.45D-67');       // false

// !! Caution:
// RegExp objects made by regular expression literals share a single instance:

function make_a_matcher(  ) {
    return /a/gi;
}

var x = make_a_matcher(  );
var y = make_a_matcher(  );

// Beware: x and y are the same object!

x.lastIndex = 10;

document.writeln(y.lastIndex);    // 10

/**
 * Method
 * Function.apply
 */

Function.method('bind', function (that) {

// Return a function that will call this function as
// though it is a method of that object.

    var method = this,
        slice = Array.prototype.slice,
        args = slice.apply(arguments, [1]);
    return function (  ) {
        return method.apply(that,
            args.concat(slice.apply(arguments, [0])));
    };
});

var x = function (  ) {
    return this.value;
}.bind({value: 666});

document.writeln(x(  )); // 666


document.writeln(Math.PI.toExponential(0));
document.writeln(Math.PI.toExponential(2));
document.writeln(Math.PI.toExponential(7));
document.writeln(Math.PI.toExponential(16));
document.writeln(Math.PI.toExponential(  ));

String.method('entityify', function (  ) {

    var character = {
        '<' : '&lt;',
        '>' : '&gt;',
        '&' : '&amp;',
        '"' : '&quot;'
    };

// Return the string.entityify method, which
// returns the result of calling the replace method.
// Its replaceValue function returns the result of
// looking a character up in an object. This use of
// an object usually outperforms switch statements.

    return function (  ) {
        return this.replace(/[<>&"]/g, function (c) {
            return character[c];
        });
    };
}(  ));

// alert("<&>".entityify(  ));  // &lt;&amp;&gt;

var text = '<html><body bgcolor=linen><p>' +
        'This is <b>bold<\/b>!<\/p><\/body><\/html>';
var tags = /[^<>]+|<(\/?)([A-Za-z]+)([^<>]*)>/g;
var a, i;

a = text.match(tags);
for (i = 0; i < a.length; i += 1) {
    document.writeln(('// [' + i + '] ' + a[i]).entityify(  ));
}

document.writeln(typeof(NaN));
document.writeln(typeof(['a', 'b']));
document.writeln(typeof(/a/));
document.writeln(typeof(false));
document.writeln(typeof(null));
document.writeln(typeof(undefined));

/*
 */