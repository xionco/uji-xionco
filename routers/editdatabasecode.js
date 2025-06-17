import express from 'express';
import { Worker } from 'worker_threads';
//import cookieParser from 'cookie-parser';
import basicAuth from '../config/basicAUth.js';


const router = express.Router();


router.get("/", function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken=cookies.hamburger;
    
    var rolesuser='Supervisor';//default
    if (userToken) {
        // Cookie tidak ditemukan
        datausers=JSON.parse(cookies.hamburger);
        
        console.log(datausers);
        
        rolesuser=datausers.tipeuser;
    }else{
        datausers=[];
        console.log(datausers);
    }

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='editdatabase';
    var diskripsi='';
    var navatasactive='editdatabase';

    var roles='supervisor';

    if (rolesuser.toLowerCase()=='supervisor'){
        //navatasactive='finance-banklimbo';
        roles='supervisor';
    }

    var bukawal='awal';
    const worker = new Worker('./worker/workeradminlist.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        res.status(200).render('home-editdatabase',{titlepage:'Database',diskripsi,czz,versionall,jzz,navatasactive,datas,roles});
    });
    
});

//saveadditem

router.post('/saveadditem', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    
    var data =req.body;
    var bukawal='saveadditem';

    //console.log(data);

    const worker = new Worker('./worker/workereditdatabase.js', { workerData: { bukawal,data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

router.post('/saveedititem', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    
    var data =req.body;
    var bukawal='saveedititem';

    //console.log(data);

    const worker = new Worker('./worker/workereditdatabase.js', { workerData: { bukawal,data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

//platform
router.get("/platform", function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken=cookies.hamburger;
    
    var rolesuser='Supervisor';//default
    if (userToken) {
        // Cookie tidak ditemukan
        datausers=JSON.parse(cookies.hamburger);
        
        console.log(datausers);
        
        rolesuser=datausers.tipeuser;
    }else{
        datausers=[];
        console.log(datausers);
    }

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='editdatabase-platform';
    var diskripsi='';
    var navatasactive='editdatabase';

    var roles='supervisor';

    if (rolesuser.toLowerCase()=='supervisor'){
        //navatasactive='finance-banklimbo';
        roles='supervisor';
    }

    var bukawal='awal';
    const worker = new Worker('./worker/workeradminlist.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        res.status(200).render('platform-editdatabase',{titlepage:'Database',diskripsi,czz,versionall,jzz,navatasactive,datas,roles});
    });
    
});


router.post('/saveaddplatform', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    
    var data =req.body;
    var bukawal='saveaddplatform';

    //console.log(data);

    const worker = new Worker('./worker/workereditdatabase.js', { workerData: { bukawal,data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

//color variant
router.get("/colorvariant", function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken=cookies.hamburger;
    
    var rolesuser='Supervisor';//default
    if (userToken) {
        // Cookie tidak ditemukan
        datausers=JSON.parse(cookies.hamburger);
        
        console.log(datausers);
        
        rolesuser=datausers.tipeuser;
    }else{
        datausers=[];
        console.log(datausers);
    }

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='editdatabase-colorvariant';
    var diskripsi='';
    var navatasactive='editdatabase';

    var roles='supervisor';

    if (rolesuser.toLowerCase()=='supervisor'){
        //navatasactive='finance-banklimbo';
        roles='supervisor';
    }

    var bukawal='awal';
    const worker = new Worker('./worker/workeradminlist.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        res.status(200).render('colorvariant-editdatabase',{titlepage:'Database',diskripsi,czz,versionall,jzz,navatasactive,datas,roles});
    });
    
});

router.post('/saveaddcolorvariant', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    
    var data =req.body;
    var bukawal='saveaddcolorvariant';

    //console.log(data);

    const worker = new Worker('./worker/workereditdatabase.js', { workerData: { bukawal,data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});

//delete item
router.post('/deleteitem', async function (req, res) {
    const cekauthoriz = await basicAuth(req.headers.authorization);
    //console.log(cekauthoriz);
    if (cekauthoriz != true || cekauthoriz != true) {
        return res.status(403).send('Unauthorized!');
    }
    
    var data =req.body;
    var bukawal='deleteitem';

    //console.log(data);

    const worker = new Worker('./worker/workereditdatabase.js', { workerData: { bukawal,data } });

    worker.on('message', (datas) => {
        res.status(200).send(datas);
        res.end();
    });
});
//Delivery Unit/liver
router.get("/deliveri", function (req, res) {
    const cookies = req.cookies;
    var datausers;
    var userToken=cookies.hamburger;
    
    var rolesuser='Supervisor';//default
    if (userToken) {
        // Cookie tidak ditemukan
        datausers=JSON.parse(cookies.hamburger);
        
        console.log(datausers);
        
        rolesuser=datausers.tipeuser;
    }else{
        datausers=[];
        console.log(datausers);
    }

    var versionall = "?v=" + Math.random();
    var czz ="/css/adminlist.css" + versionall;
    var jzz='editdatabase-colorvariant';
    var diskripsi='';
    var navatasactive='editdatabase';

    var roles='supervisor';

    if (rolesuser.toLowerCase()=='supervisor'){
        //navatasactive='finance-banklimbo';
        roles='supervisor';
    }

    var bukawal='awal';
    const worker = new Worker('./worker/workeradminlist.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        //res.status(200).send(datas);
        res.status(200).render('colorvariant-editdatabase',{titlepage:'Database',diskripsi,czz,versionall,jzz,navatasactive,datas,roles});
    });
    
});
export default router;