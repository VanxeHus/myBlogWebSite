var ajax = {};
ajax.getRealurl = function (url) {
    //获得后端url,进行跨域ajax
    return "http://127.0.0.1:2333" + url;
}
//创建ajax进行数据获取
ajax.createAjax=function(method, url, view,callback,button){
    url = ajax.getRealurl(url);
    ajax.request = new XMLHttpRequest();
    ajax.request.onreadystatechange = callback(view,button);
    ajax.request.open(method, url);
    ajax.request.send();
}
//ajax获取文章数据
ajax.GetArti_data = function (method, url, view,button) {
    view.ReaderLoading(1,1);
    //等待第一个动画结束再进行数据获取
    setTimeout(this.createAjax,1800,method,url,view,this.GetArti_callback,button);  
}
//文章回调
ajax.GetArti_callback = function (view,button) {
    return function () {
        this.view=view;
        if (ajax.request.readyState === 4) {//ajax请求成功
            //判断请求的具体结果
            if (ajax.request.status === 200) {s
                //成功，调用view层渲染
                //console.log("getArti_success", ajax.request.responseText);
                this.view.RenderArticle(ajax.request.responseText);
                this.view.ReaderLoading(1,0);
            } else {
                //失败,根据状态码渲染
                //console.log("getArti_fail", ajax.request.responseText);
                this.view.RenderNot_found(ajax.request.status);
                this.view.ReaderLoading(1,0);
            }
            //获取数据结束才让按钮重新开始响应
            button.disabled=false;
        } else {
            console.log("onHandle getArti");
        }
    }
}
//ajax获取摘要数据
ajax.GetAbst_data = function (method, url, view,button) {
    view.ReaderLoading(1,1);
    //等待第一个动画结束再进行数据获取
    setTimeout(this.createAjax,1800,method,url,view,this.GetAbst_callback,button);
}
//摘要回调
ajax.GetAbst_callback = function (view,button) {
    return function () {
        this.view = view;
        if (ajax.request.readyState === 4) {
            if (ajax.request.status === 200) {
                //console.log("getAbst_success:", ajax.request.responseText);
                this.view.ReaderAbst(ajax.request.responseText);
                this.view.ReaderLoading(1,0);
            } else {
                //console.log("getAbst_fail:", ajax.request.responseText);
                this.view.RenderNot_found(ajax.request.responseText);
                this.view.ReaderLoading(1,0);
            }
            //获取数据结束才让按钮重新开始响应
            button.disabled=false;
        } else {
            console.log("onHandle getAbst");
        }
    }
}
ajax.GetMain_data=function(method,url,view){
}
export { ajax };