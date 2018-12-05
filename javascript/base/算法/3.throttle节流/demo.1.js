
const addBtn = document.getElementById('add')
const minusBtn = document.getElementById('minus')
const nameInput = document.getElementById('name')

function throttle(fn, delay) {
    var obj = {
        isThrottle: false,
        id: null
    };
    return () => {
        if(obj.id && !obj.isThrottle) {
            clearInterval(obj.id)
            obj.id = null;
        }
        if (!obj.isThrottle) {
            fn()
            obj.isThrottle = true;
            obj.id = setInterval(function () {
                obj.isThrottle = false;
            }, delay|| 1000)
        }
    }
}

addBtn.addEventListener('click', throttle(() => {
    nameInput.value = +(nameInput.value) + 1;
}, 1000 * 3))

minusBtn.addEventListener('click', throttle(() => {
    nameInput.value = +(nameInput.value) - 1;
}, 1000 * 3))