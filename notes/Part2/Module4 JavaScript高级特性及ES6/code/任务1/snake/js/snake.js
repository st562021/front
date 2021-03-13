// 创建蛇
(function () {
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
    Snake.prototype.remove = function (map){
        // 清空HTML结构
        var len = this.arr.length;
        for(var i = 0; i < len;i++) {
            map.removeChild(this.arr[i]);
        }
        // 清空数组
        this.arr = [];
    }
    window.Snake = Snake;
})();
