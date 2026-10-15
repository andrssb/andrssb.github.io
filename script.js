const movimentoReduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- dados ----------
const PROJETOS = [
  {
    nome: 'Thiago Castro', tipo: 'cliente', tec: 'JavaScript · TypeScript · Cloudflare Workers · WhatsApp API',
    texto: 'Site de encomendas de uma confeitaria de Manaus: a cliente monta o bolo e o pedido chega pronto no WhatsApp da loja. Uma atendente virtual responde as clientes pela API oficial do WhatsApp.',
    res: 'No ar com domínio próprio, atendendo os clientes da loja.',
    links: [['ver o site', 'https://thiagocastroconfeitaria.com.br/']],
  },
  {
    nome: 'Limo', tipo: 'produto', tec: 'TypeScript · Node.js · React · PostgreSQL · Stripe',
    texto: 'Plataforma B2B de prospecção: encontra empresas por segmento e região na base aberta da Receita Federal, enriquece os contatos com motor próprio e leva os leads para o CRM. Tem extensão para Chrome.',
    res: 'No ar, com extensão publicada na Chrome Web Store.',
    links: [['conhecer', 'https://limoapp.com.br/']],
  },
  {
    nome: 'Raio-X do Delivery', tipo: 'dados', tec: 'Python · Node.js · Playwright · SVG',
    texto: 'Coleta e análise de 5.016 restaurantes de delivery nas 27 capitais: quem vende on-line, quem depende de aplicativo e quem não tem canal próprio de pedidos.',
    res: '67% dos independentes não têm onde o cliente pedir sozinho.',
    links: [['abrir o painel', 'dados-restaurantes/']],
  },
  {
    nome: 'CRM de Prospecção', tipo: 'produto', tec: 'JavaScript · Vercel Functions · Redis · Python',
    texto: 'CRM com um funil por produto, cadência automática de follow-up e sincronização com os disparos. Serverless, com o estado em Redis: abrir o CRM inteiro custa uma leitura só.',
    links: [], priv: 'uso interno, com senha',
  },
  {
    nome: 'Rumo ao Altar', tipo: 'jogo', tec: 'JavaScript · Canvas · Vercel Functions · Redis',
    texto: 'Jogo de plataforma personalizado para casamentos: a história do casal vira fases e os convidados disputam um ranking até a festa. Já roda no site de casamento de um casal real.',
    links: [['jogar a demo', 'https://rumo-ao-altar.vercel.app/']],
  },
  {
    nome: 'Forno da Vila', tipo: 'produto', rot: 'DEMO', tec: 'JavaScript · SVG · Cloudflare Workers',
    texto: 'Cardápio digital de pizzaria com meio a meio, borda, combos, taxa por bairro e troco. O pedido sai formatado direto no WhatsApp, sem comissão de aplicativo.',
    links: [['fazer um pedido teste', 'https://forno-da-vila-demo.thiago-castro.workers.dev/']],
  },
  {
    nome: 'Castelo Amaldiçoado', tipo: 'jogo', tec: 'Flutter · Dart · Flame · Java · Spring Boot',
    texto: 'Jogo de ação medieval em Flutter com servidor Java: desafio diário gerado pela data e ranking com validação anti-trapaça, em que o servidor recalcula a pontuação.',
    links: [['jogar', 'https://andrssb.github.io/castelo-amaldicoado/'], ['código', 'https://github.com/andrssb/castelo-amaldicoado']],
  },
  {
    nome: 'V360 Verde', tipo: 'dados', rot: 'PROTÓTIPO', tec: 'JavaScript · SVG · GHG Protocol',
    texto: 'Painel ESG que calcula a pegada de carbono a partir das contas de energia, água e gás, detecta consumo fora da curva e gera o inventário de emissões. Dados simulados.',
    links: [['ver o protótipo', 'https://andrssb.github.io/v360-verde-demo/'], ['código', 'https://github.com/andrssb/v360-verde-demo']],
  },
  {
    nome: 'Minecraft Status', tipo: 'estudo', tec: 'Python · FastAPI',
    texto: 'Painel que consulta servidores de Minecraft pelo protocolo Server List Ping: online, jogadores, versão, MOTD colorido, ping e ícone.',
    links: [['código', 'https://github.com/andrssb/minecraft-server-status']],
  },
  {
    nome: 'Raio-X do Texto', tipo: 'estudo', tec: 'Python · FastAPI · pytest',
    texto: 'Analisador de estilo de escrita: repetições, advérbios em -mente, frases longas, clichês e voz passiva, com tratamento de particípios irregulares.',
    links: [['código', 'https://github.com/andrssb/raio-x-do-texto']],
  },
  {
    nome: 'Controle de Gastos', tipo: 'estudo', tec: 'Python · FastAPI · SQLAlchemy · pytest',
    texto: 'Controle de gastos pessoais com banco em camadas, testes isolados e gráfico por categoria desenhado sem biblioteca.',
    links: [['código', 'https://github.com/andrssb/controle-de-gastos']],
  },
];

