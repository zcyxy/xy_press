## 原始值和引用值

**原始值(primitive value)**:

原始值是固定而简单的值，是存放在 **栈(stack)** 中的简单数据段，也就是说，它们的值直接存储在变量访问的位置。

最新的 ECMAScript 标准定义了7 种原始值： **undefined** 、 **Boolean** 、 **Number** 、 **String** 、 **BigInt** 、 **Symbol** 和 **null**。

---

**引用值(reference value)**:

引用值则是比较大的对象，存放在 **堆(heap)** 中的对象，也就是说，存储在变量处的值是一个 **指针(pointer)** ，指向存储对象的内存处。

所有引用类型都集成自 **Object** 。

---

特殊的 **NaN** :

```js

console.log(typeof NaN) // number
console.log(NaN === NaN) // false
console.log(Object.is(NaN, NaN)) // true ,这里为true的原因是Object.is 内部做了处理

```

## 其它数据类型转布尔值

| 参数类型 | 结果 |
|:--------| :--------|
| false、undefined、null、+0、-0、NaN、"" | false |
| 除了上面的情况 | true |

如果在使用Boolean()时不传参数结果也是为false

## 原始值转字符串

| 参数类型 | 结果 |
|:--------| :--------|
| Undefined | "undefined" |
| Null | "null" |
| Boolean | "true" 或 "false" |
| Number | "对应数字" |
| String | "返回与之相等的值" |
| Symbol | "Symbol()" |

## 原始值转数字

| 参数类型 | 结果 |
|:--------| :--------|
| Undefined | NaN |
| Null | +0 |
| Boolean | 1 或 0 |
| Number | 返回与之相等的值 |
| String | 数字的字符串(包括小数和负数、各进制的数)，会被转为相应的数字，否则为NaN；''空字符串为 0 |
| Symbol | 使用Number()转会报错 |

---

**parseInt** 机制

先变成字符串，从字符串 **左侧第一个字符开始** ，查找有效 **数字字符** （遇到第一个非有效字符停止查找，把找到的有效数字字符转化为数字，如果一个都没有结果就是 **NaN** ）

---

**parseFloat** 机制

比 parseInt 多识别一个小数点

## 原始值转对象

### String对象

**String** 有两种用法，一种是配合 **new** 来当构造函数用，一种是不用 **new** ：
1. 当 String() 和运算符 new 一起作为构造函数使用时，它返回一个新创建的 String 对象，存放的是字符串 s 或 s 的字符串表示(不过自从推出了 **Symbol** 之后就不推荐使用 **new String** 这种做法了)。
2. 当不用 new 运算符调用 String() 时，它只把 s 转换成原始的字符串，并返回转换后的值

### 基本类型的包装对象

**Number** 、 **Boolean** 和 **String** 一样都有两种用法，带 **new** 和不带 **new**

**Symbol** 、 **BigInt** 就只能不带 **new** 使用。(因为它们是 **ES6** 之后出来的，对它们调用 **new** 会报错)

```js

console.log(Number(1)) // 1
console.log(new Number(1)) // Number{1}
console.log(Boolean(true)) // true
console.log(new Boolean(true)) // Boolean{true}

console.log(Symbol(1)) // Symbol(1)
console.log(BigInt(1)) // 1n
console.log(new Symbol(1)) // TypeError: Symbol is not a constructor
console.log(new BigInt(1)) // TypeError: BigInt is not a constructor

```

**Number{1}、Boolean{true}** ，它就是 **基本类型的包装对象** ，也被称为 **基本类型的包装类** ，也可以叫做 **原始值包装对象**

**基本类型的包装对象**特点:

1. 使用 **typeof()** 检测它，结果是 **object** ，说明它是一个对象
2. 使用 **toString()** 调用的时候返回的是原始值的字符串

### Object()

Object()构造函数它可以接收一个任意类型的变量，然后进行不同的转换。

```js

console.log(new Object('1')) // String{'1'}
console.log(new Object(1)) // Number{1}
console.log(new Object(true)) // Boolean{true}
console.log(new Object(Symbol(1))) // Symbol{Symbol(1)}
console.log(new Object(10n)) // BigInt{10n}

console.log(new Object(null)) // {}
console.log(new Object(undefined)) // {}

// 对于null、undefined它们会被忽略，生成的会是一个空对象。

```

