// 创建游戏对象
(function(){
    function Game(map){
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        // 初始化游戏
        Game.prototype.start = function(map) {
            this.food.render(this.map);
            this.snake.render(this.map);
        }
    }
    window.Game = Game;
})();
var map = document.getElementById("map");
var game = new Game(map);
game.start();