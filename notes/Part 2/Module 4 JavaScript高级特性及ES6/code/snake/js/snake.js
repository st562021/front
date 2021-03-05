// 创建蛇
(function(){
    var abs = "absolute";
    function Snake(option){
        option = option instanceof Object ? option : {};
        this.width = option.width || 20;
        this.height = option.height || 20;
        // 蛇身
        this.body = [
            {x:3,y:2,color:"red"},
            {x:2,y:2,color:"blue"},
            {x:1,y:2,color:"blue"}
        ];
        // 蛇的移动方向
        this.direction = "right";
    }
    // 向原型添加一个将元素渲染到页面的方法
    Snake.prototype.render = function (map){
        for(var i = 0,len = this.body.length; i < len;i++) {
            var piece = this.body[i];
            var ele = document.createElement("div");
            ele.style.width = this.width + "px";    
            ele.style.height = this.height + "px";
            ele.style.backgroundColor = piece.color;
            ele.style.top =  piece.y * this.height + "px";
            ele.style.left = piece.x * this.width + "px";
            ele.style.position = abs;
            map.appendChild(ele);
        }
    }
    window.Snake = Snake;        
})();
