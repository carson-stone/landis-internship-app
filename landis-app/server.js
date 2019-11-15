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
      id: null,
      indicator: null
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
      tags TEXT,
      indicator INT
    );`;
    db.run(createQuery, error => {
      if (error) console.log(error.message);
    });
    let insertQuery = `INSERT OR IGNORE INTO users VALUES (
      (?), (?), (?), (?), (?), (?), (?), (?), (?), (?), (?), (?), (?), (?));`;

    while (true) {
      const line = reader.readline();
      if (line === null) break;
      else {
        user = JSON.parse(line);
        user['tags'] = [...new Set(user['tags'])];
        const indicator = Math.floor(
          ((0.7 * user.credit) / 850 + (0.3 * user.balance) / 15000) * 100
        );
        user['indicator'] = indicator;
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
        tags,
        indicator
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
          JSON.stringify(tags),
          indicator
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

const getAll = (db, query, params) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, function(error, rows) {
      if (error) reject(error.message);
      else resolve(rows);
    });
  });
};

// server setup
const app = express();

app.get('/api/cards', (req, res) => {
  const users = load();
  res.json(users);
});

app.get('/api/analysis', (req, res) => {
  let charts = [];
  let tableRows = [];
  let data = [];

  const db = openDB();
  db.serialize(async () => {
    load();
    let searchQuery = `SELECT * FROM users WHERE indicator >= (?) AND indicator <= (?);`;

    for (let i = 1; i <= 10; i++) {
      data = await getAll(db, searchQuery, [10 * i - 9, 10 * i]);
      let meanCredit = 0;
      let meanBalance = 0;
      data.map(user => {
        if (user.credit) meanCredit += user.credit;
        if (user.balance) meanBalance += Number(user.balance);
      });
      if (data.length > 0) {
        meanCredit = meanCredit / data.length;
        meanBalance = (meanBalance / data.length).toFixed(2);
      }

      const row = `<tr>
                    <td>${10 * i - 9}-${10 * i}</td>
                    <td>${data.length}</td> 
                    <td>${Math.round(meanCredit)}</td>
                    <td>$${meanBalance}</td>
                  </tr>`;
      tableRows.push(row);
    }

    let table1 = `<h2>Indicator Statistics</h2>
                  <table>
                    <tr>
                      <th>Indicator Range</th>
                      <th>Amount of Users</th>
                      <th>Mean Credit</th>
                      <th>Mean Balance</th>
                    </tr>
                    ${tableRows.join('')}
                  </table>`;
    charts.push(table1);
    res.json(charts);
  });
});

app.listen(5000, () => {
  console.log('express server Listening on port 5000');
});
