## WebAPIs

浏览器提供了一套操作浏览器功能和页面元素的API(BOM和DOM)。

## BOM-浏览器对象模型

通过BOM可以操作浏览器窗口，如：弹出框、控制浏览器跳转、获取分辨率等。

## DOM-文档对象模型

* 是W3C组织推荐的处理可扩展标记语言的标准编程接口。是一种与平台和语言无关的应用程序接口，可以动态地访问程序和脚本，更新其内容、结构和www文档的风格。

* DOM可以把HTML看做是文档树，通过DOM提供的API可以对书上的节点进行操作。
* 它要求在处理过程中整个文档都表示在存储器中。

### DOM树

![](G:\big-front\notes\Part 2\Module3 WebAPI\DOM树.png)

#### DOM可以的操作：

* 获取元素
* 对元素进行操作(设置其属性或调用其方法)
* 动态创建元素
* 事件(什么时候做响应的操作)

##### 获取元素

js中获取元素时，必须保证元素已经在浏览器中渲染成功。

###### 根据id获取元素

调用document的getElementById方法。

参数：字符串类型的id的属性值

返回值：对应id名的元素对象

注意：部分浏览器可以直接使用id,但有兼容问题，不推荐。

###### 根据标签名获取

调用document的getElementByTagName方法。

参数：字符串类型的标签名。

返回：同名的元素对象组成的数组。

注意：

操作数据时应按照操作数组的方法进行。

getElementByTagName内部获取的元素是动态增加的。

###### 元素对象内部获取标签

有getElementByTagName方法。

类似css中的后代选择器。

通过连续打点调用。

```javascript
document.getElementById("box1").getElementByTagName("p");
```

###### 根据name属性获取元素

getElementsByName

返回值：name属性值相同的元素对象组成的数组。

会动态增加。

不建议使用：在IE和Opera中有兼容问题，会多选中id和属性值相同的元素。

###### 根据类名获取元素

getElementsByClassName

返回值：class属性值相同的元素对象组成的数组。

会动态增加。

浏览器兼容问题：不支持IE8及以下的浏览器。

###### 根据选择器获取元素

document.querySelector()  document.querySelectorAll()

通过css中的选择器去选取第一个/全部符合条件的标签元素。

参数：字符串类型的css中的选择器。

必须在结构加载完成后进行调用。

浏览器兼容问题：不支持IE8及以下的浏览器。

```html
var para = document.querySelector("#box1 .para")
```

##### 对元素进行操作

###### 事件

执行机制：触发--响应机制

绑定事件三要素：

1. 事件源：给谁绑定
2. 事件类型：绑定什么类型的事件 
3. 事件函数：事件发生后执行什么内容，写在函数内部。

常用事件监听方法：

1. 绑定HTML元素属性

```html
<input type="button" id="btn" value="点我有惊喜" onclick="alert('surprise')">
```

2. 绑定DOM对象属性

   ```javascript
   var btn = document.getElementById("btn");
   btn.onclick = function(){
       // 定义的是事件被触发后要做的事情
       alert("点我干嘛");
   };
   ```

事件监听

JavaScript解析器会给有绑定事件的元素添加一个监听，解析器会一直检测这个元素，只要触发对应的绑定事件，会立刻执行事件函数。

###### 操作

###### 非表单元素的属性

如：href  title   id   src 等等。

调用方式：元素对象打点调用属性名

注意：部分的属性名跟关键字和保留字冲突，会更换写法。

​		class-->className

​		for    -->htmlFor

​		rowspan-->rowSpan

**this**

在事件函数内部有一个this，指向事件源

不同函数内部this指向不同。

普通函数  --  window对象

构造函数 --  指向生成的实例对象

对象的方法  --  指向对象本身

事件函数  --  指向事件源。