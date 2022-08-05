import { msg } from './shared'
import './common.css'

console.log(msg + ' from main.ts ddd')

const $infoBtn = document.querySelector('#infoBtn')
$infoBtn.addEventListener('click', (e)=> {
    console.log('click btn', new Date().toJSON())
})
