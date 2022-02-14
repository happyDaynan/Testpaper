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


};


// 取wet
//function getWet(paperid, mydata) {

//    var wet = 0;

//    mydata.forEach(function (item) {
//        if (paperid == item.id) {
//            wet =  item.avgWet;
//        }           
//    });

//    return wet;   
//}

// 變更基重
function changewet(selectname, wet) {
    
    switch (selectname) {
        case 'p1':
            $('#p1-Wet').html(wet)
            break;
        case 'p2':
            $('#p2-Wet').html(wet)
            break;
        case 'p3':
            $('#p3-Wet').html(wet) 
            break;
        case 'c1':
            $('#c1-Wet').html(wet)
            break;
        case 'c2':
            $('#c2-Wet').html(wet)
            break;

    }
}

// 處理破裂指數與環壓指數
function ringruptureindex(papertypeid ,wet, Ringruptureindexdata) {

    var rank;
    

    // console.log(rank);
    // var data = Ringruptureindexdata.find(element => element.papertypeid == papertypeid);

    // console.log('in', Ringruptureindexdata);
    

}

// Corrugatedinfo
function cheangeinfo(id, Corrugateddetail) {

    

    var cinfo = Corrugateddetail.find(element => element.Id == id);

    if (id != 6) {
        
        $('#c-rate').html(cinfo.corrugatedrate);
        
    } else {

        var a = Corrugateddetail.find(element => element.Id == 1).corrugatedrate;
        var b = Corrugateddetail.find(element => element.Id == 2).corrugatedrate;
        let c = a + '/' + b;

        $('#c-rate').html(c);
    }
    
    
    $('#c-high').html(cinfo.corrugatedhigh);
    $('#k').html(cinfo.k);
}