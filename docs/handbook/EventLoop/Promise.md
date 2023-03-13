# Promise

1. <b>then( )</b> 方法，用来指定 <b>resolve</b> 的回调

2. <b>catch( )</b> 方法，用来指定 <b>reject</b> 的回调

3. <b>finally( )</b> 方法，不管 Promise 的状态是 resolve( ) 还是 reject( ) 都会执行，且它的回调函数接收不到 Promise 的结果  


4. <b>Promise.all( )</b> 接收一个数组参数，里面的值最终都算返回 Promise 对象。多个异步操作的并行执行，等到它们都执行完后才会进到 then 里面。

5. <b>Promise.race( )</b> all( ) 效果实际上是「谁跑的慢，以谁为准执行回调」，那么相对的就有另一个方法「谁跑的快，以谁为准执行回调」

---

红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯？（用 Promse 实现）

```javascript

function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}

function fn(color, time) {
    return new Promise(resolve=>{
        setTimeout(()=>{
            color()
            resolve()
        },time)
    })
}

let f2 = () => {
    fn(red,3000).then(()=>{
        return fn(green,1000)
    })
    .then(()=>{
        return fn(yellow,2000)
    })
    .then(()=>{
        f2()
    })
}

f2()

```