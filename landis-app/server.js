const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');
const fs = require('fs');

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
  const db = openDB();
  db.serialize(() => {
    let name = 'Aaron';
    const createQuery = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT
  );`;
    let insertQuery = 'INSERT INTO users VALUES (1, (?))';
    let data = null;
    try {
      data = fs.readFileSync(filePath, { encoding: 'utf-8' });
    } catch (error) {
      console.log(error);
    }
    name = data ? data[2] : name;

    db.run(createQuery, error => {
      if (error) console.log(error.message);
    })
      .run(insertQuery, name, error => {
        if (error) console.log(error.message);
      })
      .get('SELECT * FROM users where id = 1;', function(error, row) {
        if (error) console.log(error.message);
        else console.log(row);
      });
    closeDB(db, error => {
      if (error) console.log(error.message);
    });
  });
};

// server setup
const app = express();

app.get('/api/cards', (req, res) => {
  load();
  res.json({ message: 'hi' });
});

app.listen(5000, () => {
  console.log('express server Listening on port 5000');
});
