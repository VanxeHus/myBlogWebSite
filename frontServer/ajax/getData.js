var ajax={};
ajax.getRealUrl=function(url){
    //获得后端url,进行跨域ajax
    return "http://127.0.0.1:2333"+url;
}

//ajax获取数据
ajax.GetArti_data=function(method,url,view){
    
    url=ajax.getRealUrl(url);
    ajax.request=new XMLHttpRequest();
    ajax.request.view=view;
    ajax.request.onreadystatechange=ajax.GetArti_callback;
    ajax.request.open(method,url)
    ajax.request.send();
}
ajax.GetAbst_data=function(method,url,view){
    url=ajax.getRealUrl(url);
    ajax.request=new XMLHttpRequest();
    ajax.request.view=view;
    ajax.request.onreadystatechange=ajax.GetAbst_callback;
    ajax.request.open(method,url);
    ajax.request.send();
}
ajax.GetAbst_callback=function(view){
    if(ajax.request.status===4){
        if(ajax.request.status===200){
            console.log("getAbst_success:",ajax.request.responseText);
            return this.view.RenderArticle(data);
        }else{
            console.log("getAbst_fail:",ajax.request.responseText);
            return this.view.RenderNot_found();
        }
    }else{
        console.log("onHandle getAbst");
    }
}
ajax.GetArti_callback=function(view){
    if (ajax.request.readyState===4){//ajax请求成功
        //判断请求的具体结果
        if(ajax.request.status===200){
            //成功，调用view层渲染
            console.log("getArti_success",ajax.request.responseText);
            return this.view(ajax.request.responseText);
        }else{
            //失败,根据状态码渲染
            console.log("getArti_fail",ajax.request.responseText);
            return this.view(ajax.request.status);
        }
    }else{
        console.log("onHandle getArti");
    }
}
export {ajax};