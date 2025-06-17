import { parentPort, workerData } from 'worker_threads';
import database from '../config/connection.js';
import { title } from 'process';
var bukawal=workerData.bukawal;
/* 
let cekusername = `SELECT * FROM dataslogin WHERE BINARY username = "${workerData.username}"`;
let cekusernamex = database.query(cekusername, (err, results) => {
    if (results.length <= 0) {
        parentPort.postMessage({ icons: "error", page: "404",title:'404',dataadminlist:'' });
    }else{

        var roleuser=results[0].tipeuser;
        console.log('role == ');
        console.log(results[0].tipeuser);

        

       
       
    }
}); */
var dataadminlist;

var platformdata;
var itemsdata;
var colorvariantdata;
var stockupholsterydatabase;

let cekplatform = `SELECT * FROM platform`;
let finisambilplatform = database.query(cekplatform, (err, results) => {
    platformdata=results;
    let cekitems = `SELECT * FROM databaseallitem`;
    let finisambilitem = database.query(cekitems, (err, results1) => {
        itemsdata=results1;
        let cekcolorvarian = `SELECT * FROM databasecolorvariant`;
        let finisambilcolorvarian = database.query(cekcolorvarian, (err, results2) => {
            colorvariantdata=results2;
            let cekitems = `SELECT * FROM admlistdata ORDER BY tglinputmili DESC`;
            let finiscekitems = database.query(cekitems, (err, results3) => {
                dataadminlist=results3;
                //parentPort.postMessage({ dataadminlist });
                /* if (roleuser.toLowerCase()=='admin') {
                    var page_file='home-admin';
                    parentPort.postMessage({ icons: "success",page: page_file,title:'Home',dataadminlist,platformdata,itemsdata,colorvariantdata});
                } */
                let cekstockup = `SELECT * FROM stockupholsterydatabase`;
                let cekstockupx = database.query(cekstockup, (err, resultsstok) => {
                    stockupholsterydatabase=resultsstok;
                    parentPort.postMessage({ icons: "success",dataadminlist,platformdata,itemsdata,colorvariantdata,stockupholsterydatabase});
                    // Menutup koneksi setelah query selesai
                    database.end((closeErr) => {
                        if (closeErr) {
                            console.error('Error closing connection:', closeErr);
                        } else {
                            console.log('Database connection closed');
                        }
                    });
                });
                
            });
            //parentPort.postMessage({ platformdata,itemsdata,colorvariantdata });
        });
        
    });
    

});