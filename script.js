// Alimentos usando imagens SVG inline via data URI — ilustrações vetoriais simples para cada item
// Para cada alimento, usaremos uma imagem realista via URL de emoji twemoji (Mozilla/Twitter open source)
const alimentos = [
  { nome: 'Arroz',       twemoji: '1f35a' },
  { nome: 'Feijão',      twemoji: '1fad8' },
  { nome: 'Macarrão',    twemoji: '1f35d' },
  { nome: 'Batata Frita',twemoji: '1f35f' },
  { nome: 'Ovo',         twemoji: '1f95a' },
  { nome: 'Ovo Frito',   twemoji: '1f373' },
  { nome: 'Batata',      twemoji: '1f954' },
  { nome: 'Cenoura',     twemoji: '1f955' },
  { nome: 'Alface',      twemoji: '1f96c' },
  { nome: 'Tomate',      twemoji: '1f345' },
  { nome: 'Gengibre',   emoji: '🫚'},
  { nome: 'Milho',     emoji: '🌽' },
  { nome: 'Abobrinha',   twemoji: '1f952' },
  { nome: 'Rúcula',      twemoji: '1f331' },
  { nome: 'Laranja',     twemoji: '1f34a' },
  { nome: 'Uva',         twemoji: '1f347' },
  { nome: 'Banana',      twemoji: '1f34c' },
  { nome: 'Morango',     twemoji: '1f353' },
  { nome: 'Tangerina',   twemoji: '1f34b' },
  { nome: 'Pera',        twemoji: '1f350' },
];

function imgUrl(twemoji) {
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${twemoji}.svg`;
}

let pratoItens = []; // array de indices

function renderGrid() {
  const grid = document.getElementById('foodGrid');
  grid.innerHTML = '';
  alimentos.forEach((a, i) => {
    const div = document.createElement('div');
    div.className = 'food-item' + (pratoItens.includes(i) ? ' selected' : '');
    const imagemSrc = a.emoji ? `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text x='50' y='70' font-size='80' text-anchor='middle'>${a.emoji}</text></svg>` : imgUrl(a.twemoji);
    div.innerHTML = `
      <div class="selected-badge">✓</div>
      <img class="food-img" src="${imagemSrc}" alt="${a.nome}" loading="lazy"
        onerror="this.style.fontSize='28px';this.style.lineHeight='44px';this.outerHTML='<span style=\\'font-size:28px;display:block;text-align:center;height:44px;line-height:44px;\\'>${getEmoji(i)}</span>'">
      <div class="food-name">${a.nome}</div>
    `;
    div.onclick = () => toggleAlimento(i);
    grid.appendChild(div);
  });
}

const emojiFallback = ['🍚','🫘','🍝','🍟','🥚','🍳','🥔','🥕','🥬','🍅','🫚','🧅','🥒','🌿','🍊','🍇','🍌','🍓','🍋','🍐'];
function getEmoji(i) { return emojiFallback[i] || '🍽️'; }

function toggleAlimento(idx) {
  const pos = pratoItens.indexOf(idx);
  if (pos === -1) {
    pratoItens.push(idx);
  } else {
    pratoItens.splice(pos, 1);
  }
  renderGrid();
  renderPrato();
}

function renderPrato() {
  const prato = document.getElementById('pratoInterna');
  prato.innerHTML = '';

  if (pratoItens.length === 0) {
    prato.innerHTML = '<div class="prato-vazio-txt">🍽️<br>Escolha<br>um alimento!</div>';
    prato.className = 'prato-interna';
    return;
  }

  const n = pratoItens.length;
  let cls = 'prato-interna ';
  if (n === 1) cls += 'n1';
  else if (n === 2) cls += 'n2';
  else if (n === 3) cls += 'n3';
  else cls += 'nmany';
  prato.className = cls;

  pratoItens.forEach((idx, pos) => {
    const a = alimentos[idx];
    const card = document.createElement('div');
    card.className = 'prato-food-card pop';
    card.title = `Toque para remover ${a.nome}`;
    card.onclick = () => { pratoItens.splice(pratoItens.indexOf(idx), 1); renderGrid(); renderPrato(); };

    const img = document.createElement('img');
    img.src = a.emoji ? `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text x='50' y='70' font-size='80' text-anchor='middle'>${a.emoji}</text></svg>` : imgUrl(a.twemoji);
    img.alt = a.nome;
    img.loading = 'lazy';
    img.onerror = function() {
      this.style.display = 'none';
      const sp = document.createElement('span');
      sp.style.cssText = 'font-size:32px;display:block;text-align:center;';
      sp.textContent = getEmoji(idx);
      card.insertBefore(sp, card.firstChild);
    };

    const lbl = document.createElement('div');
    lbl.className = 'prato-food-label';
    lbl.textContent = a.nome;

    card.appendChild(img);
    card.appendChild(lbl);
    prato.appendChild(card);
  });
}

function limparPrato() {
  pratoItens = [];
  renderGrid();
  renderPrato();
}

renderGrid();
