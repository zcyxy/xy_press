# This

<b>this 的指向，是在函数被调用的时候确定的</b>。也就是执行上下文被创建时确定的

在一个函数上下文中， this 由调用者提供，由调用函数的方式来决定。<b>如果调用者函数，被某一个对象所拥有，那么该函数在调用时，内部的 this 指向该对象。如果函数独立调用，那么该函数内部的 this ，则指向 undefined </b>。但是在非严格模式中，当 this 指向 undefined 时，它会被自动指向全局对象。

```javascript

// demo01：
var a = 20;
var foo = {
  a: 10,
  getA: function () {
    return this.a;
  }
}
console.log(foo.getA()); // 10

var test = foo.getA;
console.log(test());  // 20

/* foo.getA() 中， getA 是调用者，他不是独立调用，
被对象 foo 所拥有，因此它的 this 指向了 foo 。
而 test() 作为调用者，尽管他与 foo.getA 的引用相同，
但是它是独立调用的，因此 this 指向 undefined ，
在非严格模式，自动转向全局 window 。 */



// demo02：
var a = 20;
var obj = {
  a: 10,
  c: this.a + 20,
  fn: function () {
    return this.a;
  }
}

console.log(obj.c);  // 40
console.log(obj.fn());  // 10

/* 对象 obj 中的 c 属性使用 this.a + 20 来计算。
这里我们需要明确的一点是，单独的{}不会形成新的作用域，
因此这里的 this.a ，由于并没有作用域的限制，它仍然处于全局作用域之中。
所以这里的 this 其实是指向的 window 对象 */



// demo03：
var name = 'window'
function Person (name) {
  this.name = name
  this.obj = {
    name: 'obj',
    foo1: function () {
      return function () {
        console.log(this.name)
      }
    },
    foo2: function () {
      return () => {
        console.log(this.name)
      }
    }
  }
}
var person1 = new Person('person1')
var person2 = new Person('person2')

person1.obj.foo1()()
person1.obj.foo1.call(person2)()
person1.obj.foo1().call(person2)

person1.obj.foo2()()
person1.obj.foo2.call(person2)()
person1.obj.foo2().call(person2)


// window
// window
// person2

// obj
// person2
// obj

```

如果要判断一个函数的 this 绑定，就需要找到这个函数的直接调用位置。然后可以顺序按照下面四条规则来判断 this 的绑定对象：

1. 由 <b>new</b> 调用：绑定到新创建的对象

2. 由 <b>call 或 apply 、 bind</b> 调用：绑定到指定的对象

3. 由 <b>上下文对象</b> 调用：绑定到上下文对象

4. 默认：全局对象  


5. 注意：<b>箭头函数</b>不使用上面的绑定规则，根据 <b>外层作用域来决定 this</b> ，继承外层函数调用的 this 绑定。（箭头函数的 this 无法通过 bind 、 call 、 apply 来直接修改，会无效）

# call、apply、bind

通过 <b>call</b> 、 <b>apply</b> 或者 <b>bind</b> 方法直接指定 this 的绑定对象

1. 使用 <b>call( )</b> 或者 <b>apply( )</b> 的函数是会直接执行的

2. <b>bind( )</b> 是创建一个新的函数，需要手动调用才会执行

3. <b>call( )</b> 和 <b>apply( )</b> 用法基本类似，不过 <b>call( )</b> 接收若干个参数，而 <b>apply( )</b> 接收的是一个数组

