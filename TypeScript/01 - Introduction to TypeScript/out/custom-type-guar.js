"use strict";
function isNonEmptyStringArray(arg) {
    return (Array.isArray(arg) && // check if argument is array
        arg.length >= 1 && // check if array is empty
        arg.every((el) => typeof el === "string") // check if array includes only strings
    );
}
let arr = { test: "one" };
if (isNonEmptyStringArray(arr)) {
    console.log(arr.length); // allowed
}
//# sourceMappingURL=custom-type-guar.js.map