import express from 'express';
import { Worker } from 'worker_threads';
import cookieParser from 'cookie-parser';

const router = express.Router();


router.get("/", function (req, res) {
    var versionall = "?v=" + Math.random();
    var czz = "/css/login.css" + versionall;
    var jzz = 'login';
    var diskripsi = '';

    res.status(200).render('login', { titlepage: 'Login', diskripsi, czz, versionall, jzz });
});

export default router;