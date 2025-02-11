import { GoogleGenerativeAI } from "@google/generative-ai";

// Inisialisasi API Gemini
const genAI = new GoogleGenerativeAI("AIzaSyAqpOe3dpZ1OSJhJWY8lMLhuXAiXGIccoY");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Inisialisasi Markdown-it
const md = window.markdownit();

// Fungsi untuk efek mengetik
function startTypingEffect(textElement, text, speed = 100) {
  let index = 0;
  textElement.innerHTML = "";
  return new Promise((resolve) => {
    function type() {
      if (index < text.length) {
        textElement.innerHTML += text[index];
        index++;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    }
    type();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const dropbtn = document.querySelector(".dropbtn");
  const dropdown = document.querySelector(".dropdown");

  dropbtn.addEventListener("click", function (event) {
    event.stopPropagation(); // Hentikan event bubbling
    if (dropdown.style.transform === "translateX(0px)") {
      dropdown.style.transform = "translateX(200%)";
      setTimeout(() => {
        dropdown.style.display = "none";
      }, 500); // Sesuaikan dengan durasi transisi
    } else {
      dropdown.style.display = "block"; // Tampilkan dropdown
      setTimeout(() => {
        dropdown.style.transform = "translateX(0px)"; // Geser ke posisi awal
      }, 10);
    }
  });

  // Tutup dropdown jika klik di luar dropdown
  document.addEventListener("click", function (event) {
    if (!dropdown.contains(event.target) && !dropbtn.contains(event.target)) {
      dropdown.style.transform = "translateX(-100%)"; // Geser kembali
      setTimeout(() => {
        dropdown.style.display = "none"; // Sembunyikan dropdown setelah animasi selesai
      }, 500); // Sesuaikan dengan durasi transisi
    }
  });
});

// Event Listener untuk form
document.getElementById("myform").addEventListener("submit", async (event) => {
  event.preventDefault();

  const resultElement = document.getElementById("resultText");
  const loadingElement = document.getElementById("loadingText");

  // Menampilkan teks animasi mengetik
  const loadingText = "⏳ Sedang mencari destinasi yang sesuai";
  await startTypingEffect(loadingElement, loadingText, 100);

  // Mengambil data dari form
  const username = document.getElementById("username1").value;
  const mood = document.getElementById("mood1").value;
  const location = document.getElementById("location1").value;
  const budget = document.getElementById("budget1").value;
  const cuaca = document.getElementById("cuaca1").value;
  const transportasi = document.getElementById("transportasi1").value;

  const prompt = `
        Halo, nama saya ${username} 👋. Saya ingin berlibur ke ${location} dan mencari destinasi yang sesuai dengan preferensi saya. Saya menginginkan liburan dengan suasana ${mood}, dengan perkiraan budget sekitar ${budget} 💰. Saya lebih suka cuaca yang ${cuaca} ☁️ saat berlibur. Untuk perjalanan, saya akan menggunakan ${transportasi} 🚗.Mohon rekomendasikan destinasi yang spesifik berdasarkan kriteria saya. Harap sertakan informasi berikut:Nama tempat, Alamat lengkap, Harga/tarif masuk, Deskripsi singkat tentang tempat tersebut, Nomor telepon kontak, Sumber informasi (link website, jika ada)
    `;

  try {
    // Memanggil API Gemini untuk menghasilkan respons
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    // Menghapus teks loading dan mengganti dengan hasil akhir
    loadingElement.innerHTML = "";
    resultElement.innerHTML = md.render(responseText);
  } catch (error) {
    loadingElement.innerHTML = "";
    resultElement.innerHTML =
      "❌ Terjadi kesalahan saat mengambil data. Coba lagi!";
    console.error(error);
  }
});
