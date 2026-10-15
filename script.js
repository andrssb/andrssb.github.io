const movimentoReduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;
const ponteiroFino = matchMedia('(pointer: fine)').matches;

// ---------- dados ----------
const PROJETOS = [
  {
    nome: 'Caixa Forte API', tipo: 'andamento', tag: 'EM ANDAMENTO', tecs: 'Java · Spring Boot · PostgreSQL · Redis · Docker',
    texto: 'API de pagamentos com livro-razão de dupla entrada, idempotência por chave de requisição, controle de concorrência no saldo e fila de eventos com reprocessamento. Testes de carga e de corrida.',
    links: [], priv: 'em andamento',
  },
  {
    nome: 'Armazém Analítico', tipo: 'andamento', tag: 'EM ANDAMENTO', tecs: 'PostgreSQL · SQL · Python · dbt · Docker',
    texto: 'Data warehouse de vendas em modelo dimensional, com carga incremental, tabelas particionadas, índices e visões materializadas para consultas analíticas sobre dezenas de milhões de linhas.',
    links: [], priv: 'em andamento',
  },
  {
    nome: 'Limo', tipo: 'produto', tecs: 'TypeScript · Node.js · React · PostgreSQL · Stripe',
    texto: 'Plataforma B2B de prospecção: encontra empresas por segmento e região na base aberta da Receita Federal, enriquece os contatos com motor próprio e leva os leads para o CRM. Tem extensão para Chrome.',
    res: 'No ar, com extensão publicada na Chrome Web Store.',
    links: [['conhecer', 'https://limoapp.com.br/']],
  },
  {
    nome: 'CRM de Prospecção', tipo: 'produto', tecs: 'JavaScript · Vercel Functions · Redis · Python',
    texto: 'CRM com um funil por produto, cadência automática de follow-up e sincronização com os disparos. Serverless, com o estado em Redis: abrir o CRM inteiro custa uma leitura só.',
    links: [], priv: 'uso interno, com senha',
  },
  {
    nome: 'Rumo ao Altar', tipo: 'jogo', tecs: 'JavaScript · Canvas · Vercel Functions · Redis',
    texto: 'Jogo de plataforma personalizado para casamentos: a história do casal vira fases e os convidados disputam um ranking até a festa. Já roda no site de casamento de um casal real.',
    links: [['jogar a demo', 'https://rumo-ao-altar.vercel.app/']],
  },
  {
    nome: 'Forno da Vila', tipo: 'produto', tag: 'DEMO', tecs: 'JavaScript · SVG · Cloudflare Workers',
    texto: 'Cardápio digital de pizzaria com meio a meio, borda, combos, taxa por bairro e troco. O pedido sai formatado direto no WhatsApp, sem comissão de aplicativo.',
    links: [['fazer um pedido teste', 'https://forno-da-vila-demo.thiago-castro.workers.dev/']],
  },
  {
    nome: 'Minecraft Status', tipo: 'estudo', tecs: 'Python · FastAPI',
    texto: 'Painel que consulta servidores de Minecraft pelo protocolo Server List Ping: online, jogadores, versão, MOTD colorido, ping e ícone.',
    links: [['ver no GitHub', 'https://github.com/andrssb/minecraft-server-status']],
  },
  {
    nome: 'Controle de Gastos', tipo: 'estudo', tecs: 'Python · FastAPI · SQLAlchemy · pytest',
    texto: 'Controle de gastos pessoais com banco em camadas, testes isolados e gráfico por categoria desenhado sem biblioteca.',
    links: [['ver no GitHub', 'https://github.com/andrssb/controle-de-gastos']],
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
  ['andres@lab:~$', ' whoami', 'andres barbosa · dev full stack e análise de dados'],
  ['andres@lab:~$', ' cat formacao.txt', 'ADS (Descomplica) · Análise de Dados (Anhanguera) · Engenharia de Dados (Indicium)'],
  ['andres@lab:~$', ' ls ferramentas/', 'sql  postgresql  python  redis  node.js  playwright'],
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

// ---------- boneco ----------
desenhaAvatar(document.getElementById('boneco'));

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
    '> inicializando andres.dev...',
    '> carregando módulos: front [ok] back [ok] dados [ok] whatsapp [ok]',
    '> conectando ao CRM...',
    '> compilando café...',
    '> acesso concedido.',
  ];
  let i = 0;
  (function proxima() {
    if (i >= linhas.length) return setTimeout(fim, 400);
    const d = document.createElement('div');
    d.textContent = linhas[i];
    if (i === linhas.length - 1) d.className = 'ok';
    log.appendChild(d); i++;
    setTimeout(proxima, 260);
  })();
})();

