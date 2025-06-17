var username ;
var namalengkap;
var $progress = $('#nav-loading');
var $progressBar = $('.progress-bar');
var gethumburger;
//console.log=function(){};

var ismobile='n';
document.addEventListener('DOMContentLoaded', function () {

    cekdatausersorout();
    showfotvidmodal();

    //document.getElementById('editsavedetail').setAttribute('style','display:none;');
    //fix modal error
    document.addEventListener('hide.bs.modal', function (event) {
        if (document.activeElement) {
        document.activeElement.blur();
        }
    });
    ///
    if (localStorage.getItem('username') && localStorage.getItem('username') != '') {
        username=localStorage.getItem('username');
        namalengkap =JSON.parse(localStorage.getItem('datauser')).namalengkap;
        document.getElementById('namalengkap').innerHTML=namalengkap;
    }
    else {
        window.location.href = '/';
    }

    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/huawei/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/IPhone/i) || navigator.userAgent.match(/IPad/i) || navigator.userAgent.match(/IPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        ismobile = 'y';
    }

    gethumburger=JSON.parse(getCookie('hamburger'));

    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    console.log(dataarray.dataadminlist);

    //additemdropfilter(dataarray.itemsdata);
    
    //document.getElementById('addextracharge').style.display='none';
    showtabel(dataarray.itemsdata);

});

///////////
/* function hitungtugassaya(array) {
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

    console.log('alll ');
    console.log(dataarray);
    var arrays=dataarray.dataadminlist;

    const jumlahProsesProduksi = arrays.filter(element =>
        element.packde_qc!='true'&&element.code2.toLowerCase()=='up'&&element.stockprodukcode.toLowerCase()!='true'&&element.forcedsent!='true'&&element.status.toLowerCase()!='selesai'&&element.approval_produkjadi!='true'&&element.status.toLowerCase()=='selesai produksi'
    ).length;

    //&&!element.deliveryunit.toLowerCase().includes('third party')

    //document.getElementById('totaltugassayapesanan').textContent=`(${jumlahProsesProduksi})`;
    var arraystocks=dataarray.stockupholsterydatabase;

    console.log('alll arraystocks');
    console.log(arraystocks.length);

    const jumlahProsesProduksistock = arraystocks.filter(element =>
      element.qty!='0'&&element.upholstery_selesaibuatstock==='true'&&element.fixcreatein!='instocked'&&element.approval_produkjadi!='true'
    ).length;

    document.querySelectorAll('[name="totaltugassayapesanan"]').forEach(el => {
        el.textContent = `(${jumlahProsesProduksi})`; 
    });

    document.querySelectorAll('[name="totaltugassayapesananstock"]').forEach(el => {
      el.textContent = `(${jumlahProsesProduksistock})`; 
    });

    document.querySelectorAll('[name="totaltugassayaall"]').forEach(el => {
        el.textContent = `${jumlahProsesProduksi+jumlahProsesProduksistock}`; 
    });
} */
/////

///////////

function loadingbawahupdate(array) {
    $progressBar.css('width', '0%');
    $progress.show();
    setTimeout(function () {
        /* var modaldut=['modaldetail']
        for (let i = 0; i < modaldut.length; i++) {
        const element = modaldut[i];
        if (document.getElementById(element).style.display=='block') {
            hidemodal(element);
        }
        } */
        $progressBar.css('width', '65%');
        setTimeout(function () {
        $progressBar.css('width', '85%');
        setTimeout(function () {
            $progressBar.css('width', '97%');
            setTimeout(function () {
            showtabel(array);
            $progress.hide();
            
            }, 500);
        }, 2000);
        }, 2000);
    }, 1000);
}



////////////////////////////////////////////////
///////////// socket io //////////////////
const socket = io();

socket.on('newadditemadminlist',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    console.log('datas ====');
    console.log(datas);

    //var fixarrays=dataarray.dataadminlist;
    for (let i = 0; i < datas.length; i++) {
        const element = datas[i];
        dataarray.dataadminlist.unshift(element);
        
        
    }
    document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
    console.log('dataarray.dataadminlist ====');
    console.log(dataarray.dataadminlist);
    loadingbawahupdate(dataarray.itemsdata);
});



