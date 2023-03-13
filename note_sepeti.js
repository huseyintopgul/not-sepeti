const yeniGorev = document.querySelector(".input-gorev");
const gorevEkleBtn = document.querySelector(".btn-gorev-ekle");
const gorevListesi = document.querySelector(".gorev-listesi");

gorevEkleBtn.addEventListener("click", gorevEkle);
gorevListesi.addEventListener("click", gorevDurum);
document.addEventListener("DOMContentLoaded", localStorageOku);


//gorev listesi oluşturma alanı
function gorevEkle(e) {
    e.preventDefault();

    if (yeniGorev.value.length > 1) {
        gorevItemOlustur(yeniGorev.value);

        //localstorage kaydet
        localStorageSave(yeniGorev.value);
        yeniGorev.value = '';
    } else {
        alert("Lütfen Bir Not Giriniz!");
    }
};

//gorev ıtem oluşturma funksiyonu
function gorevItemOlustur(gorev) {
    //div oluşturma
    const gorevDiv = document.createElement("div");
    gorevDiv.classList.add("gorev-item");

    //li oluşturma
    const gorevLi = document.createElement("li");
    gorevLi.classList.add("gorev-tanim");
    gorevLi.innerHTML = gorev;
    gorevDiv.appendChild(gorevLi);

    //tamamlandı butonu ekleme
    const gorevTamamBtn = document.createElement("button");
    gorevTamamBtn.classList.add("gorev-btn");
    gorevTamamBtn.classList.add("gorev-btn-tamamlandi");
    gorevTamamBtn.innerHTML = '<i class="fas fa-thumbs-up"></i>';
    gorevDiv.appendChild(gorevTamamBtn);

    //gorev sil buton ekleme
    const gorevSil = document.createElement("button");
    gorevSil.classList.add("gorev-btn");
    gorevSil.classList.add("gorev-btn-sil");
    gorevSil.innerHTML = '<i class="fas fa-trash"></i>';
    gorevDiv.appendChild(gorevSil);

    //ul ye oluşturulan div'i ekleme
    gorevListesi.appendChild(gorevDiv);
}

// görev durum aksiyon alanı
function gorevDurum(e) {
    const tiklananEleman = e.target;

    if (tiklananEleman.classList.contains("gorev-btn-tamamlandi")) {
        tiklananEleman.parentElement.classList.toggle("gorev-tamamlandi");
    };
    if (tiklananEleman.classList.contains("gorev-btn-sil")) {
        if (confirm("Notunuzu Silmek İstediğinizden Emin Misiniz?")) {
            tiklananEleman.parentElement.classList.toggle("sil");
            const silinecekGorev = tiklananEleman.parentElement.children[0].innerText;
            localStorageSil(silinecekGorev);
            tiklananEleman.parentElement.addEventListener("transitionend", () => {
                tiklananEleman.parentElement.remove();
            })
        }
    };

};

//localstorage dizine dönüştürme
function localStorageArray() {

    if (localStorage.getItem("gorevler") === null) {
        gorevler = [];
    } else {
        gorevler = JSON.parse(localStorage.getItem("gorevler"));
    }
    return gorevler;
}

//localstorage kayıt
function localStorageSave(yeniGorev) {
    let gorevler = localStorageArray();
    gorevler.push(yeniGorev);
    localStorage.setItem("gorevler", JSON.stringify(gorevler));
}

//localstorage oku
function localStorageOku() {
    let gorevler = localStorageArray();
    gorevler.forEach(function (gorev) {
        gorevItemOlustur(gorev);
    });
}

//localstorage silme fonksiyonu
function localStorageSil(gorev) {
    let gorevler = localStorageArray();
    //splice ile silme işlemi
    const silinecekGorevIndex = gorevler.indexOf(gorev);
    console.log(silinecekGorevIndex);
    gorevler.splice(silinecekGorevIndex, 1);

    localStorage.setItem("gorevler", JSON.stringify(gorevler));

}