// ---------- título: embaralha e dá glitch ----------
const titulo = document.getElementById('titulo');
function glitch(ms = 350) {
  titulo.classList.remove('glitching'); void titulo.offsetWidth; titulo.classList.add('glitching');
  setTimeout(() => titulo.classList.remove('glitching'), ms);
}
function embaralha(el, dur = 800) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01#*';
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
  setTimeout(glitch, 850);
  setInterval(() => glitch(300), 9000);
});

// ---------- partículas ----------
(function particulas() {
  const c = document.getElementById('particulas');
  if (movimentoReduzido) { c.remove(); return; }
  const ctx = c.getContext('2d');
  let w, h, pts = [], raf, rodando = true;
  function init() {
    w = c.width = innerWidth; h = c.height = innerHeight;
    pts = Array.from({ length: Math.min(60, Math.round(w * h / 24000)) }, () => ({
      x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.6 + .5,
      vx: (Math.random() - .5) * .2, vy: -Math.random() * .25 - .05, a: Math.random() * .45 + .2,
    }));
  }
  function quadro() {
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
      if (p.x < -5) p.x = w + 5; if (p.x > w + 5) p.x = -5;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fillStyle = `rgba(70,110,240,${p.a})`; ctx.fill();
    }
    if (rodando) raf = requestAnimationFrame(quadro);
  }
  init(); quadro();
  addEventListener('resize', init);
  document.addEventListener('visibilitychange', () => {
    rodando = !document.hidden; cancelAnimationFrame(raf); if (rodando) quadro();
  });
})();

// ---------- nav: seção ativa, desfoque e progresso ----------
const nav = document.getElementById('nav');
const navLinks = [...document.querySelectorAll('.links a')];
const secoes = [...document.querySelectorAll('section[id]')];
const barra = document.getElementById('progresso');
let agendado = false;
function aoRolar() {
  agendado = false;
  const y = scrollY;
  nav.classList.toggle('rolou', y > 20);
  barra.style.width = (y / Math.max(1, document.documentElement.scrollHeight - innerHeight) * 100) + '%';
  let atual = '';
  for (const s of secoes) { const r = s.getBoundingClientRect(); if (r.top <= 120 && r.bottom >= 120) atual = s.id; }
  navLinks.forEach(a => a.classList.toggle('ativo', a.getAttribute('href') === '#' + atual));
}
addEventListener('scroll', () => { if (!agendado) { agendado = true; requestAnimationFrame(aoRolar); } }, { passive: true });
aoRolar();

