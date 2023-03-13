# 继承

<b>Object.create( )</b>

该方法用于创建一个新对象，并为其指定原型对象和属性。

1. 语法 : <b>Object.create(prototype, description)</b>

2. proto :（必须），表示新建对象的原型对象，即该参数会被赋值到目标对象（即新对象）的原型上。该参数可以是 null ，对象等。

3. description :（可选），添加到新创建对象的可枚举属性。（是其自身的属性，而不是原型链上的枚举属性）

---

<b>Object.assign( )</b>

将一个或多个源对象的值复制到目标对象上。

1. 语法 : <b>Object.assign(target, ...source)</b>
2. target : 目标对象
3. source : 源对象

```javascript

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

# class继承

ES6 中的继承：

1. 主要是依赖 <b>extends</b> 关键字来实现继承，且继承的效果类似于寄生组合继承

2. 使用了 <b>extends</b> 实现继承不一定要 <b>constructor</b> 和 <b>super</b> ，因为没有的话会默认产生并调用它们

3. <b>extends</b> 后面接着的目标不一定是 <b>class</b> ，只要是个有 <b>prototype</b> 属性的函数就可以了

super 相关：

1. 在实现继承时，如果子类中有 <b>constructor</b> 函数，必须得在 <b>constructor</b> 中调用一下 <b>super</b> 函数，因为它就是用来产生实例 <b>this</b> 的。

2. <b>super</b> 有两种调用方式：当成函数调用和当成对象来调用。

3. <b>super</b> 当成函数调用时，代表父类的构造函数，且返回的是子类的实例，也就是此时 <b>super</b> 内部的 <b>this</b> 指向子类。在子类的 <b>constructor</b> 中 <b>super()</b> 就相当于是 <b>Parent.constructor.call(this)</b>。

4. <b>super</b> 当成对象调用时，普通函数中 <b>super</b> 对象指向父类的原型对象，静态函数中指向父类。且通过 <b>super</b> 调用父类的方法时， <b>super</b> 会绑定子类的 <b>this</b> ，就相当于是 <b>Parent.prototype.fn.call(this)</b>。

```javascript

class Child extends Parent {
    constructor (...args) {
        super(...args)
    }
}

```