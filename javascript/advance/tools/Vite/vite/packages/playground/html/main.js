import { msg } from './shared'
import './common.css'

console.log(msg + ' from main.js   qq')

// eslint-disable-next-line no-undef
const $errorBtn = document.querySelector('#errorBtn')
$errorBtn.addEventListener('click', (e)=> {
    console.error('click btn', new Date().toJSON())
})

