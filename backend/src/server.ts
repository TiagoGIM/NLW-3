import express from 'express';

import './database/connection';


const app = express();
//habilitando a leitura de json no request
app.use(express.json());

app.get('/',(req, resp) =>{
    console.log(req.query);
    return resp.json({'tag':'oi'});
});

app.listen(3333);