socket.on('neweditfullitemadminlist',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    console.log('edit item [1]');
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        //var indexarray= dataarray.dataadminlist.indexOf(element);
        if (datas[0].id_transaksi==element.id_transaksi) {
        console.log('edit item [2]');
        var historiold=JSON.parse(element.history);

        var historiesnew=[...datas[0].history,...historiold];

        dataarray.dataadminlist[i].order_date=datas[0].order_date;
        dataarray.dataadminlist[i].orderdate_mili=datas[0].orderdate_mili;

        dataarray.dataadminlist[i].delivered_date=datas[0].delivered_date;

        dataarray.dataadminlist[i].delivereddate_mili=datas[0].delivereddate_mili;
        
        dataarray.dataadminlist[i].platform=datas[0].platform;

        dataarray.dataadminlist[i].finalprice=datas[0].finalprice;

        dataarray.dataadminlist[i].diskon_persen=datas[0].diskon_persen;

        dataarray.dataadminlist[i].diskon_amount=datas[0].diskon_amount;

        dataarray.dataadminlist[i].notes=datas[0].notes;

        dataarray.dataadminlist[i].buyername=datas[0].buyername;
        
        dataarray.dataadminlist[i].phonenumber=datas[0].phonenumber;
        
        dataarray.dataadminlist[i].address=datas[0].address;
        
        dataarray.dataadminlist[i].deliveryunit=datas[0].deliveryunit;
        
        dataarray.dataadminlist[i].extracharge=datas[0].extracharge;
        
        dataarray.dataadminlist[i].history=JSON.stringify(historiesnew);
        

        
        console.log(dataarray.dataadminlist);
        }
    }
    document.getElementById('itemalls').textContent=JSON.stringify(dataarray);
        
    document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);

    console.log('edit item [3]');
    loadingbawahupdate(dataarray.itemsdata);
}); 

socket.on('newquickedititemadminlist',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].order_date=datas.order_date;
        dataarray.dataadminlist[i].orderdate_mili=datas.orderdate_mili;
        dataarray.dataadminlist[i].delivered_date=datas.delivered_date;
        dataarray.dataadminlist[i].item=datas.item;
        dataarray.dataadminlist[i].qty=datas.qty;
        dataarray.dataadminlist[i].finalprice=datas.finalprice;
        dataarray.dataadminlist[i].price=datas.price;
        dataarray.dataadminlist[i].diskon_persen=datas.diskon_persen;
        dataarray.dataadminlist[i].diskon_amount=datas.diskon_amount;
        dataarray.dataadminlist[i].status=datas.status;
        dataarray.dataadminlist[i].code2=datas.code2;
        dataarray.dataadminlist[i].notes=datas.notes;
        dataarray.dataadminlist[i].colorvariant=datas.colorvariant;
        dataarray.dataadminlist[i].history=datas.history;
        dataarray.dataadminlist[i].extracharge=datas.extracharge;
        
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newquickedititemadminlist');
        }
        
    }

    loadingbawahupdate(dataarray.itemsdata);
});

socket.on('neweditforcestatus',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.status;
        dataarray.dataadminlist[i].confirmroute=datas.confirmroute;
        dataarray.dataadminlist[i].forcedsent=datas.forcedsent;
        dataarray.dataadminlist[i].forcedcancel=datas.forcedcancel;
        dataarray.dataadminlist[i].reschedule=datas.reschedule;
        dataarray.dataadminlist[i].delayproduksi=datas.delayproduksi;
        dataarray.dataadminlist[i].toppriority=datas.toppriority;
        dataarray.dataadminlist[i].pending=datas.pending;
        dataarray.dataadminlist[i].history=datas.history;

        
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        }
    }
    loadingbawahupdate(dataarray.dataadminlist);
});


