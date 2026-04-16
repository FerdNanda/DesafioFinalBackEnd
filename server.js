const express = require('express');
const { criarBanco } = require('./database');

const cors = require('cors');

const app = express();


app.use(cors());

app.use(express.json());


//===============================ROTA PRINCIPAL

app.get('/', (req, res) => {
    res.send('Bem-vindo à API de Localização de Animais!')

});


//===============================CRIANDO A PORTA DO SERVIDOR

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor rodando na porta  http://localhost:${PORT}`));




//===============================LISTAGEM DE ONGS

app.get('/ongs', async (req, res) => {

       const db = await criarBanco();

       const ongs = await db.all('SELECT * FROM ongs');
  
     res.json(ongs);
    
});

//=============================ATUALIZAÇÃO DE ONGS

app.put('/ongs/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;



    const db = await criarBanco();

    await db.run(`
        UPDATE ongs 
        SET status = ? 
        WHERE id = ?`,
        [status, id]
    );

    res.json({ message: 'Status da ONG atualizado com sucesso!' });
});






//===============================LISTAGEM DE PETS
app.get('/pets', async (req, res) => {

    const db = await criarBanco(); 
    const listapets = await db.all('SELECT * FROM pets');

    res.send(`A lista de pets é: ${id} sob cuidados`);
});



//===============================ATUALIZAÇÃO DE PETS

app.put('/pets/:id', async (req, res) => {
    // const petId = req.params.id;

    const { id } = req.params;

    const { status } = req.body;


  const db = await criarBanco();

  await db.run(`
    UPDATE pets 
    SET status = ? 
    WHERE id = ?`,
     [status, id]
    );

  res.send(`Status do pet atualizado com sucesso`);


});




//===============================DELETANDO PETS

app.delete('/pets/:id', async (req, res) => {

    const {id} = req.params;

    const db = await criarBanco();
    
    await db.run(`DELETE FROM pets WHERE id = ?
        `, [id]);

    res.send(`o pet ${id} deletado com sucesso!`);

});     


// //===============================DELETANDO ONGS

// app.delete('/ongs/:status', async (req, res) => {
//     const ongStatus = req.params.status;


//     const db = await criarBanco();
//     await db.run(`DELETE FROM ongs WHERE status = ?`
//         , [status]);

//     res.send(`ONG deletada com sucesso!`);         
// }); 