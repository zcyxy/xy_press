# 闭包

闭包的定义：

1. 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
2. 在代码中引用了自由变量

```javascript

var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0]();
data[1]();
data[2]();


// 执行到 data[0] 函数之前，此时全局上下文的 VO 为：
globalContext = {
    VO: {
        data: [...],
        i: 3
    }
}

// 当执行 data[0] 函数的时候，data[0] 函数的作用域链为：
data[0]Context = {
    Scope: [AO, globalContext.VO]
}

// data[0]Context 的 AO 并没有 i 值，所以会从 globalContext.VO 中查找，i 为 3，所以打印的结果就是 3
// data[1] 和 data[2] 同理

```

改为闭包：

```javascript

var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = (function (i) {
        return function(){
            console.log(i);
        }
  })(i);
}

data[0]();
data[1]();
data[2]();


// 和之前一样，执行到 data[0] 函数之前，此时全局上下文的 VO 为：
globalContext = {
    VO: {
        data: [...],
        i: 3
    }
}

// 当执行 data[0] 函数的时候，data[0] 函数的作用域链发生了改变：
data[0]Context = {
    Scope: [AO, 匿名函数Context.AO globalContext.VO]
}

// 匿名函数执行上下文的AO为：
匿名函数Context = {
    AO: {
        arguments: {
            0: 0,
            length: 1
        },
        i: 0
    }
}

// data[0]Context 的 AO 并没有 i 值，所以会沿着作用域链从匿名函数 Context.AO 中查找，这时候就会找 i 为 0，找到了就不会往 globalContext.VO 中查找了，即使 globalContext.VO 也有 i 的值(值为3)，所以打印的结果就是0。
// data[1] 和 data[2] 同理

```

# 函数参数传递方式：按值传递

```javascript

// demo01：
var a = 20;

function fn(a) {
    a = a + 10;
    return a;
}
fn(a);
console.log(a); // 20



// demo02
var a = { m: 10, n: 20 }
function fn(a) {
    a.m = 20;
    return a;
}

fn(a);
console.log(a);   // { m: 20, n: 20 }



// demo03
var person = {
    name: 'Nicholas',
    age: 20
}

function setName(obj) {  // 传入一个引用
    obj = {};   // 将传入的引用指向另外的值
    obj.name = 'Greg';  // 修改引用的name属性
}

setName(person);
console.log(person.name);  // Nicholas 未被改变

// 函数参数传递方式：按值传递，只不过当我们期望传递一个引用类型时，真正传递的，只是这个引用类型保存在变量对象中的引用而已。

```