// ---------- parallax do boneco ----------
const palco = document.getElementById('palco');
if (ponteiroFino && !movimentoReduzido) {
  addEventListener('mousemove', e => {
    const x = (e.clientX / innerWidth - .5) * 14, y = (e.clientY / innerHeight - .5) * 14;
    palco.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// ---------- revelar ao rolar ----------
const observador = new IntersectionObserver(entradas => entradas.forEach(en => {
  if (!en.isIntersecting) return;
  const el = en.target;
  el.classList.add('visivel');
  el.querySelectorAll('[data-conta]').forEach(contador);
  el.querySelectorAll('.enche').forEach(b => b.style.width = b.dataset.v + '%');
  if (el.id === 'terminal') digitaTerminal();
  observador.unobserve(el);
}), { threshold: .12 });
function observa(raiz = document) { raiz.querySelectorAll('.revelar:not(.visivel):not(.proj)').forEach(el => observador.observe(el)); }

// ---------- projetos ----------
const grade = document.getElementById('grade');
function mostraProjetos(f) {
  const lista = PROJETOS.filter(p => f === 'todos' || p.tipo === f);
  grade.innerHTML = lista.map(p => `
    <article class="proj revelar">
      <span class="brilho"></span><span class="mira m1"></span><span class="mira m2"></span><span class="mira m3"></span><span class="mira m4"></span>
      <div class="proj-topo"><h3>${esc(p.nome)}</h3><span class="proj-tag">${esc(p.tag || p.tipo.toUpperCase())}</span></div>
      <div class="tecs">${esc(p.tecs)}</div>
      <p>${esc(p.texto)}</p>
      ${p.res ? `<p class="res">${esc(p.res)}</p>` : ''}
      <div class="acoes">${p.links.map(([t, u]) => `<a class="link" href="${u}"${u.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${esc(t)} &rarr;</a>`).join('')}${p.priv ? `<span class="priv">${esc(p.priv)}</span>` : ''}</div>
    </article>`).join('');
  completaGrade();
  [...grade.children].forEach((el, i) => { el.style.transitionDelay = Math.min(i, 8) * 60 + 'ms'; });
  document.getElementById('contaProj').textContent = `${lista.length} ${f === 'todos' ? 'no total' : 'nesta categoria'}`;
  ativaInclinacao();
  // o clip-path esconde o card do IntersectionObserver, então quem é observado é a grade
  if (gradeVista) setTimeout(() => grade.querySelectorAll('.proj').forEach(c => c.classList.add('visivel')), 30);
}
let gradeVista = false;
new IntersectionObserver((en, obs) => {
  if (!en[0].isIntersecting) return;
  gradeVista = true; obs.disconnect();
  grade.querySelectorAll('.proj').forEach(c => c.classList.add('visivel'));
}, { threshold: .05 }).observe(grade);
// completa a última linha da grade com blocos pretos, como na referência
function completaGrade() {
  grade.querySelectorAll('.tampa').forEach(t => t.remove());
  const colunas = getComputedStyle(grade).gridTemplateColumns.split(' ').length;
  const n = grade.querySelectorAll('.proj').length;
  const sobra = (colunas - n % colunas) % colunas;
  for (let i = 0; i < sobra; i++) grade.insertAdjacentHTML('beforeend', '<div class="tampa"></div>');
}
function ativaInclinacao() {
  if (!ponteiroFino || movimentoReduzido) return;
  grade.querySelectorAll('.proj').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      card.style.transform = `rotateX(${(.5 - py) * 8}deg) rotateY(${(px - .5) * 8}deg) translateZ(6px)`;
      card.style.setProperty('--mx', px * 100 + '%'); card.style.setProperty('--my', py * 100 + '%');
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}
let filtroAtual = 'todos';
mostraProjetos(filtroAtual);
document.querySelectorAll('#filtros .filtro').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('#filtros .filtro').forEach(x => x.classList.toggle('ativo', x === b));
  filtroAtual = b.dataset.f; mostraProjetos(filtroAtual);
}));
addEventListener('resize', completaGrade);

// ---------- stack ----------
document.getElementById('barras').insertAdjacentHTML('beforeend', HABILIDADES.map(([n, v]) =>
  `<div class="skill"><div class="skill-topo"><span>&gt; ${esc(n)}</span><span class="skill-pct">${v}%</span></div><div class="trilho"><div class="enche" data-v="${v}"></div></div></div>`).join(''));
document.getElementById('icones').innerHTML = ICONES.map(([n, f]) =>
  `<div class="icone-tec"><img src="${DEVICON + f}" alt="" loading="lazy" width="34" height="34">${esc(n)}</div>`).join('');

// ---------- contadores e terminal ----------
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
  const linha = (html, cls = 'linha-t') => { const d = document.createElement('div'); d.className = cls; d.innerHTML = html; corpo.appendChild(d); return d; };
  const final = () => linha('<span>andres@lab:~$</span> <span class="cursor"></span>');
  if (movimentoReduzido) {
    TERMINAL.forEach(([p, c, s]) => { linha(`<span>${p}</span>${esc(c)}`); linha(esc(s), 'linha-t saida'); });
    final(); return;
  }
  let li = 0;
  (function proxima() {
    if (li >= TERMINAL.length) { final(); return; }
    const [p, cmd, saida] = TERMINAL[li++];
    const d = linha(`<span>${p}</span><span class="cmd"></span><span class="cursor"></span>`);
    const alvo = d.querySelector('.cmd');
    let k = 0;
    const t = setInterval(() => {
      alvo.textContent = cmd.slice(0, ++k);
      if (k >= cmd.length) {
        clearInterval(t);
        setTimeout(() => { d.querySelector('.cursor').remove(); linha(esc(saida), 'linha-t saida'); setTimeout(proxima, 420); }, 280);
      }
    }, 38);
  })();
}
observa();

