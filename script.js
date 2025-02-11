window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    var heroSection = document.getElementById('hero-section');
    var heroSectionRect = heroSection.getBoundingClientRect();
    var heroSectionBottom = heroSectionRect.bottom;

    // Mengubah warna navbar jika bagian bawah hero section kurang dari tinggi navbar
    if (heroSectionBottom < navbar.offsetHeight) {
        navbar.style.backgroundColor = '#1E1E1E'; // Warna hitam
        navbar.style.color = '#fff'; // Teks putih
    } else {
        navbar.style.backgroundColor = 'rgba(30, 30, 30, 0)'; // Warna asli
        navbar.style.color = '#ffffff56'; // Teks asli
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const dropbtn = document.querySelector('.dropbtn');
    const dropdown = document.querySelector('.dropdown');

    dropbtn.addEventListener('click', function(event) {
        event.stopPropagation(); // Hentikan event bubbling
        if (dropdown.style.transform === 'translateX(0px)') {
            dropdown.style.transform = 'translateX(200%)';
            setTimeout(() => {
                dropdown.style.display = 'none';
            }, 500); // Sesuaikan dengan durasi transisi
        } else {
            dropdown.style.display = 'block'; // Tampilkan dropdown
            setTimeout(() => {
                dropdown.style.transform = 'translateX(0px)'; // Geser ke posisi awal
            }, 10);
        }
    });

    // Tutup dropdown jika klik di luar dropdown
    document.addEventListener('click', function(event) {
        if (!dropdown.contains(event.target) && !dropbtn.contains(event.target)) {
            dropdown.style.transform = 'translateX(-100%)'; // Geser kembali
            setTimeout(() => {
                dropdown.style.display = 'none'; // Sembunyikan dropdown setelah animasi selesai
            }, 500); // Sesuaikan dengan durasi transisi
        }
    });
});


function seedMessage() {
    const message = document.getElementById('message').value;
    const contact = document.getElementById('select-contact-someone').value;

    if (!message || !contact) {
        alert("Silakan isi pesan dan pilih kontak.");
        return;
    }

    // Koneksi ke API WA
    const apiUrl = "https://api.whatsapp.com/send?phone=" + contact + "&text=" + encodeURIComponent(message);

    // Mengirim pesan
    window.open(apiUrl, '_blank');
}

function toggleForm() {
    const formSideFixed = document.getElementById('formSideFixed');
    
    if (formSideFixed.style.transform === 'translateX(0%)') {
        formSideFixed.style.transform = 'translateX(100%)';
    } else {
        formSideFixed.style.transform = 'translateX(0%)';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const formSideFixed = document.getElementById('formSideFixed');
    formSideFixed.style.transform = 'translateX(100%)';
});
