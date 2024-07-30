const Input_btn = document.querySelector('#input-btn').addEventListener('click', async () =>{
    const values = document.querySelector('#input-value').value
    if (values === '') {
        return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Login Gagal!",
            });
    }else{
        await Swal.fire({
                title: "Login Success",
                text: `Halo, Selamat datang ${values}!`,
                icon: "success"
            });
        localStorage.setItem('account-name', values)
        window.location.href = './app/home.html'
    }
    values = '';
})