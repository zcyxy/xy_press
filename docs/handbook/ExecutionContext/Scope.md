## 作用域链

当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做 **作用域链** 。

作用域链，是由当前环境与上层环境的一系列变量对象组成，它保证了当前执行环境对符合访问权限的变量和函数的有序访问。

JavaScript采用的是 **词法作用域** ，函数的作用域基于 **函数创建的位置**

```js

var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar();

// 打印 1

```

函数有一个内部属性 **[[scope]]** ，当函数创建的时候，就会保存所有父变量对象到其中，可以理解 **[[scope]]** 就是所有父变量对象的层级链，但是注意： **[[scope]]** 并不代表完整的作用域链

当函数激活时，进入函数上下文，创建 VO/AO 后，就会将活动对象添加到作用链的前端。  
这时候执行上下文的作用域链，我们命名为 Scope：  
Scope = [AO].concat([[Scope]]);  
至此，作用域链创建完毕。

```js

var scope = "global scope";
function checkscope(){
    var scope2 = 'local scope';
    return scope2;
}
checkscope();

// 执行过程如下：
// 1.checkscope 函数被创建，保存作用域链到 内部属性[[scope]]

checkscope.[[scope]] = [
    globalContext.VO
];

// 2.执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 函数执行上下文被压入执行上下文栈

ECStack = [
    checkscopeContext,
    globalContext
];

// 3.checkscope 函数并不立刻执行，开始做准备工作，第一步：复制函数[[scope]]属性创建作用域链

checkscopeContext = {
    Scope: checkscope.[[scope]],
}

// 4.第二步：用 arguments 创建活动对象，随后初始化活动对象，加入形参、函数声明、变量声明

checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: undefined
    }，
    Scope: checkscope.[[scope]],
}

// 5.第三步：将活动对象压入 checkscope 作用域链顶端

checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: undefined
    },
    Scope: [AO, [[Scope]]]
}

// 6.准备工作做完，开始执行函数，随着函数的执行，修改 AO 的属性值

checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: 'local scope'
    },
    Scope: [AO, [[Scope]]]
}

// 7.查找到 scope2 的值，返回后函数执行完毕，函数上下文从执行上下文栈中弹出

ECStack = [
    globalContext
];

```