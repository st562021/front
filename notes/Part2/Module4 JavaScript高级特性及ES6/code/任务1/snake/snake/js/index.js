// 性能优化，减少浏览器发送HTTP请求的次数，将所有js代码写在一个文件中，只请求一次
// 性能优化，传入window和undefined
// window：我们通过window向外暴露，但是当在局部作用域内找不到时，就会跳出并在全局中进行查找，耗时，传入window则可以直接使用，节省时间
// 代码压缩时，window会被替换为更短的字符，加快传输速度 
// undefined：在ie8及以下，undefined可以被修改，此时我们要确保使用的是一个未定义的值，因此传入undefined
// ===================================工具=============================
(function (window, undefined) {
    var tool = {
        // 生成随机数函数
        getRandom: function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
        },
        // 生成随机颜色
        getRandomColor: function getRandomColor() {
            var r = this.getRandom(0, 255);
            var g = this.getRandom(0, 255);
            var b = this.getRandom(0, 255);
            return "rgb(" + r + "," + g + "," + b + ")";
        }
    };
})(window, undefined);
// ===================================食物=============================
(function (window, undefined) {
    function Food(option) {
        option = option instanceof Object ? option : {};
        this.backgroundColor = option.backgroundColor || "green";
        this.width = option.width || 20;
        this.height = option.height || 20;
        this.x = option.x || 0;
        this.y = option.y || 0;
        // 增加一个数组来存放后期渲染的所有食物
        this.arr = [];
    }
    var abs = "absolute";
    // 渲染到页面上，方法要设置在原型对象上
    Food.prototype.render = function (map) {
        // 后期设置随机位置时需要使用，但是不能再另一个函数中调用其他函数的局部变量
        // 因此直接将ele属性添加到原型对象上，方便使用
        this.ele = document.createElement("div");
        this.ele.style.width = this.width + "px";
        this.ele.style.height = this.height + "px";
        this.ele.style.backgroundColor = this.backgroundColor;
        this.ele.style.top = (tool.getRandom(0, (map.clientHeight / this.height - 1) * this.height)) + "px";
        this.ele.style.left = (tool.getRandom(0, (map.clientWidth / this.width - 1) * this.width)) + "px";
        this.ele.style.position = abs;
        map.appendChild(this.ele);
        this.arr.push(this.ele);
    };
    // 移除食物方法
    Food.prototype.remove = function (map, i) {
        map.removeChild(this.arr[i]);
        this.arr.splice(i, 1)
    };
    window.Food = Food;
})(window, undefined);
// ===================================蛇===============================
(function (window, undefined) {
    var abs = "absolute";
    function Snake(option) {
        option = option instanceof Object ? option : {};
        this.width = option.width || 20;
        this.height = option.height || 20;
        // 蛇身
        this.body = [
            { x: 3, y: 2, color: "red" },
            { x: 2, y: 2, color: "blue" },
            { x: 1, y: 2, color: "blue" }
        ];
        // 蛇的移动方向
        this.direction = "right";
        // 数组存放所有的蛇节，用来后续删除
        this.arr = [];
    }
    // 向原型添加一个将元素渲染到页面的方法
    Snake.prototype.render = function (map) {
        for (var i = 0, len = this.body.length; i < len; i++) {
            var piece = this.body[i];
            var ele = document.createElement("div");
            ele.style.width = this.width + "px";
            ele.style.height = this.height + "px";
            ele.style.backgroundColor = piece.color;
            ele.style.top = piece.y * this.height + "px";
            ele.style.left = piece.x * this.width + "px";
            ele.style.position = abs;
            map.appendChild(ele);
            this.arr.push(ele);
        }
    };
    // 让蛇运动的方法
    Snake.prototype.move = function () {
        // 蛇在移动时，更改位置，后一节到达前一节的位置，要倒着改变，否则会在赋值给下一个之前位置发生变化，导致位置不准确
        var head = this.body[0];
        // 蛇身子的移动
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        // 蛇头移动要根据方向来走
        switch (this.direction) {
            case "right":
                head.x += 1;
                break;
            case "left":
                head.x -= 1;
                break;
            case "up":
                head.y -= 1;
                break;
            case "down":
                head.y += 1;
                break;
        }
    };
    // 删除蛇
    Snake.prototype.remove = function (map) {
        // 清空HTML结构
        var len = this.arr.length;
        for (var i = 0; i < len; i++) {
            map.removeChild(this.arr[i]);
        }
        // 清空数组
        this.arr = [];
    }
    window.Snake = Snake;
})(window, undefined);
// ===================================游戏==============================
(function (window, undefined) {
    var that;
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
        // 记录最大位置
        var maxX = this.map.clientWidth / this.snake.width;
        var maxY = this.map.clientHeight / this.snake.height;
        // 当前蛇头的位置
        var headX, headY;

        // 初始化游戏
        Game.prototype.start = function (map) {
            this.food.render(this.map);
            this.food.render(this.map);
            this.food.render(this.map);
            this.snake.render(this.map);
            snakeRun();
            bindKey();
        }
        // 让蛇运动
        // 由于这个方法只在game内部调用，外部不会调用，因此不需要写在原型对象上，封装一个私有函数即可
        function snakeRun(map) {
            // 定时器，让蛇运动
            var timer;
            console.log(this.map.clientWidth);
            timer = setInterval(function () {
                // 此时使用的this指向window，而非game对象，因此需要在外部定义全局变量存储this
                that.snake.move();
                // 判断是否出界，如果出界，则停止运动
                headX = that.snake.body[0].x;
                headY = that.snake.body[0].y;
                var hX = headX * that.snake.width;
                var hY = headY * that.snake.height;
                // 判断是否吃到食物及吃到食物后的行为
                for (var i = 0; i < that.food.arr.length; i++) {
                    if (that.food.arr[i].offsetWidth === hX && that.food.arr[i].offsetHeight === hY) {
                        // 吃到食物
                        that.food.remove(that.map);
                        // 再生成一个新食物
                        that.food.render(that.map);
                        // 添加新蛇节
                        var new1 = that.snake.body[that.snake.body.length - 1];
                        that.snake.arr.push(new1);
                        that.snake.body.push({
                            x: new1.x,
                            y: new1.y,
                            color: new1.color
                        });
                    }
                }
                if (headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
                    clearInterval(timer);
                    alert("Game Over");
                } else {
                    that.snake.remove(that.map);
                    that.snake.render(that.map);
                }
            }, 500);
        }
        // 键盘控制运动方向
        function bindKey() {
            // 给整个页面绑定一个键盘事件，保证任何位置点击都能控制蛇
            document.onkeydown = function (e) {
                switch (e.keyCode) {
                    case 37:
                        that.snake.direction = "left";
                        break;
                    case 38:
                        that.snake.direction = "up";
                        break;
                    case 39:
                        that.snake.direction = "right";
                        break;
                    case 40:
                        that.snake.direction = "down";
                        break;
                }
            };
        }
    }
    window.Game = Game;
})(window, undefined);
// ====================================主函数===========================
(function (window, undefined) {
    var map = document.getElementById("map");
    var game = new Game(map);
    game.start();
})(window, undefined);