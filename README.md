# 🚀 API EncontraPet🐾

## 📌 Sobre o Projeto

### A API EncontraPet🐾 foi desenvolvida para cadastro de ONGs  que recebem e encaminham animais perdidos em cenários de enchentes, por exemplo:

- Sou ONG e quero abrigar animais;
- Sou civil e encontrei algum animal em meio ás enchentes, onde deixá-los;
- Perdi meu pet, preciso saber se alguém o encontrou;


Essa API nos permite registrar ONGs, visualizá-las, atualizar status de disponibilidade e/ou deletar abrigos já lotados.

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express
- SQLite3
- SQLite
- Postman
- Nodemon

---
## 📦 Instalação
`npm install`

---

## ▶️ Como Executar

```bash
npm run dev
```
`http://localhost:3000` 

[Clique Aqui](http://localhost:3000/)

---

## 🗄️ Banco de Dados
O banco de dados é criado automaticamente ao iniciar o projeto.

```
database.db
```


## 📃 Tabela 

|Campo             |Descrição
|------------------|---------------|
|id                |Identificador único|
|nome_ong          |ONG que está se voluntariando|
|cnpj              |Registro da empresa|
|email             |Meio de contato formal com a ONG|
|telefone          |Contato via WhatsApp |
|endereco          |Onde a ONG está localizada|
|cidade            |Cidade Sede|
|estado            |Estado Sede|
|site              |Site Oficial|
|descricao         |Onde a ONG expõe as atividades realizadas|
|status            |Se a unidade ainda está com vaga |

---

## 🔗 Endpoints
### Rota Inicial

```http
GET /
```
Retorna uma página simples com informações da API.

---

### Rota para listar todos as ONGs

```http
GET /ongs
```
Retorna todos os registros do banco de dados

---

### Rota para listar uma ONG específica (ID)

```http
GET /ongs/:id
```
---

Ex.: /ongs/3

Retorna uma ONG específica

---

### Rota para criar uma nova ONG

```http
POST /ongs
```

### Body (JSON)
```json
{
  "nome_ong": "ONG H",
    "cnpj": "43.555.762/0006-80",
    "email": "contato@ongb.org",
    "telefone": "(23) 2236-2442",
    "endereco": "Rua das Papoulas, 22",
    "cidade": "Rio de Janeiro",
    "estado": "RJ",
    "site": "https://www.ongh.org",
    "descricao": "Descrição da ONG H",
}
```

## Rota para atualizar ONG
```http
PUT /ongs/:id
```

### Body (JSON)
```json
{
 
    "id": 4,
    "status": "Lotação Máxima Atingida"
  
}
```

### Rota para deletar ONG
```json
DELETE /ongs/:id
```
---

Ex.: DELETE /ongs/4

---


## 🔐 Segurança
A API utiliza `?` nas queries SQL

```sql
WHERE id = ?
```

Isso evita o SQL Injection 

---

## 📚 Conceitos

- CRUD (Create, Read, Update e Delete)
- Rotas com Express
- Métodos/Verbos HTTP
---

## 👩🏼‍💻 Projeto Educacional

Este projeto foi desenvolvido para fins de aprendizado.

Por: Fernanda Carneiro de Laia
