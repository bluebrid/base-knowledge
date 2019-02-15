/**
 * 按照设定的时间固定执行一次函数，比如200ms一次。
 * 注意：固定就是你在mousemove过程中，执行这个节流函数，
 * 它一定是200ms（你设定的定时器延迟时间）内执行一次。没到200ms，一定会返回，没有执行回调函数的。
 * 主要应用场景有：scroll、touchmove
 */
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