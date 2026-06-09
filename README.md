# 🌍 Explorador Literário & Mapa de Idiomas

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=Leaflet&logoColor=white)

Uma aplicação Single Page Application (SPA) responsiva que integra a pesquisa de obras literárias a uma visualização geográfica interativa. Desenvolvida para catalogar o idioma principal de qualquer livro pesquisado e exibir, em um mapa-múndi interativo, todos os países onde este idioma é falado.

## 🎯 Objetivo

O objetivo central deste projeto é consumir múltiplas APIs públicas de forma paralela e harmoniosa:
1. **Open Library API:** Buscar os dados bibliográficos de livros baseando-se em um termo de pesquisa e recuperar a sigla do idioma de origem (ex: `eng` para inglês, `fra` para francês).
2. **Open Library Covers API:** Obter as imagens de capa dos respectivos livros.
3. **REST Countries API:** Traduzir os códigos de idiomas (`ISO 639-2`) obtidos na primeira API e procurar globalmente quais países falam aquela língua oficial.

O resultado é uma interface fluída que interage com o usuário e voa literalmente pelo mapa (`flyToBounds`) exibindo marcadores de localização e a bandeira de cada país compatível.

---

## 🧩 Módulos e Componentes

A arquitetura do projeto foi desenhada em React com Vite para performance máxima e dividida nos seguintes módulos visuais principais (`src/components/`):

- **`SearchBar.jsx`**: Barra de busca estilizada que processa a entrada do usuário e inclui um loader de estado para feedbacks imediatos.
- **`BookList.jsx`**: Layout estruturado em *Grid CSS responsivo* (5 colunas) com *scroll vertical*, encarregado de exibir os resultados em belos "glass-cards" clicáveis.
- **`BookDetails.jsx`**: Painel lateral encarregado de exibir metadados do livro selecionado (capa, data, autor original e código do idioma principal).
- **`MapViewer.jsx`**: A estrela principal da SPA. Construído sobre `react-leaflet`, corrige as peculiaridades dos ícones do React e utiliza o tema *CartoDB Dark Matter* para o visualização elegante do planeta. Calcula magicamente as coordenadas (`latlng`) retornadas e foca dinamicamente sobre a área que detém os países correspondentes.

> **💡 Curiosidade Técnica:** Existe um dicionário de mapeamento local embutido em `App.jsx` que traduz conflitos entre códigos ISO antigos da Open Library (como `ger` ou `fre`) para as versões ISO modernas exigidas pela API de Países (`deu`, `fra`), garantindo estabilidade nas pesquisas!

---

## 🚀 Como Executar

Você vai precisar do [Node.js](https://nodejs.org/) instalado em seu computador (versão 18+ recomendada).

1. Clone ou baixe este repositório.
2. Abra o terminal na pasta raiz do projeto (`trabalho-consulta_de_livros`).
3. Instale todas as dependências rodando:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento do Vite:
   ```bash
   npm run dev
   ```
5. Acesse `http://localhost:5173` no seu navegador favorito.

---

## 🤖 Como o Agente de Inteligência Artificial foi usado?

Este projeto inteiro foi planejado, codificado e refinado em uma sessão colaborativa (Pair Programming) com o agente de Inteligência Artificial **Antigravity (Google DeepMind)**.

*   **Fundação e Ferramental**: O agente de IA gerou as configurações pesadas de boilerplate para Node.js, Vite e TailwindCSS nativamente a partir de comandos automatizados direto na IDE, já prevendo a arquitetura de pastas que um Desenvolvedor Sênior usaria.
*   **Decisões e Edge Cases**: Durante o desenvolvimento, o agente foi testado para lidar com limites de segurança (tratamento para quando um livro não tem idioma, requisições 404 em línguas mortas, ou erro de rede).
*   **Refatoração Dinâmica**: A IA executou *tweaks* finos de design solicitados em tempo real (mudança de um Carousel Horizontal para um Grid CSS vertical, adição de custom scrollbars e inserção de paletas de Dark Mode com interface "Glassmorphism").
*   **Debugging Silencioso**: A IA corrigiu bugs de ecossistema por conta própria (como resolver o famoso bug de caminhos absolutos dos ícones em React+Leaflet) e mitigou quebras de código usando regex em frações de segundos.
