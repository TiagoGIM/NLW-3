# Dia 2 - Backend
Criação de uma API para alimentar o cliente.
## Primeiros passos
Criar o diretorio raiz e iniciar o yarn project ou npm project.
```
$ yarn init -y
$ yarn add express
$ yarn add @type/express -D
```
Iniciado o projeto já instalamos o pacote basico. express e o modulo @type para ajudar com o debug

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
$ yarn typeorm migration:create -n creat_orphanages2
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

Durante a criação do modelo faltou uma feature da tabela, então desfizemos a migration, atualizamos o file da migration com a nova feature e rodamos de novo, os comando:
```
$ yarn typeorm migration:revert
$ yarn typeorm migration:run
```
Comigo ão funcionou, ao tentar inicar a nova migration ele de erro, dropei na mão.

Decidi refazer todo o processo criando uma nova migration e deletando a antiga. ai rolou os comandos.

Após finalizar o model com as variaveis primitivas do javascript, é preciso habilitar a integração dele com o typeorm.
Editar algumas variáveis como false `strictPropertyInitialization: false ,"experimentalDecorators": true e "emitDecoratorMetadata": true ` 
no file ` tsconfig.json`.

### Decorators

Usamos o decorador @Entity,@Column e @Primarygenerate para associar nossa classe ao schema da tabela
Veja o arquivo em models.

## De volta às Rotas.

### Post (cadastrando orfanatos)

Criamos a rota /orfanages com o metodo post e nela vamos permitir que a requisição escreva no banco.

- descrevemos todos os params que chegou no body para usar no repositorio "orphanage".
- usamos o pattern "getRepository" do tyeporm, que é quem lida com o db.
- editamos o `connection.t` para ele entender nosso model.(passamos a rota da entities)
- importamos e instanciamos o model como um diretório, para assim ele ter os metodos do db.
- criamos o repositorio "orphanage" e salvamos no db(usamos async await).

Post via terminal:
```
curl -X POST -H 'Content-Type: application/json' -d '{
"name":"lar da vovozinha 4",
"opening_hours": "8",
"latitude":"158,14",
"longetude":"135,09",
"about":"tem uns idosos",
"instructions":"pode vir visitar",
"open_weekends":"false"}' localhost:3333/orphanages
```
tudo certo =D

## Padrão MVC

Model - representação da tabela no banco
Views - como as coisas sao disponibilizadas
Controles - a logica das rotas

Criei o file rotas e a pasta com os controllers para conter a lógica das rotas criadas até então.
Para usar o file controller é necessário importar os metodos request e response.

Escrita e consulta no db por rotas funcionando como esperado. 
Faltou um "await" e minha resposta tava voltando vazia, resolvido.


## Upload de imagens

- Criar tabela que conterá o endereço das imagens upadas.
- Criar diretório que hospedará as imagens.
### tabela linkada
```
$ yarn typeorm migration:create -n images_home
```
Como essa será uma tabela linkada e a relação é 1:N então precisamos setar `foreignKeys`:
```
      foreignKeys:[
        {
          name:"ImageOrphanage",
          columnNames:['orphanage_id'],
          referencedTableName:'orphanages',
          referencedColumnNames:['id'],
          onUpdate:'CASCADE',
          onDelete:'CASCADE'
        },
      ],
```
onUpdate e onDelete setados em "cascade" irá automatizar o processo de forma a que asimagens finquem linkadas a tabela de orfanatos mesmo que o id do orfanato seja alterado.

### multer para lidar com o upload de imagens

- instalar o multer
- criar um arquivo de configuiração 'uploads.ts' na pasta src/config
- criar diretorio para salvar as imagens localmente


```
$ yarn add multer
```

criamos os diretorios e arquivos relacionados e atualizamos o post pra receber uploads.
E seguimos as orientações do video sem ter nenhum problema.

Para testar se funcionou usei outro tipo de curl  mult-part-form, o json não lida com imagens. usei o insominia.
Deu tudo certo, imagem upada na pasta.

### cadastro da imagem no db.
Primeiramente criamos o model da imagem em src/models
```
$ touch image.ts
```
Criamos as relações entre os dois modelos usando os decoradores
 @JoinColumn, @ManytoOne @OnetoMany

E colocamos as infos la dentro.

Editamos o controler conforme o video e também não teve nenhum problema.

## Views
A view serve para retorna ao client apenas o que ela renderizar, estiliza o json.
criamos a view de orfanato com dois tipos de render:
-render()  para rederizar os orfanatos indivitualmente.
-renderMany() que irá retorna os orfanatos como um todo, mas ainda com o controle do backend.

Criamos uma view separada para as imagens e usamos para preencher o campo image na view de orphanage.

Para habilitar o path das imagens foi preciso adicionar no express o diretorio uploads. (linha 14 do server.ts)

## lidando com excessões

```
$ yarn add express-async-errors
```

criar pasta erros e nela criar um file com um errorHandler settings.
Adicionar no server o handlers. Importando e criando um "Use"

##  validação dos dados

Usando o modulo yup
```
$ yarn add yup
```
Em controllers criar um objeto com todos os dados que precisam ser recebidos e validados para o create.
tambem criamos um schema usando o Yup.

usamos o metodo validate() e o abortEarly para retornar todos os campos com erro.

em seguida editar o handler.ts para usar o yup e enviar o error de validação para o cliente.

Tive um atraso gigantesco porque estava usando a ferramenta errada. Então dava erro na promisse async. 

- CERTA express-async-errors
- ERRADA yarn add express-async-error

por ultimo instalamos o cors.
