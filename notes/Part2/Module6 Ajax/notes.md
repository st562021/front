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

#### XMLHttpRequest2.0

新增两个方法

1. xhr.onload()  只在请求完成时触发，
2. xhr.onprogress()   只在请求进行中触发，即在readyState===3时触发

新增属性 response

* 该属性可以代替responseText
* 使用该属性时需要在open() send()之间设置responseType

```javascript
        var xhr = new XMLHttpRequest();
        xhr.open('GET',"http://localhost:3000/students?id=002");
        xhr.responseType = "json";
        xhr.onload = function(){
            console.log(this.response);
        }
        xhr.send(null);
```

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

##### 常用配置项：

* url
* baseUrl ： 传递相对url前缀，将自动加载url前面
* method： 创建请求时使用的方法
* headers:即将被发送的自定义请求头 (有默认值application/json)
* params:即将于请求一起发送的url参数
* data：作为请求主体被发送的数据
* timeout：指定请求超时的毫秒数
* responseType ： 表示服务器响应的数据类型，默认“json”

##### 全局配置

axios.default.config = "";

##### axios 方法的参数

axios(url,{configs});

##### axios拦截器

在请求或响应被then或catch处理前拦截它们。

```javascript
        // 请求拦截器
        // 两个参数，第一个为发送请求之前要做的，第二个为对请求错误做些什么
        axios.interceptors.request.use(function(config) {
            config.data = {id:"002"};
            config.method = "get";
            return config;
        },function(err){
            return Promise.reject(err);
        })
        // 响应拦截器
        // 两个参数，第一个参数为对响应数据的操作，第二个参数为对响应错误的操作
        axios.interceptors.response.use(function(response) {
            return response.data;
        },function(err){
            return Promise.reject(err);
        })
```

##### axios常用快速方法

axios.get(url,{})

axios.post()

## 跨域和模板引擎的应用

### 跨域

###### 同源策略：

* 同源策略是浏览器的一种安全策略，同源：域名、协议、端口完全相同
* 在同源策略下，只有同源的地址才可以相互通过AJAX的方式请求
* 同源或者不同源说的是两个地址之间的关系，不同源地址之间请求我们称之为跨域请求。

#### 跨域解决方案

##### JSONP

* 是一种借助于script标签发送跨域请求的技巧。
* 地址返回一段带有某个全局函数调用的javascript脚本
* 在调用函数中，原本需要返回给客户端的数据通过参数传递给这个函数
* 这样客户端的函数中就可以通过参数得到原本服务端想要返回的数据
* 只能发送get请求

###### jQuery中的JSONP 

dataType : "jsonp"

```javascript
        $btn.on("click", function () {
            $.ajax({
                url: "https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web",
                type: "GET",
                // jQuery封装的采用jsonp的方式获取，并没有用到ajax，只是使用dataType进行判断，如果是jsonp,则走jsonp方式。
                dataType:"jsonp",
                // jsonp 可以设置回调函数的参数名称(必须与后台接口的回调函数参数名保持一致)
                jsonp:"cb",
                // jQ自动分配的回调函数的名称进行重命名
                jsonpCallback:"abc",
                success: function (data) {
                    console.log(data);
                }
            })
        });
```

##### cors跨域

* Cross Origin Resource Share 跨域资源共享
* 这种方案无需客户端作出任何变化，只是在被请求的服务端响应的时候添加一个Access-Control-Allow-Origin的响应头，表示这个资源是否允许指定域请求
* 该响应头的值：
  * *表示允许任意源访问，不安全
  * http://foo.com  允许指定的源访问

### 模板引擎

作用：

* 减少字符串 拼接
* 在模板里解析json，然后跟html内容拼接，性能会更好

```javascript
    <div id="box"></div>
    <script src="../js/jquery.min.js"></script>
    <script src="../js/template-web.js"></script>
    <!-- 创建模板 -->
    <!-- 模板中只能写模板的内容，其他js代码要写在另一个script标签中 -->
    <script id="tem" type="text/html">
     <!-- 循环生成一段html -->
        <% for(var i = 0;i < 5;i++) { %>
            <div><%= i %></div>
            <div><%= name %></div>
        <% } %>
    </script>
    <script>
        // 将模板内容添加到box中
        // 使用template()方法。
        // 有两个参数
        // 第一个是模板，第二个是一个对象型的数据，数据会传给模板，对象内的属性的属性名可以在模板中直接当变量名使用·    
        var $box = $("#box");
        $box.html(template("tem",{name:"tom"}))
    </script>
```

