import { parentPort, workerData } from 'worker_threads';
import database from '../config/connection.js';

console.log(workerData.data.id_transaksi);

if (workerData.bukawal=='saveadditem') {
    saveadd();
}else if (workerData.bukawal=='saveedititem') {
    saveedit();
}else if (workerData.bukawal=='saveaddplatform') {
    saveaddplatform();
}else if (workerData.bukawal=='saveaddcolorvariant') {
    saveaddcolorvariant();
}else if (workerData.bukawal=='deleteitem') {
    deleteitem();
}

var counter = 0;
async function saveadd() {
    counter = 0;
    var notif=[];
    workerData.data.alldataadditem.forEach(data => {
        let cekusername = `SELECT * FROM databaseallitem WHERE BINARY product = "${data.product}"`;
        database.query(cekusername, async (err, results) => {
            if (err) {
                console.error('Query error:', err);
                var newnotifs={
                    product:data.product,
                    statussave:'gagal sistem error[1]'
                };
                notif.push(newnotifs);
                checkDone(notif,'add');
                //return;
            }
            if (results.length > 0) {
                var newnotifs={
                    product:data.product,
                    statussave:'duplikat product'
                };
                notif.push(newnotifs);
                checkDone(notif,'add');
            }else{
                //belum ada
                let setnewdata = "INSERT INTO databaseallitem SET ?";
                let newdata = database.query(setnewdata, data,async (err, datax3) => {
                    if (err) {
                        console.error('Gagal insert:', err);
                        var newnotifs={
                            product:data.product,
                            statussave:'gagal sistem error [2]'
                        };
                        notif.push(newnotifs);
                        checkDone(notif,'add');
                        //return;
                    }else{
                        var newnotifs={
                            product:data.product,
                            statussave:'sukses'
                        };
                        notif.push(newnotifs);
                        checkDone(notif,'add');
                    }
                });
            }
        });
        
    });
}

async function saveedit() {
    counter = 0;
    var notif=[];
    workerData.data.alldataadditem.forEach(data => {
        var oldedititem=workerData.data.oldedititem[0];

        let cekusername = `SELECT * FROM databaseallitem WHERE BINARY product = "${oldedititem.product}"`;
        database.query(cekusername, async (err, results) => {
            if (err) {
                console.error('Query error:', err);
                var newnotifs={
                    product:data.product,
                    statussave:'gagal sistem error[1]'
                };
                notif.push(newnotifs);
                checkDone(notif,'edit');
                //return;
            }
            if (results.length > 0) {
                const updateFields = [];
                const updateValues = [];

                for (const key in data) {
                    if (data[key] !== undefined) {
                        updateFields.push(`${key} = ?`);
                        updateValues.push(data[key]);
                    }
                }

                // update berdasarkan product
                let updatequery = `UPDATE databaseallitem SET ${updateFields.join(', ')} WHERE product = ?`;
                updateValues.push(oldedititem.product); // 
                database.query(updatequery, updateValues, (err, result) => {
                    var newnotifs={
                        product:data.product,
                        statussave:'sukses'
                    };
                    notif.push(newnotifs);
                    checkDone(notif,'edit');
                });
            }else{
                //produk belum ada
                var newnotifs={
                    product:data.product,
                    statussave:'error, product belum ada'
                };
                notif.push(newnotifs);
                checkDone(notif,'edit');
            }
        });
    });
}

async function saveaddplatform() {
    counter = 0;
    var notif=[];
    workerData.data.alldataadditem.forEach(data => {
        let cekusername = `SELECT * FROM platform WHERE BINARY platform = "${data.platform}"`;
        database.query(cekusername, async (err, results) => {
            if (err) {
                console.error('Query error:', err);
                var newnotifs={
                    platform:data.platform,
                    statussave:'gagal sistem error[1]'
                };
                notif.push(newnotifs);
                checkDone(notif,'add');
                //return;
            }
            if (results.length > 0) {
                var newnotifs={
                    platform:data.platform,
                    statussave:'duplikat platform'
                };
                notif.push(newnotifs);
                checkDone(notif,'add');
            }else{
                //belum ada
                let setnewdata = "INSERT INTO platform SET ?";
                let newdata = database.query(setnewdata, data,async (err, datax3) => {
                    if (err) {
                        console.error('Gagal insert:', err);
                        var newnotifs={
                            platform:data.platform,
                            statussave:'gagal sistem error [2]'
                        };
                        notif.push(newnotifs);
                        checkDone(notif,'add');
                        //return;
                    }else{
                        var newnotifs={
                            platform:data.platform,
                            statussave:'sukses'
                        };
                        notif.push(newnotifs);
                        checkDone(notif,'add');
                    }
                });
            }
        });
        
    });
}

