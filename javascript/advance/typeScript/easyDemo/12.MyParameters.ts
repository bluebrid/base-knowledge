type MyParameters<T> = T extends (...args: infer P) => any ? P : never

type funcDemoType = (name: string, age: number) => void

type funcDemoParam = MyParameters<funcDemoType>
const funcDemo = function (parms: funcDemoParam) : void{
    console.log(...parms)
}

funcDemo(['ivan', 11])