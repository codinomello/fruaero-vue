# fruaero-vue
🫧 fruaero-vue: calculadora de notas de vestibulares e concursos no estilo frutiger aero

App em **Vue 3.5** (Composition API + `<script setup>`) com **Vite 8**, **Vue Router 5** e **Tailwind CSS v4**, no estilo visual **Frutiger Aero**.

4 calculadoras + página inicial:

- `/` — hub com as 4 calculadoras
- `/fuvest` — nota final: `NF = (F1 + D1 + D2) / 3`, ou `[F1 + D1 + D2 + (2×CE)] / 5` com Competências Específicas
- `/unicamp` — NPO: `0,15×NF1 + 0,20×NR + 0,65×NF2`, com pesos ajustáveis por prova
- `/enem` — média ponderada das 5 áreas, com pesos e presets ajustáveis
- `/cacd` — TPS eliminatório (acerto +1, erro −0,25) + soma das 7 provas discursivas (mín. 480 pts)

## Rodando localmente

Pré-requisito: [Node.js](https://nodejs.org) 20 ou superior.

```bash
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (geralmente `http://localhost:5173`).

## Build de produção

```bash
npm run build
```

Gera a pasta `dist/` pronta para publicar em qualquer hospedagem estática.

## Publicando no GitHub Pages

O projeto já usa **caminhos relativos** (`base: './'` no `vite.config.js`) e **hash router** (`/#/fuvest`, `/#/unicamp`...), então funciona em qualquer repositório do GitHub Pages sem precisar editar nada.

### Opção 1 — Deploy automático (recomendado)

1. Crie um repositório no GitHub e suba todo este projeto (menos `node_modules` e `dist`, já ignorados pelo `.gitignore`).
2. Vá em **Settings → Pages** e, em "Source", selecione **GitHub Actions**.
3. Faça push para a branch `main`. O workflow em `.github/workflows/deploy.yml` builda o projeto e publica automaticamente a cada push.
4. Em alguns minutos o site estará em `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

### Opção 2 — Deploy manual

```bash
npm run build
```

Depois publique o conteúdo da pasta `dist/` na branch `gh-pages` (ex.: com o pacote [`gh-pages`](https://www.npmjs.com/package/gh-pages)) ou faça upload manual em **Settings → Pages**.

## Estrutura

```
src/
  components/   NavBar, BubbleField, Orb (medidor de vidro), WaveFooter
  views/        HomeView, FuvestView, UnicampView, EnemView, CacdView
  router/       rotas com hash history
  style.css     Tailwind v4 + tokens de tema Frutiger Aero (glass, orb, bolhas...)
```

Cada view define seu próprio tema de cor via `meta.theme` na rota (`blue`, `violet`, `green`, `gold`), aplicado como `data-theme` no `<App>` — os componentes compartilhados (botões, orbe, barras) usam variáveis CSS (`--accent`, `--ink`...) que mudam automaticamente por página.

## Observações

- As fórmulas são versões educacionais simplificadas das fórmulas oficiais (Fuvest e Unicamp, por exemplo, padronizam notas estatisticamente com base em todos os candidatos, o que só é calculável após a prova). Use como estimativa, não como resultado oficial.
- Os pesos de exemplo do ENEM (Medicina, Direito, Engenharia) são ilustrativos — os pesos reais variam por instituição e curso via SiSU.
- Ferramenta educacional independente, sem vínculo com Fuvest, Unicamp, Comvest, Inep/MEC, Itamaraty, Instituto Rio Branco ou Cebraspe.
