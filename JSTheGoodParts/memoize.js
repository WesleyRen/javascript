/**
Given a function fn, return a memoized version of that function.

A memoized function is a function that will never be called twice with the same inputs. Instead it will return a cached value.

You can assume there are 3 possible input functions: sum, fib, and factorial.

sum accepts two integers a and b and returns a + b.
fib accepts a single integer n and returns 1 if n <= 1 or fib(n - 1) + fib(n - 2) otherwise.
factorial accepts a single integer n and returns 1 if n <= 1 or factorial(n - 1) * n otherwise.

 * @param {Function} fn
 */
function memoizeSimple(fn) {
    const mem = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (mem[key] !== undefined) {
            return mem[key];
        }
        mem[key] = fn(...args);
        return mem[key];
    }
}


/**
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1
 */


/**
 A more advanced version of above.
 It's like building a trie data structure, with VALUE as an identifier for memoized values, similar to "isWord" for trie.
 * @param {Function} fn
 */
const VALUE = Symbol("value");
function memoize(fn) {
    const mem = new Map();
    return function(...args) {
        let currMap = mem;
        for (let arg of args) {
            if (!currMap.has(arg)) {
                currMap.set(arg, new Map());
            }
            currMap = currMap.get(arg);
        }
        if (currMap.has(VALUE)) {
            return currMap.get(VALUE);
        }

        currMap.set(VALUE, fn(...args));
        return currMap.get(VALUE);
    }
}


/**
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1
 */