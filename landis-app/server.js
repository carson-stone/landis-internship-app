const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');
const lineReader = require('line-reader-sync');

const filePath = path.join(__dirname, 'src/accounts.jsonl');
// db functions
const openDB = () => {
  const db = new sqlite3.Database('users.db', error => {
    if (error) console.log(error.message);
  });
  return db;
};

const closeDB = db => {
  db.close(error => {
    if (error) return console.log(error.message);
  });
};

const load = () => {
  const reader = new lineReader(filePath);
  let users = [];
  const db = openDB();

  db.serialize(() => {
    let user = {
      name: null,
      balance: null,
      credit: null,
      email: null,
      phone: null,
      employer: null,
      address: null,
      comments: null,
      created: null,
      tags: null,
      id: null
    };

    const createQuery = `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      picture TEXT,
      name_first TEXT,
      name_last TEXT,
      balance TEXT,
      credit INTEGER,
      email TEXT,
      phone INTEGER,
      employer TEXT,
      address TEXT,
      comments TEXT,
      created TEXT,
      tags TEXT
    );`;
    db.run(createQuery, error => {
      if (error) console.log(error.message);
    });
    let insertQuery = `INSERT OR IGNORE INTO users VALUES (
      (?), (?), (?), (?), (?), (?), (?), (?), (?), (?), (?), (?), (?));`;

    while (true) {
      const line = reader.readline();
      if (line === null) break;
      else {
        user = JSON.parse(line);
        users.push(user);
      }
      let {
        id,
        picture,
        name_first,
        name_last,
        balance,
        credit,
        email,
        phone,
        employer,
        address,
        comments,
        created,
        tags
      } = user;
      db.run(
        insertQuery,
        [
          id,
          picture,
          name_first,
          name_last,
          balance,
          credit,
          email,
          phone,
          employer,
          address,
          comments,
          created,
          JSON.stringify(tags)
        ],
        error => {
          if (error) console.log(error.message);
        }
      );
    }

    closeDB(db, error => {
      if (error) console.log(error.message);
    });
  });
  return users;
};

// server setup
const app = express();

app.get('/api/cards', (req, res) => {
  let users = load();
  res.json(users);
});

app.listen(5000, () => {
  console.log('express server Listening on port 5000');
});
