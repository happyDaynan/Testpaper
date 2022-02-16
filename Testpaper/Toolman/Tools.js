function Dataprocessing(longstr, widthstr, highstr, areastr, basewet) {

    // Input 長、寬、高
    let long = parseInt(longstr);
    let width = parseInt(widthstr);
    let hight = parseInt(highstr);
    let area_1 = parseInt(areastr);
    let area_2 = 0;

    console.log('in basewet', basewet);

    if (width !== 0 && long !== 0 && hight !== 0) {

        // 紙板 長、寬
        let cardboardlong, cardboardwidth, cardboardarea = 0;

        cardboardlong = (width + long) * 2;
        

        cardboardwidth = width + hight;

        $('#perimeter').html(cardboardlong);
        $('#cardboardlong').html(cardboardlong);
        $('#cardboardwidth').html(cardboardwidth);
   
        // 面積紙板長寬那邊那個
        cardboardarea = cardboardwidth * cardboardlong / 1000000;

        $('#cardboardarea').html(cardboardarea);

        area_2 = cardboardarea;

        
    }    
        
};

// 變更基重
function changewet(selectname, wet, ringrupturedata, r1dict, r2dict) {

    // 破裂指數 與 環壓指數
    let rupture = ringrupturedata.ruptureIndex;
    let rupturestrength = (wet / 100 * rupture).toFixed(3);
    let ring = ringrupturedata.ringIndex;
    let ringstrength = (wet / 100 * ring).toFixed(2);

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

// 處理 楞率 K 楞高
function cheangeinfo(id, Corrugateddetail) {
 
    let cinfo = Corrugateddetail.find(element => element.Id == id);

    let rate = cinfo.corrugatedrate;
    
    if (rate == 0) {

        let c = 1.56 + '/' + 1.36;

        $('#c-rate').html(c);
    }
    else {
        $('#c-rate').html(rate);
    }

    $('#c-high').html(cinfo.corrugatedhigh);
    $('#k').html(cinfo.k);

    return rate;

}


// 處理破裂強度
function rupturestrength(r1dict) {
    

    let p1_rupture = r1dict.p1 ? r1dict.p1 : 0;
    let p2_rupture = r1dict.p2 ? r1dict.p2 : 0;
    let p3_rupture = r1dict.p3 ? r1dict.p3 : 0;

    let c1_rupture = r1dict.c1 ? r1dict.c1 : 0;
    let c2_rupture = r1dict.c2 ? r1dict.c2 : 0; 
      


    let r = Math.min(parseFloat(c1_rupture), parseFloat(c2_rupture));
    
    let rupture_sum = (parseFloat(p1_rupture) + parseFloat(p2_rupture) + parseFloat(p3_rupture) + r).toFixed(2);
    
    let rupture_sum_kpa = (rupture_sum * 98.0665).toFixed(0);

    $('#rupture_sum').html(rupture_sum);
    $('#rupture_sum_kpa').html(rupture_sum_kpa);

}

// 處理環壓強度
function ringstrength(r2dict, rate) {


    let ringstrength_sum = 0;

    let p1_ring = parseFloat(r2dict.p1);
    let p2_ring = parseFloat(r2dict.p2);
    let p3_ring = parseFloat(r2dict.p3);

    let c1_ring = parseFloat(r2dict.c1);
    let c2_ring = parseFloat(r2dict.c2);

    let r2dict_len = Object.values(r2dict).length;


    if (r2dict_len === 3 && rate != 0) {

        ringstrength_sum = (p1_ring + p2_ring + c1_ring* rate)*1000/152.4;

        
    } else {
         
        ringstrength_sum = ((p1_ring + p2_ring + p3_ring + c1_ring* 1.36) + (c2_ring * 1.56))*1000/152.4;

    }

    if (ringstrength_sum > 0) {


        //ringstrength_sum = (ringstrength_sum).toFixed(2);
        let x = (ringstrength_sum * 9.80665).toFixed(2);
        let y = (ringstrength_sum * 2.204613 / 39.37).toFixed(2);
        $('#ring_sum_1').html((ringstrength_sum).toFixed(2));
        $('#ring_sum_2').html(x);
        $('#ring_sum_3').html(y);

              
    }

    
    return ringstrength_sum;
    
}

// 處理箱壓強度
function boxstrength(ch, rs, p, k) {

    // 邊壓強度 ringstrength_sum
    let rs_sum = parseFloat(rs); 

    // 楞高
    let high = parseFloat(ch);

    // 周長
    let perimeter = parseFloat(p);

    // k
    let kv = parseFloat(k);


    let McKee_v = 5.87 * rs_sum * Math.pow((ch * p), 0.5) / 1000;

    // 採購公式
    let purchase_v = kv * (rs_sum * 152.4 / 1000) * Math.pow((perimeter / 10), 1 / 3);

    console.log(typeof (McKee_v), McKee_v);

    console.log(typeof (purchase_v), purchase_v);

    $('#m1').html((McKee_v).toFixed(2));
    $('#m2').html((McKee_v * 0.9).toFixed(2));
    $('#m3').html((McKee_v * 0.8).toFixed(2));
    $('#m4').html((McKee_v * 0.7).toFixed(2));

    $('#p1').html((purchase_v).toFixed(2));
    $('#p2').html((purchase_v * 0.9).toFixed(2));
    $('#p3').html((purchase_v * 0.8).toFixed(2));
    $('#p4').html((purchase_v * 0.7).toFixed(2));

}


// 處理基重
function wetsum(r3dict, rate ) {

    

 

    let sumwet = 0;

    let p1_wet = r3dict.p1;
    let p2_wet = r3dict.p2;
    let p3_wet = r3dict.p3;

    let c1_wet = r3dict.c1;
    let c2_wet = r3dict.c2;

    let r3dict_len = Object.values(r3dict).length;

    if (r3dict_len === 3) {

        sumwet= Number(p1_wet + p2_wet + c1_wet * rate);

    }
    else {

        sumwet = Number(p1_wet + p2_wet + p3_wet + c1_wet * 1.36 + c2_wet * 1.56);
    }

    if (sumwet > 0) {
        $('#wet-info').html('基重' + sumwet + 'g/m2');
    }

    return sumwet;

}