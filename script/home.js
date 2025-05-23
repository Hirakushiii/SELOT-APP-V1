if (localStorage.getItem('account-name') === null) {
    async function redirect() {
        await 
            Swal.fire({
                backdrop: `
                rgba(0,0,0,.8)
                left top
                no-repeat
                `,
                    icon: "error",
                    title: "Oops...",
                    text: "Silahkan Login Terlebih Dahulu!",
                });
        window.location.href = '/'
    }
    redirect()
}
let balance = parseInt(localStorage.getItem('balance')) || 0;

// Cookies.set('balance', 100000)
// localStorage.setItem('balance', 0);

const symbols = [
    "0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟",
    // "🍎", "🍊", "🍐", "🍔", "🍕", "🍲", "🍜", "🍱", "🍣", "🍙", "🍚", 
    // "🍛", "🍝", "🍠", "🍢", "🍥", "🍘", "🍿", "🥟", "🥠", "🥡", "🥢", 
    // "🥣", "🥤", "🍶", "🍵", "🍽", "🥄", "🍩", "🍪", "🍫", "🍬", 
    // "🍭", "🍮", "🍯", "🍰", "🎂", "🍨", "🍧", "🍡", "🍦",
    "​#️⃣"
];
const values = {
    "0️⃣": 500,
    "1️⃣": 2000,
    "2️⃣": 3500,
    "3️⃣": 5500,
    "4️⃣": 7500,
    "5️⃣": 9500,
    "6️⃣": 11500,
    "7️⃣": 15000,
    "8️⃣": 12000,
    "9️⃣": 13000,
    "🔟": 14000,
    "​#️⃣​": 20000, //JACKPOT
    // "🍎": 600,
    // "🍊": 700,
    // "🍐": 800,
    // "🍔": 1000,
    // "🍕": 1100,
    // "🍲": 1200,
    // "🍜": 1300,
    // "🍱": 1400,
    // "🍣": 1500,
    // "🍛": 1600,
    // "🍝": 1700,
    // "🍠": 1800,
    // "🍢": 1900,
    // "🍥": 2000,
    // "🍘": 2100,
    // "🍿": 2200,
    // "🥟": 2300,
    // "🥠": 2400,
    // "🥡": 2500,
    // "🥢": 2600,
    // "🥣": 2700,
    // "🥤": 2800,
    // "🍶": 2900,
    // "🍵": 3000,
    // "🍽": 3200,
    // "🥄": 3300,
    // "🍩": 3400,
    // "🍪": 3500,
    // "🍫": 3600,
    // "🍬": 3700,
    // "🍭": 3800,
    // "🍮": 3900,
    // "🍯": 4000,
    // "🍰": 4100,
    // "🎂": 4200,
    // "🍨": 4300,
    // "🍧": 4400,
    // "🍡": 4500,
    // "🍦": 4600,
};
let spinning = false;
let spinCost = 500;
let spinCount = 0;
let jackpotSpinCount = 0;
let autoSpinCount = 0;
// console.log(balance);
document.getElementById("balance").innerText = `Rp ${balance.toLocaleString()}`;

  
// Fungsi untuk memperbarui saldo
async function updateBalance(amount) {
    // await balance -= amount;
    await localStorage.setItem('balance', balance -= amount);
    // console.log(balance);
    document.getElementById("balance").innerText = `Rp ${balance.toLocaleString()}`;
};  
// Fungsi untuk mendapatkan simbol acak
function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}
const rangeSlider = document.getElementById("myRange");
const jumlahDisplay = document.getElementById("jumlah");

rangeSlider.addEventListener('input', () => {
    const nilai = rangeSlider.value;
    const nilaiFormatted = 'Rp,' + nilai.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") //CONVERT TO IDR
    jumlahDisplay.textContent = nilaiFormatted;
    spinCost = parseInt(nilai)
});


