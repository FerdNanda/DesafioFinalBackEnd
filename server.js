const express = require("express");
const { criarBanco } = require("./database");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.static());

//===============================ROTA PRINCIPAL

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});




//===============================LISTAGEM DE ONGS

app.get("/ongs", async (req, res) => {
  const db = await criarBanco();

  const ongs = await db.all("SELECT * FROM ongs");

  res.json(ongs);
});

//===============================LISTAGEM DE PETS
app.get("/pets", async (req, res) => {
  const db = await criarBanco();

  const pets = await db.all("SELECT * FROM pets");

  res.json(pets);
});



//===================POSTANDO ONGS

app.post("/ongs", async (req, res) => {
  const { nome_ong, cnpj, email, telefone, endereco, cidade, estado, site, descricao, status } = req.body;

  const db = await criarBanco();

  await db.run(
    `
        INSERT INTO ongs (nome_ong, cnpj, email, telefone, endereco, cidade, estado, site, descricao, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
    [nome_ong, cnpj, email, telefone, endereco, cidade, estado, site, descricao, status]
  );

  res.json("Ong criada com sucesso!");
});


//===================POSTANDO PETS

app.post("/pets", async (req, res) => {
  const { especie, raca, idade_aproximada, sexo, status, foto, descricao, ong_id } = req.body;      
    
    const db = await criarBanco();
    await db.run(
        `
        INSERT INTO pets (especie, raca, idade_aproximada, sexo, status, foto, descricao, ong_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [especie, raca, idade_aproximada, sexo, status, foto, descricao, ong_id]
    );

    res.json("Pet criado com sucesso!");
});





//=============================ATUALIZAÇÃO DE ONGS

app.put("/ongs/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const db = await criarBanco();

  await db.run(
    `
        UPDATE ongs 
        SET status = ? 
        WHERE id = ?`,
    [status, id],
  );

  res.json({ message: "Status da ONG atualizado com sucesso!" });
});

//===============================ATUALIZAÇÃO DE PETS

app.put("/pets/:id", async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const db = await criarBanco();

  await db.run(
    `
    UPDATE pets 
    SET status = ? 
    WHERE id = ?`,
    [status, id],
  );

  res.json(`Status do pet ${id} atualizado com sucesso`);
});


// //===============================DELETANDO ONGS

app.delete("/ongs/:status", async (req, res) => {
  const { ongStatus } = req.params;

  const db = await criarBanco();
  await db.run(`DELETE FROM ongs WHERE status = ?`, [ongStatus]);

  res.send(`ONG deletada com sucesso!`);
});





//===============================DELETANDO PETS

app.delete("/pets/:id", async (req, res) => {
  const { id } = req.params;

  const db = await criarBanco();

  await db.run(
    `DELETE FROM pets WHERE id = ?
        `,
    [id],
  );

  res.send(`o pet ${id} deletado com sucesso!`);
});



//===============================CRIANDO A PORTA DO SERVIDOR

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  
  console.log(`Servidor rodando na porta  http://localhost:${PORT}`);
});