var ajax={};
ajax.getRealUrl=function(url){
    //获得后端url,进行跨域ajax
    return "http://127.0.0.1:2333"+url;
}
var count=0
ajax.callback=function(view){
    count++;
    console.log(ajax.request.readyState," ",count)
    if (ajax.request.readyState===4){//ajax请求成功
        //判断请求的具体结果
        if(ajax.request.status===200){
            //成功，调用view层渲染
            console.log("success",ajax.request.responseText);
            return this.view(ajax.request.responseText);
        }else{
            //失败,根据状态码渲染
            console.log("fail",ajax.request.responseText);
            return this.view(ajax.request.status);
        }
    }else{
        console.log("onHandle。。。。");
    }
}
//ajax获取数据
ajax.GetData=function(method,url,view){
    
        url=ajax.getRealUrl(url);
        ajax.request=new XMLHttpRequest();
        ajax.request.view=view;
        ajax.request.onreadystatechange=ajax.callback;
        ajax.request.open(method,url)
        ajax.request.send();
}

export {ajax};