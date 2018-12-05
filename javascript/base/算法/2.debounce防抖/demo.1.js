// https://github.com/mqyqingfeng/Blog/issues/22
/**
 * 防抖的原理就是：你尽管触发事件，但是我一定在事件触发 n 秒后才执行，
 * 如果你在一个事件触发的 n 秒内又触发了这个事件，
 * 那我就以新的事件的时间为准，n 秒后才执行，
 * 总之，就是要等你触发完事件 n 秒内不再触发事件，我才执行，真是任性呐!
 */
let count = 0;
let container = document.getElementById('container');
let cancelBtn = document.getElementById('cancel')
function debounce(func, delay, immediate) {
    let timeoutID;
    let debounced = () => {
        let args = [].slice.call(arguments);
        let _this = this;
        if (immediate) {
            func.apply(_this, args);
            immediate = false;
        }
        clearTimeout(timeoutID);//将之前的setTimeout 都清除掉，只保留最后一个       
        timeoutID = setTimeout(() => {
            func.apply(_this, args);
        }, delay)
    }
    debounced.cancel = () => {
        clearTimeout(timeoutID);
        timeoutID = null;
    }
    return debounced;
}
function getUserAction(e) {
    container.innerHTML = ++count;
};
let setUserAction = debounce(getUserAction, 1000, true)
container.addEventListener('mousemove', () => {
    setUserAction();
})
cancelBtn.addEventListener('click', () => {
    setUserAction.cancel();
})