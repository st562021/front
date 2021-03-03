## WebAPIs

浏览器提供了一套操作浏览器功能和页面元素的API(BOM和DOM)。

## BOM-浏览器对象模型

通过BOM可以操作浏览器窗口，如：弹出框、控制浏览器跳转、获取分辨率;刷新浏览器、后退、前进，在浏览器中输入url等。

* 浏览器对象模型提供了独立于内容的、可以与浏览器窗口进行互动的对象结构。BOM由多个对象组成，其中代表浏览器窗口的window对象是BOM的顶层对象，其他对象都是该对象的子对象(如document).

### window对象

window中有两个特殊属性：name和top，定义全局变量时避开这两个。

```javascript
// window中有属性name，如果定义新的变量，只会在原来的name属性上进行赋值，并且只能是字符串格式的值
var name = 123;
console.log(window.name); // "123"
// top属性在window中，属性值指向的就是顶层对象window，这个属性是只读的，不能后期更改。
var top = 23;
console.dir(window.top);// 输出的是window对象，而非23.
```

###### onload事件

* 我们可以给window对象或img等元素添加onload加载事件，表示只有绑定事件的元素加载完毕才能触发事件，执行事件函数。
* 其中window对象加载完毕：指的是所有HTML结构加载完，并且外部引入资源(js css img 视频)也加载完毕。(等待时间更长)
* 利用此事件可以将js代码写到html之前，且不影响js代码的执行
* 但是一个页面只能使用一次 

###### 延时器

**异步加载**

window对象的一个方法；window.setTimeOut(func,time);

功能：在指定的时间后，延迟执行一个函数。

第一个参数：函数；可以是匿名函数或函数引用，注意不要加();

清除：window.clearTimeOut(timer);

###### 定时器

window.setInterval(func,interval);

功能：每隔一个指定时间，周期性地执行一个函数。

清除：window.clearInterval(timer);

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

##### 1.获取元素

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

##### 2.对元素进行操作

###### 事件

执行机制：触发--响应机制

绑定事件三要素：

1. 事件源：给谁绑定
2. 事件类型：绑定什么类型的事件 
3. 事件函数：事件发生后执行什么内容，写在函数内部。

###### 常用事件监听方法：

**DOM0级**

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

###### 获取标签内部内容的属性

innerHTML：在获取标签内部内容时，如果包含标签，获取的内容会包含标签、空白换行等。

innerText：在获取标签内部内容时，如果包含标签，获取的内容会过滤标签，去掉换行和缩进等空白。

**更改标签内部内容**

innerHTML：设置属性值，有标签前的字符串会按照HTML语法中的标签加载。在设置有内部子标签结构时使用。

innerText：设置属性值，有标签前的字符串会按照普通的字符加载。在设置纯字符串时使用。

###### 表单元素 的属性

value  type  disabled  checked  selected  

```html
// 由于表单元素多使用input展示，input为单标签，无法像双标签一样在内部写内容，因此使用value设置其内容。
// 后三个的属性值和属性名一致，打点设置时，使用布尔值，不设置时，默认为false
```

###### 自定义属性

未封装，不能直接打点调用。

getAttribute(name) 获取标签行内属性

setAttribute(name,value) 设置标签行内属性

removeAttribute(name)  移除标签行内属性

* 上述三个方法用于获取任意的行内属性，包括自定义的属性
* 传参不需要修改属性名(class-->className)

###### style样式属性

使用style属性方式设置的样式显示在标签行内。

element.style属性的值，是所有行内样式组成的一个样式对象。如果

如果使用的css属性名是复合属性的单一属性，需要更改为驼峰命名法。

```html
// backgroundColor
```

设置样式属性值时，有单位的要加上单位。

###### className类名属性操作

批量修改样式时，可以选择将样式提前写入一个类中，后续通过修改类名的方式来批量修改样式。但要注意，此时的权重足够层叠之前的样式。

##### 3.DOM节点操作

##### 节点属性

* nodeType  属性值为数字，共12种，只读

  1--元素节点 2--属性节点  3--文本节点

* nodeName  标签名称，只读

* nodeValue  设置或返回当前节点的值

  元素节点的nodeValue始终是null

###### 父子节点常用属性：

childNodes：只读，获取一个节点所有**子节点**的**实时**集合。

children：只读，返回一个节点所有的**子元素节点**集合，是一个动态更新的html元素集合。

firstChild：只读，返回该节点的第一个子节点，没有则返回null

lastChild：只读，返回该节点的最后一个子节点，没有则返回null

parentNode：返回一个当前节点的父节点，如果没有(此节点为树的顶端或没有插入一棵树中)，则返回null

parentElement：返回一个当前节点的父元素节点，没有则返回null

###### 兄弟节点常用属性：

nextSibling：只读，返回与该节点同级的下一个节点，如果没有，返回null

previousSibling：只读，返回上一个

nextElementSibling：只读，返回与该节点同级的下一个元素节点(兼容问题)

previousElementSibling：只读，返回上一个元素节点(兼容问题)

##### 创建新节点

一般将创建的新节点存在变量中，方便使用。

创建的新节点是存储在内存中的，并没有添加到DOM树上。

