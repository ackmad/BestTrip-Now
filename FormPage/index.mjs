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

// Event Listener untuk form
document.getElementById("myform").addEventListener("submit", async (event) => {
    event.preventDefault();

    const resultElement = document.getElementById("resultText");
    const loadingElement = document.getElementById("loadingText");

    // Menampilkan teks animasi mengetik
    const loadingText = "⏳ Sedang mencari destinasi yang sesuai";
    await startTypingEffect(loadingElement, loadingText, 100);

    // Mengambil data dari form
    const username = document.getElementById("username").value;
    const mood = document.getElementById("mood").value;
    const location = document.getElementById("location").value;
    const budget = document.getElementById("budget").value;
    const cuaca = document.getElementById("cuaca").value;
    const transportasi = document.getElementById("transportasi").value;
    const jenisDestinasi = document.getElementById("jenisDestinasi").value;
    const akomodasi = document.getElementById("akomodasi").value;
    const aktivitas = document.getElementById("aktivitas").value;
    const jumlahOrang = document.getElementById("jumlahOrang").value;
    const lamaLiburan = document.getElementById("lamaLiburan").value;

    const prompt = `
        Halo, nama saya ${username} 👋. Saya ingin berlibur ke ${location} dan mencari destinasi yang sesuai dengan preferensi saya. Saya menginginkan liburan dengan suasana ${mood}, dengan perkiraan budget sekitar ${budget} 💰. Saya lebih suka cuaca yang ${cuaca} ☁️ saat berlibur. Untuk perjalanan, saya akan menggunakan ${transportasi} 🚗. Saya tertarik mengunjungi tempat seperti ${jenisDestinasi} 🏕 dan menginap di ${akomodasi} 🏨. Selama liburan, saya ingin melakukan aktivitas seperti ${aktivitas} 🎯. Saya akan pergi bersama ${jumlahOrang} 👥 dan berencana menghabiskan waktu selama ${lamaLiburan} ⏳.
        Mohon rekomendasikan destinasi yang spesifik berdasarkan kriteria saya. Harap sertakan informasi berikut: Nama tempat, Alamat lengkap, Harga/tarif masuk, Deskripsi singkat tentang tempat tersebut, Nomor telepon kontak,Sumber informasi (link website, jika ada)
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
        resultElement.innerHTML = "❌ Terjadi kesalahan saat mengambil data. Coba lagi!";
        console.error(error);
    }
});