socket.on('neweditforcestatusnew',function(datas){
  var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
  datas.tglinputmili.toString();
  console.log('data masuk status force');
  console.log(datas);

  var flag=0;//0 belum ada input id transaksi, 1 = sudah ada
  for (let i = 0; i < dataarray.forcestatusrequest.length; i++) {
    const element = dataarray.forcestatusrequest[i];
    if (element.id_transaksi==datas.id_transaksi) {
      dataarray.forcestatusrequest[i].status=datas.status;
      dataarray.forcestatusrequest[i].forcedsent=datas.forcedsent;
      dataarray.forcestatusrequest[i].forcedcancel=datas.forcedcancel;
      dataarray.forcestatusrequest[i].reschedule=datas.reschedule;
      dataarray.forcestatusrequest[i].delayproduksi=datas.delayproduksi;
      dataarray.forcestatusrequest[i].toppriority=datas.toppriority;
      dataarray.forcestatusrequest[i].pending=datas.pending;
      dataarray.forcestatusrequest[i].stockprodukcode=datas.stockprodukcode;
      dataarray.forcestatusrequest[i].stockuses=datas.stockuses;
      dataarray.forcestatusrequest[i].history=JSON.stringify(datas.history);
      dataarray.forcestatusrequest[i].tglinputmili=datas.tglinputmili;
      dataarray.forcestatusrequest[i].namalengkap=datas.namalengkap;
      dataarray.forcestatusrequest[i].username=datas.username;
      dataarray.forcestatusrequest[i].approval_forcestatus=datas.approval_forcestatus;

      flag=1;
    }
    
  }

  if (flag==0) {
    dataarray.forcestatusrequest.push(datas);
  }

  //

  console.log('data baru status force');
  console.log(dataarray.forcestatusrequest);

  document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
  loadingbawahupdate(dataarray.itemsdata);
});

socket.on('newklikprinpodo',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

    for (let i = 0; i < datas.length; i++) {
        const element = datas[i];
        for (let j = 0; j < dataarray.dataadminlist.length; j++) {
        const element2 = dataarray.dataadminlist[j];
        if (element2.id_transaksi==element.id_transaksi) {
            dataarray.dataadminlist[j].klik_print_podo='true';
        }
        }
        
    }
    document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
    
    loadingbawahupdate(dataarray.itemsdata);
});

socket.on('newprintpodo',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.status;

        dataarray.dataadminlist[i].history=datas.history;
        
        dataarray.dataadminlist[i].print_podo='true';

        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.itemsdata);
});

socket.on('newpackde-kirimbahan',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.history[0].details.status;

        dataarray.dataadminlist[i].packde_kirimbahan='true';
        dataarray.dataadminlist[i].packde_kirimbahan_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.itemsdata);
});

socket.on('newupholsteryselesai',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.history[0].details.status;

        dataarray.dataadminlist[i].upholstery_jadi='true';
        dataarray.dataadminlist[i].upholstery_img=datas.filenamesupload;

        dataarray.dataadminlist[i].history=datas.history;

        
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.itemsdata);
});


socket.on('newapprovalproduk',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.status;

        dataarray.dataadminlist[i].history=datas.history;
        
        dataarray.dataadminlist[i].approval_produkjadi='true';

        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.itemsdata);
});


socket.on('newpackdereject-ambil',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status='Proses Produksi (Re)';

        dataarray.dataadminlist[i].upholstery_jadi='';
        dataarray.dataadminlist[i].approval_produkjadi='';
        dataarray.dataadminlist[i].reject_ambil_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.itemsdata);
});

socket.on('newpackdereject-qc',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status='Proses Produksi (Re)';

        dataarray.dataadminlist[i].upholstery_jadi='';
        dataarray.dataadminlist[i].approval_produkjadi='';
        dataarray.dataadminlist[i].packde_ambil='';
        dataarray.dataadminlist[i].reject_qc_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.itemsdata);
});

socket.on('newpackde-ambil',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.history[0].details.status;

        dataarray.dataadminlist[i].packde_ambil='true';
        dataarray.dataadminlist[i].packde_ambil_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.itemsdata);
});

socket.on('newpackde-qc',function(datas){

    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status=datas.history[0].details.status;

        dataarray.dataadminlist[i].packde_qc='true';
        dataarray.dataadminlist[i].packde_qc_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.itemsdata);

});


socket.on('newdriverreject-ambil',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status='Proses Produksi (Re)';

        dataarray.dataadminlist[i].upholstery_jadi='';
        dataarray.dataadminlist[i].approval_produkjadi='';
        dataarray.dataadminlist[i].packde_ambil='';
        dataarray.dataadminlist[i].packde_qc='';
        dataarray.dataadminlist[i].reject_qc_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.itemsdata);
});

