"use strict";
function convertArray(words) {
    const text = words.join("");
    return [text, text.length];
}
console.log(convertArray(["How", "are", "you?"]));
console.log(convertArray(["Today", " is", " a ", "nice", " ", "day for ", "TypeScript"]));
//# sourceMappingURL=convert-arrays.js.map