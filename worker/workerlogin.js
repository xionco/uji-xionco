import { parentPort, workerData } from 'worker_threads';
import database from '../config/connection.js';


var username=workerData.username,password=workerData.password;
let cekusername = `SELECT * FROM dataslogin WHERE BINARY username = "${username}"`;
let cekusernamex = database.query(cekusername, (err, results) => {
    if (results.length <= 0) {
        parentPort.postMessage({ icons: "error", texts: "Username belum terdaftar", titles: "Oops ..." });
        // Menutup koneksi setelah query selesai
        tutupdatabas();
    }else{
        if (results[0].password == password) {
            var nama=results[0].nama;
            var roleuser=results[0].tipeuser;
            var datauser=results[0];
            const d = new Date();
            let day = ("0" + (d.getDate())).slice(-2);
            let month = ("0" + (d.getMonth() + 1)).slice(-2);
            let year = d.getFullYear();
            var tglonline=day+"/"+month+"/"+year+' '+d.toLocaleString('id-ID', {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });//day:'2-digit',month:'2-digit',year:'numeric'
            var ondate =tglonline.replaceAll('.', ':');

            let sql = "UPDATE dataslogin SET last_login='" + ondate +"' WHERE BINARY username='" + username + "'";
            let query = database.query(sql, (err, results) => {
                if (results.affectedRows == 1) {
                    
                    let cekroleuser = `SELECT * FROM datasuserrole WHERE BINARY tipeuser = "${roleuser}"`;
                    let fixcekroleuser = database.query(cekroleuser, (err, resultsrole) => {
                        if (resultsrole.length <= 0) {
                            parentPort.postMessage({ icons: "error", texts: "Role Error", titles: "Oops ..." });
                            // Menutup koneksi setelah query selesai
                            tutupdatabas();
                        }else{
                            var dataroleuser=resultsrole[0];
                            var link='';
                            if (roleuser.toLowerCase()=='admin c10') {
                                link='/home/admin';
                            }else if (roleuser.toLowerCase()=='admin head') {
                                link='/home/admin';
                            }else if(roleuser.toLowerCase()=='admin c5'){
                                link='/home/admc5';
                            }else if(roleuser.toLowerCase()=='admin classy'){
                                link='/home/admclassy';
                            }else if(roleuser.toLowerCase()=='upholstery'){
                                link='/home/upholstery';
                            }else if(roleuser.toLowerCase()=='pack-de staff'){
                                link='/home/packde';
                            }else if(roleuser.toLowerCase()=='driver'){
                                link='/home/driver';
                            }else if(roleuser.toLowerCase()=='supervisor'){
                                link='/editdatabase';
                            }else if(roleuser.toLowerCase()=='procurement'){
                                link='/procurement';
                            }
                            parentPort.postMessage({ icons: "success", texts: "login berhasil", titles: "",datauser,link,dataroleuser});
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

                    
                    
                }else{
                    parentPort.postMessage({ icons: "error", texts: "Sistem lagi Error, coba lagi [1]", titles: "" });
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


        }else{
            parentPort.postMessage({ icons: "error", texts: "Password salah", titles: "Oops ..." });
            // Menutup koneksi setelah query selesai
            database.end((closeErr) => {
                if (closeErr) {
                    console.error('Error closing connection:', closeErr);
                } else {
                    console.log('Database connection closed');
                }
            });
        }
    }
});
// parentPort.postMessage({status:'OK',datus:{status:cekidbayar.status_bayar}});
function tutupdatabas() {
    // Menutup koneksi setelah query selesai
    database.end((closeErr) => {
        if (closeErr) {
            console.error('Error closing connection:', closeErr);
        } else {
            console.log('Database connection closed');
        }
    });
}