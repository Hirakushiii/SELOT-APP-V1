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

const values = {
    "​#️⃣ (JACKPOT)​": 20000, //JACKPOT
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
    // "​🎰​ (JACKPOT)": 15000,
    // "🍒": 1000,
    // "🍋": 500,
    // "🍉": 2000,
    // "🍇": 3000,
    // "🍓": 1500,
    // "🍍": 2500,
    // "🍏": 800,
    // "🍆": 1200,
    // "🍈": 1800,
    // "🥭": 2200,
    // "🍑": 8000,
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

function Modal() {
    document.querySelector('#edit-modal').classList.toggle('hidden');
}
function CloseModal() {
    document.querySelector('#authentication-modal').classList.add('hidden');
    // document.querySelector('#close-modal').addEventListener('click', () => {
    // });
}
function table(){
    Object.entries(values).forEach(([namaBuah, nilaiBuah]) =>{
        const nilaiFormatted = 'Rp, ' + nilaiBuah.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        document.querySelector('#table-body').innerHTML += TableFragment(namaBuah, nilaiFormatted)
    })
    document.querySelector('#total').innerHTML = `Total : ${Object.entries(values).length}`
    document.querySelector('#acc-desc').innerHTML = getStorage('desc-account') || 'Your Description'
    document.querySelector('#acc-name').innerHTML = getStorage('account-name') || 'Undefined Account Name'
    document.querySelector('#profile-pict').innerHTML = GetFirstWord(getStorage('account-name')) || ''
}
table()

document.querySelector('#modal-btn').addEventListener('click', async () =>{
    document.querySelector('.modal-parent').innerHTML = ModalFragment(getStorage('account-name'),getStorage('desc-account'))
    await document.querySelector('#edit-modal').addEventListener('click', ()=>{
        const name = document.querySelector('#modal-name').value
        const desc = document.querySelector('#modal-desc').value
        if (name === '') {
            return false
        }else{
            deleteStorage('desc-account')
            deleteStorage('account-name')
            addStorage('desc-account', desc)
            addStorage('account-name', name)
            window.location.reload()
        }
    })
})
document.querySelector('#logout-btn').addEventListener('click', async () =>{
    await Swal.fire({
        title: "Apakah kamu yakin?",
        text: "Balance kamu akan ter-riset saat kamu logout",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Logout sekarang"
    }).then( async (result) => {
        if (result.isConfirmed) {
            await Swal.fire({
                title: "Success",
                text: "Logout Berhasil!",
                icon: "success"
            });
            document.location.href = '/'
            localStorage.clear();
        }
    });
})

function getStorage(key) {
    return localStorage.getItem(key);
}
function addStorage(key , value) {
    return localStorage.setItem(key, value);
}
function deleteStorage(key) {
    return localStorage.removeItem(key);
}
function GetFirstWord(key) {
    const kataKata = key.split(' ')
    const hasil = kataKata.map(kata => kata[0].toUpperCase()).join('');
    return hasil;
}
function TableFragment(Name , Value) {
    return `
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${Name}
            </th>
            <td class="px-6 py-4">
                ${Value}
            </td>
        </tr>
    `
}
function ModalFragment(name , desc) {
    return `
        <div tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full" id="authentication-modal">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Personalisasi Akun
                    </h3>
                    <button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onclick="CloseModal()">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-4 md:p-5">
                    <form class="space-y-4">
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text" name="name" id="modal-name" value="${name}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="your name..." required />
                        </div>
                        <div class="pt-2">
                            <label for="desc" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <input type="text" name="text" id="modal-desc" value="${desc}" placeholder="your description..." class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <button type="button" id="edit-modal" class="w-full mt-3 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">Edit Account</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `
}