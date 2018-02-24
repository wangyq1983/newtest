/**
 * 渲染数据
 * Created by wangyuqiang on 2018/2/8.
 */
var host = {
    'dev':'http://api-dev.jiyoushe.cn/v2/',
    'verify':'http://api-verify.jiyoushe.cn/v2/',
    'api':'http://api.jiyoushe.cn/v2/'
};

var hostApi = host.verify;
var requestList = {
    'dataUrl' : hostApi + 'circles/get_circle_category',
    'cirList' : hostApi + 'circles/get_circle_list',
    'cirDetail' : hostApi + 'circles/get_circle_detail'
};

// 获取url参数
function UrlSearch()
{
    var name,value;
    var str=location.href; //取得整个地址栏
    var num=str.indexOf("?");
    str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
    var arr=str.split("&"); //各个参数放到数组里
    for(var i=0;i < arr.length;i++){
        num=arr[i].indexOf("=");
        if(num>0){
            name=arr[i].substring(0,num);
            value=arr[i].substr(num+1);
            this[name]=value;
        }
    }
}
var Request=new UrlSearch(); //实例化

console.log('当前页面'+Request.page);
// 分页
 var pageAll = 64;
 var pageStep = 10;
function pageFunc() {
    var pageLength = Math.ceil(pageAll/pageStep);
    var pageArr = [];
    var nowPage = Number(Request.page);
    for(var i = nowPage; i > (nowPage-5); i--){
        pageArr.push(i);
        if((nowPage-5) <= 1){
            if(i == 1){
                break
            }
        }
    }
    pageArr.reverse();
    for(var i = nowPage; i<(nowPage+5); i++){
        pageArr.push(i);
        if((nowPage+5)>=pageLength){
            if(i == pageLength){
                break;
            }
        }
    }

    var pArr = pageArr.filter(function (el,index,self) {
        return self.indexOf(el) === index; //数组去重
    });

    function createPage(x) {
            var parm = window.location.pathname+'?page='+x;
            if(x == Request.page){
                var pageStyle = "pageCurrent";
            }else{
                var pageStyle = "pageNum";
            }
        return '<a href=' + parm + ' class='+ pageStyle +'>'+x+'</a>';
    }

    var pageList = pArr.map(createPage);
    console.log(pageList);

    //上一页
    var prevPage = "<a class='prevPage' href='javascript:;'>上一页</a>";
    //下一页
    var nextPage = "<a class='nextPage' href='javascript:;'>下一页</a>";
    //首页
    var firstPage = "<a class='firstPage' href=''>首页</a>";
    //尾页
    var endPage = "<a class='endPage' href=''>尾页</a>";

    var selectOption = [];
    for(var i = 1; i <= pageLength; i++){
        if(i==Request.page){
            var optionBox = "<option value =" + i + "  selected='selected'>" + i + "</option>";
        }else{
            var optionBox = "<option value =" + i + ">" + i + "</option>";
        }

        selectOption.push(optionBox);
    }

    var selectPage = "<select class='selectPage'>" + selectOption + "</select>";

    var pagelb = "<span class='pagelb'></span>";
    var pageWarp = firstPage+prevPage+pagelb+nextPage+endPage+selectPage;

    //console.log(selectOption + typeof JSON.stringify(selectOption));
    // $('.selectPage').append(JSON.stringify(selectOption));
    // $('.selectPage').append(tempOption);
    console.log($('.selectPage').html());
    // $('.selectPage').on('change',function () {
    //     window.location = window.location.pathname + '?page=' + this.value;
    // });



    $('.pages').append(pageWarp);
    $('.pagelb').append(pageList);
    var currentPage = $('.pageCurrent').html();
    if(currentPage >= 1 && currentPage <= pageLength ){
        if(currentPage ==1){
            var nextPageNum = window.location.pathname+'?page='+(Number(currentPage)+1);
        }else if(currentPage == pageLength){
            var prevPageNum = window.location.pathname+'?page='+(Number(currentPage)-1);
        }else{
            var prevPageNum = window.location.pathname+'?page='+(Number(currentPage)-1);
            var nextPageNum = window.location.pathname+'?page='+(Number(currentPage)+1);
        }
    }

    var firstPageNum = window.location.pathname + '?page=1';
    var endPageNum = window.location.pathname + '?page=' + pageLength;
    $('.prevPage').attr('href',prevPageNum);
    $('.nextPage').attr('href',nextPageNum);
    $('.firstPage').attr('href',firstPageNum);
    $('.endPage').attr('href',endPageNum);




}

//obj格式转str格式
function objToStr(obj) {
    var strParmas ='';
    var firstP = 1;
    for(var p in obj){
        var linkAdd = "";
        if(firstP == 0){
            linkAdd = '&';
        }
        strParmas = strParmas + linkAdd + p + '=' + obj[p];
        firstP = 0;
    }
    return strParmas;
}


/**
 * 列表get请求
 * @param dataUrl   请求地址
 * @param params    参数obj格式
 * @param type      1为get请求  2为post请求
 * @param callback  回调函数
 */
function dataReq(dataUrl,params,type,callback) {
    var getParams = objToStr(params);
    if(type == 1){ //get请求
        getParams = '?'+getParams;
    }
    var dataUrl = dataUrl + getParams;
    console.log(dataUrl);
    $.ajax({
        url:dataUrl,
        type:'GET',
        timeout: 5000,
        beforeSend:function () {
            var loading = '<div class="loading">加载中</div>';
            $('body').append(loading);
        },
    }).done(function (res, textStatus) {
        $('.loading').remove();
        console.log(res);
        callback(res);
    }).fail(function (jqXHR, textStatus) {
        console.log(textStatus);
        switch (textStatus){
            case 'timeout':
                jqXHR.abort();
                $('#infos').html('连接超时');
                break;
            case 'error':
                $('#infos').html('数据无法访问');
                break;
        }
    })
}

