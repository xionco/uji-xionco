import mysql from 'mysql';
//create database connection createPool createConnection
var dtbase = mysql.createPool({
     connectionLimit: 10000, // jumlah maksimum koneksi aktif
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'xioncodatabases'//
});
/* dtbase.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
}); */

export default dtbase;