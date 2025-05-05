// Seletor das cartas e categorias
const cartasContainer = document.querySelector('.cartas-container');
const galeria = document.querySelector('main');
const ipessoal = document.getElementById('ipessoal');
const iwork = document.getElementById('iwork');
let cartasTimeout;

// Função para verificar se as cartas estão visíveis
function checarCartas() {
    const galeriaTop = galeria.getBoundingClientRect().top;
    const galeriaBottom = galeria.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;

    const galeriaVisivel = galeriaTop < windowHeight && galeriaBottom > 0;

    if (galeriaVisivel) {
        if (!cartasContainer.classList.contains('visivel')) {
            clearTimeout(cartasTimeout);
            cartasTimeout = setTimeout(() => {
                cartasContainer.style.bottom = '-250px';
                cartasContainer.style.opacity = '1';
                cartasContainer.classList.add('visivel');
            }, 140);
        }
    } else {
        clearTimeout(cartasTimeout);
        cartasContainer.style.bottom = '-300px';
        cartasContainer.style.opacity = '0';
        cartasContainer.classList.remove('visivel');
    }
}

// Função para alterar as imagens e o texto da categoria
function mudarCategoria(categoria) {
    const categoriaTexto = document.querySelector('#icategorias h1');

    // Esconde as categorias anteriores
    ipessoal.classList.add('esconder');
    iwork.classList.add('esconder');

    // Exibe a categoria correta
    if (categoria === 'pessoal') {
        categoriaTexto.textContent = 'Pessoal';
        ipessoal.classList.remove('esconder');
        ipessoal.classList.add('mostrar');
    } else if (categoria === 'work') {
        categoriaTexto.textContent = 'Work';
        iwork.classList.remove('esconder');
        iwork.classList.add('mostrar');
    }
}

// Função para rolar até o título após o clique na carta
function rolarParaTitulo() {
    const categoriaTexto = document.querySelector('#icategorias h1');
    const tituloRect = categoriaTexto.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calcular a posição de rolagem para centralizar o título
    const scrollPosition = tituloRect.top + window.scrollY - (windowHeight / 2) + (tituloRect.height / 2);

    // Rolagem suave para centralizar o título
    window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth' // Rolagem suave
    });
}

// Evento de clique nas cartas para alterar as categorias, exibir as divs e rolar para o título
document.querySelector('.carta-1').addEventListener('click', () => {
    mudarCategoria('pessoal');
    rolarParaTitulo(); // Rola para o título ao clicar
});

document.querySelector('.carta-2').addEventListener('click', () => {
    mudarCategoria('work');
    rolarParaTitulo(); // Rola para o título ao clicar
});

// Função de inicialização para exibir a categoria "Pessoal" por padrão
window.addEventListener('DOMContentLoaded', () => {
    mudarCategoria('pessoal');
});

// Listener de scroll para verificar visibilidade das cartas
window.addEventListener('scroll', checarCartas);
window.addEventListener('load', checarCartas);
