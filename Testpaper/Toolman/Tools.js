function Dataprocessing(longstr, widthstr, highstr) {

    // Input 長、寬、高
    let long = parseInt(longstr);
    let width = parseInt(widthstr);
    let hight = parseInt(highstr);

    // 紙板 長、寬
    let cardboardlong, cardboardwidth, cardboardarea = 0;
    
    // 紙板長
    if (width !== 0 && long !== 0) {

        cardboardlong = (width + long) * 2;

        if (cardboardlong > 0) {
            $('#perimeter').html(cardboardlong);
            $('#cardboardlong').html(cardboardlong);
        }

    }

    // 紙板寬
    if (width !== 0 && hight !== 0) {

        cardboardwidth = width + hight;

        if (cardboardwidth > 0) {

            $('#cardboardwidth').html(cardboardwidth);
        }
    }


    // 面積
    if (cardboardwidth > 0 && cardboardlong > 0) {

        // 面積紙板長寬那邊那個
        cardboardarea = cardboardwidth * cardboardlong / 1000000;

        $('#cardboardarea').html(cardboardarea)
    }

    // 

    

 

};