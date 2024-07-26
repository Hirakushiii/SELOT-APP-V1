const values = {
    "​🎰​ (JACKPOT)": 15000,
    "🍒": '1.000',
    "🍋": 500,
    "🍉": 2000,
    "🍇": 3000,
    "🍓": 1500,
    "🍍": 2500,
    "🍏": 800,
    "🍆": 1200,
    "🍈": 1800,
    "🥭": 2200,
    "🍑": 8000,
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
    "🍦": 4600,
};

function table(){
    Object.entries(values).forEach(([namaBuah, nilaiBuah]) =>{
        const nilaiFormatted = 'Rp, ' + nilaiBuah.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        document.querySelector('#table-body').innerHTML += TableFragment(namaBuah, nilaiFormatted)
    })
    document.querySelector('#total').innerHTML = `Total Prize: ${Object.entries(values).length}`
}
table()
function TableFragment(Name , Value) {
    return `
        <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${Name}
            </th>
            <td class="px-6 py-4">
                ${Value}
            </td>
        </tr>
    `
}