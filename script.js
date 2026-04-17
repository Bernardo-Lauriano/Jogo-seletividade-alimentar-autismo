// Alimentos organizados por categorias
const alimentosPorCategoria = {
  proteinas: [
    { nome: 'Ovo Frito',   twemoji: '1f373' },
    { nome: 'coxa de frango',twemoji: '1f357' },
    { nome: 'Feijão',      twemoji: '1fad8' },
    { nome: 'Carne',       emoji: '🍖' },
    { nome: 'Leite',     emoji: '🥛' },
  ],
  carboidratos: [
    { nome: 'Arroz',       twemoji: '1f35a' },
    { nome: 'Macarrão',    twemoji: '1f35d' },
    { nome: 'Batata',      twemoji: '1f954' },


  ],
  verduras: [
    { nome: 'Alface',      twemoji: '1f96c' },
    { nome: 'Espinafre',   emoji: '🌱' },
    { nome: 'Brócolis',    twemoji: '1f966' },
    { nome: 'Rúcula',      twemoji: '1f331' },
    { nome: 'Tomate',      twemoji: '1f345' },
  ],
  legumes: [
    { nome: 'Cenoura',     twemoji: '1f955' },
    { nome: 'Milho',       emoji: '🌽' },
    { nome: 'Abobrinha',   twemoji: '1f952' },
    { nome: 'Gengibre',    emoji: '🫚'},
    { nome: 'Pepino',      twemoji: '1f952' },
    { nome: 'Batata Doce', emoji: '🍠' },
  ],
  frutas: [
    { nome: 'Banana',      twemoji: '1f34c' },
    { nome: 'Maçã',        twemoji: '1f34e' },
    { nome: 'Laranja',     twemoji: '1f34a' },
    { nome: 'Morango',     twemoji: '1f353' },
    { nome: 'Uva',         twemoji: '1f347' },
    { nome: 'Melancia',    twemoji: '1f349' },
    { nome: 'Melão',       emoji: '🍈' },
    { nome: 'Pêssego',     twemoji: '1f351' },
    { nome: 'Pera',        twemoji: '1f350' },
    { nome: 'Tangerina',   twemoji: '1f34b' },
    { nome: 'Cereja',      twemoji: '1f352' },
  ]
};

// Array flat com todos os alimentos para referência
const alimentos = [
  ...alimentosPorCategoria.proteinas,
  ...alimentosPorCategoria.carboidratos,
  ...alimentosPorCategoria.verduras,
  ...alimentosPorCategoria.legumes,
  ...alimentosPorCategoria.frutas
];

// Variável para rastrear categoria atual
let categoriaAtual = 'proteinas';

function imgUrl(twemoji) {
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${twemoji}.svg`;
}

let pratoItens = []; // array de indices globais dos alimentos

// Função para filtrar e exibir alimentos de uma categoria
function filtrarCategoria(botao, categoria) {
  console.log('filtrarCategoria chamado com:', categoria);
  console.log('botao:', botao);
  categoriaAtual = categoria;
  
  // Atualizar botões ativos
  document.querySelectorAll('.categoria-btn').forEach(btn => {
    btn.classList.remove('ativo');
  });
  
  // Ativar o botão clicado
  botao.classList.add('ativo');
  
  renderGrid();
}

function renderGrid() {
  const grid = document.getElementById('foodGrid');
  grid.innerHTML = '';
  
  // Obter alimentos da categoria atual
  const alimentosCategoria = alimentosPorCategoria[categoriaAtual] || [];
  
  console.log('Renderizando categoria:', categoriaAtual, 'com', alimentosCategoria.length, 'alimentos');
  
  alimentosCategoria.forEach((a, indexCategoria) => {
    // Encontrar índice global do alimento
    const indexGlobal = alimentos.findIndex(al => al.nome === a.nome);
    
    const div = document.createElement('div');
    div.className = 'food-item' + (pratoItens.includes(indexGlobal) ? ' selected' : '');
    const imagemSrc = a.emoji ? `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text x='50' y='70' font-size='80' text-anchor='middle'>${a.emoji}</text></svg>` : imgUrl(a.twemoji);
    div.innerHTML = `
      <div class="selected-badge">✓</div>
      <img class="food-img" src="${imagemSrc}" alt="${a.nome}" loading="lazy"
        onerror="this.style.fontSize='28px';this.style.lineHeight='44px';this.outerHTML='<span style=\\'font-size:28px;display:block;text-align:center;height:44px;line-height:44px;\\'>${getEmoji(indexGlobal)}</span>'">
      <div class="food-name">${a.nome}</div>
    `;
    div.onclick = () => toggleAlimento(indexGlobal);
    grid.appendChild(div);
  });
}

const emojiFallback = ['🥚','🍳','🫘','🍖','🍚','🍝','🥔','🍟','🥬','🌿','🍅','🥕','🫚','🥒','🌽','🍊','🍇','🍌','🍓','🍋','🍐'];
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
console.log('Script carregado! Categorias:', Object.keys(alimentosPorCategoria));
console.log('Total alimentos:', alimentos.length);
console.log('Botões encontrados:', document.querySelectorAll('.categoria-btn').length);