// ---------- contato: aparece em sequência ----------
const contatoGrade = document.getElementById('contatoGrade');
new IntersectionObserver((en, obs) => {
  if (en[0].isIntersecting) { contatoGrade.classList.add('visivel'); obs.disconnect(); }
}, { threshold: .15 }).observe(contatoGrade);

// ---------- botões magnéticos e onda no clique ----------
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
  const empresa = f.get('empresa').trim();
  const texto = `Olá Andres, sou ${f.get('nome').trim()}${empresa ? ', da ' + empresa : ''}.\n\n${f.get('msg').trim()}`;
  open('https://wa.me/5531982775122?text=' + encodeURIComponent(texto), '_blank', 'noopener');
});

// ---------- terminal de navegação (botão >_ ou Ctrl+K) ----------
(function terminalNavegacao() {
  const fundo = document.getElementById('cmdFundo');
  const entrada = document.getElementById('cmdEntrada');
  const saida = document.getElementById('cmdSaida');
  const ir = id => () => { fecha(); document.getElementById(id).scrollIntoView({ behavior: movimentoReduzido ? 'auto' : 'smooth' }); return `indo para ${id}...`; };
  const COMANDOS = {
    help: () => 'comandos: sobre, projetos, dados, stack, curriculo, contato, whatsapp, github, tema, clear',
    sobre: ir('sobre'), projetos: ir('projetos'), dados: ir('dados'), stack: ir('stack'), curriculo: ir('jornada'), jornada: ir('jornada'), contato: ir('contato'),
    whatsapp: () => { open('https://wa.me/5531982775122', '_blank', 'noopener'); return 'abrindo o WhatsApp...'; },
    github: () => { open('https://github.com/andrssb', '_blank', 'noopener'); return 'abrindo o GitHub...'; },
    tema: () => { document.getElementById('tema').click(); return 'tema trocado.'; },
    whoami: () => 'andres barbosa · dev full stack e análise de dados · belo horizonte, mg',
    clear: () => { saida.innerHTML = ''; return null; },
  };
  function abre() { fundo.classList.add('aberto'); setTimeout(() => entrada.focus(), 50); if (!saida.innerHTML) escreve(null, 'digite help para ver os comandos.'); }
  function fecha() { fundo.classList.remove('aberto'); entrada.value = ''; }
  function escreve(eco, res) {
    if (eco !== null) saida.insertAdjacentHTML('beforeend', `<div class="eco">$ ${esc(eco)}</div>`);
    if (res) saida.insertAdjacentHTML('beforeend', `<div class="res">${esc(res)}</div>`);
    saida.scrollTop = saida.scrollHeight;
  }
  document.getElementById('cmdBotao').addEventListener('click', abre);
  fundo.addEventListener('click', e => { if (e.target === fundo) fecha(); });
  addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); fundo.classList.contains('aberto') ? fecha() : abre(); }
    if (e.key === 'Escape') fecha();
  });
  entrada.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const cmd = entrada.value.trim().toLowerCase();
    entrada.value = '';
    if (!cmd) return;
    const f = COMANDOS[cmd];
    const r = f ? f() : `comando não encontrado: ${cmd}. digite help.`;
    if (cmd !== 'clear') escreve(cmd, r);
  });
})();