```javascript
        document.createElement("div"); // 创建元素节点
        document.createAttribute("id"); // 创建属性节点
        document.createTextNode("hello"); // 创建文本节点
```

##### 节点常用操作方法：

1. parentNode.appendChild(child);

   将节点添加到指定节点的子节点末尾

```html
<body>
    <div class="box" id="box">
        <p>这是一段内容</p>
        <p>这是一段内容</p>
        <p id="p3">这是一段内容</p>
        <p>这是一段内容</p>
    </div>
    <script>
        var div = document.createElement("div");
        var id = document.createAttribute("id");
        var txt = document.createTextNode("hello");
        var box = my$("box");
        box.appendChild(div);
        // 自己创建的元素节点本身也是一个对象，可以添加属性和方法，将来加载到DOM树时，这些操作依旧保留
        // 在元素内部添加文本节点
        div.appendChild(txt);
        // DOM中原有的节点也可以传给appendChild的参数
        // 类比剪切操作。1.将节点从原始位置删除，2.添加到新指定位置
        // 原因：内存中这个原有节点只有一个，渲染时只能有一个位置。
    </script>
</body>
```

2. parentNode.replaceChild(newChild,oldChild)

   用指定节点替换当前节点的某个子节点，并返回被替换掉的节点。

```html
        box.replaceChild(div,p3);
```

3. parentNode.insertBefore(newNode,referenceNode):在参考节点之前插入一个拥有指定父节点的子节点，第二个参数必须设置，为null时将节点插到子节点末尾。

   ```html
   box.insertBefore(div,p3);
   ```

4. parentNode.removeChild():移除子节点，这个子节点必须存在于当前节点中。

5. Node.cloneNode():克隆节点。参数为布尔值。true:深克隆，false：浅克隆

   注意：克隆时，标签上的属性和属性值也会被赋值，写在标签行内的绑定事件可以被赋值，但是通过JavaScript动态绑定的事件不会被复制。

6. Node.hasChildNodes():无参数，返回布尔值来表示该元素是否包含有子节点。**不区分**节点类型
7. node.contains(child):返回布尔值，来表示传入的节点是否为该节点的**后代**节点。

##### 注册事件的其他方法：

1.element.addEventListener()

参数：第一个为事件类型字符串，第二个为事件函数

同一个元素可以多次绑定事件监听，同一个事件类型可以注册多个事件函数。

有兼容问题(不支持IE9及以下)。	

2.element.attachEvent()

参数：第一个为事件类型的字符串(需要加on)，第二个为事件函数

同一个元素可以多次绑定事件监听，同一个事件类型可以注册多个事件函数。

有兼容问题(只支持IE10及以下)。

3.自己封装

##### 移除事件

1.ele.removeEventListener()

参数：第一个为事件类型的字符串，第二个为事件函数引用名。

注意：无法移除匿名函数，因此在注册时需单独声明有函数名的事件函数。

兼容问题：不支持ie9以下的浏览器

2.ele.detachEvent()

规则同上，事件类型需要加on。

3.自己封装

##### 事件流

先捕获，后冒泡

![](G:\front\notes\Part 2\Module3 WebAPI\事件流.png)

addEventListener()有第三个布尔值的参数，用来决定事件流的方向。false为事件冒泡，true为捕获。默认值为false。

同时存在时，先捕获，后冒泡。

###### 事件流 的三个阶段

捕获--目标事件--冒泡

###### 事件委托

利用事件冒泡，将子级的事件委托给父级加载。

同时，需要利用事件函数的一个e参数，内部存储的是事件对象。

事件对象：

* 只要触发事件，就会有一个对象，内部存储了与事件相关的数据。

* e在低版本浏览器中有兼容问题，使用window.event

* 事件对象常用属性：

  e.event：事件触发时所处的阶段

  e.target：获取触发事件的元素

  e.srcElement：获取触发事件的元素(低版本)

  e.currentTarget: 用于获取绑定事件的事件源元素

  e.type:获取事件类型

  e.clientX/e.clientY: 所有浏览器都支持，鼠标距离浏览器窗口左上角的距离。

  e.pageX/e.pageY  IE8以前不支持，鼠标距离整个HTML页面左上顶点的距离。

##### 取消默认行为和阻止事件传播的方式

e.preventDefualt()  取消默认行为

e.returnValue()  取消默认行为(低版本)

e.stopPropagation()  阻止冒泡，标准方式

e.cancelBubble = true   阻止冒泡，IE低版本，标准中已废弃。

### DOM特效制作

###### 偏移量属性

offsetParent：偏移参考的祖先元素，值有定位的祖先元素，如果没有，则以body作为参考(类似css定位参考)

![](G:\front\notes\Part 2\Module3 WebAPI\offset.png)

###### 客户端大小

* client系列没有参考父级元素
* clientLeft/clientTop  边框区域尺寸，不常用
* clientWidth/clientHeight 边框内部大小

![](G:\front\notes\Part 2\Module3 WebAPI\client.png)

###### 滚动偏移属性

* scrollLeft/scrollTop   盒子内部滚动出去的尺寸
* scrollWidth/scrollHeight  盒子内容的宽度和高度