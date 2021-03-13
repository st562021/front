
var stage = document.getElementById("stage");// 添加10个方块
// 使用数组存放10个小方块，方便后续的定时器中使用
var arr = [];
for(var i = 0;i < 10;i++) {
    var block = new Block(stage,{backgroundColor:tool.getRandomColor()});
    block.render();
    block.positionRandom();
    arr.push(block);
}
setInterval(function(){
    for(var i = 0;i < arr.length;i++) {
        arr[i].positionRandom();
    }
},1500);