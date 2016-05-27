var eventuality = function(that) {
    var registry = {};
    that.fire = function(event) {
        var type = typeof event === 'string' ? event : event.type;
        console.log('fire(): fired on event, "' + type + '"');

        if(registry.hasOwnProperty(type)) {
            var array = registry[type];
            for(var i = 0; i < array.length; ++i) {
                var handler = array[i];
                console.log('fire(): handler found at loop ' + i);
                var func = handler.method;
                var pars = handler.parameters;
                if(typeof func === 'string') {
                    console.log('fire(): the found func is a string');
                    func = this[func];  // ???
                }
                else {
                    // Invoke the handler with parameters.
                    console.log('fire(): the found method is NOT a string');
                    func.apply(this, [pars]);
                }
            }
        }
        return this;
    };

    that.on = function(type, method, parameters) {
        // Register an event. Make a handler record. Put it in a handler array, making
        // one if it doesn't yet exist for this type.
        var handler = {
            method: method,
            parameters: parameters
        };
        if(registry.hasOwnProperty(type)) {
            // If already registered:
            registry[type].push(handler);
        }
        else {
            // If it's first time:
            console.log('on(): "' + type + '" event registered');
            registry[type] = [handler];
        }
        return this;
    }

    return that;
};

var dog_is_hungry = {
    type: 'is_hungry'
};
var dog_needs_to_poo = {
    type: 'needs_to_poo'
};
var dog_methods = {
    feed: function() 
    {
        console.log('Event processed by the handler, dog_methods.feed(): ');
        for(var i = 0; i < arguments.length; ++i) {
            console.log('    Feed the dog with the "' + arguments[i].food + '"');
        } 
    },
    walk: function() {
        console.log('Event processed by the handler, dog_methods.walk(): ');
        for(var i = 0; i < arguments.length; ++i) {
            console.log('    Walk the dog to the "' + arguments[i].place + '"');
        }
    }
};
var myDog = {
    name: 'Lucky',
    age:  2
}

var myDogEHM = eventuality(myDog);  // EHM - events handling manager
console.log('My dog is named ' + myDogEHM.name);
console.log('My dog is aged ' + myDogEHM.age);

// Register the event-handlers
myDogEHM.on(dog_is_hungry.type, dog_methods.feed, {food:'rice and meat'});
myDogEHM.on(dog_needs_to_poo.type, dog_methods.walk, {place:'park'});

// Events to be handled
myDogEHM.fire(dog_is_hungry);
myDogEHM.fire(dog_needs_to_poo);