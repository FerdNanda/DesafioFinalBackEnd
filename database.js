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
      nome_ong INTEGER,
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
      FOREIGN KEY (nome_ong) REFERENCES ongs(id) ON DELETE CASCADE
    )
  `);


//===========TABELA DE ONGS================


  const checagem = await db.get("SELECT COUNT(*) AS total FROM ongs");
  if (checagem.total === 0) {
    await db.exec(`
      INSERT INTO ongs(nome_ong, cnpj, email, telefone, endereco, cidade, estado, site, descricao, status) VALUES
      ('ONG A','12.345.678/0001-90','contato@onga.org','(11) 1111-1111','Rua das Flores, 123','São Paulo','SP','https://www.onga.org','Descrição da ONG A','Ativa'),
      ('ONG B','98.765.432/0001-10','contato@ongb.org','(21) 2222-2222','Rua das Camélias, 52','Rio de Janeiro','RJ','https://www.ongb.org','Descrição da ONG B','Ativa'),
      ('ONG C','56.789.012/0001-34','contato@ongc.org','(43) 3333-3333','Rua dos Girassóis, 78','Santa Maria','RS','https://www.ongc.org','Descrição da ONG C','Ativa'),
      ('ONG D','34.567.890/0001-56','contato@ongd.org','(43) 4444-4444','Rua das Orquídeas, 90','Santa Maria','RS','https://www.ongd.org','Descrição da ONG D','Ativa'),
      ('ONG E','78.901.234/0001-12','contato@onge.org','(21) 5555-5555','Rua das Margaridas, 45','Rio de Janeiro','RJ','https://www.onge.org','Descrição da ONG E','Ativa')
    
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
      ('Cachorro','Vira-lata',2,'Macho','aguardando adoção','https://example.com/pet1.jpg','pelagem preta, olhos castanhos, dócil','1'),
      ('Gato','Siamês',6,'Fêmea','recebendo medicação','https://example.com/pet2.jpg','pelagem marrom clara, olhos azuis, dócil','3'),
      ('Cavalo','indefinida',7,'Macho','em tratamento','https://example.com/pet3.jpg','pelagem castanha, crina longa, mancha branca na testa','1'),
      ('Gato','SRD',1,'Fêmea','aguardando familiares','https://example.com/pet4.jpg','pelagem cinza, olhos verdes, arrisca','2'),
      ('Cachorro','Pastor Alemão',3,'Fêmea','recém castrada','https://example.com/pet6.jpg','mancha preta na língua','4'),
      ('Cachorro','SRD',3,'Macho','sob cuidados','https://example.com/pet1.jpg','porte médio, castrado, mancha preta no olho direito','5'),
      ('Cachorro','Labrador',4,'Macho','aguardando adoção','https://example.com/pet5.jpg','pelagem amarela, olhos castanhos, dócil','1'),
      ('porco','indefinida',2,'Macho','sob cuidados','https://example.com/pet7.jpg','pelagem rosa, olhos pequenos, mancha preta no rabo','2')

`);
  } else {
    console.log("Pets já existem no banco de dados.");
  }

 



  return db;


 };


module.exports = { criarBanco };
