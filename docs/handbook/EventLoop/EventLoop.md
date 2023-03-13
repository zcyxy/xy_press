# 事件循环

javascript 是一门 <b>单线程语言</b>

1. 同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入 Event Table 并注册函数。

2. 当指定的事情完成时， Event Table 会将这个函数移入 Event Queue。

3. 主线程内的任务执行完毕为空，会去 Event Queue 读取对应的函数，进入主线程执行。

4. 上述过程会不断重复，也就是常说的 <b>Event Loop(事件循环)</b> 。

![](https://gitee.com/xyzcy/blog/raw/master/src/assets/img/4.eventLoop.webp)

1. macro-task (<b>宏任务</b>)：包括整体代码 script ， setTimeout ， setInterval

2. micro-task (<b>微任务</b>)： Promise ， process.nextTick

---

遇到 setTimeout ，那么将其回调函数注册后分发到宏任务 Event Queue。  

遇到 Promise ， new Promise 立即执行， then 函数分发到微任务 Event Queue。

进入整体代码(宏任务)后，开始第一次循环。接着执行所有的微任务。然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务。

![](https://gitee.com/xyzcy/blog/raw/master/src/assets/img/4.eventLoop2.webp)

```javascript

console.log('1');

setTimeout(function() {
    console.log('2');
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})


// 1 7 8 2 4 5 9 11 12

```

# async/await相关

紧跟着 await 后面的语句相当于放到了 new Promise 中，下一行及之后的语句相当于放在 Promise.then 中