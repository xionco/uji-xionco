import express from 'express';
import { Worker } from 'worker_threads';
import basicAuth from '../config/basicAUth.js';
import cookieParser from 'cookie-parser';
//import userdata from '../mogosDB/mongosdata.js';
const router = express.Router();

router.get("/", function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken=cookies.hamburger;
    if (userToken) {
        // Cookie tidak ditemukan
        datausers=JSON.parse(cookies.hamburger);
        
        console.log(datausers);
    }else{
        datausers=[];
        console.log(datausers);
    }
    

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminlist';
    var diskripsi='';
    var navatasactive='adminlist-semuapesanan';

    var bukawal='awal';
    const worker = new Worker('./worker/workeradminlist.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        res.status(200).render('adminlist',{titlepage:'Admin List',diskripsi,czz,versionall,jzz,navatasactive,datas});
    });
    
});

router.get("/classy", function (req, res) {
    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminlistclassy';
    var diskripsi='';
    var navatasactive='adminlist-semuapesanan';
    var tugassaya='';

    var bukawal='awal';
    const worker = new Worker('./worker/workeradminlist.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        res.status(200).render('adminlistclassy',{titlepage:'Admin List',diskripsi,czz,versionall,jzz,navatasactive,datas,tugassaya});
    });
    
});

router.get("/classy/tugassaya", function (req, res) {
    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminlistclassy-tugassaya';
    var diskripsi='';
    var navatasactive='adminlist-semuapesanan';
    var tugassaya='tugassaya';

    var bukawal='awal';
    const worker = new Worker('./worker/workeradminlist.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        res.status(200).render('adminlistclassy',{titlepage:'Tugas Saya | Admin List',diskripsi,czz,versionall,jzz,navatasactive,datas,tugassaya});
    });
    
});

router.get("/admc5", function (req, res) {
    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminlistc5';
    var diskripsi='';
    var navatasactive='adminlist-semuapesanan';
    var tugassaya='';

    var bukawal='awal';
    const worker = new Worker('./worker/workeradminlist.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        res.status(200).render('adminlistc5',{titlepage:'Admin List',diskripsi,czz,versionall,jzz,navatasactive,datas,tugassaya});
    });
    
});

router.get("/admc5/tugassaya", function (req, res) {
    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='adminlistc5-tugassaya';
    var diskripsi='';
    var navatasactive='adminlist-semuapesanan';
    var tugassaya='tugassaya';

    var bukawal='awal';
    const worker = new Worker('./worker/workeradminlist.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        res.status(200).render('adminlistc5',{titlepage:'Admin List',diskripsi,czz,versionall,jzz,navatasactive,datas,tugassaya});
    });
    
});

router.get("/reloaded",async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    var bukawal='awal';
    const worker = new Worker('./worker/workeradminlist.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
    
});

router.get("/additem", function (req, res) {
    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='additemadminlist';
    var diskripsi='';
    var navatasactive='additemadmin';

    var bukawal='additem';
    const worker = new Worker('./worker/workeradminlist.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        res.status(200).render('additemadminlist',{titlepage:'Add Item | Admin List',diskripsi,czz,versionall,jzz,navatasactive,datadropdown:datas});
    });
    
});


