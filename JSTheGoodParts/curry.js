/*
From LeetCode.com
Given a function fn, return a curried version of that function.

A curried function is a function that accepts fewer or an equal number of parameters as the original function and returns either another curried function or the same value the original function would have returned.

In practical terms, if you called the original function like sum(1,2,3), you would call the curried version like csum(1)(2)(3), csum(1)(2,3), csum(1,2)(3), or csum(1,2,3). All these methods of calling the curried function should return the same value as the original.

 * @param {Function} fn
 * @return {Function}
 */
var curry = function(fn) {
    let args = [];
    return function curried(...newArgus) {
        args = [...args, ...newArgus];
        if (args.length === fn.length) {
            return fn(...args);
        }
        return curried;
    };
};

function sum(a, b) { return a + b; }
const curriedSum = curry(sum);
let curryText = "Curry can be done in two ways, wrapped in a function, or Function.prototype.\n" + "curry 1: " + curriedSum(1)(2) // 3


 /**
 From the book.
 We can also add curry to Function prototype, as
 */

 Function.method('curry', function () {
    let slice = Array.prototype.slice,
        args = slice.apply(arguments),
        that = this;

    return function() {
        return that.apply(null, args.concat(slice.apply(arguments)));
    }

 });

 // Now we can have this
 let add1 = add.curry(1);
 curryText = curryText + "\n"+ "curry 2: " + add1(6);
 document.getElementById("curry").innerHTML = curryText;