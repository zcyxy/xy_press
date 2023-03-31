## 防抖

**防抖**：任务频繁触发的情况下，只有任务触发的间隔超过指定间隔的时候，任务才会执行。

```js

function debounce(func, wait) {
    let timeout = null
    let _this = this
    let arg = arguments
    return function() {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            func.apply(_this, arg)
        }, wait)
    }
}

```

## 节流

**节流**：指定时间间隔内只会执行一次任务。

```js

function throttle(func, wait) {
    let timeout = null
    let _this = this
    let arg = arguments
    return function() {
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null
                func.apply(_this, arg)
            }, wait)
        }
    }
}

```