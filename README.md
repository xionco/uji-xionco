sistem ini menggunakan :
- Nodejs
- Expressjs (ejs)
- Bootstrap 5.3
- HTML, CSS, Javascript & Jquery
- SQL database

views :
- ejs di layout [header, dll] + ejs sesuai divisi + ejs di layout [footerscript, dll]

flow :
- flow tanpa ambil database : user akses link -> backend [app.js -> routers] -> user frontend
- flow dengan ambil database : user akses link -> backend [app.js -> routers -> workerthread] -> user frontend

akses localhost pada uji ini :
login : http://localhost:3000/
username : 111110
password : 123

home page :
http://localhost:3000/editdatabase
