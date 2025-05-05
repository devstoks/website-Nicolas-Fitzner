// Cria a bolinha do cursor
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

// Offset para alinhar a bolinha com a ponta do clique
const offsetX = -8; // Ajuste horizontal
const offsetY = -5; // Ajuste vertical

// Move a bolinha conforme o mouse se move
document.addEventListener('mousemove', (e) => {
  cursor.style.left = (e.clientX + offsetX) + 'px';
  cursor.style.top = (e.clientY + offsetY) + 'px';

  // Verifica se o elemento abaixo do cursor é clicável
  const el = document.elementFromPoint(e.clientX, e.clientY);

  // Checagem se o elemento é clicável
  let isClickable = false;
  let current = el;
  while (current && current !== document.body) {
    const style = getComputedStyle(current);
    if (style.cursor === 'pointer' || current.tagName === 'A' || current.tagName === 'BUTTON') {
      isClickable = true;
      break;
    }
    current = current.parentElement;
  }

  // Se o elemento é clicável, aplica a classe 'clickable'
  if (isClickable) {
    cursor.classList.add('clickable');
  } else {
    cursor.classList.remove('clickable');
  }
});
