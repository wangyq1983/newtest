    /**
 * Created by pack on 18/1/18.
 */


$(function () {
    function initState() {
        if($(window).width() > 768) {//web端触发
            $('.serHref1').attr('href','/#server1');
            $('.serHref2').attr('href','/#server2');
            $('.serHref3').attr('href','/#server3');
            if(!$('.sShowBox').attr('data-toggle')){
                $('.sShowBox').attr('data-toggle','modal');
            }
        }else{
            $('.serHref1').attr('href','/#serverOne');
            $('.serHref2').attr('href','/#serverTwo');
            $('.serHref3').attr('href','/#serverThree');
            $('.sShowBox').removeAttr('data-toggle');
        }
    }
    //初始化不同端样式
    (function () {
        initState()
    })();

    $(window).resize(function () {
        initState()
    });

    $('.sShowBox').on('click',function () {
        if($(window).width()<=768){
            if($(this).hasClass('cur')){
                $(this).removeClass('cur');
                $(this).next('.mobileImgShow').find('img').hide();
            }else{
                $('.soluMobileImg').hide();
                $(this).addClass('cur').siblings().removeClass('cur');
                $(this).next('.mobileImgShow').find('img').show();
            }
        }
    });

    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop(); //滚动高度
        if(scrollTop > $(window).height()){ //40为缓冲量
            $('.scrollTools').show();
        }else{
            $('.scrollTools').hide();
        }
    });

    $('.iconUp').on('click',function () {
        $('html,body').animate({scrollTop:0},500);
    });

    //服务项 切换
    $('.hmIndex li').hover(
        function () {
            if($(this).hasClass('active')){

            }else{
                $(this).addClass('active').siblings().removeClass('active');
            }
            var index = $(this).index();
            $('.tab-content > div').eq(index).show().siblings().hide();
        }
    );

    //banner效果
    $('.hmbanner > .active').mouseleave(function(e){
        $('.bannerFont').css({
            transform:'rotateY(0deg)',
            transition:'transform 3s'
        })

    });
    //This is for navigation bar show.
    $('.hmbanner > .active').mousemove(function(e){

        var pw = $('.pointWidth');
        var ph = $('.pointHeight');

        var itemHeight = $('.hmbanner > .item').height();


        var isTop = itemHeight/2;
        var isLeft = $(window).width()/2;

        if(e.pageX >= isLeft){
            if(e.pageY>isTop){
                //console.log('down' + e.pageY);
                var lateY = (-(e.pageY - isTop))*0.05;
            }else if(e.pageY < isTop){
                //console.log('top' + e.pageY);
                var lateY = (-(e.pageY - isTop))*0.05;
            }
            //console.log('right' + 'isLeft' + isLeft + 'X' + e.pageX);
            var lateX = (-(e.pageX + isLeft))*0.05;
            $('.bannerFont').css({
                transform:'rotateY(3deg)',
                transition:'transform 2s'
            })

        }else if (e.pageX < isLeft){
            if(e.pageY>isTop){
                //console.log('down' + e.pageY);
                var lateY = (-(e.pageY - isTop))*0.05;
            }else if(e.pageY < isTop){
                //console.log('top' + e.pageY);
                var lateY = (-(e.pageY - isTop))*0.05;
            }
            //console.log('left' + 'isLeft' + isLeft + 'X' + e.pageX);
            var lateX = (-(e.pageX - isLeft))*0.05;
            $('.bannerFont').css({
                transform:'rotateY(-3deg)',
                transition:'transform 2s'

            })

        }

        // console.log($(window).width()+'+'+$(window).height()+'+'+itemHeight);
        // console.log('e.offsetX'+e.offsetX+'--e.pageX'+e.pageX+'--e.screenX'+e.screenX);
        // console.log('e.offsetY'+e.offsetY+'--e.pageY'+e.pageY+'--e.screenY'+e.screenY);



    });


    $(".dropdown").mouseover(function () {
        if($(window).width() > 768){ //web端触发
            $(this).addClass("open");
        }
    });

    $(".dropdown").mouseleave(function(){
        if($(window).width() > 768) {//web端触发
            $(this).removeClass("open");
        }
    });

    $('.serHref1,.serHref2,.serHref3').on('click',function () {
        if($(window).width() <= 768){
            if($(this).parent().parent().parent().hasClass('footMenuList')){
            }else{
                $('.navbar-toggle').click();
            }
        }
    });

    $('.mSerTitle').on('click',function () {
       if($(this).hasClass('cur')){
           $(this).removeClass('cur').next('.mSerCon').show()
       }else{
           $(this).addClass('cur').next('.mSerCon').hide();
       }
    });

    $('.footMenuList dl dt').on('click',function () {

        if($(window).width() <= 768){ //手机端触发
            if($(this).next('dd').is(':visible')){
                $(this).addClass('cur');
                $(this).next('dd').hide();
            }else{
                $(this).removeClass('cur');
                $(this).next('dd').show();
            }
        }
    });

    // $('#server1,#serverOne .mSerCon').on('click',function () {
    //    window.location.href = 'product-deatil.html';
    // });

    //
    // $('.navbar-toggle').on('click',function () {
    //
    //     return false;
    // });
    //
    // $('body').on('click',function () {
    //     $('.navbar').attr('aria-expanded','false');
    // })
});