## toString()

**toString** 主要是把对象转换为字符串

**谁可以调用 toString() ？**

1. 除了 **null** 、 **undefined** 的其它基本数据类型还有对象都可以调用它，通常情况下它的返回结果和 **String** 一样。
2. 在使用一个数字调用 **toString()** 的时候会报错，除非这个数字是一个小数或者是用了一个变量来盛放这个数字然后调用。 ( **1.1.toString()** 或者 **var a = 1; a.toString();**)

---

**不同数据类型调用 toString()**

1. 原始数据类型调用时，把它的原始值换成了字符串
2. **数组** 的 toString 方法是将 **每一项转换为字符串然后再用 "," 连接**
3. 普通的对象(比如 **{name: 'obj'}** 这种)转为字符串都会变为 **"[object Object]"**
4. **函数 (class) 、正则** 会被转为 **源代码字符串**
5. **日期** 会被转为 **本地时区的日期字符串**
6. **原始值的包装对象** 调用 toString 会返回 **原始值的字符串**
7. 拥有 **Symbol.toStringTag** 内置属性的对象在调用时会变为对应的标签 **"[object Map]"**

## valueOf()

**valueOf()的基本用法**

1. 基本数据类型调用，返回调用者原本的值
2. 非日期对象的其它引用类型调用 **valueOf()** 默认是返回它本身
3. 而日期对象会返回一个 **1970 年 1 月 1 日以来的毫秒数** (类似于**1585370128307**)。

## toPrimitive

**toPrimitive** 是一个内置的抽象操作，它是作为对象的函数值属性存在的，当一个对象转换为对应的原始值时，会调用此函数。

**toPrimitive(input, PreferredType?)**

* 参数一： **input** ，表示要处理的输入值
* 参数二： **PerferredType** ，期望转换的类型，可以看到语法后面有个问号，表示是非必填的。它只有两个可选值， **Number** 和 **String** 。

---

1. 当不传入 PreferredType 时，如果 input 是日期类型，相当于传入 String，否则，都相当于传入 Number。
2. 如果是 **toPrimitive(obj, Number)**，处理步骤如下：
    * 如果 obj 为 基本数据类型，直接返回
    * 否则，调用 valueOf 方法，如果返回一个原始值，则 JavaScript 将其转换为数字，返回。
    * 否则，调用 toString 方法，如果返回一个原始值，则 JavaScript 将其转换为数字，返回。
    * 否则，JavaScript 抛出一个类型错误异常。
3. 如果是 **toPrimitive(obj, String)**，处理步骤如下：
    * 如果 obj为 基本数据类型，直接返回
    * 否则，调用 toString 方法，如果返回一个原始值，则 JavaScript 将其转换为字符串，返回。
    * 否则，调用 valueOf 方法，如果返回一个原始值，则 JavaScript 将其转换为字符串，返回。
    * 否则，JavaScript 抛出一个类型错误异常。

