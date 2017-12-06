function setOnclick() {
    var hideBtn=document.getElementById("hideBtn");
    hideBtn.setOnclick=hideBtn_onClick();
}
function hideBtn_onClick(){
    return function(){
        
    }
}
setOnclick();