const HABILIDADES = [
  ['JavaScript', 85], ['Node.js', 80], ['Python', 80], ['TypeScript', 75],
  ['React', 70], ['SQL e PostgreSQL', 70], ['Java', 55], ['Flutter', 50],
];

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/';
const ICONES = [
  ['JavaScript', 'javascript/javascript-original.svg'], ['TypeScript', 'typescript/typescript-original.svg'],
  ['React', 'react/react-original.svg'], ['Node.js', 'nodejs/nodejs-original.svg'],
  ['Python', 'python/python-original.svg'], ['Java', 'java/java-original.svg'],
  ['Flutter', 'flutter/flutter-original.svg'], ['PostgreSQL', 'postgresql/postgresql-original.svg'],
  ['Redis', 'redis/redis-original.svg'], ['Docker', 'docker/docker-original.svg'],
  ['Git', 'git/git-original.svg'], ['Cloudflare', 'cloudflare/cloudflare-original.svg'],
];

const TERMINAL = [
  ['andres@lab:~$', ' python coleta.py --capitais 27', '5.016 restaurantes mapeados no Google Maps'],
  ['andres@lab:~$', ' python detecta_plataforma.py', '386 com plataforma · 893 sem canal próprio de pedido'],
  ['andres@lab:~$', ' python analisa.py --por segmento', 'pizzaria 47% · hamburgueria 44% · japonês 40% · marmitaria 21%'],
];

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

// ---------- tema ----------
document.getElementById('tema').addEventListener('click', () => {
  const novo = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', novo);
  try { localStorage.setItem('andresTema', novo); } catch (e) {}
});

// ---------- menu no celular ----------
const menuBtn = document.getElementById('menuBtn');
const links = document.getElementById('links');
menuBtn.addEventListener('click', () => menuBtn.setAttribute('aria-expanded', links.classList.toggle('aberto')));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('aberto'); menuBtn.setAttribute('aria-expanded', false);
}));

// ---------- boot ----------
(function boot() {
  const tela = document.getElementById('boot');
  const log = document.getElementById('bootLog');
  const fim = () => {
    tela.classList.add('some');
    try { sessionStorage.setItem('andresBoot', '1'); } catch (e) {}
    setTimeout(() => tela.remove(), 500);
    dispatchEvent(new Event('bootFim'));
  };
  let visto = false;
  try { visto = !!sessionStorage.getItem('andresBoot'); } catch (e) {}
  if (visto || movimentoReduzido) { tela.remove(); setTimeout(() => dispatchEvent(new Event('bootFim')), 50); return; }
  const linhas = [
    '> iniciando andres.dev...',
    '> carregando módulos: front [ok] back [ok] dados [ok] whatsapp [ok]',
    '> conectando ao CRM...',
    '> compilando café...',
    '> pronto. bem-vindo.',
  ];
  let i = 0;
  (function proxima() {
    if (i >= linhas.length) return setTimeout(fim, 380);
    const d = document.createElement('div');
    d.textContent = linhas[i];
    if (i === linhas.length - 1) d.className = 'ok';
    log.appendChild(d); i++;
    setTimeout(proxima, 240);
  })();
})();

// ---------- boneco ----------
desenhaAvatar(document.getElementById('boneco'));

// ---------- título: embaralha e dá glitch ----------
const titulo = document.getElementById('titulo');
function glitch(ms = 320) {
  titulo.classList.remove('glitch'); void titulo.offsetWidth; titulo.classList.add('glitch');
  setTimeout(() => titulo.classList.remove('glitch'), ms);
}
function embaralha(el, dur = 850) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01<>/_#*';
  const nos = [];
  const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let n; while ((n = w.nextNode())) nos.push(n);
  nos.forEach(no => {
    const orig = no.textContent, total = Math.round(dur / 30);
    let q = 0;
    const t = setInterval(() => {
      q++;
      const rev = Math.floor(q / total * orig.length);
      no.textContent = [...orig].map((c, i) => (c === ' ' || i < rev) ? c : chars[Math.random() * chars.length | 0]).join('');
      if (q >= total) { no.textContent = orig; clearInterval(t); }
    }, 30);
  });
}
addEventListener('bootFim', () => {
  if (movimentoReduzido) return;
  embaralha(titulo);
  setTimeout(glitch, 900);
  setInterval(glitch, 9000);
});

