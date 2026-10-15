// Boneco pixelado do Andres. Cada letra é um pixel; a paleta fica embaixo.
// Para mudar cabelo, pele ou roupa, troque só as cores em CORES.
const AVATAR = [
  '......kkkkkkkk......',
  '....kkhhhhhhhhkk....',
  '...khhhhhhhhhhhhk...',
  '..khhhhhhhhhhhhhhk..',
  '..khhhhhhhhhhhhhhk..',
  '..khhhssssssssshhk..',
  '..khsssssssssssshk..',
  '..kssswwsssswwsssk..',
  '..kssswesssswessskk.',
  '.ksssssssssssssssSk.',
  '.kSssssssmmsssssSk..',
  '..kssssssssssssssk..',
  '..kSsssmmmmmmsssSk..',
  '...kSssssssssssSk...',
  '....kkSSssssSSkk....',
  '......kkssssk.......',
  '....kkttkssktttkk...',
  '..kkttttttttttttttk.',
  '.kttttttllllttttttk.',
  '.kttsttttllltttttsk.',
  '.kttsktttlllttttksk.',
  '.ksstkttttttttttkssk',
  '.kssskttttttttttksk.',
  '..kkkkppppppppppkk..',
  '.....kppppkppppk....',
  '.....kppppkppppk....',
  '.....kppppkppppk....',
  '.....kppppkppppk....',
  '....kbbbbbkbbbbbk...',
  '....kbbbbbkbbbbbk...',
];

const CORES = {
  k: '#14110f', // contorno
  h: '#2a1c14', // cabelo
  s: '#c8906a', // pele
  S: '#a9714f', // pele (sombra)
  w: '#ffffff', // olho
  e: '#14110f', // pupila
  m: '#7a4a35', // boca
  t: '#1d1f1c', // camiseta
  l: '#c5f230', // logo >_ da camiseta
  p: '#2f3a52', // calça
  b: '#f4f4f0', // tênis
};

function desenhaAvatar(alvo) {
  const px = 12;
  const largura = Math.max(...AVATAR.map(l => l.length));
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', `0 0 ${largura * px} ${AVATAR.length * px}`);
  svg.setAttribute('shape-rendering', 'crispEdges');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Andres em pixel art');
  AVATAR.forEach((linha, y) => {
    [...linha].forEach((c, x) => {
      if (!CORES[c]) return;
      const r = document.createElementNS(ns, 'rect');
      r.setAttribute('x', x * px); r.setAttribute('y', y * px);
      r.setAttribute('width', px + .6); r.setAttribute('height', px + .6);
      r.setAttribute('fill', CORES[c]);
      if (c === 'w' || c === 'e') r.setAttribute('class', 'olho');
      svg.appendChild(r);
    });
  });
  alvo.appendChild(svg);
}
