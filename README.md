sistem ini menggunakan :
- Nodejs
- Expressjs (ejs)
- Bootstrap 5.3
- HTML, CSS, Javascript & Jquery
- SQL database

views ejs :
- ejs di layout [header, dll] + ejs sesuai divisi + ejs di layout [footerscript, dll]

flow :
- flow tanpa ambil database : user akses link -> backend [app.js -> routers] -> user frontend
- flow dengan ambil database : user akses link -> backend [app.js -> routers -> workerthread] -> user frontend

akses localhost pada uji ini :

http://localhost:3000/

username : 111110

password : 123

page yang menjadi tugas :
http://localhost:3000/editdatabase
- buat pada bagian delivery unit
- menampilkan data delivery unit dan tipe-nya (In-House atau Thirdparty)
- fitur add data delivery unit baru dan bisa add lebih dari satu sekaligus
- fitur delete data delivery unit yang dipilih
  

files ejs ada di views -> editdatabase
file js frontend ada di public -> js
file ejs delivery unit sudah ada namun masih perlu disesuaikan untuk menampilkan delivery unit


untuk running file develop ini menggunakan nodedemon namun dapat juga menggunakan sintak node pada umumnya.