// ---------- partículas ----------
(function particulas() {
  const c = document.getElementById('particulas');
  if (movimentoReduzido) { c.remove(); return; }
  const ctx = c.getContext('2d');
  let w, h, pts = [], raf;
  function init() {
    w = c.width = innerWidth; h = c.height = innerHeight;
    pts = Array.from({ length: Math.min(70, Math.round(w * h / 22000)) }, () => ({
      x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.6 + .4,
      vx: (Math.random() - .5) * .25, vy: -Math.random() * .3 - .05, a: Math.random() * .5 + .2,
    }));
  }
  function quadro() {
    ctx.clearRect(0, 0, w, h);
    const cor = document.documentElement.getAttribute('data-theme') === 'dark' ? '197,242,48' : '79,122,0';
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
      if (p.x < -5) p.x = w + 5; if (p.x > w + 5) p.x = -5;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fillStyle = `rgba(${cor},${p.a})`; ctx.fill();
    }
    raf = requestAnimationFrame(quadro);
  }
  init(); quadro();
  addEventListener('resize', init);
  document.addEventListener('visibilitychange', () => { cancelAnimationFrame(raf); if (!document.hidden) quadro(); });
})();

// ---------- nav: seção ativa, desfoque e progresso ----------
const nav = document.getElementById('nav');
const navLinks = [...document.querySelectorAll('.links a')];
const secoes = [...document.querySelectorAll('section[id]')];
const barra = document.getElementById('progresso');
const topo = document.querySelector('.topo');
let agendado = false;
function aoRolar() {
  agendado = false;
  const y = scrollY;
  nav.classList.toggle('rolou', y > 20);
  topo.classList.toggle('mostra', y > 600);
  barra.style.width = (y / Math.max(1, document.documentElement.scrollHeight - innerHeight) * 100) + '%';
  let atual = '';
  for (const s of secoes) { const r = s.getBoundingClientRect(); if (r.top <= 120 && r.bottom >= 120) atual = s.id; }
  navLinks.forEach(a => a.classList.toggle('ativo', a.getAttribute('href') === '#' + atual));
}
addEventListener('scroll', () => { if (!agendado) { agendado = true; requestAnimationFrame(aoRolar); } }, { passive: true });
aoRolar();

// ---------- projetos ----------
const grade = document.getElementById('grade');
function mostraProjetos(f) {
  const lista = PROJETOS.filter(p => f === 'todos' || p.tipo === f);
  const colunas = innerWidth > 1000 ? 3 : innerWidth > 600 ? 2 : 1;
  const sobra = (colunas - lista.length % colunas) % colunas;
  grade.innerHTML = lista.map((p, i) => `
    <article class="proj" style="animation-delay:${i * 40}ms">
      <div class="proj-cab"><h3>${esc(p.nome)}</h3><span class="rot">${esc(p.rot || p.tipo.toUpperCase())}</span></div>
      <div class="tec">${esc(p.tec)}</div>
      <p>${esc(p.texto)}</p>
      ${p.res ? `<p class="res">${esc(p.res)}</p>` : ''}
      <div class="acoes">${p.links.map(([t, u]) => `<a href="${u}"${u.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${esc(t)} &rarr;</a>`).join('')}${p.priv ? `<span class="priv">${esc(p.priv)}</span>` : ''}</div>
    </article>`).join('') + '<div class="vazio"></div>'.repeat(sobra);
  document.getElementById('contaProj').textContent = `${lista.length} ${f === 'todos' ? 'no total' : 'nesta categoria'}`;
}
let filtroAtual = 'todos';
mostraProjetos(filtroAtual);
document.querySelectorAll('#filtros button').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('#filtros button').forEach(x => x.classList.toggle('ativo', x === b));
  filtroAtual = b.dataset.f; mostraProjetos(filtroAtual);
}));
let larguraAntes = innerWidth;
addEventListener('resize', () => { if (Math.abs(innerWidth - larguraAntes) > 50) { larguraAntes = innerWidth; mostraProjetos(filtroAtual); } });

