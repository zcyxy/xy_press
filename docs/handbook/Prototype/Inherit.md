## 继承

**Object.create()**

该方法用于创建一个新对象，并为其指定原型对象和属性。

1. 语法 : **Object.create(prototype, description)**
2. proto :（必须），表示新建对象的原型对象，即该参数会被赋值到目标对象（即新对象）的原型上。该参数可以是 null ，对象等。
3. description :（可选），添加到新创建对象的可枚举属性。（是其自身的属性，而不是原型链上的枚举属性）

---

**Object.assign()**

将一个或多个源对象的值复制到目标对象上。

1. 语法 : **Object.assign(target, ...source)**
2. target : 目标对象
3. source : 源对象

```js

function Parent (name) {
    this.name = name
    this.face = 'cry'
    this.colors = ['white', 'black']
}
Parent.prototype.features = ['cute']
Parent.prototype.getFeatures = function () {
    console.log(this.features)
}
function Child(name) {
    Parent.call(this, name)
    this.sex = 'boy'
    this.face = 'smile'
}
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

var child1 = new Child('child1')
child1.colors.push('yellow')
var child2 = new Child('child2')
child2.features = ['sunshine']
// 给child2对象上新增了一个名为features属性，所以这时候child2取的就是它自身的了

console.log(child1)
console.log(child2)
child1.getFeatures()
child2.getFeatures()

/*

{
    name: 'child1',
    face: 'smile',
    colors: ['white', 'black', 'yellow'],
    sex: 'boy',
    [[prototype]]: {
        constructor: Child,
        [[prototype]] {
            features: ['cute'],
            getFeatures: function () {
                console.log(this.features)
            }
        }
    }
}

{
    name: 'child2',
    face: 'smile',
    colors: ['white', 'black'],
    sex: 'boy',
    features: ['sunshine'],
    [[prototype]]: {
        constructor: Child,
        [[prototype]] {
            features: ['cute'],
            getFeatures: function () {
                console.log(this.features)
            }
        }
    }
}

['cute']
['sunshine']

*/

```

## class继承

ES6 中的继承：

1. 主要是依赖 **extends** 关键字来实现继承，且继承的效果类似于寄生组合继承

2. 使用了 **extends** 实现继承不一定要 **constructor** 和 **super** ，因为没有的话会默认产生并调用它们

3. **extends** 后面接着的目标不一定是 **class** ，只要是个有 **prototype** 属性的函数就可以了

---

super 相关：

1. 在实现继承时，如果子类中有 **constructor** 函数，必须得在 **constructor** 中调用一下 **super** 函数，因为它就是用来产生实例 **this** 的。

2. **super** 有两种调用方式：当成函数调用和当成对象来调用。

3. **super** 当成函数调用时，代表父类的构造函数，且返回的是子类的实例，也就是此时 **super** 内部的 **this** 指向子类。在子类的 **constructor** 中 **super()** 就相当于是 **Parent.constructor.call(this)**。

4. **super** 当成对象调用时，普通函数中 **super** 对象指向父类的原型对象，静态函数中指向父类。且通过 **super** 调用父类的方法时， **super** 会绑定子类的 **this** ，就相当于是 **Parent.prototype.fn.call(this)**。

```js

class Child extends Parent {
    constructor (...args) {
        super(...args)
    }
}

```