function expensiveOperation(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


function wrapper() {
    let toRun = true;
    let idNameMap = "";
    return () => {
        if (toRun) {
            // here goes a expensive operation.
            expensiveOperation(2000);
            idNameMap = "I got it!";
            toRun = false;
        }
        return idNameMap;
    }
}

let getIdNameMap = wrapper();

// run the following multiple times and note the time difference between first run and the subsequent ones.
let tt = getIdNameMap();
console.log(tt);