async function saveaddcolorvariant() {
    counter = 0;
    var notif=[];
    workerData.data.alldataadditem.forEach(data => {
        let cekusername = `SELECT * FROM databasecolorvariant WHERE BINARY colorvariant = "${data.colorvariant}"`;
        database.query(cekusername, async (err, results) => {
            if (err) {
                console.error('Query error:', err);
                var newnotifs={
                    colorvariant:data.colorvariant,
                    statussave:'gagal sistem error[1]'
                };
                notif.push(newnotifs);
                checkDone(notif,'add');
                //return;
            }
            if (results.length > 0) {
                var newnotifs={
                    colorvariant:data.colorvariant,
                    statussave:'duplikat color variant'
                };
                notif.push(newnotifs);
                checkDone(notif,'add');
            }else{
                //belum ada
                let setnewdata = "INSERT INTO databasecolorvariant SET ?";
                let newdata = database.query(setnewdata, data,async (err, datax3) => {
                    if (err) {
                        console.error('Gagal insert:', err);
                        var newnotifs={
                            colorvariant:data.colorvariant,
                            statussave:'gagal sistem error [2]'
                        };
                        notif.push(newnotifs);
                        checkDone(notif,'add');
                        //return;
                    }else{
                        var newnotifs={
                            colorvariant:data.colorvariant,
                            statussave:'sukses'
                        };
                        notif.push(newnotifs);
                        checkDone(notif,'add');
                    }
                });
            }
        });
        
    });
}


async function deleteitem() {
    var queries=`DELETE FROM platform WHERE BINARY platform = '${workerData.data.item}'`;//jika platform

    if (workerData.data.tipe=='colorvariant') {
        //jika color variant
        queries=`DELETE FROM databasecolorvariant WHERE BINARY colorvariant = '${workerData.data.item}'`;
    }
    
    database.query(queries, async (err, results) => {
        if (results.affectedRows > 0) {
           
            var data={
                tglinputmili:new Date().getTime(),
                tipe:'delete',
                namalengkap:workerData.data.namalengkap,
                username:workerData.data.username,
                tindakan:`delete ${workerData.data.tipe} ${workerData.data.item}`,

            }
            let setnewdata = "INSERT INTO logedit_database SET ?";
            let newdata = database.query(setnewdata, data,async (err, datax3) => {
                parentPort.postMessage({icons:'success',status:200});
                // Menutup koneksi setelah query selesai
                database.end((closeErr) => {
                    if (closeErr) {
                        console.error('Error closing connection:', closeErr);
                    } else {
                        console.log('Database connection closed');
                    }
                });
            });
        } else {
            parentPort.postMessage({icons:'error',status:500});
            // Menutup koneksi setelah query selesai
            database.end((closeErr) => {
                if (closeErr) {
                    console.error('Error closing connection:', closeErr);
                } else {
                    console.log('Database connection closed');
                }
            });
        }
        
    });
   
}


function checkDone(notif,tipe) {
    console.log(counter);
    counter++;
    if (counter === workerData.data.alldataadditem.length) {
        
        var dataaddoredit='';
        if (tipe=='add') {
            if (workerData.bukawal=='saveadditem') {
                for (let i = 0; i < notif.length; i++) {
                    const element = notif[i];
                    dataaddoredit=dataaddoredit==''?`${element.product}, `:`${dataaddoredit}${element.product}, `;
                }
            }else if (workerData.bukawal=='saveaddplatform') {
                for (let i = 0; i < notif.length; i++) {
                    const element = notif[i];
                    dataaddoredit=dataaddoredit==''?`platform ${element.platform}, `:`${dataaddoredit}${element.platform}, `;
                }
            }
            else if (workerData.bukawal=='saveaddcolorvariant') {
                for (let i = 0; i < notif.length; i++) {
                    const element = notif[i];
                    dataaddoredit=dataaddoredit==''?`colorvariant ${element.colorvariant}, `:`${dataaddoredit}${element.colorvariant}, `;
                }
            }
        }else{
            //edit
            dataaddoredit=`${workerData.data.oldedititem[0].product}${workerData.data.oldedititem[0].product==notif[0].product?"":` to ${notif[0].product}`}`;
        }
        var data={
            tglinputmili:new Date().getTime(),
            tipe,
            namalengkap:workerData.data.namalengkap,
            username:workerData.data.username,
            tindakan:tipe=='add'?`add data ${dataaddoredit}`:`edit data ${dataaddoredit}`,

        }
        let setnewdata = "INSERT INTO logedit_database SET ?";
        let newdata = database.query(setnewdata, data,async (err, datax3) => {
            parentPort.postMessage({notif});
            // Menutup koneksi setelah query selesai
            database.end((closeErr) => {
                if (closeErr) {
                    console.error('Error closing connection:', closeErr);
                } else {
                    console.log('Database connection closed');
                }
            });
        });
        
    }
}