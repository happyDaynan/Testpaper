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

// 變更基重
function changewet(selectname, wet, ringrupturedata, r1dict, r2dict) {

    // 破裂指數 與 環壓指數
    let rupture = ringrupturedata.ruptureIndex;
    let rupturestrength = wet / 100 * rupture;
    let ring = ringrupturedata.ringIndex;
    let ringstrength = wet / 100 * ring;

    r1dict[selectname] = rupturestrength;
    r2dict[selectname] = ringstrength;

    
    switch (selectname) {
        
        case 'p1':
            $('#p1-Wet').html(wet);
            $('#p1-rupture').html(rupture);
            $('#p1-rupturestrength').html(rupturestrength);
            $('#p1-ring').html(ring);
            $('#p1-ringstrength').html(ringstrength);
            break;
        case 'p2':
            $('#p2-Wet').html(wet);
            $('#p2-rupture').html(rupture);
            $('#p2-rupturestrength').html(rupturestrength);
            $('#p2-ring').html(ring);
            $('#p2-ringstrength').html(ringstrength);
            break;
        case 'p3':
            $('#p3-Wet').html(wet);
            $('#p3-rupture').html(rupture);
            $('#p3-rupturestrength').html(rupturestrength);
            $('#p3-ring').html(ring);
            $('#p3-ringstrength').html(ringstrength);
            break;
        case 'c1':
            $('#c1-Wet').html(wet);
            $('#c1-rupture').html(rupture);
            $('#c1-rupturestrength').html(rupturestrength);
            $('#c1-ring').html(ring);
            $('#c1-ringstrength').html(ringstrength);
            break;
        case 'c2':
            $('#c2-Wet').html(wet);
            $('#c2-rupture').html(rupture);
            $('#c2-rupturestrength').html(rupturestrength);
            $('#c2-ring').html(ring);
            $('#c2-ringstrength').html(ringstrength);
            break;

    }
    return r1dict, r2dict;
    
}

// 處理破裂指數與環壓指數
function ringruptureindex(papertypeid ,wet, Ringruptureindexdata) {

    let r;

    if (wet <= 99) {
        r = '2';
    }
    else if (wet >= 100 && wet <= 159) {
        r = '0';
    }
    else {
        r = '1';
    }

    let data = Ringruptureindexdata.find(element => element.paperTypeId == papertypeid && element.rank == r);

    return data;
    
}

// Corrugatedinfo
function cheangeinfo(id, Corrugateddetail) {
 
    let cinfo = Corrugateddetail.find(element => element.Id == id);

    
    if (cinfo.corrugatedrate == 0) {

        let c = 1.56 + '/' + 1.36;

        $('#c-rate').html(c);
    }
    else {
        $('#c-rate').html(cinfo.corrugatedrate);
    }

    $('#c-high').html(cinfo.corrugatedhigh);
    $('#k').html(cinfo.k);

    return cinfo.corrugatedrate;

}


// 處理破裂強度
function rupturestrength(r1dict) {

    let p1_rupture = r1dict.p1 ? r1dict.p1 : 0;
    let p2_rupture = r1dict.p2 ? r1dict.p2 : 0;
    let p3_rupture = r1dict.p3 ? r1dict.p3 : 0;

    let c1_rupture = r1dict.c1 ? r1dict.c1 : 0;
    let c2_rupture = r1dict.c2 ? r1dict.c2 : 0;

    let r = Math.min(c1_rupture, c2_rupture);

    let rupture_sum = p1_rupture + p2_rupture + p3_rupture + r;
    let rupture_sum_kpa = rupture_sum * 98.0665;

    $('#rupture_sum').html(rupture_sum);
    $('#rupture_sum_kpa').html(rupture_sum_kpa);

}

// 處理環壓強度
function ringstrength(r2dict, rate) {


    let ringstrength_sum = 0;

    let p1_ring = r2dict.p1;
    let p2_ring = r2dict.p2;
    let p3_ring = r2dict.p3;

    let c1_ring = r2dict.c1;
    let c2_ring = r2dict.c2;

    if (Object.values(r2dict).length === 3 && rate != 0) {

        ringstrength_sum = (p1_ring + p2_ring + c1_ring* rate)*1000/152.4;

        // console.log('長度3');
    } else {

        // console.log('長度5');
            
        ringstrength_sum = ((p1_ring + p2_ring + p3_ring + c1_ring* 1.36) + (c2_ring * 1.56))*1000/152.4;

    }

    if (ringstrength_sum > 0) {

        let x = ringstrength_sum * 9.80665;
        let y = ringstrength_sum * 2.204613/39.37;
        $('#ring_sum_1').html(ringstrength_sum);
        $('#ring_sum_2').html(x);
        $('#ring_sum_3').html(y);
       
    }
    
    
    
}