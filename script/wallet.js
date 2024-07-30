document.querySelector('#Balance').innerHTML = toIdr(getStorage('balance'))

document.querySelector('#Deposit').addEventListener('click', async () =>{
    document.querySelector('#modal-parent').innerHTML = await modalFragment('Deposit' , 'SETOR')
    document.querySelector('#confirm-btn').addEventListener('click', async () =>{
        const DepositValue = document.querySelector('#deposit-value').value
        if (!isNaN(DepositValue) && DepositValue > 0 && DepositValue <= getStorage('balance')) {
            await Swal.fire({
                title: "Deposit Berhasil",
                text: `Kamu deposit dengan total ${toIdr(DepositValue)}!`,
                icon: "success"
            });
            tambahBalances(DepositValue)
            location.reload()
        } else {
            await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Jumlah Tidak Valid / Saldo Overload",
            });
            location.reload()
        }
    })
})
document.querySelector('#Withdraw').addEventListener('click', async () =>{
    document.querySelector('#modal-parent').innerHTML = await modalFragment('Withdraw' , 'TARIK')
    document.querySelector('#confirm-btn').addEventListener('click', async () =>{
        const DepositValue = document.querySelector('#deposit-value').value
        if (!isNaN(DepositValue) && DepositValue > 0 && DepositValue <= getStorage('balance')) {
            let OldBalance = getStorage('balance')
            const LastBalance = OldBalance -= DepositValue
            updateBalances(LastBalance)
            await Swal.fire({
                title: "Withdraw Berhasil",
                text: `Kamu Berhasil Withdraw dengan total ${toIdr(DepositValue)}!`,
                icon: "success"
            });
            location.reload()
        } else {
            await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Jumlah Tidak Valid / Saldo Tidak Mencukupi",
            });
            location.reload()
        }
    })
})

function tambahBalances(nilai) {
    let balanceSaatIni = parseInt(getStorage('balance'));
    let balanceBaru = balanceSaatIni + parseInt(nilai);
    updateBalances(balanceBaru);
}
function updateBalances(value) {
    localStorage.setItem('balance', value);
}
function toIdr(value) {
    return 'Rp, ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
function getStorage(value) {
    return localStorage.getItem(value)
}

function modalFragment(params,btnText) {
    return `
        <div id="authentication-modal" class="mx-auto overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Masukkan Jumlah ${params}
                    </h3>
                    <button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <div class="p-4 md:p-5">
                    <div class="mb-3">
                        <label for="deposit-value" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jumlah ${params}:</label>
                        <input type="text" inputmode="numeric" name="text" id="deposit-value" class="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-0 focus:border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="..." autocomplete="off" required />
                    </div>
                    <div>
                        <button class="relative w-full inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white" id="confirm-btn">
                            <span class="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            ${btnText}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    `
}