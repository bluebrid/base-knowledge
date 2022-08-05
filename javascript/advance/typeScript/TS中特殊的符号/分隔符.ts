const sayHello = (name: string | undefined) => {
    console.log(name.split(''))
};

function identity<T, U>(value: T, message: U): T {
    console.log(message);
    return value;
}

console.log(identity(68, "Semlinker"));