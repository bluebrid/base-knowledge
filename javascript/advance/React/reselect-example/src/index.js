
const subtotalSelectorBtn = document.getElementById('subtotalSelector')
const subtotalSelectorValue = document.getElementById('subtotalSelectorValue')
const taxSelectorBtn = document.getElementById('taxSelector')
const taxSelectorValue = document.getElementById('taxSelectorValue')
const totalSelectorBtn = document.getElementById('totalSelector')
const totalSelectorValue = document.getElementById('totalSelectorValue')
/**
 * Basic example for the reselect library
 * @see https://github.com/reactjs/reselect
 */

const {
    createSelector
} = require('./reselect.js');

// const shopItemsSelector = state => state.shop.items
// const taxPercentSelector = state => state.shop.taxPercent

const shopItemsSelector = state => {
    console.log('shopItemsSelector')
    return state.shop.items
}
const taxPercentSelector = state => {
    console.log('taxPercentSelector')
    return state.shop.taxPercent
}

const subtotalSelector = createSelector(
    shopItemsSelector,
    items => items.reduce((acc, item) => acc + item.value, 0)
)

const taxSelector = createSelector(
    subtotalSelector,
    taxPercentSelector,
    (subtotal, taxPercent) => subtotal * (taxPercent / 100)
)

const totalSelector = createSelector(
    subtotalSelector,
    taxSelector,
    (subtotal, tax) => ({ total: subtotal + tax })
)

let exampleState = {
    shop: {
        taxPercent: 8,
        items: [
            { name: 'apple', value: 1.20 },
            { name: 'orange', value: 0.95 },
        ]
    }
}

subtotalSelectorBtn.addEventListener('click', ()=> {
    subtotalSelectorValue.innerText = subtotalSelector(exampleState)
    exampleState.shop.items[0].value = 1.3
})
taxSelectorBtn.addEventListener('click', () => {
    taxSelectorValue.innerText = taxSelector(exampleState)
    exampleState.shop.items[1].value = 0.96
})


totalSelectorBtn.addEventListener('click', () => {
    // console.log(totalSelector(exampleState))    // { total: 2.322 }
    totalSelectorValue.innerText = JSON.stringify(totalSelector(exampleState))
})


