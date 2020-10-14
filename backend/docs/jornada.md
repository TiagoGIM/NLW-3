# Dia 2 - Backend

## Primeiros passos
Criar o diretorio raiz e iniciar o yarn project ou npm project.
```
$ yarn init -y
$ yarn add express
$ yarn add @type/express -D
```
Iniciado o projeto já instalamos o pacote basico. express e o modulo type para ajudar com o debug

express facilita o sistema de requisição e reposta.

Em seguida construir a árvore de diretórios

├─ backend

├─── src

Primeiro file é o server.ts.
```
$ touch scr/server.ts

```
Escrevemos os primeiros códigos mas ainda é preciso instalar o modulo typescript pra o node entende-lo.
```
$ yarn add typescript -D
$ yarn add ts-node-dev -D

```
Preparar o ambiente pra trabalhar com typescript
```
$ yarn tsc --init
```
O node entende javascript até o es2017 então atualisamos o file `tsconfig.json` no trecho(linha 7):
```
"target": "ES2017"  
``` 
Configurar o `package.json` pra rodar o script com ts.
```
  "scripts": {
    "dev":"ts-node-dev src/server.ts"
  },
```
Agora para rodar o server basta 
```
$ yarn dev
```
Deu certo ? 
```
"cannot get "/"
``` 
Se apareceu isso, deu sim !
### FLAGS DE SCRIPT
Agora vamos setar as flags:

--traspile-only  : evita testar cada vez que roda a aplicação.

--ignore-watch   : evita recarregar a pasta em questão.

### CRIANDO ROTAS
```
app.get('/',(request, response)=>{
    console.log(request);
    return response.send('oi');
});
```
**Parametros do get()**

"/" = é o que usamos após o `host:port` (neste caso a raiz "/")

**request** = tudo que o cliente mandar de dados para a requisição (front>back)

**response** = responsta enviado do backend.

**Paramestros de um request:**

request._query_   atributos de query

request._params_  atributos de rota    
    -para acessar o params é preciso criar uma variável no parametro da rota. Ex.:

    `('/rota/:variavel')`

request._body_  atributo de multi-party-forms.
geralmente um formulario.
para o express ler um json é preciso habilitar no backend.
```
app.use(express.json())
```
## Banco de dados
 Base pronta, vamos para entender e preparar o SQL.

 os modulos usados são `typeorm` e `sqlite`, para instala-los basta:

```
$ yarn add typeorm sqlite3
```
Usaremos o sqlite dentro do servidor, um arquivo "simulado" não é relmente um db.

Existem três manineira de acessar o db pelo node:
- Drive nativo: usando as querys identicas a dentro de um db. 
- Query bulder :  Construtor de query em sintaxe js.
- ORM : Maior nivel de abstração, constroindo classes para cada tabelas (schemas).

## Configurando o db
Crie uma pasta dabase e dentro dela dois arquivos, `database.sqlite` e `conection.ts`
```
$ mkdir database
$ touch database/database.sqlite
$ touch database/connection.ts
```
*Não escreva NADA no database.sqlite !*

Crie um arquivo chamado ormconfig.json
```
$ touch ormconfig.json
```
Atualizar os files server e preenchcer devidamente os arquivos de connexão e config.

## migrations

dentro da pasta database criar uma nova pasta migrations.
```
$ cd src/database
$ mkdir migrations
```
Agora configure o typeorm para exucuta-lo com typescript, adcionar o script no `package.json`:
```
"typeorm" : "ts-node-dev ./node_modules/typeorm/cli.js"
```
Salve o file e execute 
```
$ yarn typeorm
```
Um error vai ser gerado porém se o "help" estiver com comandos cli.js então esta tudo ok.


### Criando uma migration:
```
$ yarn typeorm migration:create -n creat_orphanages
```
Irá ser criado um arquivo .ts na pasta de migrations, nele existem duas funções up() e down().
- up() irá fazer alterações no db.   "do something"
- down() desfaz a operação.   "un do something"

Schema na migration criado, agora é rodar o comando "run" para efetivar a tabela no db:
```
$ yarn typeorm migration:run
```
Para visualizar a tabela, usamos o app [Beekeeper Studio](https://github.com/beekeeper-studio/beekeeper-studio/releases).

No inicio nao funcionou porque cadastrei o db errado.  =D

### Criação dos Models

Um model é a representação da tabela como uma classe dentro do app.
```
$ cd src
$ mkdir models
$touch Orphanage.ts
```
Criar o arquivo como uma classe [veja o arquivo]