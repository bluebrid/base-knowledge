import { observable, computed, spy } from './.build.es6/mobx'
const addBtn = document.getElementById('add')
const minusBtn = document.getElementById('minus')
const incomeLabel = document.getElementById('incomeLabel')
const nameInput = document.getElementById('name');
const bankUser = observable({
    name: 'Ivan Fan',
    income: 3,
    debit: 2
});

var incomeLabelText = computed(() =>
    `${bankUser.name} income is ${bankUser.income}`
);

incomeLabelText.observe(change =>
    incomeLabel.innerText = change.newValue
);

incomeLabel.innerText = incomeLabelText.value

addBtn.addEventListener('click', () => {
    bankUser.income++
})

minusBtn.addEventListener('click', () => {
    bankUser.income--
})

nameInput.addEventListener('change', (e) => {
    bankUser.name = e.target.value;
})

spy((event) => {
    console.log(`${event.name} with args: ${event.arguments}`)
    // if (event.type === 'action') {
    //     console.log(`${event.name} with args: ${event.arguments}`)
    // }
})