socket.on('newdriverreject-terimakonsumen',function(datas){
    var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);
    for (let i = 0; i < dataarray.dataadminlist.length; i++) {
        const element = dataarray.dataadminlist[i];
        if (datas.id_transaksi==element.id_transaksi) {
        dataarray.dataadminlist[i].status='Proses Produksi (Re)';

        dataarray.dataadminlist[i].upholstery_jadi='';
        dataarray.dataadminlist[i].approval_produkjadi='';
        dataarray.dataadminlist[i].packde_ambil='';
        dataarray.dataadminlist[i].packde_qc='';
        dataarray.dataadminlist[i].pickup_driver='';
        dataarray.dataadminlist[i].reject_qc_img=datas.folderfoto;

        dataarray.dataadminlist[i].history=datas.history;
        
        document.getElementById('itemalls').dataset.json=JSON.stringify(dataarray);
        //updatecarditem(datas,'newupholsteryselesai');
        }
        
    }
    loadingbawahupdate(dataarray.itemsdata);
});


//////////////// tutup socket ////////////////////
//tampilkan data tabel
function showtabel(dataarray) {
    var myobj = document.getElementById("divhpsdata");
    if (myobj)
        myobj.remove();

    var datatab = document.getElementById(`alldattab`);

    var divhapus = document.createElement("tbody");
    divhapus.setAttribute('id', 'divhpsdata');

    
    divhapus.innerHTML=returnarray(dataarray);
    datatab.appendChild(divhapus);

    setTimeout(function () { 
        if (gethumburger.tipeuser.toLowerCase()=='supervisor') {
            hitungtugassaya_universal();
        }
        document.getElementById('showmainpage').removeAttribute('style');
        document.getElementById('loadingskeleton').setAttribute('style','display:none;');
    
    },500);
}

function returnarray(dataitem) {
    var fixarrays=[];
    for (let i = 0; i < dataitem.length; i++) {
        const element = dataitem[i];
        if (!element.product.includes("S-")&&!element.product.includes("IN-")&&!element.product.includes("OUT-")&&element.product!=='AETHER - Track Light - Body Plain Connector'&&element.product!=='AETHER - Track Light - Body 90 Connector'&&element.product!=='AETHER - Track Light - Leg Connector') {
            fixarrays.push(element);

        }//&&element.product!==''
    }
    return fixarrays.map(function(element,index) {
        return `
            <tr data-json='${JSON.stringify(element)}' id="dataitem-${index}">
                <td style="text-align: left;vertical-align: middle;"  title="${element.product}">
                    ${element.product}
                </td>

                <td style="text-align: left;vertical-align: middle;"  title="${element.code2}">
                    ${element.code2}
                </td>

                <td style="text-align: center;vertical-align: middle;">
                    ${element.stockprodukcode=='true'?'<i class="bi bi-check-circle-fill" style="color:green;"></i>':""}
                </td>

                <td style="text-align: left;vertical-align: middle;"  title="Rp ${formatMoney(element.price1)}">Rp 
                    ${formatMoney(element.price1)}
                </td>

                <td style="text-align: center;vertical-align: middle;">
                    ${element.investor=='true'?'<i class="bi bi-check-circle-fill" style="color:green;"></i>':""}
                </td>

                <td style="text-align: left;vertical-align: middle;">
                    ${element.investor_mj!=''?element.investor_mj:""}
                </td>

                <td style="text-align: center;vertical-align: middle;">
                    <span class="badge text-bg-secondary" style="cursor:pointer;" data-bs-toggle="modal" data-bs-target="#mediaModal" data-url="${element.image==''?'/assets/lainnya/item-default.png':element.image}">View</span>
                </td>

                <td style="text-align: left;vertical-align: middle;">
                    <span class="badge text-bg-secondary" onclick="klikedititem('${index}')" style="cursor:pointer;">Edit</span>
                </td>
            </tr>
        `;
    }).join('');
}
//tutup tampilkan data tabel


///add more item
let itemIndex = 1;

function additems() {
    /* var jumlahitems=parseInt(document.getElementById('jumlahitembeli').innerHTML);
    jumlahitems=1+itemIndex;
    document.getElementById('jumlahitembeli').innerHTML=jumlahitems; */

    itemIndex++;
    renderItems();
    document.getElementById("judulitem-1").classList.remove('d-none');
    console.log('itemIndex');
    console.log(itemIndex);
}

