# JavaScript高级特性

**对象**

无序属性的集合，其属性可以包含基本值、对象或函数。

## **面向对象**--OOP

**面向对象的特性：**

封装、继承、抽象

**总结：**

在面向对象程序开发思想中，每一个对象都是功能中心，具有明确分工，可以完成接受信息、处理数据、发出信息等任务。

因此，面向对象编程具有灵活、代码可服用、高度模块化等特点，容易维护和开发，比起由一系列函数或指令组成的传统的过程式编程，更适合多人合作的大型软件项目。

##### 面向对象设计思想：

* 抽象出class(构造函数)
* 根据构造函数创建Instance(实例)
* 指挥instance得出结果

##### 创建对象的几种方法

##### 构造函数和实例对象的关系

构造函数是根据具体的食物抽象出来的抽象模板

实例对象是根据抽象的构造函数模板得到的具体实例对象

每一个实例对象都通过一个constructor属相，指向创建该实例的构造函数。(constructor是实例的属性 这种说法不严谨)

推荐使用instanceof操作符来判断实例和构造函数之间的关系。

###### 静态成员和实例成员

实例成员：在构造函数内部添加给this的成员，属于实例对象的成员，在创建实例对象后必须由对象调用

静态成员：添加给构造函数自身的成员，只能使用构造函数调用，不能使用生成的实例对象调用。

###### 构造函数的问题

浪费内存

每创建一次对象，对象内的函数及属性就会创建一次，极大的浪费内存。

解决1：将公共函数提取出来，但是会造成在全局作用域中命名冲突的问题。

解决：将函数封装到一个函数对象内，统一由这个对象进行调用。但是不符合面向对象编程思想(使用了中间手段解决问题，并没有全部放在创建的对象内)。

#### 原型

使用原型对象可以更好的解决构造函数的内存浪费问题。

把所有对象实例需要共享的属性和方法直接定义在prototype对象上

##### prototype原型对象

* 任何函数都具有一个prototype属性，该属性是一个对象
* 可以在原型对象上添加属性和方法
* 构造函数的prototype对象默认都有一个constructor属性，指向prototype对象所在函数
* 通过构造函数得到的实例对象内部会包含一个指向构造函数的prototype对象的指针：__proto__
* 这个原型对象的所有属性和方法，都会被构造函数的实例对象所拥有
* 实例对象可以直接访问原型对象成员

##### 构造函数、实例、原型对象三者之间的关系

![](G:\front\notes\Part 2\Module 4 JavaScript高级特性及ES6\原型关系.png)

##### 内置构造函数的原型对象

不允许使用对象替换的方式更改内置原型对象的prototype。

可以通过打点添加属性的方式进行修改。(实际工作中不允许修改内置原型对象)

#### 原型链

![](G:\front\notes\Part 2\Module 4 JavaScript高级特性及ES6\原型链.png)

##### 原型链查找机制

每当代码读取到某个对象的某个属性时，都会执行一次搜索，目标是具有给定名字的属性：

1. 搜索首先从对象实例本身开始
2. 如果在实例中找到了具有给定名字的属性，则返回该属性的值
3. 如果没有找到，则继续搜索指针指向的原型对象，在原型对象中查找具有给定名字 的属性
4. 如果在原型对象中找到了这个属性，则返回该属性的值

###### 实例对象读写原型对象成员

读：

1. 先在自己身上找，找到即返回
2. 自己身上找不到，则沿着原型链向上查找，找到即返回
3. 如果一直找到原型链的末端还没有找到，则返回undefined

写：

**值类型、引用类型成员**写入(实例对象.值类型成员或引用类型成员 = XX)：

* 当实例期望重写原型对象中的某个普通数据成员时实际上会把该成员添加到自己身上
* 也就是说该行为实际上会屏蔽掉对原型对象成员的访问

**复杂类型成员**修改(实例对象.成员.XX = XX)

* 先在自己身上找该成员，如果自己身上找到则直接修改
* 如果自己身上找不到，则沿着原型链继续查找，如果找到则修改
* 如果一直到原型链的末端还没有找到该成员，则报错(undefined).

创建数组后并没有给数组手动添加方法和属性，但却可以调用。

原因：原型链向上查找，自己没有的东西，会从原型对象中查找，以此类推，层层向上，最终依然找不到时，返回空。

##### 原型对象使用建议

在定义构造函数时，可以根据成员的功能不同，分别进行设置：

