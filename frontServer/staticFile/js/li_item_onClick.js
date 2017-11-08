var is_open = false;

function li_item_onClick() {
    var li1 = document.getElementById("li2");
    var li2 = document.getElementById("li3");
    var li3 = document.getElementById("li4");
    var li4 = document.getElementById("li5");
    var li_open = new Array(5),
        li_close = new Array(5);
    li_open[1] = "l1_open 0.3s linear forwards"
    li_open[2] = "l2_open 0.3s linear 0.3s forwards"
    li_open[3] = "l3_open 0.3s linear forwards"
    li_open[4] = "l4_open 0.3s linear 0.3s forwards"

    li_close[1] = "l1_close 0.6s linear forwards"
    li_close[2] = "l2_close 0.3s linear forwards"
    li_close[3] = "l3_close 0.6s linear forwards"
    li_close[4] = "l4_close 0.3s linear forwards"
    console.log(is_open);
    if (is_open) {
        //menu关闭
        li1.style.animation = li_close[1];
        li2.style.animation = li_close[2];
        li3.style.animation = li_close[3];
        li4.style.animation = li_close[4];
        is_open = false;
    } else {
        //menu展开
        li1.style.animation = li_open[1];
        li2.style.animation = li_open[2];
        li3.style.animation = li_open[3];
        li4.style.animation = li_open[4];
        is_open = true;
    }
}