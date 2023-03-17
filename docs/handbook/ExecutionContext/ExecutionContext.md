## 执行上下文

当执行到一个函数的时候，就会进行准备工作，这里的“准备工作”，就叫做"**执行上下文(execution context)**"

JavaScript 中有三种执行上下文类型：

1. **全局执行上下文**
2. **函数执行上下文**
3. Eval 函数执行上下文

## 执行上下文栈

JavaScript 引擎创建了 **执行上下文栈（Execution context stack，ECS）** 来管理执行上下文

当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出

对于每个执行上下文，都有三个重要属性：

1. **变量对象(Variable object，VO)**
2. **作用域链(Scope chain)**
3. **this**

![执行上下文](https://gitee.com/xyzcy/blog/raw/master/src/assets/img/2.executionContext.jpg)