* 私有成员(一般就是非函数成员)放到构造函数中
* 共享成员(一般就是函数)放到原型对象中
* 如果重置了prototype记得修正constructor的指向

##### call方法
```js{cmd=node}
// 函数本身就是一种对象，能够有自己的属性和方法
// call方法本身是一种执行函数的方法
function fn(a,b){
    console.log(this);
    console.log(a+b);
}
var o = {name:'zs'};
fn.call(o,3,4);
```

## 继承

继承指的是类型和类型之间的继承

###### 组合继承

属性在构造函数内部继承，方法通过原型继承

## 函数

定义函数的两种方式：函数声明和函数表达式

函数本身也是对象

###### 函数调用时内部this的默认指向

普通函数：指向window

构造函数：指向将来创建的实例对象

对象函数：指向调用函数的对象自己

事件函数：指向事件源

定时器、延时器函数：指向window

**但是this到底指向什么要看调用时的环境来确定**

call()：

1. 功能：指定函数的this指向，且可以传参并执行函数
2. 参数：第一个为让this指向的对象，第二个及以后是函数参数的列表
3. 返回值：函数自己的返回值

apply():

* 类似call(),第二个参数是函数参数组成的数组

bind()

* 功能：指定函数的this指向，可以传参，但不能执行
* 参数：第一个为让this指向的对象，第二个及以后是函数参数的列表
* 返回值：返回一个新的指定了this的函数，也可以叫绑定函数
* 参数传值：可以在绑定时穿一部分，在新函数调用时再传一部分

###### 函数的其他成员

* arguments:存储的是函数在调用时传入的所有实参组成的一个类数组对象
* arguments.callee:函数本身
* fn.caller：函数的调用者，函数在哪个作用域调用，caller就是谁。如果在全局调用，值就是null
* fn.length：形参的个数
* fn.name：函数名称

###### 高阶函数

1. 函数可以作为参数
2. 函数可以作为返回值

###### 闭包

* 可以在内层函数中访问到外层函数的作用域
* 不论函数以任何方式在任何地方进行调用，都会回到自己定义时的密闭环境进行执行。
* 让函数内成员始终存活在内存中

闭包产生的问题：

* 本不该存储到全局作用域的变量变成了全局作用域
* 解决：使用自调用函数封闭

## 正则表达式

正则表达式通常用于匹配规律规则的表达式，是对象。

正则表达式是对字符串操作的一种逻辑公式

###### 作用：

1. 给给定的字符串是否符合正则表达式的过滤逻辑(匹配)
2. 可以通过正则表达式，从字符串中获取我们想要的特定部分(提取)
3. 强大的字符串替换功能(替换)

###### 语法：

两个/是正则表达式的定界符
正则表达式字面量在脚本加载后编译。正则表达式为常量时，使用法1可以获得更好的性能

```
// 法1： 使用正则表达式字面量
var reg = /abg/;
// 法2：调用RegExp对象的构造函数
var reg1 = new RegExp("abc");
```

###### 相关方法：

字符串方法：

1. split()
2. match()
3. search()
4. replace() 只改变第一个找到的子字符串

正则表达式方法：

1. exec()
2. test()

###### 正则表达式的组成

由一些普通字符和特殊字符组成，普通字符包括大小写的字母和数字，而元字符则具有特殊的含义，使用时必须用转义符" \"。

特殊字符：()  [ ]   { }  \  ^  $  |  ?  *  +  .

预定义特殊字符：

\n--回车  \f--换页   \t--tab   \b--空格

####  正则术语

##### 字符集

###### 简单类

[abc]

###### 范围类

id[0-9]

###### 负向类

加元字符取反  [ ^0-9] 表示不能匹配为[ ]内的字符

###### 组合类

允许用[]匹配不同类型的单个字符[0-9a-z]

##### 修饰符

g修饰符用于执行全局匹配

```javascript
var reg = /b+/g;
var str1 = "bbgshdbcbbbbsajknd";
console.log(str1.match(reg));// Array,length为3
```

i修饰符用于执行对大小写不敏感的匹配

##### 边界

^开头，后面的正则内容必须出现在字符串开始

$结尾  前面的正则内容匹配的结果必须出现在字符串的结尾

实际应用中，会同时限制开头和结尾

##### 预定义类

![](G:\front\notes\Part 2\Module4 JavaScript高级特性及ES6\预定义类.png)

