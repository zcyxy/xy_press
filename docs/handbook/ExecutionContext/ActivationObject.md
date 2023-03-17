## 变量对象

变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明

1. 全局上下文下中的变量对象就是全局对象
2. 函数上下文中，用 **活动对象(activation object, AO)** 来表示变量对象。

---

执行上下文的代码会分成两个阶段进行处理：分析和执行，我们也可以叫做：

1. 进入执行上下文
2. 代码执行（顺序执行代码，根据代码，修改变量对象的值）

---

进入执行上下文

变量对象会包括：

1. 函数的 **所有形参** (如果是函数上下文)  

	由名称和对应值组成的一个变量对象的属性被创建  
		
	没有实参，属性值设为 undefined

2. **函数声明**  

	由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建  
	
	如果变量对象已经存在相同名称的属性，则 **完全替换这个属性**
	
3. **变量声明**
	
	由名称和对应值（undefined）组成一个变量对象的属性被创建；
	
	如果变量名称跟已经声明的形式参数或函数相同，则变量声明 **不会干扰已经存在的这类属性**
	
```js

// demo01：
function foo(a) {
  var b = 2;
  function c() {}
  var d = function() {};

  b = 3;

}

foo(1);

// 进入执行上下文后
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: undefined,
    c: reference to function c(){},
    d: undefined
}

// 代码执行
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: 3,
    c: reference to function c(){},
    d: reference to FunctionExpression "d"
}



// demo02：
console.log(foo);
function foo(){
    console.log("foo");
}
var foo = 1;

/* 先进行函数提升、变量提升。由于变量声明，变量名称跟已经声明的形式参数或函数相同
所以不会干扰已经存在的属性，所以打印函数 */



// demo03：
console.log(a)
console.log(p())
if(true){
    var a = 12
    function p() {
        console.log('林一一')
    }
}
// undefined
// Uncaught TypeError: p is not a function

/* 全局下不管条件是否成立都会对带 var, function 进行变量提升，所以输出的 a 是 undefined。
JS 还没对条件语句进行判断，同样 p 也是undefined 相当于 undefined() 所以会报错 */



// demo04：
var a = 10;
(function a(){
    console.log(a)
    a = 20
    console.log(a)
})()

/* 首先在全局环境下，var 声明的变量 a 会变量提升，
但是非匿名函数不会在全局环境下变量提升因为具备自己的作用域了，
而且上面的函数名 a 同样变量提升了，值就是函数 a 的应用地址值，
输出的结果就是a(){a = 20 console.log(a)}。
而且非匿名自执行函数名是不可以修改的，即使修改了也不会有任何作用，
严格模式下还会报错，所以最后输出的 a 还是 a(){a = 20 console.log(a)} */

```

## 暂时性死区

ES6 新增的 **let**、**const** 关键字声明的变量会产生块级作用域，如果变量在当前作用域中被创建之前被创建出来，由于此时还未完成语法绑定，如果我们访问或使用该变量，就会产生暂时性死区的问题