const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

const openDb = async () => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    })

    await db.exec("PRAGMA foreign_keys = ON")
    return db
}

const criarBanco = async () => {
    const db = await openDb()

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
            foto TEXT,
            created_at TEXT DEFAULT (datetime('now'))
        )
    `)

    await db.exec(`
        CREATE TABLE IF NOT EXISTS animals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ong_id INTEGER,
            nome TEXT,
            especie TEXT,
            raca TEXT,
            idade INTEGER,
            sexo TEXT,
            status TEXT,
            foto TEXT,
            descricao TEXT,
            created_at TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (ong_id) REFERENCES ongs(id) ON DELETE SET NULL
        )
    `)

    await db.exec(`
        CREATE TABLE IF NOT EXISTS voluntarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ong_id INTEGER,
            nome TEXT,
            email TEXT,
            telefone TEXT,
            funcao TEXT,
            disponibilidade TEXT,
            created_at TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (ong_id) REFERENCES ongs(id) ON DELETE CASCADE
        )
    `)
 const checagem = await db.get(`SELECT COUNT(*) AS total FROM ongs`);

  if (checagem.total === 0) {
    await db.exec(`
  INSERT INTO ongs(nome_ong, cnpj, email, telefone, endereco, cidade, estado, site, descricao, foto) VALUES
    ('ONG A', '12.345.678/0001-90', 'contato@onga.org', '(11) 1111-1111', 'Rua das Flores, 123', 'São Paulo', 'SP', 'https://www.onga.org', 'Descrição da ONG A', 'foto_onga.jpg'),
    ('ONG B', '98.765.432/0001-10', 'contato@ongb.org', '(11) 2222-2222', 'Rua das Camélias, 52', 'Rio de Janeiro', 'RJ', 'https://www.ongb.org', 'Descrição da ONG B', 'foto_ongb.jpg'),   
    ('ONG C', '11.223.344/0001-55', 'contato@ongc.org', '(11) 3333-3333', 'Rua das Rosas, 89', 'Belo Horizonte', 'MG', 'https://www.ongc.org', 'Descrição da ONG C', 'foto_ongc.jpg'),
    ('ONG D', '22.334.455/0001-66', 'contato@ongd.org', '(11) 4444-4444', 'Rua das Tulipas, 15', 'Brasília', 'DF', 'https://www.ongd.org', 'Descrição da ONG D', 'foto_ongd.jpg'),
    ('ONG E', '33.445.566/0001-77', 'contato@onge.org', '(11) 5555-5555', 'Rua das Violetas, 23', 'Curitiba', 'PR', 'https://www.onge.org', 'Descrição da ONG E', 'foto_onge.jpg')
`);

  } else {
    console.log(`Banco de dados pronto com ${checagem.total} de ONGs já cadastradas.`);

  }


}









module.exports = { criarBanco };