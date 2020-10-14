# Dia 1
Primeiro passo preparar o ambiente:

Nodejs
Yarn

#bug seguindo as orientações do site do nwl deu um problema ao instalar o yarn.
usei as recomendações do site:
*install
sudo apt-get install yarn
*update
$ curl --compressed -o- -L https://yarnpkg.com/install.sh | bash

# Conceitos 
## SPA Single Page Application
Trocar conteúdos da tela em componentes sem precisar recarregar toda a pagina.
## React 
Construção de interfaces fluidas usando o conceito SPA.
## typescript
Superset :conjuto de ferramentas colocadas em cima do javascript.

# aula 1

## Criar projeto React:

name_my_app é literalmente um nome que você pode escolher para o app.

$ yarn create react-app web_app --template typescript

Limpando arquivos indesejados.
- readme 
- public/ todos exceto index.html (index.html tbm teve uma limpeza no arquivo =D)
-src/ todos exceto index.js e App.js (algumas modificações foram feitas)

Testando aplicação.
$ yarn start
### estrutura do projeto.
-web_app/
--public/
---index.html
--src/
---index.js
---App.js
---images/
----images.svg
---styles
----global.css
----pages/

Percebi que meu projeto não ficou em typescript  =D
Abri a documentação e achei meu erro =D 
-[documentação react](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup)

## Conceitos React
ReactDom: Integração do react com a árvore de elementos do HTML(DOM)
Componentes: funções que retornam um html.
Intercace: descreve o tipo do objeto que a função usa. 

### Entendendo os arquivos 
index.tss  vai renderizar a page index.html, no nosso caso estamos colocando o App.ts dentro do index.ts.
App.ts - Nosso primeiro componente. =D

## Criandon layout do projeto (landing page)
Link com as infos https://www.notion.so/Layout-Happy-OmniStack-faac4d4d638343fe8bab627125a7557c
Pede pra exportar a ilustra_02, no meu figma a opção de export estava no menu lateral lá embaixo.
- Criaruma pasta images/ e salvar as imagens pedidas no video.
- Criar pasta styles/
-- criação do estilo global
Fonte do google fontes , numnito   600,700,800.
colocamos no index.html.
-- criação da pasta pages/
---crialçao do estilo landing

IMPORTANTE: todas importações devem ser feitas nos js dos componentes e não no index.html.

### povoando a page seguindo o figma
Dentro de app.ts criar wma div content-wrap, digite .content.wrap e se nao parecer sugestão use o ctrl+space =D

seguimos as isntruções do video, porém a div mais externa não esta ficando centralizada =z
instalando pacote de icones
$ yarn add react-icons    vem pacote pra porra.

Visualmente estava com uma aparecencia estranha devido ao tamanho da tela do meu pc.
adicionei algumas propriedades ao componente no arquivo landing.css. 

#landing-page .content-wrapper{
  max-height: 630px;   
 [abaixo detodos os estilos]
background-size: contain;
}

### Criando rotas
React router DOM
$ yarn add react-router-dom & yarn add @types/react-router-dom
Înstale também o @types do modulo para mostrar as dependncias na IDE
$ yarn add @types/react-router-dom

deu merda porque isntalei os modulos em niveis errados, salvei as pastas src e public,
recriei o projeto, e substitui as pastas.

agora com as rotas criadas, criamos as paginas como componentes e usamos o Link no lugar da tag <a>
para evitar recarregar toda a pag

para evitar avisos chatos comenta a linha anterior com //eslint-disable-next-line


