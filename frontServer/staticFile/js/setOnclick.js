var btnOnclick = {};
btnOnclick.SetHB_onclick = function () {
    var hideBtn = document.getElementById("hideBtn");
    console.log("on");
    hideBtn.onclick = btnOnclick.hideBtn_onclick();
}
btnOnclick.SetMenu_onclick = function () {
    var menuList = document.getElementById("menuMx").children;
    var i;
    for (i = 0; i < menuList.length; ++i) {
        menuList[i].onclick = btnOnclick.meneBtn_onclick(i);
        console.log(menuList[i].children[0].pathname);
    }

}
btnOnclick.hideBtn_onclick = function () {
    var containerOrigin = "container";
    var containerHide_menu = "container hideMenu";
    var containerHide_abst = "container hideMenu hideAbst";

    var btnHide = "hideMenu_btn";
    var btnShow = "hideMenu_btn hideMenu_btn1"
    var container = document.getElementById("main");
    var hideBtn = document.getElementById("hideBtn");
    var menuStatus = 2;
    var btnStatus = 1;
    if (container.className.length == 9)
        menuStatus = 2;
    else if (container.className.length == 18)
        menuStatus = 1;
    else if (container.className.length == 27)
        menuStatus = 0;

    if (menuStatus == 0)
        btnStatus = 0;
    else if (menuStatus == 2)
        btnStatus = 1;
    console.log("menu:" + menuStatus + "btns:" + btnStatus);
    return function () {
        if (menuStatus == 2) {
            container.className = containerHide_menu;
            menuStatus = 1;
        } else if (menuStatus == 1 && btnStatus == 1) {
            container.className = containerHide_abst;
            menuStatus = 0;
            btnStatus = 0;
            hideBtn.className = btnShow;
        } else if (menuStatus == 1 && btnStatus == 0) {
            container.className = containerOrigin;
            menuStatus = 2;
            btnStatus = 1;
            hideBtn.className = btnHide;
        } else if (menuStatus == 0) {
            container.className = containerHide_menu;
            menuStatus = 1;
        }
        console.log("ment:" + menuStatus + "btn:" + btnStatus);
        console.log("inside");
    }
}
btnOnclick.meneBtn_onclick = function (num) {
    return function () {
        var menuMx = document.getElementById("menuMx");
        var menuList = menuMx.children;
        var liActive = "liActive";
        var liUnactive = "";
        var i;
        for (i = 0; i < menuList.length; ++i) {
            if (i === num)
                menuList[i].className = liActive;
            else
                menuList[i].className = liUnactive;
        }
        var coverLayer=document.getElementById("coverLayer");
        coverLayer.className+=" containCover_layerLoad";
        return false;
    }
}
export { btnOnclick };