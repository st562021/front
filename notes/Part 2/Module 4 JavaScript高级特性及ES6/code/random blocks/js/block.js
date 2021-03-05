// 封装小方块构造函数
// 由于小方块的属性非常多，传入太多参数不利于代码执行，因此将需要设置的属性放进一个对象option中传入
// 防止用户传入不规范写法或传入空，因此需要设置保底操作
// 颜色、位置、宽高
function Block(parent,option){
    this.backgroundColor = option.backgroundColor || "red";
    this.width = option.width || 20;
    this.height = option.height || 20;
    this.x = option.x || 0;
    this.y = option.y || 0;
    this.parent = parent;
}
    // 渲染到页面上，方法要设置在原型对象上
    Block.prototype.render = function(){
        // 后期设置随机位置时需要使用，但是不能再另一个函数中调用其他函数的局部变量
        // 因此直接将ele属性添加到原型对象上，方便使用
        this.ele = document.createElement("div");
        this.ele.style.width = this.width + "px";
        this.ele.style.height = this.height + "px";
        this.ele.style.backgroundColor = this.backgroundColor;
        this.ele.style.top = this.y + "px";
        this.ele.style.left = this.x + "px";
        this.parent.appendChild(this.ele);
    };
    Block.prototype.positionRandom = function(){
        // 计算位置
        this.x = tool.getRandom(0,(this.parent.clientWidth / this.width - 1) * this.width);
        this.y = tool.getRandom(0,(this.parent.clientHeight / this.height - 1) * this.height);
        this.ele.style.top = this.y + "px";
        this.ele.style.left = this.x + "px";

    }
