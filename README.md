# Jeferson Araujo — Portfólio

Portfólio pessoal e futuro hub de projetos, aplicativos e experimentos digitais.
Construído com **HTML5, CSS3, JavaScript puro e Bootstrap 5** — 100% estático, sem build step.

## Estrutura de arquivos

```
/
├── index.html            # Página única com todas as seções
├── css/
│   └── style.css         # Identidade visual, layout, microinterações
├── js/
│   └── script.js         # Dados (projetos/experimentos), renderização, navegação
├── assets/
│   ├── images/           # Imagens gerais (og-cover, foto, etc.)
│   ├── icons/            # favicon.svg e ícones
│   └── projects/         # Mockups/imagens dos projetos
├── robots.txt
└── README.md
```

## Como executar

Como é um site estático, basta abrir `index.html` no navegador ou servir a pasta
com qualquer servidor local:

```bash
npx serve .
```

ou, com Python:

```bash
python -m http.server 5500
```

Depois acesse `http://localhost:5500`.

## Onde alterar suas informações pessoais

Todos os pontos que precisam de dados reais estão marcados com placeholders
claros (`[ADICIONAR ...]` ou `YOUR_GITHUB_URL`). Nada foi inventado.

| O que alterar | Onde |
|---|---|
| Link do GitHub | `js/script.js` → `CONFIG.githubUrl` |
| Email de contato | `js/script.js` → `CONFIG.email` |
| Link do LinkedIn | `js/script.js` → `CONFIG.linkedinUrl` |
| URL canônica / Open Graph | `index.html` → tags `<link rel="canonical">`, `og:url`, `og:title` |
| Sitemap | `robots.txt` |
| Imagem de capa (Open Graph) | `assets/images/og-cover.jpg` (adicionar arquivo) |

> Após editar `CONFIG` em `js/script.js`, todos os links do site (botão do
> GitHub no header, seção de contato) são atualizados automaticamente pelo
> próprio JavaScript — não é necessário editar o HTML em múltiplos lugares.

## Como adicionar/editar projetos

Os projetos são renderizados dinamicamente a partir de um array em
`js/script.js`. Edite o array `projects`:

```js
const projects = [
  {
    name: 'Nome do projeto',
    description: 'Descrição curta e objetiva.',
    category: 'Categoria do projeto',
    status: 'mvp', // dev | mvp | experimental | production | concept | archived
    technologies: ['React', 'Firebase'],
    image: 'assets/projects/meu-projeto.jpg', // deixe '' para usar placeholder
    url: 'https://...', // deixe '' se ainda não houver link
    featured: true,
  },
];
```

Os status possíveis e suas cores estão centralizados em `STATUS_MAP`
(mesmo arquivo), caso queira ajustar rótulos ou cores.

## Onde editar a seção "Atuação & Tecnologias"

A seção que une áreas de atuação e stack fica em `index.html`, dentro de
`<section id="stack">`. Ela é dividida em duas colunas (`.atuacao-split`):

1. **Coluna esquerda — cards de atuação** (`.expertise-card`, em grid
   2x2): cards enxutos com número, título e descrição curta — sem badges
   de tecnologia dentro deles.
2. **Coluna direita — stack** (`.stack-col` com o rótulo "Stack" e o
   `.tech-cloud`): nuvem de tags agrupada por categoria
   (`.tech-cloud-group` com um `.tech-cloud-label` e vários
   `.tech-cloud-pill`), que flui naturalmente em vez de ocupar colunas
   fixas — categorias pequenas (como "Database") não ficam esticadas
   ocupando o mesmo espaço de categorias maiores.

Em telas menores que `lg` (< 992px), as duas colunas empilham verticalmente.

Ambas são HTML estático — edite diretamente as tags para adicionar/remover
tecnologias ou áreas de atuação.

## Onde alterar as cores (identidade visual)

Todas as cores são CSS variables definidas no topo de `css/style.css`,
dentro de `:root`:

```css
:root {
  --bg-primary: #08090D;
  --bg-secondary: #0D1117;
  --surface: #11151C;
  --surface-alt: #161B22;
  --text-primary: #F5F7FA;
  --text-secondary: #9AA4B2;
  --accent: #5B8CFF;
  --border: #1F2530;
}
```

Alterar `--accent` muda a cor de destaque em todo o site (botões, links,
hover, indicadores) automaticamente.

## Seção de números/métricas

Os valores em "Números" (`js/script.js` não controla isso — os valores
ficam diretamente nos atributos `data-counter` em `index.html`, seção
`.stats-section`). São **placeholders conceituais**: ajuste para refletir
sua realidade quando tiver métricas reais.

## Publicando em hospedagem comum

Por ser 100% estático, o site pode ser publicado em qualquer serviço de
hospedagem estática:

- **Firebase Hosting**: `firebase init hosting` → aponte para a raiz do
  projeto → `firebase deploy`.
- **GitHub Pages**: suba o repositório e ative Pages apontando para a
  branch/pasta raiz.
- **Netlify / Vercel**: arraste a pasta ou conecte o repositório — nenhum
  comando de build é necessário (build command vazio, publish directory `.`).
- **Qualquer servidor HTTP tradicional**: basta copiar os arquivos via FTP.

## Próximos upgrades sugeridos

- Adicionar imagens reais dos projetos em `assets/projects/`.
- Criar `sitemap.xml` quando o domínio final estiver definido.
- Integrar com a API do GitHub para exibir repositórios/commits recentes em algum ponto do site.
- Evoluir para rotas próprias (`/projects`, `/lab`, `/apps`) quando o hub
  crescer — a estrutura de dados em `js/script.js` já foi pensada para isso.
- Adicionar página de detalhes por projeto (`/projetos/nome-do-projeto.html`).
- Adicionar foto pessoal e depoimentos reais quando existirem.
- Configurar Google Analytics/Plausible quando o domínio estiver no ar.

## Notas importantes

- **Nenhuma informação foi inventada.** Empresas, cargos, números,
  certificações, depoimentos ou projetos não mencionados pelo usuário não
  aparecem no site — tudo o que dependia de dado real está marcado como
  placeholder.
- O array de projetos usa dados fornecidos como ideias/placeholders
  estruturados; substitua livremente conforme os projetos evoluem.