##### 量词

![](G:\front\notes\Part 2\Module4 JavaScript高级特性及ES6\量词.png)

##### 分组

()进行分组

| 或操作符

###### 分组的反向引用

反向引用标识是对正则表达式中的匹配组捕获的子字符串进行编号，通过“\编号(在表达式中)”"$编号(在表达式外)"进行引用，从1开始计数·

正则中通过分组匹配到的字符串，会被进行编号，从1开始

在正则内部可以通过\1的方式，对字符串进行反向引用

##### 中文字符

匹配中文：[\u4e00-\u9fa5\]

## ES6(ECMAScript2015)

JavaScript是ECMAScript的扩展语言

ES只提供了最基本的语法

#### let&const与块级作用域

在ES2015之前，只有全局作用域和函数作用域

之后，有了块级作用域  {}包裹起来的作用域

let不会变量提升。在声明前调用会报错

const:

后期不允许修改指针的指向，并不是不允许修改内容。如果是对象类型，可以修改对象的内容。因此在声明时必须赋初值

```javascript
        const name = "zs";
        name = "ls"; // 报错 const不允许被修改指向
        const people = {};
        people.name = 'ls'; // 可以正常执行
		people = {}; // 不允许重新赋值
```

**推荐：不用var 主用const 配合let**

#### 数组的解构

参见案例代码

#### 字符串扩展方法

includes()  startsWith()  endsWith()

函数参数默认值

多个参数时，要将设置了默认值的参数往后拿，否则会出现参数接收不对应的情况
```js{cmd=node}
function foo(bar,enable = true){
    console.log(bar,enable);
}
foo('23'); // 23 true
foo('35',false);  // 35 false
```

#### 剩余参数 ...

函数中将所有形参存放在arguments的类数组中，我们可以使用剩余操作符，将参数存放在一个数组中，这个符号及参数必须写在最后一位且只能使用一次
```js{cmd=node}
function fun(...args){
    console.log(args);
}
function foo(n,...args){
    console.log(args);
}
fun(1,2,3,4); // [1,2,3,4]
foo(1,2,3,4); // [2,3,4]
```

##### 还可以用作展开数组

```js{cmd=node}
const arr = [1,2,3,4];
console.log.apply(console,arr);// 1 2 3 4
```

#### 箭头函数

简化回调函数，清晰易懂
定义一个函数名，第二位是参数，多个参数时可以使用(),箭头指向的是返回值。单个语句时可以省略{}和return不写，多个时需要补全。

```js{cmd=node}
const foo = (a,b) => a + b;
console.log(foo(5,8)); // 13
```

##### 箭头函数内部没有this 会去外面找

提示：需要使用其他变量来存放想要的this指向时，都可以使用箭头函数来代替，如在定时器延时器内部的函数

```js{cmd=node}
const person = {
    name: 'Tom',
    sayHi: function (){
        console.log(`Hi,My name is ${this.name}`)
        },
}
person.sayHi(); // Hi,My name is Tom
const person1 = {
    name: 'Tom',
    sayHi: () =>
        console.log(`Hi,My name is ${this.name}`)
}
// 内部没有this，去外面没找到，因此为undefined
person1.sayHi(); // Hi,My name is undefined
        const person2 = {
            name: 'Tom',
            sayHi: function(){
                setTimeout(() => { console.log(`Hi,My name is ${this.name}`) },1000);
            }
        }
person2.sayHi(); // Hi,My name is Tom

```

#### 对象字面量的增强

1.用变量定义一个值，对象的属性名和要传进来的变量名相同时，变量名可以省略不写。
2.对象中的函数可省略 : function不写
3.对象中允许有动态添加属性名的方式
```js{cmd=node}
const bar = 'bar';
const age = "sex";
const person = {
    name: 'John',
    bar,
    [age]: '男',
    sayHi () {
        console.log("Hi");
    }

}
console.log(person); // {name: 'John', bar: 'bar',sex: '男',sayHi}
person.sayHi(); // Hi
```

#### 对象方法

##### assign()

将多个源对象中的属性赋值到一个目标对象中。
```js{cmd=node}
const s1 = {
    a:123,
    b:125
};
const s2 = {
    a:135,
    c:345
};
const target = {
    d:222,
    c:325
};
Object.assign(target,s1,s2);
console.log(target); // { d: 222, c: 345, a: 135, b: 125 }

// 该方法常用于复制对象
function Block(opts){
    // 使用this接收
    Object.assign(this,opts);
}
options = {
    width: 20,
    height:15
}
const blo1 = new Block(options);
console.log(blo1); // Block { width: 20, height: 15 }
```
##### is()

