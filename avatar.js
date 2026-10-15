// Boneco pixelado do Andres. Cada letra é um pixel; a paleta fica embaixo.
// Para mudar cabelo, pele ou roupa, troque só as cores em CORES.
const AVATAR = [
  '..........kkhhhhhhhhkk..........',
  '.........kHhHhHhHhHhHhk.........',
  '........khhhhhhhhhhhhhhk........',
  '........khhHhHhHhHhHhHhk........',
  '........khhhhhhhhhhhhhhk........',
  '........khshhhhhhhhhhshk........',
  '........khsssssssssssshk........',
  '........kfssssssssssssfk........',
  '........kfshhhhsshhhhsfk........',
  '........kfgggggssgggggfk........',
  '........kggBeLggggBeLggk........',
  '.......kssgLewgssgLewgSsk.......',
  '.......kSsgLLLgssgLLLgSSk.......',
  '.......kssgggggSSgggggSsk.......',
  '.......ksbsssssSSsssssbsk.......',
  '........kbssssSssSssssbk........',
  '........kbssbbbbbbbbssbk........',
  '........kbbssbmmmmbssbbk........',
  '........kbbbbbbbbbbbbbbk........',
  '........ksbbbbbbbbbbbbsk........',
  '........ksssbbbbbbbbsssk........',
  '.........kkkkbbbbbbkkkk.........',
  '............kSSSSSSk............',
  '.......kkkkkkSSSSSSkkkkkk.......',
  '....kkktttttTTTTTTTTtttttkkk....',
  '...kttttttttttttttttttttttttk...',
  '...kttttttWtWWtWtWWtWWttttttk...',
  '...ktttttttWWtWtWWtWttttttttk...',
  '...kttttttttttttttttttttttttk...',
  '...ktTTtttttttiiiitttttttTTtk...',
  '...kssSttttttijjiiittttttSssk...',
  '...kssStttttIiiiiiiItttttSssk...',
  '...kssStttttIkykkykItttttSssk...',
  '...kssStttttIiikkiiItttttSssk...',
  '...kssStttttIiikkiiItttttSssk...',
  '...kssSttttttIkkkkIttttttSssk...',
  '...kssStttttttIIIItttttttSssk...',
  '...kSSSttttttttttttttttttSSSk...',
  '...kSSSttttttttttttttttttSSSk...',
  '....kkkkkPPPPPPPPPPPPPPkkkkk....',
  '........kppppppppppppppk........',
  '........kpPpppppppppPppk........',
  '........kpPppppkkpppPppk........',
  '........kpPppppkkpppPppk........',
  '........kpPppppkkpppPppk........',
  '........kpPppppkkpppPppk........',
  '........kpPppppkkpppPppk........',
  '.......knnPnnnnkknnPnnnnk.......',
  '.......knnnnnnnkknnnnnnnk.......',
  '.......kuuuuuuukkuuuuuuuk.......',
];

const CORES = {
  k: '#0b0b0c', // contorno
  h: '#17110e', // cabelo
  H: '#2b211b', // textura do cabelo
  f: '#5a4033', // degradê do cabelo
  b: '#1d1612', // barba
  s: '#c68b66', // pele
  S: '#a8704f', // pele (sombra)
  e: '#2a1a12', // olhos
  w: '#f4efe9', // branco do olho
  g: '#121214', // armação dos óculos
  L: '#d39d7b', // lente (pele através do vidro)
  B: '#d9e6ff', // reflexo azulado da lente
  m: '#9b5a4a', // boca
  t: '#1c1c1f', // camiseta
  T: '#2c2c31', // gola e barra
  W: '#e8e8e8', // letreiro da banda
  i: '#a9afb8', // homem de ferro
  I: '#6c727c', // homem de ferro (sombra)
  y: '#ffcf3a', // olhos acesos
  j: '#d3d7dd', // brilho do metal
  p: '#27272c', // calça
  P: '#36363d', // calça (detalhe)
  n: '#151517', // tênis
  u: '#4a4a50', // solado
};

function desenhaAvatar(alvo) {
  const px = 8;
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
      if (c === 'e') r.setAttribute('class', 'olho');
      svg.appendChild(r);
    });
  });
  alvo.appendChild(svg);
}
