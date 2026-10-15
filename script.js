const PROJETOS = [
  {
    nome: 'Thiago Castro Confeitaria', tipo: 'cliente', rotulo: 'cliente', grande: true,
    texto: 'Site de encomendas de uma confeitaria de Manaus: a cliente escolhe massa, recheio, tamanho e decoração, e o pedido chega montado no WhatsApp da loja. Junto, uma atendente virtual responde as clientes no WhatsApp pela API oficial e passa o pedido para a equipe.',
    resultado: 'No ar com domínio próprio, atendendo os clientes da loja.',
    tags: ['JavaScript', 'TypeScript', 'Cloudflare Workers', 'WhatsApp API', 'IA'],
    links: [['ver o site', 'https://thiagocastroconfeitaria.com.br/']],
  },
  {
    nome: 'Raio-X do Delivery', tipo: 'dados', rotulo: 'dados',
    texto: 'Coleta e análise de 5.016 restaurantes de delivery nas 27 capitais: quem vende on-line, quem depende de aplicativo e quem ainda não tem canal próprio de pedidos.',
    resultado: '67% dos independentes bem avaliados não têm onde o cliente faça o pedido sozinho.',
    tags: ['Python', 'Node.js', 'Playwright', 'SVG'],
    links: [['abrir o painel', 'dados-restaurantes/']],
  },
  {
    nome: 'Limo', tipo: 'produto', rotulo: 'produto', grande: true,
    texto: 'Plataforma B2B de prospecção. Encontra empresas por segmento e região na base aberta da Receita Federal, enriquece os contatos com um motor próprio e leva os leads para o CRM. Tem extensão para o Chrome, planos pagos e integração com HubSpot e WhatsApp.',
    resultado: 'Produto no ar, com extensão publicada na Chrome Web Store.',
    tags: ['TypeScript', 'Node.js', 'React', 'PostgreSQL', 'Railway', 'Stripe'],
    links: [['conhecer', 'https://limoapp.com.br/']],
  },
  {
    nome: 'CRM de Prospecção', tipo: 'produto', rotulo: 'produto interno',
    texto: 'CRM com um funil por produto, cadência automática de follow-up e sincronização com os disparos de mensagem. Serverless, com o estado em Redis: abrir o CRM inteiro custa uma leitura só.',
    tags: ['JavaScript', 'Vercel Functions', 'Redis', 'Python'],
    links: [],
    privado: 'uso interno, com senha',
  },
  {
    nome: 'Rumo ao Altar', tipo: 'jogo', rotulo: 'jogo',
    texto: 'Jogo de plataforma personalizado para casamentos: a história do casal vira fases, e os convidados disputam um ranking até o dia da festa. Já roda dentro do site de casamento de um casal real.',
    tags: ['JavaScript', 'Canvas', 'Vercel Functions', 'Redis'],
    links: [['jogar a demo', 'https://rumo-ao-altar.vercel.app/']],
  },
  {
    nome: 'Forno da Vila', tipo: 'produto', rotulo: 'demo',
    texto: 'Cardápio digital de pizzaria com meio a meio, borda, combos, taxa por bairro e troco. O pedido sai formatado direto no WhatsApp, sem comissão de aplicativo. As ilustrações são geradas em código.',
    tags: ['JavaScript', 'SVG', 'Cloudflare Workers'],
    links: [['fazer um pedido teste', 'https://forno-da-vila-demo.thiago-castro.workers.dev/']],
  },
  {
    nome: 'Castelo Amaldiçoado', tipo: 'jogo', rotulo: 'jogo',
    texto: 'Jogo de ação medieval em Flutter com servidor em Java: desafio diário gerado a partir da data, igual para todos, e ranking com validação anti-trapaça, em que o servidor recalcula a pontuação em vez de confiar no cliente.',
    tags: ['Flutter', 'Dart', 'Flame', 'Java', 'Spring Boot'],
    links: [['jogar', 'https://andrssb.github.io/castelo-amaldicoado/'], ['código', 'https://github.com/andrssb/castelo-amaldicoado']],
  },
  {
    nome: 'V360 Verde', tipo: 'dados', rotulo: 'protótipo',
    texto: 'Protótipo de painel ESG que calcula a pegada de carbono a partir das contas de energia, água e gás, detecta consumo fora da curva e gera o inventário de emissões automaticamente. Dados simulados.',
    tags: ['JavaScript', 'SVG', 'GHG Protocol'],
    links: [['ver o protótipo', 'https://andrssb.github.io/v360-verde-demo/'], ['código', 'https://github.com/andrssb/v360-verde-demo']],
  },
  {
    nome: 'Minecraft Server Status', tipo: 'estudo', rotulo: 'estudo',
    texto: 'Painel que consulta servidores de Minecraft pelo protocolo Server List Ping: online, jogadores, versão, MOTD colorido, ping e ícone.',
    tags: ['Python', 'FastAPI'],
    links: [['código', 'https://github.com/andrssb/minecraft-server-status']],
  },
  {
    nome: 'Raio-X do Texto', tipo: 'estudo', rotulo: 'estudo',
    texto: 'Analisador de estilo de escrita: repetições, advérbios terminados em -mente, frases longas, clichês e voz passiva, com tratamento de particípios irregulares.',
    tags: ['Python', 'FastAPI', 'pytest'],
    links: [['código', 'https://github.com/andrssb/raio-x-do-texto']],
  },
  {
    nome: 'Controle de Gastos', tipo: 'estudo', rotulo: 'estudo',
    texto: 'Controle de gastos pessoais com banco de dados em camadas, testes isolados e gráfico por categoria desenhado sem biblioteca.',
    tags: ['Python', 'FastAPI', 'SQLAlchemy', 'pytest'],
    links: [['código', 'https://github.com/andrssb/controle-de-gastos']],
  },
];

const cards = document.getElementById('cards');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function render(filtro) {
  cards.innerHTML = PROJETOS.filter(p => filtro === 'todos' || p.tipo === filtro).map(p => `
    <article class="card${p.grande && filtro === 'todos' ? ' grande' : ''}">
      <div class="topo"><span class="tipo">${esc(p.rotulo)}</span><span class="ano">2026</span></div>
      <h3>${esc(p.nome)}</h3>
      <p>${esc(p.texto)}</p>
      ${p.resultado ? `<p class="resultado">${esc(p.resultado)}</p>` : ''}
      <div class="tags">${p.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>
      <div class="acoes">
        ${p.links.map(([t, u]) => `<a href="${u}"${u.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${esc(t)} &rarr;</a>`).join('')}
        ${p.privado ? `<span class="privado">${esc(p.privado)}</span>` : ''}
      </div>
    </article>`).join('');
}
render('todos');

document.querySelectorAll('.filtros button').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.filtros button').forEach(x => x.classList.toggle('ativo', x === b));
  render(b.dataset.f);
}));

// menu no celular
const menuBtn = document.getElementById('menuBtn');
const links = document.getElementById('links');
menuBtn.addEventListener('click', () => {
  const aberto = links.classList.toggle('aberto');
  menuBtn.setAttribute('aria-expanded', aberto);
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('aberto');
  menuBtn.setAttribute('aria-expanded', false);
}));

// tema claro / escuro
document.getElementById('tema').addEventListener('click', () => {
  const atual = document.documentElement.getAttribute('data-theme') ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const novo = atual === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', novo);
  try { localStorage.setItem('andresTema', novo); } catch (e) {}
});