function renderItems() {
    // Buat elemen baru tanpa menghapus yang lama
    const itemsContainer = document.getElementById('itemsContainer');
    const newItem = document.createElement('div');
    newItem.className = "partitems";
    newItem.id = `item-${itemIndex}`;
    newItem.innerHTML =`
        <hr>
        <b><p id="judulitem-${itemIndex}">Produk ${itemIndex}</p></b>
        <div class="row">
            <div class="col">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" style="background-color: rgb(226, 221, 221);font-size: 12px;width: 120px;"><span class="text-danger">*&nbsp;</span> Product Name</span>
                    <input type="text" class="form-control" id="productname-${itemIndex}" name="productname" placeholder="Product Name" style="font-size: 12px;"  oninput="oninputdata()">
                </div>

                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" style="background-color: rgb(226, 221, 221);width: 120px;"><span class="text-danger">*&nbsp;</span> Code</span> 

                    <select class="form-select" id="code2-${itemIndex}" name="code2" onchange="oninputdata()" style="font-size: 12px;">
                        <option selected disabled value="">Code item</option>
                        <option>FMCG</option>
                        <option>NON</option>
                        <option>UP</option>
                    </select>
                </div>

                <div class="form-check mb-3" title="Centang jika produk untuk C5">
                    <input class="form-check-input" type="checkbox" value="" id="stockprodukcode-${itemIndex}" name="stockprodukcode" onchange="oninputdata()">
                    <label class="form-check-label" for="stockprodukcode-${itemIndex}">
                        Product C5
                    </label>
                </div>

                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" style="background-color: rgb(226, 221, 221);font-size: 12px;width: 120px;"><span class="text-danger">*&nbsp;</span> Price</span>
                    <input type="number" class="form-control" id="price1-${itemIndex}" name="price1" placeholder="0" style="font-size: 12px;"  oninput="oninputdata()">
                </div>
                
                
            </div>

            <div class="col">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" style="background-color: rgb(226, 221, 221);font-size: 12px;width: 120px;">Fabric Size</span>
                    <input type="text" class="form-control" id="fabricsize-${itemIndex}" name="fabricsize" placeholder="Angka contoh 0 atau 4.2" style="font-size: 12px;"  oninput="oninputdata()">
                </div>
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" style="background-color: rgb(226, 221, 221);font-size: 12px;width: 120px;">No Fabric Size</span>
                    <input type="text" class="form-control" id="nofabricsize-${itemIndex}" name="nofabricsize" placeholder="Angka contoh 0 atau 4.2" style="font-size: 12px;"  oninput="oninputdata()">
                </div>
                
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" style="background-color: rgb(226, 221, 221);font-size: 12px;width: 120px;">Price Fabric</span>
                    <input type="number" class="form-control" id="pricefabric-${itemIndex}" name="pricefabric" placeholder="0" style="font-size: 12px;"  oninput="oninputdata()">
                </div>

                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" style="background-color: rgb(226, 221, 221);font-size: 12px;width: 120px;">Price Leather</span>
                    <input type="number" class="form-control" id="priceleather-${itemIndex}" name="priceleather" placeholder="0" style="font-size: 12px;"  oninput="oninputdata()">
                </div>
            </div>
        </div>
        <hr>
            
            <div class="row">
                <div class="col">
                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text" style="background-color: rgb(226, 221, 221);font-size: 12px;width: 120px;"><span class="text-danger">*&nbsp;</span> SKU</span>
                        <input type="text" class="form-control" id="sku-${itemIndex}" name="sku" placeholder="SKU" style="font-size: 12px;"  oninput="oninputdata()">
                    </div>
                </div>
                <div class="col">
                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text" style="background-color: rgb(226, 221, 221);font-size: 12px;width: 120px;"><span class="text-danger">*&nbsp;</span> Image Link</span>
                        <input type="text" class="form-control" id="imaglink-${itemIndex}" name="imaglink" placeholder="Link image tokopedia" style="font-size: 12px;"  oninput="oninputdata()">
                    </div>
                </div>
            </div>
        <hr>
        <p>Isi bagian ini jika product adalah berjenis investor</p>
        <div class="row">
            <div class="col">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" style="background-color: rgb(226, 221, 221);width: 120px;">Investor</span> 

                    <select class="form-select" id="investor-${itemIndex}" name="investor" onchange="oninputdata()" style="font-size: 12px;">
                        <option selected value="">Pilih</option>
                        <option value="true">Yes</option>
                        <option value="">No</option>
                    </select>
                </div>
            </div>
            <div class="col">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" style="background-color: rgb(226, 221, 221);width: 120px;">Tipe (optional)</span> 

                    <select class="form-select" id="investormj-${itemIndex}" name="investormj" onchange="oninputdata()" style="font-size: 12px;">
                        <option selected value="">Pilih</option>
                        <option>Marco</option>
                        <option>Jansen</option>
                    </select>
                </div>

                <div class="d-flex justify-content-end">
                <button type="button" class="removeItem btn btn-danger btn-sm" id="removeItem-${itemIndex}" onclick="removeItem(${itemIndex})"><i class="bi bi-trash3-fill" style="color: white;"></i>&nbsp;Hapus item</button>
            </div>
            </div>
        </div>
    `;
    itemsContainer.appendChild(newItem);
}

