// Boneco pixelado do Andres. Cada letra é um pixel; a paleta fica embaixo.
// Para mudar cabelo, pele ou roupa, troque só as cores em CORES.
const AVATAR = [
  '..........kkhhhhhhhhkk..........',
  '.........khhhhhHHHhhhhk.........',
  '........khhHHHhhhhhhhhhk........',
  '........khhhhhhhhhhhhhhk........',
  '.......khhhhhhhhhhhhhhhhk.......',
  '.......khhhhhhhhhhhhhhhhk.......',
  '.......khhhhhsshhshhhhhhk.......',
  '.......khhsssssssssssShhk.......',
  '.......khhshhhhsshhhhShhk.......',
  '.......khhgggggssggggghhk.......',
  '.......ksggBLLggggBLLggsk.......',
  '.......kSsgLeLgssgLeLgSSk.......',
  '.......kssgggggSSgggggSsk.......',
  '........khsssssSSssssShk........',
  '........khssssssSssssShk........',
  '........khssshhhhhhssshk........',
  '........khhsshmmmmhsshhk........',
  '........khhhhhhhhhhHhhhk........',
  '........kshhHhhhhhhhhhsk........',
  '........kssshhhhhhhhsssk........',
  '.........kkkkSSSSSSkkkk.........',
  '............kSSSSSSk............',
  '.......kkkkkkSSSSSSkkkkkk.......',
  '....kkktttttTTTTTTTTtttttkkk....',
  '...kttttttttttttttttttttttttk...',
  '...kttttttWtWWtWtWWtWWttttttk...',
  '...ktttttttWWtWtWWtWttttttttk...',
  '...kttttttttttttttttttttttttk...',
  '...ktTTtttttttiiiitttttttTTtk...',
  '...ktttttttttijjiiitttttttttk...',
  '...kssStttttIiiiiiiItttttSssk...',
  '...kssStttttIkykkykItttttSssk...',
  '...kssStttttIiikkiiItttttSssk...',
  '...kssStttttIiikkiiItttttSssk...',
  '...kssStttttIikkkkiItttttSssk...',
  '...kssSttttttIIIIIIttttttSssk...',
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
  '.......kbbPbbbbkkbbPbbbbk.......',
  '.......kbbbbbbbkkbbbbbbbk.......',
  '.......kuuuuuuukkuuuuuuuk.......',
];

const CORES = {
  k: '#0b0b0c', // contorno
  h: '#2a1c14', // cabelo e barba
  H: '#45301f', // brilho do cabelo
  s: '#c8906a', // pele
  S: '#a9714f', // pele (sombra)
  e: '#14110f', // pupila
  g: '#101010', // armação dos óculos
  L: '#e7eef2', // lente
  B: '#ffffff', // reflexo da lente
  m: '#6e3b2c', // boca
  t: '#1c1c1f', // camiseta
  T: '#2c2c31', // gola e barra
  W: '#e8e8e8', // letreiro da banda
  i: '#a9afb8', // homem de ferro
  I: '#6c727c', // homem de ferro (sombra)
  y: '#ffcf3a', // olhos acesos
  j: '#d3d7dd', // brilho do metal
  p: '#27272c', // calça
  P: '#36363d', // calça (detalhe)
  b: '#151517', // tênis
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
