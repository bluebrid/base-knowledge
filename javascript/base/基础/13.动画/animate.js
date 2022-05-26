function animate({
    targets,
    timing,
    draw,
    duration,
    delay
}) {
    let targetElement = document.querySelector(targets)
    let instance = {}
    let start;
    let timeFraction
    let isRestart = false
    let isPause = false
    instance.isDone = false
    let pauseTime;
    if (delay) {
        setTimeout(() => {
            start = performance.now();
            step()
        }, delay)
    } else {
        start = performance.now();
        step()
    }
    function step() {
        instance.rid = requestAnimationFrame(function animate(time) {
            // time 是开始触发回调函数的当前时间
            // timeFraction goes from 0 to 1
            // (time - start)这一次的触发和一开始的出发时间的间隔
            // timeFraction 计算时间已经完成的百分比
            if (isRestart) {
                isRestart = false
                duration = (time - pauseTime) + duration
            }
            timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            // calculate the current animation state
            let progress = timing(timeFraction);

            draw(progress, targetElement); // draw it

            if (timeFraction < 1) { // 如果时间没有百分百的完成，则继续递归调用
                instance.rid = requestAnimationFrame(animate);
            } else {
                instance.isDone = true
            }

        });
    }
    instance.pause = function () {
        if (!isPause) {
            isPause = true
            cancelAnimationFrame(instance.rid)
            pauseTime = performance.now()
        }
    }
    instance.reStart = function () {
        if (isPause) {
            isRestart = true
            isPause = false
            step()
        }

    }
    return instance
}
