function myFunc(maybeString: string | undefined | null) {
    // Type 'string | null | undefined' is not assignable to type 'string'.
    // Type 'undefined' is not assignable to type 'string'. 
    const onlyString: string = maybeString; // Error
    const ignoreUndefinedAndNull: string = maybeString!; // Ok
    console.log(onlyString, ignoreUndefinedAndNull)
}

myFunc('11111')
myFunc(undefined)

type NumGenerator = () => number;

function myFunc1(numGenerator: NumGenerator | undefined) {
  // Object is possibly 'undefined'.(2532)
  // Cannot invoke an object which is possibly 'undefined'.(2722)
  // const num1 = numGenerator(); // Error
  const num2 = numGenerator!(); //OK
}
myFunc1(undefined)