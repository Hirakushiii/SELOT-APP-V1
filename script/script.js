const values = document.querySelector('#input-value')
values.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    document.querySelector('#input-btn').click();
  }
});
const Input_btn = document.querySelector('#input-btn').addEventListener('click', async () =>{
    if (values.value === '' || values.value.length <= 2) {
        return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Input Tidak Valid (Minimal 2 huruf)",
            });
    }else{
        await Swal.fire({
                title: "Login Success",
                text: `Halo, Selamat datang ${values.value}!`,
                icon: "success"
            });
        localStorage.setItem('account-name', values.value)
        localStorage.setItem('balance', 0)
        window.location.href = './app/home.html'
    }
    values.value = '';
})
const textElement = document.querySelector('#typewriter');
const text = ['#STOPJUDOL', '#JUDOLMEMBUATMUSENGSARA', '#MARIBERANTASJUDOL','QS. Al-Maidah Ayat 90','Wahai orang-orang yang beriman','Sesungguhnya minuman keras,','Berjudi,','(Berkurban untuk) Berhala','Dan mengundi nasib dengan anak panah adalah perbuatan keji','Termasuk perbuatan setan','Maka, Jauhilah (Perbuatan-Perbuatan) Itu agar kamu beruntung',"'Fii amanillah' Kawan-Kawanku :')"];
let currentIndex = 0;

function animate() {
    textElement.style.opacity = 0; // Fade out
    setTimeout(() => {
        textElement.textContent = text[currentIndex];
        currentIndex = (currentIndex + 1) % text.length;
        textElement.style.opacity = 1; // Fade in
    }, 500);
}

// Jalankan animasi pertama kali
animate();

// Ulangi animasi setiap 2 detik
setInterval(animate, 2000);
