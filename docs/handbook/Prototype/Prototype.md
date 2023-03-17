## 原型

![prototype](https://gitee.com/xyzcy/blog/raw/master/src/assets/img/1.prototype.png)

1. 每一个构造函数都拥有一个 **prototype** 属性，这个属性指向一个对象，也就是 **原型对象** 。当使用这个构造函数创建实例的时候， **prototype** 属性指向的原型对象就成为实例的原型对象。

2. 原型对象默认拥有一个 **constructor** 属性，指向指向它的那个构造函数（也就是说构造函数和原型对象是互相指向的关系）。

3. 每个对象都拥有一个隐藏的属性 **[[prototype]]** ，指向它的原型对象，这个属性可以通过 **Object.getPrototypeOf(obj)** 或 **obj.\_\_proto\_\_** 来访问。

4. 实际上，构造函数的 **prototype** 属性与它创建的实例对象的 **[[prototype]]** 属性指向的是同一个对象，即 对象 **.\_\_proto\_\_** === **函数.prototype** 。

5. 如上文所述，原型对象就是用来存放实例中共有的那部分属性。

6. 在 JavaScript 中，所有的对象都是由它的原型对象继承而来，反之，所有的对象都可以作为原型对象存在。

7. 访问对象的属性时， JavaScript 会首先在对象自身的属性内查找，若没有找到，则会跳转到该对象的原型对象中查找。