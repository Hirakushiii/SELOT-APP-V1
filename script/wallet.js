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
function svgHide() {
    if (getStorage('blur-balance') === 'true') {
        document.querySelector('#svg-eye').innerHTML = 
        `<svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
        </svg>
        `
    }else{
        document.querySelector('#svg-eye').innerHTML = 
        `<svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
  <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
</svg>
`
    }
}
document.addEventListener("DOMContentLoaded", async function () {
    await svgHide();
    setHideBalance();
});
function setHideBalance() {
    const blurBalance = localStorage.getItem('blur-balance');
    document.querySelector('#Balance').innerHTML = (getStorage('balance') === null) ? 0 : toIdr(getStorage('balance'));
    if (blurBalance === 'true') {
        document.querySelector('#Balance').innerHTML = `Rp, ${'*'.repeat(getStorage('balance').length)}`
    }
}
document.querySelector('#hide-balance-toogle').addEventListener('change', async () => {
    const hideBalance = document.querySelector('#hide-balance-toogle')
    const balance = document.querySelector('#Balance')
    if (hideBalance.checked) {
        // svgHide();
        balance.innerHTML = `Rp, ${'*'.repeat(getStorage('balance').length)}`
        await localStorage.setItem('blur-balance', true)
        // location.reload()
    } else {
        // svgHide();
        balance.innerHTML = (getStorage('balance') === null) ? 0 : toIdr(getStorage('balance'));
        await localStorage.setItem('blur-balance', false)
        // location.reload()
    }
})
// document.querySelector('#Balance').innerHTML = (getStorage('balance') === null) ? 0 : toIdr(getStorage('balance'));

function CloseModal() {
    document.querySelector('#close-modal').addEventListener('click', () => {
        document.querySelector('#authentication-modal').classList.add('hidden');
    });
}


document.querySelector('#Deposit').addEventListener('click', async () =>{
    document.querySelector('#modal-parent').innerHTML = await modalFragment('Deposit' , 'SETOR')
    document.querySelector('#confirm-btn').addEventListener('click', async () =>{
        const DepositValue = document.querySelector('#deposit-value').value
        if (typeof(DepositValue) === 'string' && DepositValue > 0 && DepositValue <= 10000000000) {
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
                    <button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal" id="close-modal" onclick="CloseModal()">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <div class="p-4 md:p-5">
                    <div class="mb-3">
                        <label for="deposit-value" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jumlah ${params}:</label>
                        <input type="text" inputmode="numeric" name="text" id="deposit-value" class="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-0 focus:border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Max ${params} 1M" autocomplete="off" required />
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