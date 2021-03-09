// 封装工具对象
tool = {
    // 生成随机数函数
    getRandom : function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
      },
    // 生成随机颜色
    getRandomColor : function getRandomColor(){
        var r = this.getRandom(0,255);
        var g = this.getRandom(0,255);
        var b = this.getRandom(0,255);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
}