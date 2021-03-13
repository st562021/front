var $louceng = $('.louceng');
var $jia = $(".jia");
var $subnav = $(".subnav");
var $back = $(".back");
console.log($jia);
var v1 = $jia.offset().top;
$(document).scroll(function(){
    var v = $(this).scrollTop();
    if(v >= v1) {
        $subnav.show();
    } else {
        $subnav.hide();
    }
    
});