// ---------- stack ----------
document.getElementById('barras').insertAdjacentHTML('beforeend', HABILIDADES.map(([n, v]) =>
  `<div class="barra"><div class="rot"><span>&gt; ${esc(n)}</span><span>${v}%</span></div><div class="trilho"><div class="enche" data-v="${v}"></div></div></div>`).join(''));
document.getElementById('icones').innerHTML = ICONES.map(([n, f]) =>
  `<div><img src="${DEVICON + f}" alt="" loading="lazy" width="40" height="40">${esc(n)}</div>`).join('');

// ---------- aparece ao rolar, contadores, barras e terminal ----------
function contador(el) {
  const alvo = +el.dataset.conta, mais = el.dataset.mais || '';
  if (movimentoReduzido) { el.textContent = alvo.toLocaleString('pt-BR') + mais; return; }
  const ini = performance.now(), dur = 1400;
  (function passo(t) {
    const p = Math.min(1, (t - ini) / dur), e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(alvo * e).toLocaleString('pt-BR') + (p === 1 ? mais : '');
    if (p < 1) requestAnimationFrame(passo);
  })(ini);
}
function digitaTerminal() {
  const corpo = document.getElementById('termCorpo');
  if (corpo.dataset.feito) return; corpo.dataset.feito = 1;
  const cursor = '<span class="cursor"></span>';
  if (movimentoReduzido) {
    corpo.innerHTML = TERMINAL.map(([p, c, s]) => `<span class="p">${p}</span>${esc(c)}\n<span class="s">${esc(s)}</span>\n`).join('') + `<span class="p">andres@lab:~$</span> ${cursor}`;
    return;
  }
  let html = '', li = 0;
  (function linha() {
    if (li >= TERMINAL.length) { corpo.innerHTML = html + `<span class="p">andres@lab:~$</span> ${cursor}`; return; }
    const [p, cmd, saida] = TERMINAL[li++];
    let k = 0;
    const t = setInterval(() => {
      k++;
      corpo.innerHTML = html + `<span class="p">${p}</span>${esc(cmd.slice(0, k))}${cursor}`;
      if (k >= cmd.length) {
        clearInterval(t);
        setTimeout(() => {
          html += `<span class="p">${p}</span>${esc(cmd)}\n<span class="s">${esc(saida)}</span>\n`;
          corpo.innerHTML = html + cursor;
          setTimeout(linha, 450);
        }, 300);
      }
    }, 38);
  })();
}
const observador = new IntersectionObserver(entradas => entradas.forEach(en => {
  if (!en.isIntersecting) return;
  const el = en.target;
  el.classList.add('visivel');
  el.querySelectorAll('[data-conta]').forEach(contador);
  el.querySelectorAll('.enche').forEach(b => b.style.width = b.dataset.v + '%');
  if (el.id === 'terminal') digitaTerminal();
  observador.unobserve(el);
}), { threshold: .15 });
document.querySelectorAll('.revelar').forEach(el => observador.observe(el));

// ---------- botões magnéticos e onda no clique ----------
const ponteiroFino = matchMedia('(pointer: fine)').matches;
document.addEventListener('click', e => {
  const b = e.target.closest('.btn');
  if (!b) return;
  const r = b.getBoundingClientRect(), tam = Math.max(r.width, r.height) * 1.6;
  const o = document.createElement('span');
  o.className = 'onda';
  o.style.cssText = `width:${tam}px;height:${tam}px;left:${e.clientX - r.left - tam / 2}px;top:${e.clientY - r.top - tam / 2}px`;
  b.appendChild(o); setTimeout(() => o.remove(), 650);
});
if (ponteiroFino && !movimentoReduzido) {
  document.querySelectorAll('.btn').forEach(b => {
    b.addEventListener('mousemove', e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .15}px, ${(e.clientY - r.top - r.height / 2) * .3}px)`;
    });
    b.addEventListener('mouseleave', () => { b.style.transform = ''; });
  });
}

// ---------- formulário: abre o WhatsApp com a mensagem pronta ----------
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const texto = `Olá Andres, sou ${f.get('nome').trim()}${f.get('empresa').trim() ? ', da ' + f.get('empresa').trim() : ''}.\n\n${f.get('msg').trim()}`;
  open('https://wa.me/5531982775122?text=' + encodeURIComponent(texto), '_blank', 'noopener');
});
