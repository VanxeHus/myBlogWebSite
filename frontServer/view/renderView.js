import { setTimeout } from "timers";

var view={};
//渲染文章
view.RenderArticle=function(data){
    var div=document.createElement("div");
    var artiMain=document.getElementById("artiMain");
    artiMain.innerHTML=data;
    this.ReaderLoading(1,0);
    //div.innerHTML=data;
    //artiMain.appendChild(div);
}
view.ReaderAbst=function(data){
    var artiMain=document.getElementById("artiMain");
    artiMain.innerHTML="";
    var jdata=JSON.parse(data)
    for(var i=0;i<jdata.length;++i){
        //单个摘要
        var abstItem=document.createElement("div");
        abstItem.className="blogItem";
        abstItem.id=jdata[i].Id;
        //摘要标题
        var heading=document.createElement("h1");
        heading.innerHTML=jdata[i].Title;
        //摘要内容
        var content=document.createElement("p");
        content.innerHTML=jdata[i].Abstr;
        abstItem.appendChild(heading);
        abstItem.appendChild(content);
        artiMain.appendChild(abstItem);
    }
}
//渲染404
view.RenderNot_found=function(status){
    var div=document.createElement("div");
    var artiMain=document.getElementById("artiMain");
    div.innerHTML=status;
    artiMain.appendChild(div);
}   
//渲染加载动画
view.ReaderLoading=function(loadingNum,status){
    //需要渲染的两个元素
    var classCover_layer=document.getElementById("classCover_layer");
    var artiCover_layer=document.getElementById("artiCover_layer");

    //初始类名以及加载样式类名
    var artiOrigin_str="artiCover_layer";
    var artiLoading_str=" artiCover_layerLoading";
    var classOrigin_str="classCover_layer";
    var classLoading_str=" classCover_layerLoading";
    if(loadingNum===2){
        //点击主菜单
        if(status===1){
            classCover_layer.className+=classLoading_str;
            artiCover_layer.className+=artiLoading_str;
        }else if(status===0){
            classCover_layer.className=classOrigin_str;
            artiCover_layer.className=artiOrigin_str;
        }
    }
    else if(loadingNum==1){
        //点击内分类菜单
        if(status===1){
            artiCover_layer.className+=artiLoading_str;
        }else if(status===0){
            artiCover_layer.className=artiOrigin_str;
        }
    }
}
export {view};