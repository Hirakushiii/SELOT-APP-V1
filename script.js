const symbols = [
    "🍒", "🍋", "🍉", "🍇", "🍓", "🍍", "🍏", "🍆", "🍈", "🥭", "🍑",
    "🍎", "🍊", "🍐", "🍔", "🍕", "🍲", "🍜", "🍱", "🍣", "🍙", "🍚", 
    "🍛", "🍝", "🍠", "🍢", "🍥", "🍘", "🍿", "🥟", "🥠", "🥡", "🥢", 
    "🥣", "🥤", "🍶", "🍵", "🍴", "🍽", "🥄", "🍩", "🍪", "🍫", "🍬", 
    "🍭", "🍮", "🍯", "🍰", "🎂", "🍨", "🍧", "🍡", "🍦"
];
const values = {
    "🍒": 1000,
    "🍋": 500,
    "🍉": 2000,
    "🍇": 3000,
    "🍓": 1500,
    "🍍": 2500,
    "🍏": 800,
    "🍆": 1200,
    "🍈": 1800,
    "🥭": 2200,
    "🍑": 10000, // Nilai jackpot yang lebih tinggi
    "🍎": 600,
    "🍊": 700,
    "🍐": 800,
    "🍔": 1000,
    "🍕": 1100,
    "🍲": 1200,
    "🍜": 1300,
    "🍱": 1400,
    "🍣": 1500,
    "🍛": 1600,
    "🍝": 1700,
    "🍠": 1800,
    "🍢": 1900,
    "🍥": 2000,
    "🍘": 2100,
    "🍿": 2200,
    "🥟": 2300,
    "🥠": 2400,
    "🥡": 2500,
    "🥢": 2600,
    "🥣": 2700,
    "🥤": 2800,
    "🍶": 2900,
    "🍵": 3000,
    "🍴": 3100,
    "🍽": 3200,
    "🥄": 3300,
    "🍩": 3400,
    "🍪": 3500,
    "🍫": 3600,
    "🍬": 3700,
    "🍭": 3800,
    "🍮": 3900,
    "🍯": 4000,
    "🍰": 4100,
    "🎂": 4200,
    "🍨": 4300,
    "🍧": 4400,
    "🍡": 4500,
    "🍦": 4600
};
let balance = 0;
let spinning = false;
let spinCost = 1000;
let spinCount = 0;
let jackpotSpinCount = 0;
let autoSpinCount = 0;
  
// Fungsi untuk memperbarui saldo
function updateBalance(amount) {
    balance += amount;
    document.getElementById("balance").innerText = balance.toLocaleString();
}
  
// Fungsi untuk mendapatkan simbol acak
function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}
const rangeSlider = document.getElementById("myRange");
const jumlahDisplay = document.getElementById("jumlah");

rangeSlider.addEventListener('input', () => {
    const nilai = rangeSlider.value;
    const nilaiFormatted = 'Rp,' + nilai.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    jumlahDisplay.textContent = nilaiFormatted;
    spinCost = parseInt(nilai)
});


// Fungsi utama untuk melakukan spin
function spin() {
    if (spinning) return;
    if (balance < spinCost) {
        alert("Saldo tidak cukup untuk melakukan spin.");
        return;
    }
    spinning = true;
    updateBalance(-spinCost);
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
        const jackpotChance = 0.50; // Misalnya : 0.00 = 0% Jackpot / 0.05 = 5% jackpot / 0.10 = 10% jackpot
  
        if (Math.random() < jackpotChance) {
            symbol1 = symbol2 = symbol3 = "🍑";
            winAmount = values["🍑"] + spinCost;
            jackpotSpinCount = 0;
        } else {
            if (symbol1 === symbol2 && symbol2 === symbol3) {
                winAmount = values[symbol1] * 3;
            } else if (
                symbol1 === symbol2 ||
                symbol2 === symbol3 ||
                symbol1 === symbol3
            ) {
                if (symbol1 === symbol2) winAmount += values[symbol1] * 2;
                if (symbol2 === symbol3) winAmount += values[symbol2] * 2;
                if (symbol1 === symbol3) winAmount += values[symbol1] * 2;
            }
        }
  
        if (winAmount > 0) {
            result.innerText += ` Anda mendapatkan Rp ${winAmount.toLocaleString()}!`;
            updateBalance(winAmount);
        } else {
            result.innerText += " Coba Kembali";
        }
  
        slot1.innerText = symbol1;
        slot2.innerText = symbol2;
        slot3.innerText = symbol3;
    }
  
    animateSpin(slot1, 0);
    animateSpin(slot2, 500);
    animateSpin(slot3, 1000);
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
  
// Fungsi untuk menambahkan saldo (deposit)
function deposit() {
    const amount = prompt("Masukkan jumlah deposit:");
    const parsedAmount = parseInt(amount);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
        updateBalance(parsedAmount);
        alert(
            `Deposit berhasil! Saldo Anda sekarang Rp ${balance.toLocaleString()}`
        );
    } else {
        alert("Jumlah tidak valid.");
    }
}
  
// Fungsi untuk menarik saldo (withdraw)
function withdraw() {
    const amount = prompt("Masukkan jumlah penarikan:");
    const parsedAmount = parseInt(amount);
    if (!isNaN(parsedAmount) && parsedAmount > 0 && parsedAmount <= balance) {
        updateBalance(-parsedAmount);
        alert(
            `Penarikan berhasil! Saldo Anda sekarang Rp ${balance.toLocaleString()}`
        );
    } else {
        alert("Jumlah tidak valid atau saldo tidak mencukupi.");
    }
}
