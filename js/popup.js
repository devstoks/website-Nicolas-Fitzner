// Pega todas as imagens que têm a classe "imagem-clicavel"
const imagens = document.querySelectorAll('.imagem-clicavel');
const popup = document.getElementById('popup-imagem');
const imagemGrande = document.getElementById('imagem-grande');
const botaoFechar = document.getElementById('fechar-popup');
const rostoInferior = document.getElementById('icone-container');

let isZoomed = false;
let isDragging = false;
let startX, startY;
let initialLeft, initialTop;

// Ao clicar nas imagens
imagens.forEach(img => {
  img.addEventListener('click', function () {
    abrirImagem(this.id);
  });
});

// Função para abrir o popup
function abrirImagem(idImagem) {
  const imagemClicada = document.getElementById(idImagem);
  // Se for um bloco de fundo, pega o background-image e transforma em src
  const estilo = window.getComputedStyle(imagemClicada);
  const backgroundImage = estilo.getPropertyValue('background-image');
  const url = backgroundImage.slice(5, -2); // remove url(" e ")
  imagemGrande.src = url;

  popup.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Travar scroll
}

// Função para fechar o popup
function fecharImagem() {
    popup.style.display = 'none';
    document.body.style.overflow = 'auto'; // Liberar scroll
    resetarZoom();
  }
  
  // Fechar o popup ao pressionar a tecla 'Esc'
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      fecharImagem();
    }
  });

// Clicar na imagem para dar zoom ou remover zoom
imagemGrande.addEventListener('click', (e) => {
  // Impede o fechamento do popup ao clicar na imagem
  e.stopPropagation();

  // Se não estiver arrastando, aplica ou remove o zoom
  if (!isDragging) {
    if (!isZoomed) {
      imagemGrande.style.transform = 'scale(2)';
      imagemGrande.style.cursor = 'grab';
      isZoomed = true;
    } else {
      resetarZoom();
    }
  }
});

// Começar a arrastar
imagemGrande.addEventListener('mousedown', (e) => {
  if (isZoomed) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    const rect = imagemGrande.getBoundingClientRect();
    initialLeft = rect.left;
    initialTop = rect.top;
    imagemGrande.style.cursor = 'grabbing';
    e.preventDefault(); // Impede o comportamento padrão (seleção de texto, etc.)
  }
});

// Movimentar enquanto arrasta
document.addEventListener('mousemove', (e) => {
  if (isDragging && isZoomed) {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    imagemGrande.style.transform = `translate(${dx}px, ${dy}px) scale(2)`;
  }
});

// Soltar o mouse (parar de arrastar mas manter zoom)
document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    if (isZoomed) {
      imagemGrande.style.cursor = 'grab';
    }
  }
});

// Botão de fechar
botaoFechar.addEventListener('click', fecharImagem);

// Resetar zoom
function resetarZoom() {
  imagemGrande.style.transform = 'translate(0, 0) scale(1)';
  imagemGrande.style.cursor = 'default';
  isZoomed = false;
}



