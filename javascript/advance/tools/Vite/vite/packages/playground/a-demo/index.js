// import testHTML, { attributes } from "./test.md";
const color = '12'
console.log('1111111111dddd==>', color)

const a = 1;
const b = 2;
const c = 3;

console.log(a,b,c);

const $infoBtn = document.querySelector('#infoBtn')
$infoBtn.addEventListener('click', (e)=> {
    console.log('click btn:info', new Date().toJSON())
})

const $errorBtn = document.querySelector('#errorBtn')
$errorBtn.addEventListener('click', (e)=> {
    console.error('click btn:error', new Date().toJSON())
})
// document.title = attributes.title;
// document.querySelector("#markdown").innerHTML = testHTML;


