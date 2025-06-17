import { parentPort, workerData } from 'worker_threads';
import database from '../config/connection.js';
var bukawal=workerData.bukawal;

var BATCH_SIZE = 100; 

if (bukawal=='awal') {

    var dataadminlist;
    var platformdata;
    var itemsdata;
    var colorvariantdata;
    var extrachargelist;
    var databasepesananmasalah;
    var deliveryunitlist;
    var stockupholsterydatabase;
    var forcestatusrequest;
    var finance_banklimbo;
    var status_hours;

    let cekplatform = `SELECT * FROM platform`;
    let finisambilplatform = database.query(cekplatform, (err, results) => {
        platformdata=results;
        let cekitems = `SELECT * FROM databaseallitem ORDER BY product ASC`;
        let finisambilitem = database.query(cekitems, (err, results1) => {
            itemsdata=results1;
            let cekcolorvarian = `SELECT * FROM databasecolorvariant`;
            let finisambilcolorvarian = database.query(cekcolorvarian, (err, results2) => {
                colorvariantdata=results2;
                let cekextrachargelist = `SELECT * FROM extrachargelist`;
                let finisambilextrachargelist = database.query(cekextrachargelist, (err, results4) => {
                    extrachargelist=results4;
                    let cekitems = `SELECT * FROM admlistdata ORDER BY tglinputmili DESC`;
                    let finiscekitems = database.query(cekitems, (err, results3) => {
                        dataadminlist=results3;
                        //parentPort.postMessage({ dataadminlist });
                        let cekitemsmasalah = `SELECT * FROM databasepesananmasalah ORDER BY tglinputmili DESC`;
                        let finiscekitemsmasalah = database.query(cekitemsmasalah, (err, resultsmasalah) => {
                            databasepesananmasalah=resultsmasalah;
                            let cekdeliveryunitlist = `SELECT * FROM deliveryunitlist ORDER BY thirdparty ASC`;
                            let finisambildeliveryunitlist = database.query(cekdeliveryunitlist, (err, resultszz) => {
                                deliveryunitlist=resultszz;

                                let cekstockup = `SELECT * FROM stockupholsterydatabase`;
                                let cekstockupx = database.query(cekstockup, (err, resultsstok) => {
                                    stockupholsterydatabase=resultsstok;

                                    let cekforcestatusz = `SELECT * FROM forcestatusrequest`;
                                    let cekforcestatuszx = database.query(cekforcestatusz, (err, resultstatusz) => {
                                        forcestatusrequest=resultstatusz;

                                        let cekfinance_banklimbo = `SELECT * FROM finance_banklimbo`;
                                        let cekfinance_banklimbos = database.query(cekfinance_banklimbo, (err, resultfinance_banklimbo) => {
                                            finance_banklimbo=resultfinance_banklimbo;
                                            let cekstatushour = `SELECT * FROM status_hours`;
                                            let cekstatushours = database.query(cekstatushour, (err, result_cekstatushour) => {
                                                status_hours=result_cekstatushour;

                                                parentPort.postMessage({dataadminlist,platformdata,itemsdata,colorvariantdata,extrachargelist,databasepesananmasalah,deliveryunitlist,stockupholsterydatabase,forcestatusrequest,finance_banklimbo,status_hours});

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
                                        
                                    });
                                    
                                });
                            });
                            
                            
                        });
                       
                        
                    });
                });
                
                //parentPort.postMessage({ platformdata,itemsdata,colorvariantdata });
            });
            
        });
    });

}else if (bukawal=='additem') {

    var platformdata;
    var itemsdata;
    var colorvariantdata;
    var extrachargelist;
    var deliveryunitlist;
    var stockupholsterydatabase;

    let cekplatform = `SELECT * FROM platform`;
    let finisambilplatform = database.query(cekplatform, (err, results) => {
        platformdata=results;
        let cekitems = `SELECT * FROM databaseallitem ORDER BY product ASC`;
        let finisambilitem = database.query(cekitems, (err, results1) => {
            itemsdata=results1;
            let cekextrachargelist = `SELECT * FROM extrachargelist`;
            let finisambilextrachargelist = database.query(cekextrachargelist, (err, results4) => {
                extrachargelist=results4;
                let cekcolorvarian = `SELECT * FROM databasecolorvariant`;
                let finisambilcolorvarian = database.query(cekcolorvarian, (err, results2) => {
                    colorvariantdata=results2;
                    
                    let cekextrachargelist = `SELECT * FROM stockupholsterydatabase`;
                    let finisambilextrachargelist = database.query(cekextrachargelist, (err, results5) => {
                        stockupholsterydatabase=results5;
                    
                        const year = new Date().getFullYear();
                        const monthLetter = getMonthLetter();
                        
                        // Ambil ID terakhir dari database
                        let xxcc = database.query("SELECT id_transaksi FROM admlistdata WHERE id_transaksi LIKE ? ORDER BY id_transaksi DESC LIMIT 1", [`${monthLetter}%-${year}`], (err, resultsc) => {
                            let newNumber = "001";
                            if (resultsc.length > 0) {
                                //const lastId = resultsc[0].id_transaksi; // Contoh: A023-2025
                
                                //const lastNumber = parseInt(lastId.substring(1, 4)); // Ambil angka 023
                                //newNumber = String(lastNumber + 1).padStart(3, "0"); // Tambah 1 dan format ke 3 digit
    
                                const lastId = resultsc[0].id_transaksi.match(/([A-L])(\d{3})[a-z]?-\d{4}/); // Ambil angka dari ID terakhir, abaikan huruf tambahan
                                if (lastId) {
                                    const lastNumber = parseInt(lastId[2]);
                                    newNumber = String(lastNumber + 1).padStart(3, "0");
                                }
                            }
                            
                            const newId = `${monthLetter}${newNumber}-${year}`;
    
                            console.log(newId);
                            let cekdeliveryunitlist = `SELECT * FROM deliveryunitlist ORDER BY thirdparty ASC`;
                            let finisambildeliveryunitlist = database.query(cekdeliveryunitlist, (err, resultszz) => {
                                deliveryunitlist=resultszz;
                                parentPort.postMessage({ platformdata,itemsdata,colorvariantdata,extrachargelist,deliveryunitlist,stockupholsterydatabase,newId });
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
                    });
                   
                  
                });
            });
            
           
        });
       
  
    });
}else if (bukawal=='edititem') {
        
    let cekdatatransaksi = `SELECT * FROM admlistdata WHERE BINARY id_transaksi = "${workerData.idtransaksi}"`;
    let cekusernamex = database.query(cekdatatransaksi, (err, resultsdata) => {
        if (resultsdata.length <= 0) {
            parentPort.postMessage({ status: 404, texts: "no data"});
        }else{
            var platformdata;
            var itemsdata;
            var colorvariantdata;
        
            let cekplatform = `SELECT * FROM platform`;
            let finisambilplatform = database.query(cekplatform, (err, results) => {
                platformdata=results;
                let cekitems = `SELECT * FROM databaseallitem ORDER BY product ASC`;
                let finisambilitem = database.query(cekitems, (err, results1) => {
                    itemsdata=results1;
                    let cekcolorvarian = `SELECT * FROM databasecolorvariant`;
                    let finisambilcolorvarian = database.query(cekcolorvarian, (err, results2) => {
                        colorvariantdata=results2;
                        parentPort.postMessage({ status: 200, texts: "ada data",datatransaksi:resultsdata[0],datadropdown:{ platformdata,itemsdata,colorvariantdata }});
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
               
          
            });
           
        }
    });
}else if (bukawal=='cekidtransaksi') {
    let cekusername = `SELECT * FROM admlistdata WHERE BINARY id_transaksi = "${workerData.data.id_transaksi}"`;
    let cekusernamex = database.query(cekusername, (err, results) => {
        if (results.length > 0) {
            parentPort.postMessage({ icons: "error", texts: "No transaksi sudah digunakan", titles: "Oops ..." });
        }else{
            parentPort.postMessage({ icons: "success", texts: "", titles: "" });
        }
        // Menutup koneksi setelah query selesai
        database.end((closeErr) => {
            if (closeErr) {
                console.error('Error closing connection:', closeErr);
            } else {
                console.log('Database connection closed');
            }
        });
    });
}else if (bukawal=='universals0') {
    let cekusername = `SELECT * FROM databaseallitem`;
    let cekusernamex = database.query(cekusername, (err, results) => {
        if (results.length > 0) {
            console.log('opopop 1');
            var array=results;
            //var arraydata=workerData.dataambil;
            /* let cekusername1 = `SELECT * FROM admlistdata`;
            let cekusernamex1 = database.query(cekusername1, (err, results1) => {
                if (results1.length > 0) {
                    console.log('opopop 2');
                    for (let i = 0; i < results1.length; i++) {
                        const element = results1[i];
                        for (let j = 0; j < array.length; j++) {
                            const element1 = array[j];
                            if (element.item==element1.product) {
                                console.log('opopop 3');
                                let setnewdata = `UPDATE admlistdata SET stockprodukcode='${element1.stockprodukcode}' WHERE BINARY id_transaksi='${element.id_transaksi}'`;
                                let newdata = database.query(setnewdata, async (err, datax) => {
                                    // parentPort.postMessage({ status: 200,message:'sukses'});
                                    //console.log(err)
                                    if (results1.length<i+2) {
                                        parentPort.postMessage({ status: 200,message:'sukses'});
                                    }
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
                        
                    }
                }
                
            }); */
            

            /* for (let i = 0; i < array.length; i++) {
                const element = array[i].product;
                for (let j = 0; j < arraydata.length; j++) {
                    const elementdata = arraydata[j];
                    if (elementdata[0]==element) {
                        let setnewdata = `UPDATE databaseallitem SET stockprodukcode='${elementdata[2]!=""?"true":""}', fabric_size='${elementdata[3]}', nofabric_size='${elementdata[4]}', image='${elementdata[1]}' WHERE BINARY product='${element}'`;
                        let newdata = database.query(setnewdata, async (err, datax) => {});
                    }
                }
                
            } */
            //parentPort.postMessage({ status: 200,message:'sukses'});

            console.log(workerData.data)
            for (let i = 0; i < array.length; i++) {
                const element = array[i];
                for (let j = 0; j < workerData.data.length; j++) {
                    const element1 = workerData.data[j];
                    if (element.product==element1.product) {
                        let setnewdata = `UPDATE databaseallitem SET investor='${element1.investor}' WHERE BINARY product='${element.product}'`;
                        let newdata = database.query(setnewdata, async (err, datax) => {
                            if (j==array.length-1) {
                                parentPort.postMessage({ status: 200,message:'sukses'});
                            }
                        });
                    }
                }//price_fabric='${element1.price_fabric}', price_leather='${element1.price_leather}'
                
            }
           
        }else{
            parentPort.postMessage({ status: 400,message:'error[003]'});
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
    /* var datsx=[
        {
            itemlama:'AETHER',
            itembaru:'AETHER - STANDING'
        }, {
            itemlama:'AETHER SKY R100',
            itembaru:'AETHER - SKY R100'
        }, {
            itemlama:'AETHER SKY V1 ONYX BLACK',
            itembaru:'AETHER - SKY V1 ONYX BLACK'
        }, 
        {
            itemlama:'AETHERCLOUDK100',
            itembaru:'AETHER - CLOUD K100'
        }, 
        {
            itemlama:'AETHERCLOUDK60',
            itembaru:'AETHER - CLOUD K60'
        }, 
        {
            itemlama:'AETHERHILLK40',
            itembaru:'AETHER - HILL K40'
        }, 
        {
            itemlama:'Floodlight 10',
            itembaru:'AETHER - Track Light - Floodlight 10W'
        }, 
        {
            itemlama:'Floodlight 20',
            itembaru:'AETHER - Track Light - Floodlight 20W'
        }, 
        {
            itemlama:'Grille Lamp 12',
            itembaru:'AETHER - Track Light - Grille Lamp 12W'
        }, 
        {
            itemlama:'Grille Lamp 24',
            itembaru:'AETHER - Track Light - Grille Lamp 24W'
        }, 
        {
            itemlama:'I Connector',
            itembaru:'AETHER - Track Light - I Connector'
        }, 
        {
            itemlama:'Powersupply 100',
            itembaru:'AETHER - Track Light - Powersupply 100W'
        }, 
        {
            itemlama:'Track Rail',
            itembaru:'AETHER - Track Light - Track Rail'
        }, 
        {
            itemlama:'V90 Connector',
            itembaru:'AETHER - Track Light - V90 Connector'
        }, 
        {
            itemlama:'T Connector',
            itembaru:'AETHER - Track Light - T Connector'
        }, 
        {
            itemlama:'L Connector',
            itembaru:'AETHER - Track Light - L Connector'
        }, 
        {
            itemlama:'Powersupply 200',
            itembaru:'AETHER - Track Light - Powersupply 200W'
        }, 
        {
            itemlama:'Spotlight',
            itembaru:'AETHER - Track Light - Spotlight'
        }, 
        {
            itemlama:'AETHER SKY R150',
            itembaru:'AETHER - SKY R150'
        }, 
        {
            itemlama:'PLUS Connector',
            itembaru:'AETHER - Track Light - PLUS Connector'
        }, 
        {
            itemlama:'Folding 12 W ',
            itembaru:'AETHER - Track Light - Folding 12W'
        }, 
        {
            itemlama:'Folding 6 W ',
            itembaru:'AETHER - Track Light - Folding 6W'
        }, 
        {
            itemlama:'KO26 Connetor',
            itembaru:'AETHER - Track Light - K026 Connector'
        }, 
        {
            itemlama:'STORAGE TRAY - S',
            itembaru:'EACH - STORAGE TRAY - S'
        }, 
        {
            itemlama:'STORAGE TRAY-  M',
            itembaru:'EACH - STORAGE TRAY - M'
        }, 
        {
            itemlama:'STORAGE TRAY -  L',
            itembaru:'EACH - STORAGE TRAY -  L'
        }, 
        {
            itemlama:'DESSERT BOWL',
            itembaru:'EACH - DESSERT BOWL'
        }, 
        {
            itemlama:'CLOTHES HANGER',
            itembaru:'EACH - CLOTHES HANGER'
        }, 
        {
            itemlama:'BIDET SPRAY',
            itembaru:'EACH - BIDET SPRAY'
        }, 
        {
            itemlama:'FOLDING UMBRELLA',
            itembaru:'EACH - FOLDING UMBRELLA'
        }, 
        {
            itemlama:'TISSUE BOX ',
            itembaru:'EACH - TISSUE BOX '
        }, 
        {
            itemlama:'RAMEN BOWL - Sakura',
            itembaru:'EACH - RAMEN BOWL - Sakura'
        }, 
        {
            itemlama:'RAMEN BOWL - Wave',
            itembaru:'EACH - RAMEN BOWL - Wave'
        }, 
        {
            itemlama:'BED PILLOW',
            itembaru:'EACH - BED PILLOW'
        }, 
        {
            itemlama:'DRINKING GLASS',
            itembaru:'EACH - DRINKING GLASS'
        }, 
        {
            itemlama:'PLATE ',
            itembaru:'EACH - PLATE'
        }, 
        {
            itemlama:'TRASH BIN',
            itembaru:'EACH - TRASH BIN'
        }
    ];
    for (let i = 0; i < datsx.length; i++) {
        const element = datsx[i];
        let setnewdata = `UPDATE formstockcalculate SET item='${element.itembaru}' WHERE BINARY item='${element.itemlama}'`;
        let newdata = database.query(setnewdata, async (err, datax) => {
           if (i+1==datsx.length) {
            parentPort.postMessage({ status: 200,message:'sukses'});
           }
        });
    } */
    
}else if (bukawal=='universals1'){
    /* var array=[
        {old:'AETHER Cloud M1',new:'AETHER - Cloud M1'},{old:'AETHER Cloud R7',new:'AETHER - Cloud R7 100'},{old:'AETHER Cloud RX7',new:'AETHER - Cloud RX7 100'},{old:'AETHER Sky B83',new:'AETHER - Sky B83'},{old:'AETHER Sky V2',new:'AETHER - Sky V2'},{old:'AETHER Sky Z1',new:'AETHER - Sky Z1'},
        {old:'VOID Cloud G1',new:'VOID - Cloud G1'},
        {old:'VOID Sky B10',new:'VOID -  Sky B10'},
        {old:'VOID Sky B29',new:'VOID - Sky B29'},
        {old:'VOID SKY B80',new:'VOID - Sky B80'},
        {old:'VOID Sky B9',new:'VOID - Sky B9'},
        {old:'VOID Sky W21',new:'VOID - Sky W21'}
    ]; */

    var array=[{"kode":1000,"keterangan":"CASH","note":""},{"kode":1010,"keterangan":"BCA GAHARA | 49 888 44444","note":4000},{"kode":1011,"keterangan":"BCA GETA | 4980392860","note":4000},{"kode":1012,"keterangan":"BCA GAYAHIDUP | 5010744000","note":4000},{"kode":1020,"keterangan":"BCA QUINTENSSENSIAL","note":4000},{"kode":1021,"keterangan":"BCA OPERASIONAL JANSEN | 4980211695","note":""},{"kode":1022,"keterangan":4980392859,"note":""},{"kode":1130,"keterangan":"MANDIRI GAHARA | 0700011851503","note":""},{"kode":1140,"keterangan":"TOKOPEDIA GAHARA","note":""},{"kode":1150,"keterangan":"","note":""},{"kode":1160,"keterangan":"BANK MANDIRI GAHARA | ","note":""},{"kode":1190,"keterangan":"CROSS ACCOUNT","note":"BERFUNGSI AGAR TIDAK DOUBLE PENCATATAN JIKA ADA PENGELUARAN DARI BANK KE KAS ATAU BANK LAIN (CROSSCEK)"},{"kode":1200,"keterangan":"ACCOUNT RECEIVABLE","note":"CUSTOMER BELI PEMBAYARANNYA FULL TAPI TEMPO"},{"kode":1210,"keterangan":"SHAREHOLDER RECEIVABLE","note":""},{"kode":1220,"keterangan":"EMPLOYEE RECEIVABLE","note":""},{"kode":1230,"keterangan":"OTHER ACCOUNT RECEIVABLE","note":"CONTOH : KELEBIHAN BAYAR PPH 21 KARYAWAN"},{"kode":1300,"keterangan":"PREPAID RENTAL","note":"SEWA GEDUNG DLL"},{"kode":1310,"keterangan":"PREPAID INSURANCE","note":"ASURANSI UNTUK 1 TAHUN"},{"kode":1320,"keterangan":"PREPAID EXPENSES","note":"BIAYA PENGELUARAN DIMUKA"},{"kode":1330,"keterangan":"ADVANCED PAYMENT","note":"DP PEMBELIAN KE VENDOR"},{"kode":1340,"keterangan":"PREPAID ADVERTISING","note":""},{"kode":1350,"keterangan":"PREPAID TAXES","note":""},{"kode":1400,"keterangan":"RAW MATERIALS INVENTORIES","note":""},{"kode":1410,"keterangan":"WORK IN PROCESS INVENTORIES","note":""},{"kode":1420,"keterangan":"FINISHED GOODS INVENTORIES","note":""},{"kode":1500,"keterangan":"BUILDING","note":""},{"kode":1501,"keterangan":"ACCUMULATED DEPRECIATION OF BUILDING","note":""},{"kode":1510,"keterangan":"VEHICLE","note":""},{"kode":1511,"keterangan":"ACCUMULATED DEPRECIATION OF VEHICLE","note":""},{"kode":1520,"keterangan":"OFFICE EQUIPMENT","note":"office equipment under 1 million noted into supplies expenses"},{"kode":1521,"keterangan":"ACCUMULATED DEPRECIATION OF OFFICE EQUIPMENT","note":""},{"kode":1530,"keterangan":"MACHINARY","note":"machinary under 1 million noted into supplies expenses"},{"kode":1531,"keterangan":"ACCUMULATED DEPRECIATION OF MACHINARY","note":""},{"kode":2001,"keterangan":"ACCOUNT PAYABLES","note":"HUTANG KE VENDOR/DAGANG"},{"kode":2101,"keterangan":"SHAREHOLDER PAYABLES","note":"HUTANG KE PEMEGANG SAHAM"},{"kode":2201,"keterangan":"ADVANCE SALES","note":"DP PENJUALAN OLEH CUSTOMER"},{"kode":2301,"keterangan":"SALARIES PAYABLES","note":"HUTANG  PEMBAYARAN GAJI"},{"kode":2401,"keterangan":"ACCRUED EXPENSES","note":"CONTOH : PENCATATAN HUTANG LISTRIK AIR TELP DI AKHIR TAHUN"},{"kode":2501,"keterangan":"TAXES PAYABLES","note":"PPH BELUM TERBAYAR"},{"kode":2601,"keterangan":"VEHICLE LOAN","note":""},{"kode":2611,"keterangan":"OFFICE EQUIPMENT LOAN","note":""},{"kode":2621,"keterangan":"MACHINARY LOAN","note":""},{"kode":2701,"keterangan":"BANK LOAN","note":""},{"kode":3000,"keterangan":"CAPITAL STOCK","note":""},{"kode":3100,"keterangan":"RETAINED EARNINGS","note":""},{"kode":3200,"keterangan":"EARNING OF THE YEAR","note":""},{"kode":4000,"keterangan":"SALES","note":""},{"kode":4010,"keterangan":"SALES DISCOUNT","note":""},{"kode":5001,"keterangan":"COST OF GOODS SOLD (COGS)","note":""},{"kode":5101,"keterangan":"LABOR SALARIES EXPENSES","note":"gaji karyawan pabrik berhubungan langsung dengan proses produksi"},{"kode":5201,"keterangan":"INCOMING FREIGHT & PACKING COST","note":"Biaya ongkos kirim & packing pembelian barang (material)"},{"kode":5301,"keterangan":"INDIRECT LABOR SALARIES EXPENSES","note":"gaji karyawan pabrik tp tidak berhubungan langsung dengan proses produksi contoh pengawas, satpam, ob"},{"kode":5401,"keterangan":"FACTORY & LAND RENTAL EXPENSES","note":""},{"kode":5501,"keterangan":"FACTORY UTILITIES EXPENSES","note":"AIR, LISTRIK, TELEPON, INTERNET CIRENDEU & JEPARA"},{"kode":6001,"keterangan":"MARKETPLACE COMMISSION EXPENSES","note":""},{"kode":6101,"keterangan":"ADVERTISE AND PROMOTION EXPENSES","note":""},{"kode":6111,"keterangan":"ENTERTAINTMENT EXPENSES","note":""},{"kode":6121,"keterangan":"MEETING / TRAINING / SEMINAR EXPENSES","note":""},{"kode":6131,"keterangan":"COMMUNICATION EXPENSES","note":""},{"kode":6141,"keterangan":"SUPPLIES EXPENSES","note":"contoh seragam safety, mesin & peralatan yang harganya dibawah 1jt"},{"kode":6151,"keterangan":"TRAVEL AND TRANSPORTATION EXPENSES","note":""},{"kode":6161,"keterangan":"VEHICLE MAINTENANCE EXPENSES","note":""},{"kode":6171,"keterangan":"MACHINARY MAINTENANCE EXPENSES","note":""},{"kode":6181,"keterangan":"STORE RENTAL EXPENSES","note":""},{"kode":6191,"keterangan":"STORE UTILITIES EXPENSES","note":"AIR, LISTRIK, TELEPON, INTERNET CLASSY"},{"kode":6192,"keterangan":"FREIGHT & PACKING EXPENSES","note":"Biaya ongkos kirim & packing pengiriman barang ke customer"},{"kode":6201,"keterangan":"ADMINISTRATION SALARIES EXPENSES","note":"Gaji karyawan yang tidak berhubungan dengan proses produksi contoh admin, pm, procurement, finance, ob dikantor"},{"kode":6211,"keterangan":"OFFICE BUILDING RENTAL EXPENSES","note":""},{"kode":6221,"keterangan":"OFFICE UTILITIES EXPENSES","note":"AIR, LISTRIK, TELEPON, INTERNET GIA"},{"kode":6231,"keterangan":"BUILDING MAINTENANCE EXPENSES","note":""},{"kode":6241,"keterangan":"OFFICE EQUIPMENT MAINTENANCE EXPENSES","note":""},{"kode":6251,"keterangan":"HOUSEHOLD EXPENSES","note":""},{"kode":6261,"keterangan":"POS & STATIONARY EXPENSES","note":""},{"kode":6271,"keterangan":"LEGAL & ADMINISTRATION EXPENSES","note":""},{"kode":6281,"keterangan":"INSURANCE EXPENSES","note":""},{"kode":6291,"keterangan":"INTEREST LOAN EXPENSES","note":""},{"kode":6301,"keterangan":"BUILDING DEPRECIATION EXPENSES","note":""},{"kode":6311,"keterangan":"VEHICLE DEPRECIATION EXPENSES","note":""},{"kode":6321,"keterangan":"OFFICE EQUIPMENT DEPRECIATION EXPENSES","note":""},{"kode":6331,"keterangan":"MACHINARY DEPRECIATION EXPENSES","note":""},{"kode":6411,"keterangan":"BANK ADMINISTRATION EXPENSES","note":""},{"kode":6511,"keterangan":"OTHER EXPENSES","note":""},{"kode":7000,"keterangan":"OTHER INCOME","note":"penerimaan ongkir, packing & custom dari customer (extra charge)"},{"kode":7100,"keterangan":"INTEREST INCOME","note":""},{"kode":7200,"keterangan":"INTEREST EXPENSES","note":""}];
/* 
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        //
        //UPDATE nama_tabel SET keterangan = REPLACE(keterangan, 'abon', 'kerbau') WHERE keterangan LIKE '%abon%';
        //`UPDATE databaseallitem SET product='${element.new}' WHERE BINARY product='${element.old}'`
        let setnewdata = `UPDATE formstockcalculate SET keterangan = REPLACE(keterangan, '${element.old}', '${element.new}') WHERE keterangan LIKE '%${element.old}%'`;
        let newdata = database.query(setnewdata, async (err, datax) => {
            if (i==array.length-1) {
                parentPort.postMessage({ status: 200,message:'sukses'});
                database.end((closeErr) => {
                    if (closeErr) {
                        console.error('Error closing connection:', closeErr);
                    } else {
                        console.log('Database connection closed');
                    }
                });
            }
        });
        let setnewdata = "INSERT INTO databaseitem_proc SET ?";
        let newdata = database.query(setnewdata, element,async (err, datax3) => {
            if (err) {
                parentPort.postMessage({ status: 500,message:JSON.stringify(err)});
                database.end((closeErr) => {
                    if (closeErr) {
                        console.error('Error closing connection:', closeErr);
                    } else {
                        console.log('Database connection closed');
                    }
                });
            }else{
                if (i==array.length-1) {
                    parentPort.postMessage({ status: 200,message:'sukses'});
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
    } */
   


    // Jalankan proses insert
    batchInsert(array, (err, message) => {
        if (err) {
            console.error("Gagal insert:", err);
            parentPort?.postMessage({ status: 500, message: JSON.stringify(err) });
        } else {
            console.log(message);
            parentPort?.postMessage({ status: 200, message: message });
        }
    });
}else if (bukawal=='universals'){
    updateDetails();
    
}

function queryPromise(sql, params = []) {
  return new Promise((resolve, reject) => {
    database.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

async function updateDetails() {
  const resultLog = {
    updated: [],
    failed: [],
    error: null
  };

  try {
    const investorRows = await queryPromise('SELECT product, investor_mj FROM databaseallitem');
    const investorMap = {};
    investorRows.forEach(row => {
      investorMap[row.product] = row.investor_mj || null;
    });

    const financeRows = await queryPromise('SELECT no, details FROM finance_banklimbo');

    for (const row of financeRows) {
      let details;
      try {
        details = JSON.parse(row.details);
      } catch (e) {
        resultLog.failed.push({ no: row.no, reason: 'JSON Parse Error' });
        continue;
      }

      const updatedDetails = details.map(item => ({
        ...item,
        investor_mj: investorMap[item.item] || null
      }));

      try {
        await queryPromise('UPDATE finance_banklimbo SET details = ? WHERE no = ?', [
          JSON.stringify(updatedDetails),
          row.no
        ]);
        resultLog.updated.push(row.no);
      } catch (e) {
        resultLog.failed.push({ no: row.no, reason: 'Update Error', error: e.message });
      }
    }

    database.end();
    parentPort.postMessage({
      status: 200,
      message: 'Update selesai',
      result: resultLog
    });

  } catch (err) {
    database.end();
    parentPort.postMessage({
      status: 500,
      message: 'Terjadi kesalahan utama',
      error: err.message
    });
  }
}

function getMonthLetter() {
    const letters = "ABCDEFGHIJKL"; // A - Januari, B - Februari, ..., L - Desember
    const monthIndex = new Date().getMonth(); // 0 (Januari) hingga 11 (Desember)
    return letters[monthIndex];
}
// Fungsi untuk mendapatkan huruf acak dari a-z
function getRandomLetter() {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    return letters[Math.floor(Math.random() * letters.length)];
}


////

function getKeysFromFirstItem(arr) {
    return Object.keys(arr[0]);
}
function batchInsert(dataArray, callback) {
    const keys = getKeysFromFirstItem(dataArray);
    const placeholders = `(${keys.map(() => '?').join(',')})`;
    const sql = `INSERT INTO database_coa (${keys.join(',')}) VALUES `;

    let i = 0;
    function insertNextBatch() {
        if (i >= dataArray.length) {
            database.end();
            callback(null, "Selesai insert semua data.");
            return;
        }

        const batch = dataArray.slice(i, i + BATCH_SIZE);
        const values = batch.map(obj => keys.map(k => obj[k]));
        const allValues = [].concat(...values); // Flatten

        const batchSQL = sql + batch.map(() => placeholders).join(',');

        database.query(batchSQL, allValues, (err, result) => {
            if (err) {
                callback(err);
                database.end();
                return;
            }
            i += BATCH_SIZE;
            insertNextBatch();
        });
    }

    insertNextBatch();
}
