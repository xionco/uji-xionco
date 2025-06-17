import express from 'express';
import { Worker } from 'worker_threads';
import cookieParser from 'cookie-parser';
//import userdata from '../mogosDB/mongosdata.js';
const router = express.Router();

router.get("/", function (req, res) {

    res.status(200).send('hai');
});
router.get("/admin", function (req, res) {
    //var username=req.params.username.replace('u=','');
    console.log('userr == ');
    //console.log(username);
    var bukawal='awal';
    const worker = new Worker('./worker/workercekrolehome.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        console.log(datas);
        var versionall = "?v=" + Math.random();
        var czz =`/css/home.css` + versionall;
        var jzz='home-admin';
        var diskripsi='';
        var navatasactive='home';
        console.log('ejs == ')
        //console.log(datas.page)
        //res.status(200).render('home',{titlepage:'Home',diskripsi,czz,versionall,jzz,navatasactive});
        //res.status(200).send(datas);
        res.status(200).render(`home-admin`,{titlepage:'Home',diskripsi,czz,versionall,jzz,navatasactive,datas});
    });

    
});

router.get("/admclassy", function (req, res) {
    //var username=req.params.username.replace('u=','');
    console.log('userr == ');
    //console.log(username);
    var bukawal='awal';
    const worker = new Worker('./worker/workercekrolehome.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        console.log(datas);
        var versionall = "?v=" + Math.random();
        var czz =`/css/home.css` + versionall;
        var jzz='home-adminclassy';
        var diskripsi='';
        var navatasactive='home';
        console.log('ejs == ')
        //console.log(datas.page)
        //res.status(200).render('home',{titlepage:'Home',diskripsi,czz,versionall,jzz,navatasactive});
        //res.status(200).send(datas);
        res.status(200).render(`home-adminclassy`,{titlepage:'Home',diskripsi,czz,versionall,jzz,navatasactive,datas});
    });

    
});

router.get("/admc5", function (req, res) {
    //var username=req.params.username.replace('u=','');
    console.log('userr == ');
    //console.log(username);
    var bukawal='awal';
    const worker = new Worker('./worker/workercekrolehome.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        console.log(datas);
        var versionall = "?v=" + Math.random();
        var czz =`/css/home.css` + versionall;
        var jzz='home-adminc5';
        var diskripsi='';
        var navatasactive='home';
        console.log('ejs == ')
        //console.log(datas.page)
        //res.status(200).render('home',{titlepage:'Home',diskripsi,czz,versionall,jzz,navatasactive});
        //res.status(200).send(datas);
        res.status(200).render(`home-adminc5`,{titlepage:'Home',diskripsi,czz,versionall,jzz,navatasactive,datas});
    });

    
});

router.get("/upholstery", function (req, res) {
    //var username=req.params.username.replace('u=','');
    console.log('userr == ');
    //console.log(username);
    var bukawal='awal';
    const worker = new Worker('./worker/workercekrolehome.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        console.log(datas);
        var versionall = "?v=" + Math.random();
        var czz =`/css/home.css` + versionall;
        var jzz='home-upholstery';
        var diskripsi='';
        var navatasactive='home';
        console.log('ejs == ')
        //console.log(datas.page)
        //res.status(200).render('home',{titlepage:'Home',diskripsi,czz,versionall,jzz,navatasactive});
        //res.status(200).send(datas);
        res.status(200).render(`home-upholstery`,{titlepage:'Upholstery',diskripsi,czz,versionall,jzz,navatasactive,datas});
    });

    
});

router.get("/packde", function (req, res) {
    //var username=req.params.username.replace('u=','');
    console.log('userr == ');
    //console.log(username);
    var bukawal='awal';
    const worker = new Worker('./worker/workercekrolehome.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        console.log(datas);
        var versionall = "?v=" + Math.random();
        var czz =`/css/home.css` + versionall;
        var jzz='home-packde';
        var diskripsi='';
        var navatasactive='home';
        console.log('ejs == ');
        //console.log(datas.page)
        //res.status(200).render('home',{titlepage:'Home',diskripsi,czz,versionall,jzz,navatasactive});
        //res.status(200).send(datas);
        res.status(200).render(`home-packde`,{titlepage:'Packing and Delivery',diskripsi,czz,versionall,jzz,navatasactive,datas});
    });

    
});

router.get("/driver", function (req, res) {
    //var username=req.params.username.replace('u=','');
    console.log('userr == ');
    //console.log(username);
    var bukawal='awal';
    const worker = new Worker('./worker/workercekrolehome.js', { workerData: { bukawal} });

    worker.on('message', (datas) => {
        console.log(datas);
        var versionall = "?v=" + Math.random();
        var czz =`/css/home.css` + versionall;
        var jzz='home-driver';
        var diskripsi='';
        var navatasactive='home';
        console.log('ejs == ');
        //console.log(datas.page)
        //res.status(200).render('home',{titlepage:'Home',diskripsi,czz,versionall,jzz,navatasactive});
        //res.status(200).send(datas);
        res.status(200).render(`home-driver`,{titlepage:'Driver',diskripsi,czz,versionall,jzz,navatasactive,datas});
    });

    
});
export default router;