router.post('/saveadditemx', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    var datenow = new Date();
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Augustus", "September", "Oktober", "November", "Desember"];

    var year = datenow.getFullYear();
    
    const tglinputmili=datenow.getTime();

    const bulan= req.body.bulan;//monthNames[datenow.getMonth()];
    const tahun=req.body.tahun;//year;
    const id_transaksi=req.body.id_transaksi;

    const no_transaksi = req.body.no_transaksi;
    const order_date = req.body.order_date;
    const orderdate_mili = req.body.orderdate_mili;
    const delivered_date = req.body.delivered_date;
    const delivereddate_mili = req.body.delivereddate_mili;
    const platform = req.body.platform;
    const item = req.body.item;
    const qty = req.body.qty;
    const finalprice = req.body.finalprice;
    const price = req.body.price;
    const diskon_persen = req.body.diskon_persen;
    const diskon_amount = req.body.diskon_amount;
    const notes = req.body.notes;
    const colorvariant = req.body.colorvariant;
    const buyername = req.body.buyername;
    const confirmroute = req.body.confirmroute;
    const phonenumber = req.body.phonenumber;
    const address = req.body.address;
    const status = req.body.status;
    const forcedsent = req.body.forcedsent;
    const forcedcancel = req.body.forcedcancel;
    
    const reschedule ='';
    
    const delayproduksi = '';

    const toppriority = req.body.toppriority;
    const pending = req.body.pending;
    const statusxo = req.body.statusxo;
    const deliveryunit = req.body.deliveryunit;
    const code1 = req.body.code1;
    const code2 = req.body.code2;
    const extracharge =req.body.extracharge;
    
    const history=JSON.stringify(req.body.history);

    const print_podo='';
    const upholstery_jadi='';
    const upholstery_img='';

    const packde_kirimbahan='';
    const packde_kirimbahan_img='';
    const packde_ambil='';
    const packde_ambil_img='';
    const packde_qc='';
    const packde_qc_img='';

    const diterima_konsumen='';
    const diterima_konsumen_img='';
    
    const stockprodukcode=req.body.stockprodukcode;

    const stockuses=req.body.stockuses;
    

    var data = {tglinputmili,
        bulan,
        tahun,
        id_transaksi,
        no_transaksi,
        order_date,
        orderdate_mili,
        delivered_date,
        delivereddate_mili,
        platform,
        item,
        qty,
        finalprice,
        price,
        diskon_persen,
        diskon_amount,
        notes,
        colorvariant,
        buyername,
        confirmroute,
        phonenumber,
        address,
        status,
        forcedsent,
        forcedcancel,
        reschedule,
        delayproduksi,
        toppriority,
        pending,
        statusxo,
        deliveryunit,
        code1,
        code2,
        extracharge,
        history,
        print_podo,
        upholstery_jadi,
        upholstery_img,
        packde_kirimbahan,
        packde_kirimbahan_img,
        packde_ambil,
        packde_ambil_img,
        packde_qc,
        packde_qc_img,
        diterima_konsumen,
        diterima_konsumen_img,
        stockuses:JSON.stringify(stockuses)

    }

    const worker = new Worker('./worker/workersaveadditem.js', { workerData: { data,stockprodukcode,stockuses } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});
router.post('/saveadditem', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    
    var data =req.body;

    //console.log(data);

    const worker = new Worker('./worker/workersaveadditem.js', { workerData: { data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

router.get("/edititem/:idtransaksi", function (req, res) {
    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='edititemadminlist';
    var diskripsi='';
    var navatasactive='adminlist';
    
    var bukawal='edititem';
    const worker = new Worker('./worker/workeradminlist.js', { workerData: { bukawal,idtransaksi:req.params.idtransaksi} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        if (datas.status!=200) {
            res.status(datas.status).render('404',{titlepage: '404', diskripsi:'404', czz:'/css/404.css', versionall, jzz:404});
        }else{
            res.status(200).render('edititemadminlist',{titlepage:'Edit Item | Admin List',diskripsi,czz,versionall,jzz,navatasactive,datadropdown:datas.datadropdown,datatransaksi:datas.datatransaksi});
        }
        
    });
    
});


router.post('/saveedit-old', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    //var datenow = new Date();
    //const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni","Juli", "Augustus", "September", "Oktober", "November", "Desember"];
    console.log(req.body);
    //var year = datenow.getFullYear();
    const olnotransaksi=req.body.olnotransaksi;
    const tglinputmili=req.body.tglinputmili;

    const bulan= req.body.bulan;//monthNames[datenow.getMonth()];
    const tahun=req.body.tahun;//year;
    const id_transaksi=req.body.id_transaksi;

    const no_transaksi = req.body.no_transaksi;
    const order_date = req.body.order_date;
    const orderdate_mili = req.body.orderdate_mili;
    const delivered_date = req.body.delivered_date;
    const delivereddate_mili = req.body.delivereddate_mili;
    const platform = req.body.platform;
    const item = req.body.item;
    const qty = req.body.qty;
    const finalprice = req.body.finalprice;
    const price = req.body.price;
    const diskon_persen = req.body.diskon_persen;
    const diskon_amount = req.body.diskon_amount;
    const notes = req.body.notes;
    const colorvariant = req.body.colorvariant;
    const buyername = req.body.buyername;
    const confirmroute = req.body.confirmroute;
    const phonenumber = req.body.phonenumber;
    const address = req.body.address;
    const status = req.body.status;
    const forcedsent = req.body.forcedsent;
    const forcedcancel = req.body.forcedcancel;
    
    const reschedule =req.body.reschedule;
    
    const delayproduksi = req.body.delayproduksi;

    const toppriority = req.body.toppriority;
    const pending = req.body.pending;
    const statusxo = req.body.statusxo;
    const deliveryunit = req.body.deliveryunit;
    const code1 = req.body.code1;
    const code2 = req.body.code2;
    const extracharge = req.body.extracharge;
    const history=JSON.stringify(req.body.history);
    const stockprodukcode = req.body.stockprodukcode;
    const oldbeforeedititem=req.body.oldbeforeedititem;
    const oldbeforeeditqty=req.body.oldbeforeeditqty;
    const oldstockprodukcode=req.body.oldstockprodukcode;

    var data = {tglinputmili,bulan,tahun,id_transaksi,
        no_transaksi,
        order_date,orderdate_mili,delivered_date,delivereddate_mili,platform,item,qty,finalprice,price,diskon_persen,diskon_amount,notes,colorvariant,buyername,confirmroute,phonenumber,address,status,forcedsent,forcedcancel,reschedule,delayproduksi,toppriority,pending,statusxo,deliveryunit,code1,code2,extracharge,history
    }
    console.log(req.body);
    const worker = new Worker('./worker/workersaveeditadminlist.js', { workerData: { olnotransaksi,data,
        stockprodukcode,oldbeforeedititem,oldbeforeeditqty,oldstockprodukcode } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});


router.post('/saveedit', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    //var datenow = new Date();
    //const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni","Juli", "Augustus", "September", "Oktober", "November", "Desember"];
    console.log(req.body);
    //var year = datenow.getFullYear();
    //const olnotransaksi=req.body.olnotransaksi;
    const id_transaksi=req.body[0].id_transaksi;


    var data = req.body;
    console.log(req.body);
    const worker = new Worker('./worker/workersaveeditadminlist.js', { workerData: { data,id_transaksi} });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

router.post('/cekidtransaksi/:idtransaksi', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    const worker = new Worker('./worker/workeradminlist.js', { workerData: {bukawal:'cekidtransaksi',id_transaksi:req.params.idtransaksi } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});


router.post('/saveeditquick', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
 
    const tglinputmili=req.body.tglinputmili;

    const bulan= req.body.bulan;//monthNames[datenow.getMonth()];
    const tahun=req.body.tahun;//year;
    const id_transaksi=req.body.id_transaksi;

    const no_transaksi = req.body.no_transaksi;
    const order_date = req.body.order_date;
    const orderdate_mili = req.body.orderdate_mili;
    const delivered_date = req.body.delivered_date;
    const delivereddate_mili = req.body.delivereddate_mili;
    const platform = req.body.platform;
    const item = req.body.item;
    const qty = req.body.qty;
    const finalprice = req.body.finalprice;
    const price = req.body.price;
    const diskon_persen = req.body.diskon_persen;
    const diskon_amount = req.body.diskon_amount;
    const notes = req.body.notes;
    const colorvariant = req.body.colorvariant;
   
    const extracharge = req.body.extracharge;

    const history=JSON.stringify(req.body.history);
    const stockprodukcode = req.body.stockprodukcode;
    const oldbeforeedititem=req.body.oldbeforeedititem;
    const oldbeforeeditqty=req.body.oldbeforeeditqty;
    const oldstockprodukcode=req.body.oldstockprodukcode;

    const code2 = req.body.code2;
    const status = req.body.status;

    var data = {tglinputmili,bulan,tahun,id_transaksi,
        no_transaksi,
        order_date,orderdate_mili,delivered_date,delivereddate_mili,platform,item,qty,finalprice,price,diskon_persen,diskon_amount,notes,colorvariant,extracharge,history,status,code2
    }

    const worker = new Worker('./worker/workersaveeditquick.js', { workerData: { data,stockprodukcode,oldbeforeedititem,oldbeforeeditqty,oldstockprodukcode } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});


router.post('/saveforcestatus', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    //var datenow = new Date();
    //const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni","Juli", "Augustus", "September", "Oktober", "November", "Desember"];

    //var year = datenow.getFullYear();
    const id_transaksi=req.body.id_transaksi;

    const confirmroute = req.body.confirmroute;

    const status = req.body.status;
    const forcedsent = req.body.forcedsent;
    const forcedcancel = req.body.forcedcancel;
    
    const reschedule =req.body.reschedule;
    
    const delayproduksi = req.body.delayproduksi;

    const toppriority = req.body.toppriority;
    const pending = req.body.pending;

    const history=JSON.stringify(req.body.history);

    const stockprodukcode=req.body.stockprodukcode;

    const stockuses=req.body.stockuses;
    const tglinputmili=req.body.tglinputmili;
    const namalengkap=req.body.namalengkap;
    const username=req.body.username

    var data = {id_transaksi,
        confirmroute,status,forcedsent,forcedcancel,reschedule,delayproduksi,toppriority,pending,history,stockprodukcode,stockuses,tglinputmili,namalengkap,username
    }

    const worker = new Worker('./worker/worekersaveforcestatus.js', { workerData: { data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});


router.post('/saveforcestatustoapproval', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    //var datenow = new Date();
    //const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni","Juli", "Augustus", "September", "Oktober", "November", "Desember"];

    //var year = datenow.getFullYear();
    const namalengkap=req.body.namalengkap;
    const username=req.body.username

    var data = req.body;
    console.log(data)
    /* data.forEach(obj => {
        delete obj.item;
        delete obj.qty;
        delete obj.namalengkap;
        delete obj.username;
    }); */

    var bukawal='saveforcestatustoapproval';

    const worker = new Worker('./worker/worekersaveforcestatus-tosupervisor.js', { workerData: {bukawal, data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});



router.post('/saveforcestatusapproved', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }

    var data = req.body;
    console.log(data);

    var bukawal='saveforcestatusapproved';

    const worker = new Worker('./worker/worekersaveforcestatus-tosupervisor.js', { workerData: {bukawal, data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

router.post('/selesaiprintpodo', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    //var datenow = new Date();
    //const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni","Juli", "Augustus", "September", "Oktober", "November", "Desember"];

    //var year = datenow.getFullYear();
    const id_transaksi=req.body.id_transaksi;

    const status = req.body.status;
   
    const history=JSON.stringify(req.body.history);

    var data = {id_transaksi,status,history
    }

    var bukawal='awal';

    const worker = new Worker('./worker/workerselesaiprintpodo.js', { workerData: {bukawal, data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});


router.post('/selesaiapprove', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    //var datenow = new Date();
    //const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni","Juli", "Augustus", "September", "Oktober", "November", "Desember"];

    //var year = datenow.getFullYear();
    const id_transaksi=req.body.id_transaksi;

    const status = req.body.status;
   
    const history=JSON.stringify(req.body.history);

    var data = {id_transaksi,status,history
    }

    var bukawal='selesaiapprove';

    const worker = new Worker('./worker/workerselesaiprintpodo.js', { workerData: {bukawal, data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

router.post('/selesaiqcpackingfmcg', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    //var datenow = new Date();
    //const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni","Juli", "Augustus", "September", "Oktober", "November", "Desember"];

    //var year = datenow.getFullYear();
    const id_transaksi=req.body.id_transaksi;

    const status = req.body.status;
    const folderfoto = req.body.folderfoto;
   
    const history=JSON.stringify(req.body.history);

    var data = {id_transaksi,status,folderfoto,history
    }

    const worker = new Worker('./worker/workerselesaiqcpackingfmcg.js', { workerData: { data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

router.post('/selesaikirimfmcg', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    //var datenow = new Date();
    //const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni","Juli", "Augustus", "September", "Oktober", "November", "Desember"];

    //var year = datenow.getFullYear();
    const id_transaksi=req.body.id_transaksi;

    const status = req.body.status;
   
    const history=JSON.stringify(req.body.history);

    var data = {id_transaksi,status,history
    }

    const worker = new Worker('./worker/workerselesaikirimfmcg.js', { workerData: { data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});
////////////////// universal


router.post("/universals", function (req, res) {
    //var dataambil=req.body.data;
    var bukawal='universals';
    //console.log(dataambil);
    var data=	[ { product: 'AETHER - STANDING',
    investor: 'true',
    codejm: 'marco' },
  { product: 'AETHER - SKY R100',
    investor: 'true',
    codejm: 'jansen' },
  { product: 'AETHER - SKY V1 ONYX BLACK',
    investor: 'true',
    codejm: '' },
  { product: 'AETHER - CLOUD K100',
    investor: 'true',
    codejm: 'marco' },
  { product: 'AETHER - CLOUD K60',
    investor: 'true',
    codejm: 'marco' },
  { product: 'AETHER - HILL K40',
    investor: 'true',
    codejm: 'jansen' },
  { product: 'AETHER - Track Light - Floodlight 10W',
    investor: 'true',
    codejm: '' },
  { product: 'AETHER - Track Light - Floodlight 20W',
    investor: 'true',
    codejm: '' },
  { product: 'AETHER - Track Light - Grille Lamp 12W',
    investor: 'true',
    codejm: '' },
  { product: 'AETHER - Track Light - Grille Lamp 24W',
    investor: 'true',
    codejm: '' },
  { product: 'AETHER - Track Light - I Connector',
    investor: 'true',
    codejm: '' },
  { product: 'KYOUKAI - End Panel SK240',
    investor: 'true',
    codejm: '' },
  { product: 'KYOUKAI - SK060', investor: 'true', codejm: '' },
  { product: 'KYOUKAI - SK240', investor: 'true', codejm: '' },
  { product: 'KYOUKAI AK24', investor: 'true', codejm: '' },
  { product: 'KYOUKAI AK60', investor: 'true', codejm: '' },
  { product: 'KYOUKAI SK24', investor: 'true', codejm: '' },
  { product: 'KYOUKAI SK60', investor: 'true', codejm: '' },
  { product: 'AETHER - Track Light - Powersupply 100W',
    investor: 'true',
    codejm: '' },
  { product: 'SOMNO BED PILLOW - King',
    investor: 'true',
    codejm: '' },
  { product: 'SOMNO BED PILLOW - King Lite',
    investor: 'true',
    codejm: '' },
  { product: 'SOMNO BED PILLOW - King Plus',
    investor: 'true',
    codejm: '' },
  { product: 'SOMNO BED PILLOW - Standar',
    investor: 'true',
    codejm: '' },
  { product: 'SOMNO BED PILLOW - Standar Lite',
    investor: 'true',
    codejm: '' },
  { product: 'SOMNO BED PILLOW - Standar Plus',
    investor: 'true',
    codejm: '' },
  { product: 'AETHER - Track Light - Track Rail',
    investor: 'true',
    codejm: '' },
  { product: 'URUZ II Steel', investor: 'true', codejm: '' },
  { product: 'AETHER - Track Light - V90 Connector',
    investor: 'true',
    codejm: '' },
  { product: 'VAZRA - 2 Rechargeable USB Type C AA',
    investor: 'true',
    codejm: '' },
  { product: 'VAZRA - 2 Rechargeable USB Type C AAA',
    investor: 'true',
    codejm: '' },
  { product: 'VAZRA - 4 Rechargeable USB Type C AA',
    investor: 'true',
    codejm: '' },
  { product: 'VAZRA - 4 Rechargeable USB Type C AAA',
    investor: 'true',
    codejm: '' },
  { product: 'VAZRA - Power Track | XIONCO',
    investor: 'true',
    codejm: '' },
  { product: 'VAZRA - Power Track Outlet',
    investor: 'true',
    codejm: '' },
  { product: 'VAZRA - Power Track USB Outlet',
    investor: 'true',
    codejm: '' },
  { product: 'VAZRA - Switch Outlet A1 - 1 Gang 1 Way EU Standard',
    investor: 'true',
    codejm: '' },
  { product: 'VAZRA - Switch Outlet A1 - 2 Gang 1 Way EU Standard',
    investor: 'true',
    codejm: '' },
  { product: 'VAZRA - Switch Outlet A1 - 3 Gang 1 Way EU Standard',
    investor: 'true',
    codejm: '' },
  { product: 'VAZRA - Switch Outlet A1 - Outlet 13 A Euro Standard',
    investor: 'true',
    codejm: '' },
  { product: 'Vazra PM - V1 Power Track Socket Eu',
    investor: 'true',
    codejm: '' } ];//req.body;

    const worker = new Worker('./worker/workeradminlist.js', { workerData: { bukawal,data} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        if (datas.status!=200) {
            res.status(datas.status).send(datas);
        }else{
            res.status(datas.status).send(datas);
        }
        
    }); 
   // res.status(200).send('datas');
});

//////////////////////



export default router;