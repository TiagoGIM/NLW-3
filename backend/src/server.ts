import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import './database/connection';
//o express precisa de um midware pra acessar o path
import path from 'path';
import routes from './routes'
// arquivo criado para lidar com erros no servidor
import errorHandler from './errors/handlers';

const app = express();
//
app.use(cors());
//habilitando a leitura de json no request
app.use(express.json());
// agora todas as rotas ficaram separadas neste arquivo.
app.use(routes);
//expondo a pasta uploads
app.use('/uploads', express.static(path.join(__dirname,'..','uploads')));
// handler para retornar erro de servidor.
app.use(errorHandler);

app.listen(3333);