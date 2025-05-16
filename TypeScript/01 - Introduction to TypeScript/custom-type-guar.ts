function isNonEmptyStringArray(arg: unknown): arg is string[] {
  return (
    Array.isArray(arg) && // check if argument is array
    arg.length >= 1 && // check if array is empty
    arg.every((el) => typeof el === "string") // check if array includes only strings
  );
}

let arr: unknown = { test: "one" };
if (isNonEmptyStringArray(arr)) {
  console.log(arr.length); // allowed
}