// Fungsi untuk menghapus item 
function removeItem(itemId) {
    document.getElementById(`item-${itemId}`).remove();

    // Ambil ulang semua item yang tersisa
    const items = document.querySelectorAll('#itemsContainer > .partitems');

    // Reset itemIndex agar sesuai urutan terbaru
    itemIndex = items.length;

    items.forEach((item, index) => {
        const newId = index + 1; // Sesuaikan index baru
    

        // Update elemen ID
        item.id = `item-${newId}`;
        // Perbarui ID dan "for" label semua input dalam item
        const inputs = item.querySelectorAll('input, select, span, p, button');
        inputs.forEach(input => {
            const oldId = input.id;
            if (oldId) {
                const newInputId = oldId.replace(/\d+$/, newId); // Ganti angka di ID dengan newId
                input.id = newInputId;
            }
        });

        // Perbarui tombol hapus dengan parameter ID baru
        const removeButton = item.querySelector('.removeItem');
        removeButton.setAttribute('onclick', `removeItem(${newId})`);

        //perbarui judul item judulitem
        const judulitem = item.querySelector(`#judulitem-${newId}`);
        judulitem.innerHTML=`Produk ${newId}`;

    });
}
////tutup add more product

///on input

var alldataadditem=[];//untuk add product dan edit product

//
var addoredit='add';//add edit

function oninputdata() {
    alldataadditem.length=0;
    document.querySelectorAll('#itemsContainer > .partitems').forEach((itemCard,index) => {
        let product = itemCard.querySelector('[name="productname"]').value;
        let code2 = itemCard.querySelector('[name="code2"]').value;
        let stockprodukcode = itemCard.querySelector('[name="stockprodukcode"]').checked?'true':'';
        let price1 = itemCard.querySelector('[name="price1"]').value;

        let fabric_size = itemCard.querySelector('[name="fabricsize"]').value;
        let nofabric_size = itemCard.querySelector('[name="nofabricsize"]').value;
        
        let price_fabric = itemCard.querySelector('[name="pricefabric"]').value;
        let price_leather = itemCard.querySelector('[name="priceleather"]').value;
        
        let sku = itemCard.querySelector('[name="sku"]').value;
        let image = itemCard.querySelector('[name="imaglink"]').value;

        let investor = itemCard.querySelector('[name="investor"]').value;
        let investor_mj = itemCard.querySelector('[name="investormj"]').value;

        var data;
        if (addoredit=='add') {
            data={
                product,
                price1,
                sku,
                code1:'-',
                code2,
                price2:'x',
                stockprodukcode,
                stockproduk_ref:'0',
                stockproduk_refbuy:'0',
                nofabric_size:nofabric_size==''?'0':nofabric_size,
                fabric_size:fabric_size==''?'0':fabric_size,
                image,
                price_fabric,
                price_leather,
                investor,
                investor_mj
            };
            console.log('alldataadditem ==========');
            
        }else if (addoredit=='edit') {
            data={
                product,
                price1,
                sku,
                code1:oldedititem[0].code1,
                code2,
                price2:oldedititem[0].price2,
                stockprodukcode,
                stockproduk_ref:oldedititem[0].stockproduk_ref,
                stockproduk_refbuy:oldedititem[0].stockproduk_refbuy,
                nofabric_size:nofabric_size==''?'0':nofabric_size,
                fabric_size:fabric_size==''?'0':fabric_size,
                image,
                price_fabric,
                price_leather,
                investor,
                investor_mj
            }
            console.log('edit product editting ==========');
        }

        alldataadditem.push(data);


    });
    
    console.log(alldataadditem);
}

//tutup on input