Object.is() 改进了===的判断，以下两个例子与在===中的结果相反

```js{cmd=node}
console.log(Object.is(NaN,NaN)); // true
console.log(Object.is(+0,-0)); // false
```

#### class类
更加整洁且容易理解
```js{cmd=node}
class Block{
    constructor(name,age) {
        this.name = name;
        this.age = age;
    }
    sayHi() {
        console.log(`Hi,My name is ${this.name},I'm ${this.age} years old`);
    }
}
const b1 = new Block('Tom',18);
b1.sayHi();
```

#### 静态成员
##### 创建静态方法

```js{cmd=node}
class Block{
    constructor(name,age) {
        this.name = name;
        this.age = age;
    }
    sayHi() {
        console.log(`Hi,My name is ${this.name},I'm ${this.age} years old`);
    }
    // 新增一个创建实例对象的方法
    static create(name,age) {
        // this指向的是类型Block
        console.log(this);
        return new Block(name,age);
    }
}
const b1 = new Block('Tom',18);
b1.sayHi();
const b2 = Block.create('Bob',20);
console.log(b2);
```

##### 类的继承
使用extends关键字
```js{cmd=node}
class Block{
    constructor(name,age) {
        this.name = name;
        this.age = age;
    }
    sayHi() {
        console.log(`Hi,My name is ${this.name},I'm ${this.age} years old`);
    }
}
class Student extends Block{
    constructor(name,age,num) {
        // 表示从父类里继承这些属性的设置
        super(name,age);
        this.num = num;
    }
    hello (){
        // 从父类中继承一个方法，使用super调用
        super.sayHi();
        console.log(`我的学号是${this.num}`);
    }
}
const s1 = new Student('Mary',18,1001);
console.log(s1);
s1.hello();
```
####set数据结构(集合)
内部数据不允许重复
遍历方式：for。。。each  for。。。of
size属性：类似数组中的length
add():向集合中添加数据
has():判断集合中是否包含某个值
delete() 删除某项，并返回一个布尔值表示是否删除成功
clear() 清除当前集合中的全部内容
应用：数组去重
```js{cmd=node}
const s = new Set();
s.add(1).add(2).add(3).add(4).add(3);
console.log(s); // {1,2,3,4} 重复项被删除
console.log(s.has(5)); // false
console.log(s.delete(100)); // false
console.log(s.delete(4)); // true
// 应用：数组去重
const arr = [1,3,2,3,4,2];
// 法1 创建集合，将有重复数据的数组传入集合中，集合会去重，但此时生成的是一个集合，使用Array.from()再将其转为数组
const s2 = Array.from(new Set(arr));
// 法2
const s3 = [...new Set(arr)];
console.log(s3); // [1,3,2,4]
```
####Map数据结构
在对象中，键都是字符串类型的(即使设置的是数字或布尔值)。
使用Obj.keys()查看键
map.set(键,值)
map.get(键)
map.has()
map.delete()
map.clear()
在map中即使键是任意类型，不会转为字符串
```js{cmd=node}
const map = new Map();
const m = {a:1};
map.set(m,10);
console.log(map); //Map { { a: 1 } => 10 }
console.log(map.get(m)); // 10 
// 遍历
map.forEach((value,key) => { console.log(key,value)});
// { a: 1 } 10
```
####symbol
表示一个独一无二的值
用途：为对象添加独一无二的属性标识符


symbol.for("foo");

for()维护的是字符串和symbol之间的对应关系。

```js{cmd=node}
const s1 = {
    [Symbol()]: "symbol value",
    name: 'Tom'
}
// 通过这个方法可以获取到symbol类型的属性
console.log(Object.getOwnPropertySymbols(s1));
// 通过这个方法可以获取普通属性名的属性
console.log(Object.keys(s1));
```
for...of循环

![](G:\front\notes\Part 2\Module4 JavaScript高级特性及ES6\es2015其他内容.png)

## ES2016

###### Array.includes()

可以检测NaN，弥补了indexOf()的不足

作用：元素查找

###### 指数运算符

以前：Math.pow(2,3)

现在 **  如： 2的10次方： console.log(2 ** 10);

