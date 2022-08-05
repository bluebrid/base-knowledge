type NonNullableType = string | number | null | undefined;

function showType(args: NonNullable<NonNullableType>) {
    console.log(args);
}

showType('test');
// Output: "test"

showType(1);
// Output: 1

showType(null);
// Error: Argument of type 'null' is not assignable to parameter of type 'string | number'.

showType(undefined);
// Error: Argument of type 'undefined' is not assignable to parameter of type 'string | number'.