//klik tombol add new
function klikopenaddnew(prosedur) {
    //prosedur == 'product' prosedur == 'platform'  prosedur == 'deliveryunit'

    if (prosedur == 'product') {
        $('#modaladdnewitem').modal('show');
    }
}

//klik close modal add new
$('#modaladdnewitem').on('hidden.bs.modal', function (e) {
    addoredit='add';
    document.getElementById(`modaladdnewitemlabel`).innerHTML="Add New Product";
    document.getElementById(`addnewitemtombolfooters`).classList.remove('d-none');
    document.getElementById(`edititemtombolfooters`).classList.add('d-none');
    
    //reset inputan di modal
    document.querySelectorAll('#itemsContainer > .partitems').forEach((itemCard,index) => {
        itemCard.querySelector('[name="productname"]').value='';
        itemCard.querySelector('[name="code2"]').value='';
        
        itemCard.querySelector('[name="code2"]').disabled=false;

        itemCard.querySelector('[name="stockprodukcode"]').checked=false;
        itemCard.querySelector('[name="price1"]').value='';

        itemCard.querySelector('[name="fabricsize"]').value='';
        itemCard.querySelector('[name="nofabricsize"]').value='';
        
        itemCard.querySelector('[name="pricefabric"]').value='';
        itemCard.querySelector('[name="priceleather"]').value='';
        
        itemCard.querySelector('[name="sku"]').value='';
        itemCard.querySelector('[name="imaglink"]').value='';
        

        itemCard.querySelector('[name="investor"]').value='';
        itemCard.querySelector('[name="investormj"]').value='';

        if (index!=0) {
            itemCard.remove(); // Langsung remove elemen ke-2 dan seterusnya
            itemIndex = 1;
        }

    });

    
});
//

//////////////////////////////////universal

function loadingpopup() {
    Swal.fire({
        title: "Loading ...",
        allowOutsideClick: false,
        html:
        '<progress id="loadingpersenpopoups" value="20" max="100" style="width:100%"> </progress>',
        showConfirmButton: false,
    });
    //Swal.showLoading();
    
}
function warningpopup(icon,title) {
    Swal.fire({
        icon:icon,
        title:'',
        text: title,
        showConfirmButton: false,
        timer: 1500
    });
}
//////
function reloadnewdata() {
  var xhrzx = new XMLHttpRequest();
        
  xhrzx.open("GET", `/adminlist/reloaded`);
  xhrzx.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhrzx.setRequestHeader('authorization', xi);
  //xhrzx.send(JSON.stringify(data));
  xhrzx.addEventListener("load", () => {
    var resdat = JSON.parse(xhrzx.responseText);

    
  });
}

function menuarrowklik(id) {
  if (document.getElementById('klikhidebar').className!='bi bi-caret-right-fill toggle-btn') {
    if (document.getElementById(id).className=='bi bi-caret-down-fill hide-on-collapse') {
        document.getElementById(id).className='bi bi-caret-up-fill hide-on-collapse';
        $(`#${id}-extend`).show();
    }else{
        document.getElementById(id).className='bi bi-caret-down-fill hide-on-collapse';
        $(`#${id}-extend`).hide();
    }
}

}
////////
$(document).ready(function () { resizetable(); });
function resizetable() {

    var top_nav_height = 0;
    var bottom_nav_height = 0;
    var mobilespasi = 0;
    var kotaktombolatas= 0;//$("#kotaktombolatas").height();
    var window_height = $(window).height();
    if (ismobile == 'y') {
        console.log('mobile');

        top_nav_height = //$("#navatas-mobile").height();
        bottom_nav_height = 0;//$("#navbarbawah").height();
        mobilespasi = 0;//$("#mobile-spase-nav").height();
    } else {
        console.log('pc');
        top_nav_height = $("#nav-atas").height();
        mobilespasi = 0//$("#mobile-spase-nav").height();
    }

    var heigfix = window_height - (top_nav_height + bottom_nav_height + mobilespasi+kotaktombolatas);
    console.log(`heihhhh : ${bottom_nav_height}`);

    document.getElementById('main-pages').setAttribute('style', `max-height:${heigfix}px!important;overflow-y: scroll!important;overflow-x: hidden!important;`);

}
//------------------------------------
function hidemodal(modalid) {
    
    var myModalEl = document.getElementById(modalid);
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
}
///--------------------------------
