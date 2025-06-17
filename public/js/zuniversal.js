

function openmodals(id) {
    const el = document.getElementById(id);
    let instance = bootstrap.Modal.getInstance(el);
    if (!instance) {
    instance = new bootstrap.Modal(el);
    }
    instance.show();
}

//format uang
function formatMoney(amount, decimalCount = 2, decimal = ",", thousands = ".") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands);
    } catch (e) {
        console.log(e)
    }
};

function warningunderbuild() {
    $('#modalunderbuild').modal('show');
}

function logout() {
    Swal.fire({
        title: "",
        text:'Anda ingin logout akun?',
        showDenyButton: true,
        //showCancelButton: true,
        confirmButtonText: "Ya",
        denyButtonText: `Tidak`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            localStorage.clear();
            sessionStorage.clear();
            document.cookie = `hamburger=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
            window.open('/login','_self');
        } 
    });
  
}

function cekdatausersorout() {
    var hamburger=getCookie('hamburger');
    var oldversion=localStorage.getItem('versionapp');
    console.log('hamburger === ');
    console.log(hamburger);
    if (hamburger=='') {
        updateted();
    }else{
        if (oldversion==null) {
            updateted();
        }else {
            if (oldversion!=versionapp) {
                updateted();
            }
        }
    }
    
    aktifpopover();

}
function aktifpopover() {
    // Aktifkan semua popover
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(triggerEl => new bootstrap.Popover(triggerEl, {
        trigger: 'click',
        html: true
    }));

    // Dismiss saat klik di luar
    document.addEventListener('click', function (e) {
        const popoverEl = document.querySelector('.popover');
        
        // cek apakah klik di luar semua trigger dan popover
        if (popoverEl && ![...popoverTriggerList].some(trigger => trigger.contains(e.target)) && !popoverEl.contains(e.target)) {
            popoverList.forEach(popover => popover.hide());
        }
    });
    //cara pakai set di bawah di dalam html
    //data-bs-toggle="popover" data-bs-trigger="focus" data-bs-title="Dismissible popover" data-bs-content="And here’s some amazing content. It’s very engaging. Right?"
}

function updateted() {
    console.log('hahi');
    Swal.fire({
        icon: 'warning',
        title: '',
        text: 'Ada update sistem, Anda akan terlogout automatis',
        showConfirmButton: false,
        allowOutsideClick:false
    });
    Swal.showLoading();
    setTimeout(function () {
    
        setTimeout(function () {
        
            localStorage.clear();
            sessionStorage.clear();
            document.cookie = `hamburger=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
            window.open('/login','_self');
        
        }, 1000);
    }, 2000);
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//update total tugas saya setiap role
///////////
function hitungtugassaya_universal(array) {
    var gethumburger=JSON.parse(getCookie('hamburger'));//datauser
    var rolerusers=gethumburger.tipeuser.toLowerCase();

    //supervisor
    if (rolerusers=='supervisor') {
        var dataarray=JSON.parse(document.getElementById('itemalls').dataset.json);

        console.log('alll ');
        console.log(dataarray);

        const jumlahProsesProduksi = dataarray.dataadminlist.filter(element =>
            element.packde_qc!='true'&&element.code2.toLowerCase()=='up'&&element.stockprodukcode.toLowerCase()!='true'&&element.forcedsent!='true'&&element.status.toLowerCase()!='selesai'&&element.approval_produkjadi!='true'&&element.status.toLowerCase()=='selesai produksi'
        ).length;

        //&&!element.deliveryunit.toLowerCase().includes('third party')

        //document.getElementById('totaltugassayapesanan').textContent=`(${jumlahProsesProduksi})`;

        //stock up
        var arraystocks=dataarray.stockupholsterydatabase;

        console.log('alll arraystocks');
        console.log(arraystocks.length);

        const jumlahProsesProduksistock = arraystocks.filter(element =>
        element.qty!='0'&&element.upholstery_selesaibuatstock==='true'&&element.fixcreatein!='instocked'&&element.approval_produkjadi!='true'
        ).length;
        //

        //forcestatus
        var arrayforcestatus=dataarray.forcestatusrequest;
        const jumlahforcestatus=arrayforcestatus.filter(element =>
        element.approval_forcestatus!='true'
        ).length;
        //

        document.querySelectorAll('[name="totaltugassayapesanan"]').forEach(el => {
            el.textContent = `(${jumlahProsesProduksi})`; 
        });

        document.querySelectorAll('[name="totaltugassayapesananstock"]').forEach(el => {
        el.textContent = `(${jumlahProsesProduksistock})`; 
        });

        document.querySelectorAll('[name="totaltugassayaforcestatus"]').forEach(el => {
        el.textContent = `(${jumlahforcestatus})`; 
        });

        document.querySelectorAll('[name="totaltugassayaall"]').forEach(el => {
            el.textContent = `${jumlahProsesProduksi+jumlahProsesProduksistock+jumlahforcestatus}`; 
        });
    }
    
}
/////