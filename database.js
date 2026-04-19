const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const openDb = async () => {
  return open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });
};

const criarBanco = async () => {
  const db = await openDb();

  await db.exec("PRAGMA foreign_keys = ON");

  await db.exec(`
    CREATE TABLE IF NOT EXISTS ongs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome_ong TEXT,
      cnpj TEXT,
      email TEXT,
      telefone TEXT,
      endereco TEXT,
      cidade TEXT,
      estado TEXT,
      site TEXT,
      descricao TEXT,
      status TEXT DEFAULT 'Ativa'
    )
  `);

  const todasAsOngs = await db.all("SELECT * FROM ongs");
  console.table(todasAsOngs);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS pets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      especie TEXT,
      raca TEXT,
      idade_aproximada INTEGER,
      sexo TEXT,
      status TEXT,
      foto TEXT,
      descricao TEXT,
      ong_id INTEGER,
      FOREIGN KEY (ong_id) REFERENCES ongs(id) ON DELETE CASCADE
    )
  `);


//===========TABELA DE ONGS================


  const checagem = await db.get("SELECT COUNT(*) AS total FROM ongs");
  if (checagem.total === 0) {
    await db.exec(`
      INSERT INTO ongs(nome_ong, cnpj, email, telefone, endereco, cidade, estado, site, descricao, status) VALUES
      ('ONG A','12345678000190','contato@onga.org','1191111111','Rua das Flores, 123','São Paulo','SP','https://www.onga.org','Descrição da ONG A','Ativa'),
      ('ONG B','98765432000110','contato@ongb.org','21922222222','Rua das Camélias, 52','Rio de Janeiro','RJ','https://www.ongb.org','Descrição da ONG B','Ativa'),
      ('ONG C','56789.012000134','contato@ongc.org','43933333333','Rua dos Girassóis, 78','Santa Maria','RS','https://www.ongc.org','Descrição da ONG C','Ativa'),
      ('ONG D','34567.890000156','contato@ongd.org','43944444444','Rua das Orquídeas, 90','Santa Maria','RS','https://www.ongd.org','Descrição da ONG D','Ativa'),
      ('ONG E','78901.234000112','contato@onge.org','21955555555','Rua das Margaridas, 45','Rio de Janeiro','RJ','https://www.onge.org','Descrição da ONG E','Ativa')
    
      `);
  } else {
    console.log("ONGs já existem no banco de dados.");
  }

  //////TABELA DE PETS//////================

   const todosOsPets = await db.all("SELECT * FROM pets");
   console.table(todosOsPets);

  const checagemPets = await db.get(`SELECT COUNT(*) AS total FROM pets`);

  if (checagemPets.total === 0) {

    await db.exec(`INSERT INTO pets('especie','raca','idade_aproximada','sexo','status','foto','descricao','ong_id') VALUES
      ('Cachorro','Vira-lata',2,'Macho','aguardando adoção','https://example.com/pet.jpg','pelagem preta, olhos castanhos, dócil','1'),
      ('Gato','Siamês',6,'Fêmea','recebendo medicação','https://example.com/pet.jpg','pelagem marrom clara, olhos azuis, dócil','3'),
      ('Cavalo','indefinida',7,'Macho','em tratamento','https://example.com/pet.jpg','pelagem castanha, crina longa, mancha branca na testa','1'),
      ('Gato','SRD',1,'Fêmea','aguardando familiares','https://example.com/pet.jpg','pelagem cinza, olhos verdes, arrisca','2'),
      ('Cachorro','Pastor Alemão',3,'Fêmea','recém castrada','https://example.com/pet.jpg','mancha preta na língua','4'),
      ('Cachorro','SRD',3,'Macho','sob cuidados','https://example.com/pet.jpg','porte médio, castrado, mancha preta no olho direito','5'),
      ('Cachorro','Labrador',4,'Macho','aguardando adoção','https://example.com/pet.jpg','pelagem amarela, olhos castanhos, dócil','1'),
      ('porco','indefinida',2,'Macho','sob cuidados','https://example.com/pet.jpg','pelagem rosa, olhos pequenos, mancha preta no rabo','2')

`);
  } else {
    console.log("Pets já existem no banco de dados.");
  }

 



  return db;


 };


module.exports = { criarBanco };
