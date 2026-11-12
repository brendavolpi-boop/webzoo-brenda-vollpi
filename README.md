# WebZoo — Educação ambiental

Projeto acadêmico de site multipáginas desenvolvido para a atividade prática de Front-End do SENAI “Comendador Santoro Mirone”.

## Páginas
- `index.html`: apresentação, missão, destaques e curiosidades.
- `animais.html`: fichas da onça-pintada, tucano-toco e capivara, com filtros.
- `visite.html`: horários, ingressos, endereço, consulta de CEP e previsão do tempo.
- `participe.html`: programas ambientais e formulário demonstrativo validado.

## Tecnologias
HTML5 semântico, CSS3 responsivo e JavaScript sem bibliotecas externas.

## APIs públicas
- **ViaCEP** (`https://viacep.com.br/`): consulta de CEP e preenchimento dos campos de endereço.
- **Open-Meteo** (`https://open-meteo.com/`): previsão meteorológica para as coordenadas aproximadas do zoológico (-23.65, -46.62).

As integrações usam `fetch`, `async/await`, `try/catch`, verificação de resposta e mensagens de estado. É necessária conexão com a internet para consultar os serviços.

## Como executar
1. Extraia a pasta do projeto.
2. Abra a pasta no Visual Studio Code.
3. Inicie um servidor local, por exemplo a extensão **Live Server**.
4. Abra `index.html` pelo Live Server. Não é necessário instalar dependências.

## Publicação
O projeto pode ser publicado no GitHub Pages, Netlify ou Vercel. Para GitHub Pages, envie o conteúdo desta pasta para um repositório e habilite Pages usando a branch principal e a raiz (`/`).

## Acessibilidade e responsividade
Inclui link para pular ao conteúdo, navegação por teclado, foco visível, rótulos associados, mensagens com `aria-live`, `aria-current`, menu móvel com atributos ARIA, respeito a `prefers-reduced-motion`, leiaute mobile-first e breakpoints em 600, 768 e 1024 px.

## Interações
- Filtro de animais por classe, alimentação e bioma.
- Perguntas frequentes expansíveis com `details` e `summary`.
- Contador de caracteres e validação do formulário.
- Máscara simples de CEP.

## Observações
Os horários, preços, programas e dados de contato são fictícios e foram fornecidos para fins didáticos. O formulário é demonstrativo: não envia nem armazena dados. Não informe dados pessoais reais.
