import express from 'express';
import './database/connection';
import routes from './routes'

const app = express();
//habilitando a leitura de json no request
app.use(express.json());
// agora todas as rotas ficaram separadas neste arquivo.
app.use(routes);

app.listen(3333);