# jQuery

write less ，do  more 

###### 版本发展

1.X 兼容IE6、7、8

2.X 多用于jQuery官方调整bug

3.X 只能在高版本浏览器中使用

极大简化了DOM操作

#### $()

* 在jQuery中，只有一个全局变量$,避免了全局变量的污染
* 最开始变量不叫$，叫做jQuery()方法，在库中两个名字是并存的，都可以使用

#### jQuery对象

* $()获取到的内容叫做jQuery对象
* 内部封装了大量的属性和方法，如：.css(),.html(),.animate()等方法都是jQuery对象的方法。
* 通过$()获取的元素是一组元素，进行操作时是批量操作
* jQuery对象得到后，只能使用jQuery对象的方法，不能使用原生js元素对象的方法
* 原生js对象也不能使用jQuery的方法
* jQuery对象实际是一个类数组对象，内部包含所有的获取的原生js对象及大量的jQuery的方法和属性

##### 获取jQuery对象内部原生元素的个数

$("").size()       $("").length

jQuery对象和原生对象的互相转换：

jQuery-->原生：使用数组下标

原生-->jQuery： $(原生对象)

#### jQuery选择器

##### 一般选择器

一般的css选择器都可以用。

除此之外，还有css3新增的表单对象属性，使用jQuery选择时，符合条件的都能被选中

```javascript
$("input:enabled") // 选中未禁用的表单元素
$(":input"); // 选中所有表单
$(":text") // 选中文本框
```

##### 筛选选择器

过滤选择器。jQuery新增

操作的是**jQuery对象**

```javascript
<body>
    <div id="box">
        <p>段落1</p>
        <p>段落2</p>
        <p>段落3</p>
        <p>段落4</p>
        <p>段落5</p>
        <p>段落6</p>
        <p>段落7</p>
        <p>段落8</p>
    </div>
    <script src="js/jquery.min.js"></script>
    <script>
        $("p:first").css("background-color","pink");
        $("p:last").css("background-color","pink");
        // 选中下标为x的项
        $("p:eq(5)").css("background-color","pink");
        // 选中大于5的项
        $("p:gt(5)").css("background-color","pink");
        // 选中小于5的项
        $("p:lt(5)").css("background-color","pink");
        // 选中奇数项
        $("p:odd").css("background-color", "pink");
        // 选中偶数项
        $("p:even").css("background-color", "pink");
        // 取出所有与给定选择器匹配的元素
        $("p:not(:even)").css("background-color", "pink");
    </script>
</body>
```

##### 筛选方法

$().first()   $().last()   $().eq();

功能与筛选选择器相同

#### jQuery操作标签的内容

##### html()

```javascript
<body>
    <div id="box">
        <p>这是原始内容</p>
        <p>这是原始内容</p>
        <p>这是原始内容</p>
    </div>
    <script src="../js/jquery.min.js"></script>
    <script>
        var $p = $("p");
        // html() 用来获取内容
        // 此时只能获取类数组中的第一个元素的内容
        console.log($p.html());
        // 可以传一个参数，表示将获取到的对象的内部内容都修改为参数内容
        console.log($p.html("abc"));
        // 如果内部包含了标签的语法的字符，会按照标签正常进行加载
        $p.html("标签内容被修改<p>这是新的p标签</p>")
    </script>
</body>
```

##### text()

只针对文本，相当于innerText()

获取时，会获取所有的标签的文字内容，忽略标签

设置时，会将书写的内容都当成普通文字，不会按照标签进行加载

##### val()

针对有value属性的标签

###### 获取

select标签获取val为当前选中项的value值

option标签获取val为第一个option标签的value值

###### 设置

对所有的选中标签批量操作

#### 操作标签的属性

##### attr()

用来获取或设置属性值

attr(name,value);

##### removeAttr() 	

移除指定属性

##### prop()

针对表单属性中属性名和属性值一样的属性。如checked selected等。

直接操作布尔值

设置： prop(属性名，true)

获取：prop(属性名)

#### 操作样式的方法

css()

用于获取或修改css属性值

语法：jQuery对象.css(name,value)

