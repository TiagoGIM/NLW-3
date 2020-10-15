import express from 'express';
import './database/connection';
import routes from './routes'
import 'express-async-error';
//o express precisa de um midware pra acessar o path
import path from 'path';
// arquivo criado para lidar com erros no servidor
import error from './errors/handlers';

const app = express();
//habilitando a leitura de json no request
app.use(express.json());
// agora todas as rotas ficaram separadas neste arquivo.
app.use(routes);
//expondo a pasta uploads
app.use('/uploads', express.static(path.join(__dirname,'..','uploads')));
// handler para retornar erro de servidor.
app.use(error);

app.listen(3333);