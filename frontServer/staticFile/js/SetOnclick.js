function SetOnclick() {
    var ul_nodes=document.getElementById("menu_mx").getElementsByTagName("li");
    for(var i=0;i<ul_nodes.length;++i){
        ul_nodes[i].onclick=node_onClick(i,ul_nodes);
    }
}
function node_onClick(n,ul_nodes){
    return function(){
        for(var i=0;i<ul_nodes.length;++i){
            if(i==n)
                ul_nodes[i].setAttribute("class","li_active");
            else
                ul_nodes[i].setAttribute("class","");
        }
    }
}
SetOnclick();