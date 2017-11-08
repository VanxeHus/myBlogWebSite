var view={};

//渲染文章列表
view.RenderArticle=function(data){
    var div=document.createElement("div");
    div.innerHTML=data;
    document.body.appendChild(div);
    console.log(data);
}
//渲染404
view.RenderNotfound=function(status){
    var div=document.createElement("div");
    div.innerHTML=status;
    document.body.appendChild(div);
    console.log(data);
}   

export {view};