type NonNullableType = string | number | null | undefined;
type MyNonNullable<T> = T & {}
function showType11(args: MyNonNullable<NonNullableType>) {
    console.log(args);
}

showType11('test');
// Output: "test"

showType11(1);
// Output: 1

showType11(null);
// Error: Argument of type 'null' is not assignable to parameter of type 'string | number'.

showType11(undefined);
// Error: Argument of type 'undefined' is not assignable to parameter of type 'string | number'.