![toPrimitive](https://gitee.com/xyzcy/blog/raw/master/src/assets/img/toPrimitive.webp)

## 对象转数字

对于**对象转数字**，也就是调用 **Number()** 函数

和 **toPrimitive(object, 'number')** 情况类似

```js

var b = {
  toString () {
    console.log('toString')
    return 1
  },
  valueOf () {
    console.log('valueOf')
    return [1, 2]
  },
}
console.log(Number(b))

/*
valueOf
toString
1
*/

```

## 对象转字符串

对于**对象转字符串**，也就是调用 **String()** 函数

和 **toPrimitive(object, 'string')** 情况类似

```js

var b = {
  toString () {
    console.log('toString')
    return { name: 'b' }
  },
  valueOf () {
    console.log('valueOf')
    return [1, 2]
  },
}
console.log(String(b))

/*
toString
valueOf
Cannot convert object to primitive value at String
*/

```

## Symbol.toPrimitive

1. 如果重写了某个对象或者构造函数中的 **toString** 、 **valueOf** 、 **Symbol.toPrimitive** 方法， **Symbol.toPrimitive** 的优先级是最高的
2. 若是 **Symbol.toPrimitive** 函数返回的值不是基础数据类型(也就是原始值)，就会报错
3. **Symbol.toPrimitive** 接收一个字符串参数 **hint** ，它表示要转换到的原始值的预期类型，一共有 **'number'、'string'、'default'** 三种选项
4. 使用 **String()** 调用时， **hint** 为 **'string'** ；使用 **Number()** 时， **hint** 为 **'number'**
5. **hint** 参数的值从开始调用的时候就已经确定了

```js

var b = {
  toString () {
    console.log('toString')
    return '1'
  },
  valueOf () {
    console.log('valueOf')
    return [1, 2]
  },
  [Symbol.toPrimitive] (hint) {
    console.log('symbol')
    if (hint === 'string') {
      console.log('string')
      return '1'
    }
    if (hint === 'number') {
      console.log('number')
      return 1
    }
    if (hint === 'default') {
      console.log('default')
      return 'default'
    }
  }
}
console.log(String(b))
console.log(Number(b))

/*
'string'
'1'
'number'
1
*/

```

## 使用==比较时的类型转换

使用 **==** 进行比较的时候，会有以下转换规则（判断规则）：

1. 两边 **类型如果** 相同，值相等则相等，如 2 == 3肯定是为false的了
2. 比较的双方 **都为基本数据类型** ：
    * 若是一方为 **null** 、 **undefined** ，则另一方必须为 **null** 或者 **undefined** 才为 **true** ，也就是 **null == undefined** 为 **true** 或者 **null == null** 为 **true** ，因为 **undefined** 派生于 **null**
    * 其中一方为 **String** ，是的话则把 **String** 转为 **Number** 再来比较
    * 其中一方为 **Boolean** ，是的话则将 **Boolean** 转为 **Number** 再来比较
3. 比较的 **一方有引用类型** ：
    * 将引用类型遵循 **ToNumber** 的转换形式来进行比较(实际上它的 **hint** 是 **default** ，也就是 **toPrimitive(obj, 'default')** ，但是 **default** 的转换规则和 **number** 很像； **函数** 也是对象，所以和普通对象一样处理)
    * 两方都为引用类型，则判断它们是不是指向同一个对象

当一方有为对象的时候，实际是会将对象执行 **ToNumber** 操作之后再进行比较的，但是又由于对象的 **valueOf()** 基本都是它本身，所以我们可以认为省略了这一步。

![toPrimitive](https://gitee.com/xyzcy/blog/raw/master/src/assets/img/==.webp)

```js

{} == true
"[object Object]" == true // 对象转字符串
"[object Object]" == 1 // 布尔值转数字(一方为布尔，转换为数字)
NaN == 1 // 字符串转数字(一方为字符串另一方为数字则将字符串转数字)
// 结果为false


{} == 1
"[object Object]" == 1 // 对象转字符串
NaN == 1 // 字符串转数字(一方为字符串另一方为数字则将字符串转数字)
// 结果为 false

```

---

当使用 **!** 的时候，实际上会将 **!** 后面的值转换为布尔类型来进行比较，不会经过 **ToNumber()** ，而是 **直接转换为了布尔值**

```js

var b = {
  valueOf: function () {
    console.log('b.valueOf')
    return '1'
  },
  toString: function () {
    console.log('b.toString')
    return '2'
  }
}
console.log(!b == 1)
console.log(!b == 0)


// false
// true

```

## +、-、*、/、%的类型转换

对于几种常用运算符的类型转换：

1. **-、*、/、%** 这四种都会把符号两边转成数字来进行运算
2. **+** 由于不仅是数字运算也符，还是字符串的连接符，所以分为两种情况：
    * 两端都是数字则进行数字计算(一元正号 **+b** 这种情况相当于转换为数字)
    * 有一端是字符串，就会把另一端转换为字符串进行连接

```js

let result = 10 + false + undefined + []+ 'Tencent' + null + true + {}
console.log(result)

// NaNTencentnulltrue[object Object]




// 让if(a == 1 && a == 2 && a == 3)条件成立

var a = {
  value: 0,
  valueOf () {
    return ++this.value
  }
}
if (a == 1 && a == 2 && a == 3) {
  console.log('成立')
}




// 让if (a === 1 && a === 2 && a === 3)条件成立

var value = 1;
Object.defineProperty(window, "a", {
  get () {
    return this.value++;
  }
})
if (a === 1 && a === 2 && a === 3) {
  console.log('成立')
}

```