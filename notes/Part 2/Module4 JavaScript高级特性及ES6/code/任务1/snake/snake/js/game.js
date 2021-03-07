// 创建游戏对象
(function () {
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
                for(var i = 0; i < that.food.arr.length; i++) {
                    if(that.food.arr[i].offsetWidth === hX && that.food.arr[i].offsetHeight === hY){
                        // 吃到食物
                        that.food.remove(that.map);
                        // 再生成一个新食物
                        that.food.render(that.map);
                        // 添加新蛇节
                        var new1 = that.snake.body[that.snake.body.length - 1];
                        that.snake.arr.push(new1);
                        that.snake.body.push({
                            x:new1.x,
                            y:new1.y,
                            color:new1.color
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
            document.onkeydown = function(e){
                switch(e.keyCode){
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
})();