传入一个参数时，表示调用css属性的值，得到的是某个元素的计算后样式，字符串格式

第一个参数可以是驼峰命名，也可以是横线。

第二个参数可以是字符串格式的属性值，如果带单位的数字的属性值，可以写成带单位的字符串格式、不带单位的字符串、纯数字、带+=等赋值运算符的字符串

可以给同一对象设置多条属性，使用对象形式的参数。

#### 操作类名的方法

addClass("类名")

removeClass("类名")

不传参数，则会删除所有类名

jQuery中的类名控制方法，只会控制指定的类名，不会影响别的类名

在原生js中，className()操作的是class属性整体。

toggleClass()类名切换

* 若这个类名存在，则会移除该类名。否则添加该类名
* 语法：jQuery对象.toggleClass('类名')
* 参数：字符串格式的类名

hasClass()检测类名是否存在

返回true、false

#### jQuery常用事件方法

不需要写on,（）内参数为事件函数

##### mouseenter()

鼠标进入元素触发事件

##### mouseleave()

鼠标离开元素触发事件

* 以上两个事件没有事件冒泡，但是原生的mouseover()和mouseout()有事件冒泡

##### hover()

对mouseenter()和mouseleave()的合并书写。

两个参数，第一个是鼠标移入的事件，第二个是鼠标离开的事件。

#### jQuery关系查找方法

在原生DOM操作中，this指向的就是事件源，在jQuery中，还是指向事件源，要想使用jQuery的方法，需要将原生转为jQuery，即：$(this)

##### parent() 

得到父级jQuery对象

##### children()

得到子集组成的jQuery对象。

* 获得子级时不限制标签类型

* children()可以传参

* 参数是字符串格式的选择器，在选中所有子级的情况下，保留满足选择器的部分，进行了二次选择。

##### siblings()

* 查找亲兄弟，可以传参，
* 传参后进行二次筛选

#### 链式调用

jQuery对象调用方法(除节点关系方法)后，执行完会返回jQuery对象自己。

因此可以连续打点调用jQuery的方法和属性

#### jQuery其他关系的查找

##### find()

查找后代元素

##### 兄弟元素的查找

紧邻：

next() 下一个兄弟

prev()  前一个兄弟

多选

nextAll()  后面所有兄弟

prevAll()  前面所有兄弟

* 通过传递参数可以进行**二次选择**，参数是字符串格式的选择器，在前面或者后面兄弟中选中符合选择器规定的部分

##### 祖先级

parents()

* 通过该方法得到的是指定对象的包含body在内的所有祖先级元素组成的jQuery对象
* 可以通过传参进行二次选择

#### jQuery排序

##### eq()

jquery中获得的对象每部包含选择的一组原生js对象，在jQuery对象中会进行一个大的排序，这个排序与原来的html结构没有关系

eq()方法在jQuery对象中**通过下标获取某个对象**，下标是jQuery对象中的大的排序的下标

index()

得到子集在HTML结构中的兄弟中的下标位置。与jQuery大排序无关。

##### 排他操作

jQuery中使用this进行特殊设置，使用siblings()设置为默认

##### each()遍历

each()内部有一个this，指向遍历出来的当次元素

each()可以传一个参数i，i表示的是这一次的遍历对象在整体的jQuery对象大排序中的下标位置

#### jQuery入口函数

类似window.onload(),但是在DOM树，

* 音视频等文件加载完后才能执行
* 一个页面只能出现一个onload()

$(document).ready(function(){}) ==>简写   ${function(){}}

* DOM树加载完即可执行
* 加载速度更快

* 在一个页面上可以书写多个jQuery的入口函数，按先后顺序加载

#### jQuery切换效果的方法

##### hide() 

##### show()

##### toggle()

* 如果不传参数：直接显示和隐藏或切换，没有过渡动画
* 如果传递参数
  * 单词格式："slow"   "normal"  "fast"
  * 数字格式的时间，单位是毫秒，在规定时间之内会出现显示或隐藏的动画。
* 过渡时间内，伴随着宽度和高度以及透明度的变化。