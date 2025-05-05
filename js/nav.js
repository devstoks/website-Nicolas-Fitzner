let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
const inicio = document.getElementById('inicio');

function navbarControle() {
    const scrollPosition = window.scrollY;
    //const bannerEmVisao = scrollPosition < (inicio.offsetTop + inicio.offsetHeight);

    if (scrollPosition <= 50) {
        // Sempre visível e transparente no topo ou vendo banner
        navbar.classList.remove('hidden');
        navbar.classList.add('transparent');
        navbar.classList.remove('scrolled');
        return;
    }

    if (scrollPosition > lastScrollTop) {
        // Descendo: some imediatamente
        navbar.classList.add('hidden');
        navbar.classList.remove('scrolled');
        navbar.classList.remove('transparent');
    } else {
        // Subindo: aparece cinza
        navbar.classList.remove('hidden');
        navbar.classList.add('scrolled');
        navbar.classList.remove('transparent');
    }

    lastScrollTop = scrollPosition;
}

window.addEventListener('scroll', navbarControle);

document.addEventListener('DOMContentLoaded', () => {
    navbar.classList.add('transparent');
});
