// 封装食物构造函数
// 此时定义的函数、变量都相当于是全局变量，容易造成污染-->要解决此问题，想到使用IIFE自调用函数来关住作用域
// 关住后，Food()称为局部函数，外面无法调用，-->通过window暴露Food对象
// 由于小方块的属性非常多，传入太多参数不利于代码执行，因此将需要设置的属性放进一个对象option中传入
// 防止用户传入不规范写法或传入空，因此需要设置保底操作
// 颜色、位置、宽高
(function () {
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
        this.ele.style.top = tool.getRandom(0, (map.clientHeight / this.height - 1) * this.height) + "px";
        this.ele.style.left = tool.getRandom(0, (map.clientWidth / this.width - 1) * this.width) + "px";
        this.ele.style.position = abs;
        map.appendChild(this.ele);
        this.arr.push(this.ele);
    };
    // 移除食物方法
    Food.prototype.remove = function (map,i) {
        map.removeChild(this.arr[i]);
        this.arr.splice(i, 1)
    };
    window.Food = Food;
})();