// Fungsi utama untuk melakukan spin
function spin() {
    if (spinning) return;
    if (balance < spinCost) {
        alert("Saldo tidak cukup untuk melakukan spin.");
        location.reload()
        return;
    }
    spinning = true;
    updateBalance(spinCost);
    spinCount++;
    jackpotSpinCount++;
  
    const slot1 = document.getElementById("slot1");
    const slot2 = document.getElementById("slot2");
    const slot3 = document.getElementById("slot3");
    const result = document.getElementById("result");
    result.innerText = "Semoga Beruntung";
    let spins = 3;
  
    function animateSpin(slot, delay) {
        setTimeout(() => {
            const interval = setInterval(() => {
                slot.innerText = getRandomSymbol();
            }, 100);
            setTimeout(() => {
                clearInterval(interval);
                slot.innerText = getRandomSymbol();
                spins--;
                if (spins === 0) {
                    determineResult();
                    spinning = false;
                    if (autoSpinCount > 0) {
                        autoSpinCount--;
                        if (autoSpinCount > 0) {
                            setTimeout(spin, 500);
                        }
                    }
                }
            }, 1000);
        }, delay);
    }
  
    function determineResult() {
        let symbol1 = slot1.innerText;
        let symbol2 = slot2.innerText;
        let symbol3 = slot3.innerText;
  
        let winAmount = 0;
        const jackpotChance = 5; //ALGORITMA JACKPOT. (KECIL KEMUNGKINAN JACKPOT) 0 > 10 (PASTI LANGSUNG JACKPOT)
        
        if (Math.floor(Math.random() * (100 - 0 + 1)) + 0 < jackpotChance) {
            symbol1 = symbol2 = symbol3 = "​#️⃣​";
            winAmount = (values["​#️⃣​"] * 2) + spinCost;
            jackpotSpinCount = 0;
        }else {
            if (symbol1 === '#️⃣' && symbol2 === '#️⃣' || symbol1 === '#️⃣' && symbol3 === '#️⃣' || symbol2 === '#️⃣' && symbol3 === '#️⃣') {
                return;
            }else if (symbol1 === symbol2 && symbol2 === symbol3) {
                winAmount = (values[symbol1] * 6) + spinCost;
            } else if (
                symbol1 === symbol2 ||
                symbol2 === symbol3 ||
                symbol1 === symbol3
            ) {
                if (symbol1 === symbol2) winAmount += (values[symbol1] * 3) + spinCost;
                if (symbol2 === symbol3) winAmount += (values[symbol2] * 3) + spinCost;
                if (symbol1 === symbol3) winAmount += (values[symbol1] * 3) + spinCost;
            }
        }
        if (symbol1 === symbol2 && symbol2 === symbol3) {
            tambahBalances(winAmount);
            result.innerText = `JACKPOTTTTT..... Selamat Anda mendapatkan Rp ${winAmount.toLocaleString()}!`;
            // console.log(balance);
        }else if (winAmount > 0) {
            tambahBalances(winAmount);
            result.innerText = `Selamat Anda mendapatkan Rp ${winAmount.toLocaleString()}!`;
            // console.log(balance);
        } else {
            result.innerText = "Kamu Belum Beruntung, Silahkan Coba Kembali";
        }
  
        slot1.innerText = symbol1;
        slot2.innerText = symbol2;
        slot3.innerText = symbol3;
    }
  
    animateSpin(slot1, 0);
    animateSpin(slot2, 500);
    animateSpin(slot3, 1000);
}
function all_in() {
    rangeSlider.value = balance;
    const nilaiFormatted = 'Rp,' + balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") //CONVERT TO IDR
    jumlahDisplay.textContent = nilaiFormatted;
    spinCost = balance;
}
// Fungsi untuk memulai spin otomatis
function startAutoSpin(count) {
    if (spinning) return;
    if (balance < spinCost * count) {
        alert("Saldo tidak cukup untuk melakukan spin otomatis.");
        return;
    }
    autoSpinCount = count;
    spin();
}
  
// Fungsi untuk menarik saldo (withdraw)
function withdraw() {
    const amount = prompt("Masukkan jumlah penarikan:");
    const parsedAmount = parseInt(amount);
    if (!isNaN(parsedAmount) && parsedAmount > 0 && parsedAmount <= balance) {
        balance -= parsedAmount
        updateBalances(balance)
        alert(
            `Penarikan berhasil! Saldo Anda sekarang Rp ${balance.toLocaleString()}`
        );
        location.reload()
    } else {
        alert("Jumlah tidak valid atau saldo tidak mencukupi.");
    }
}
function updateBalances(value) {
    localStorage.setItem('balance', value);
    document.getElementById("balance").innerText = `Rp ${value.toLocaleString()}`;
}
function getBalances(key) {
    return localStorage.getItem(key);
}
async function tambahBalances(nilai) {
    balance += parseInt(nilai);
    updateBalances(balance);
    // let balanceBaru = parseInt(getBalances('balance')) + nilai;
}
// function kurangiBalance() {
//     // let balanceBaru = parseInt(balance) - parseInt(nilai);
//     // console.log(balance);
//     // console.log(nilai);
//     // console.log(balanceBaru);
//     // // Pastikan balance tidak menjadi negatif
//     // // if (balanceBaru < 0) {
//     // //     balanceBaru = 0;
//     // // }
//     updateBalances('balance', balance);
// }