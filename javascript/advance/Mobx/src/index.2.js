import { observable, computed } from './.build.es6/mobx'
const addBtn = document.getElementById('add')
const minusBtn = document.getElementById('minus')
const incomeLabel = document.getElementById('incomeLabel')
const nameInput = document.getElementById('name');
const bankUser = observable({
    name: 'Ivan Fan',
    income: 3,
    debit: 2
});

var upperCaseName = computed(() =>
    bankUser.name.toUpperCase()
);
upperCaseName.observe(change =>
    incomeLabel.innerText = `${change.newValue} income is ${bankUser.income}`
); 

addBtn.addEventListener('click', () => {
    bankUser.income++
})
minusBtn.addEventListener('click', () => {
    bankUser.income--
})
nameInput.addEventListener('change', (e) => {
    bankUser.name = e.target.value;
})