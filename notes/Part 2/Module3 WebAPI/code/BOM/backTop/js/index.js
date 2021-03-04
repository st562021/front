// 获取元素
var box = document.getElementById("top");
var totop = document.getElementById("totop");
// 1.页面滚动，header区域高度变化的效果
window.onscroll = function() {
    // 获取卷动的长度
    var hight = document.documentElement.scrollTop;
    if(hight > 50) {
        box.className = "header fixed"
        totop.style.display = "block";
    } else {
        box.className = "header"
        totop.style.display = "none";
    }
};
// 2.出现返回键
