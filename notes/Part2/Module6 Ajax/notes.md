# Ajax

Ajax就是浏览器提供的一套API，可以通过JavaScript调用，从而实现通过代码控制请求与响应。实现通过JavaScript进行网络编程。

XML：最早在客户端与服务端之间传递数据时所采用的数据格式

## 原生AJAX

###### 发送AJAX请求步骤

1. 创建XMLHttpRequest类型对象
2. 准备发送，打开与一个网址之间的连接
3. 执行发送
4. 指定xhr状态变化事件处理函数

##### 详解：

1.XMLHttpRequest

* AJAX API中核心提供的是一个XMLHttpRequest类型，所有AJAX操作都需要使用到这个类型

* 有兼容问题。使用浏览器性能测试。

  ```javascript
  var xhr = null;
  if(window.XMLHttpRequest()) {
      // 普通浏览器
      xhr = new XMLHttpRequest()
  } else {
      // ie6
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  ```

2.open() 开启请求

* 本质上XMLHttpRequest就是JavaScript在Web平台中发送HTTP请求的手段，所以我们发送出去的请求仍然是HTTP请求，同样符合HTTP约定的格式
* 语法：xhr.open(method,url);

3.send() 发送请求

* xhr.send(body);
* body:在xhr请求中要发送的数据体，根据请求头中的类型进行传参
* 如果是GET方法，无需设置数据体，可以传null或不传参；也可以直接拼接在url后面。如:  ?id=1
* 除get外，其他几种方法都需要设置请求头 setRequestHeader()
  * 此方法必须在open()和send()之间调用
  * 语法：xhr.setRequestHeader(header,value);
  * header：一般设置"Content-Type",传输数据类型，即服务器需要我们传送的数据类型
  * value：具体的数据类型，常用"application/x-www.form-urlencoded"和"application/json"

4.readyState属性

返回XMLHTTPRequest代理当前所处的状态，由于在xhr对象状态变化时触发(只要变化就会触发)，即这个事件会被触发多次

| readyState | 状态描述         | 说明                                               |
| ---------- | ---------------- | -------------------------------------------------- |
| 0          | UNSEBT           | 代理xhr被创建，但尚未调用open()                    |
| 1          | OPENED           | open()已被调用，建立了连接                         |
| 2          | HEADERS_RECEIVED | send()已被调用，并且已经可以获取状态行和响应头     |
| 3          | LOADING          | 响应体下载中，responseText属性可能已经包含部分数据 |
| 4          | DONE             | 响应体下载完成，可以直接使用responseText           |

5.AJAX同步/异步加载

open()的第三个参数：布尔值，表示是否采用异步加载

如果设置了同步加载，程序会卡在send()部分，等待所有数据传输完成，才会执行后续代码

建议：

1. 为了使onreadystatechange事件一定会被触发，要在send()之前注册该事件

### 响应数据格式

xml

* 元数据占用的数据量比较大，不利于大量数据的网络传输

* 在其他语言中，如在js中，解析内部数据时，方法比较复杂，不方便使用

* 代码示例

  ```xml
  <！-- 以下代码必须写在xml文件中 --！>
  <book>
  	<name>三国演义</name>
  	<author>XXX</author>
  	<cate>古典名著</cate>
  </book>
  <book>
  	<name>红楼梦</name>
  	<author>XXX</author>
  	<cate>古典名著</cate>
  </book>
  <book>
  	<name>西游记</name>
  	<author>XXX</author>
  	<cate>古典名著</cate>
  </book>
  ```

  

json

* 服务端采用JSON格式返回数据，客户端按照JSON格式解析数据
* 属性名必须加  " "
* JSON.stringify()  // 将对象解析成json格式
* JSON.parse(str);   // 将json格式数据解析成真正的js对象，方便使用js中对象的方法

#### json

json-server模拟数据库存取数据

##### 原生AJAX传递数据：

###### GET

###### POST

* POST请求过程中，都是采用请求体承载需要提交的数据。

* 需要设置请求头中的Content-Type，以便于服务端接收数据

* 需要提交到服务端的数据可以通过send方法的参数传递。

##### 处理响应数据渲染

## ajax库

jquery的ajax库

## Axios

Axios是目前应用最为广泛的AJAX封装库