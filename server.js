const express = require('express');
const { criarBanco } = require('./database');



const app = express();

app.use(express.json());



app.get('/', (req, res) => {
    res.send('Bem-vindo à API de Localização de Animais!')
});

app.get('/ongs', async (req, res) => {

       const db = await criarBanco();

       const ongs = await db.all('SELECT * FROM ongs');
  
     res.json(ongs);
    
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor rodando na porta  http://localhost:${PORT}`));