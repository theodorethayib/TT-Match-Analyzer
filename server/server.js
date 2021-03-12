const express = require("express");
const cors = require("cors");
const { debug } = require("nodemon");
const path = require("path");
const morgan = require("morgan");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();

// const router = express.Router();
app.use(cors());
app.use(morgan("common"));
app.use("/Videos", express.static(path.join(__dirname + "/Videos")));
app.use(bodyParser.urlencoded({ extended: true }));

let db = new sqlite3.Database("./TT-Match-Analyzer.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database!");
});

const port = 5000;

app.post("/addpoint", (req, res) => {
  res.json(req.body);
  // console.log(req.body);
  // console.log(req.body.score);
  let sql =
    `INSERT INTO Point VALUES (NULL, "` +
    req.body.game_id +
    `", "` +
    req.body.timestamp +
    `", "` +
    req.body.score +
    `", "` +
    req.body.win_loss +
    `", "` +
    req.body.server +
    `", "` +
    req.body.serve_spin +
    `", "` +
    req.body.serve_length +
    `", "` +
    req.body.serve_placement +
    `", "` +
    req.body.opener +
    `", "` +
    req.body.opening_type +
    `", "` +
    req.body.win_by +
    `", "` +
    req.body.good_point +
    `", "` +
    req.body.notes +
    `")`;
  console.log(sql);
  db.run(sql, (err) => {
    if (err) {
      throw err;
    } else {
      console.log("Point has been added");
    }
  });
});

app.post("/addgame", (req, res) => {
  res.json(req.body);
  let sql =
    `INSERT INTO Game VALUES (NULL, ` +
    req.body.match_id +
    `, "` +
    req.body.win_loss +
    `", "` +
    req.body.game_score +
    `", "` +
    req.body.game_url +
    `", "` +
    req.body.good_game +
    `", "` +
    req.body.game_start_time +
    `")`;
  console.log(sql);
  db.run(sql, (err) => {
    if (err) {
      throw err;
    } else {
      console.log("Game has been added");
    }
  });
});

app.post("/editpoint", (req, res) => {
  res.json(req.body);
  let sql =
    `UPDATE Point SET game_id = ` +
    req.body.game_id +
    `, timestamp = "` +
    req.body.timestamp +
    `", score = "` +
    req.body.score +
    `", win_loss = "` +
    req.body.win_loss +
    `", server = "` +
    req.body.server +
    `", serve_spin = "` +
    req.body.serve_spin +
    `", serve_length = "` +
    req.body.serve_length +
    `", serve_placement = "` +
    req.body.serve_placement +
    `", opener = "` +
    req.body.opener +
    `", opening_type = "` +
    req.body.opening_type +
    `", win_by = "` +
    req.body.win_by +
    `", good_point = "` +
    req.body.good_point +
    `", notes = "` +
    req.body.notes +
    `" WHERE point_id = ` +
    req.body.point_id;
  db.run(sql, (err) => {
    if (err) {
      throw err;
    } else {
      console.log("Game has been added");
    }
  });
});

app.post("/addmatch", (req, res) => {
  res.json(req.body);
  let sql =
    `INSERT INTO Match VALUES (NULL, "` +
    req.body.date +
    `", "` +
    req.body.opponent_name +
    `", "` +
    req.body.win_loss +
    `", "` +
    req.body.match_score +
    `", "` +
    req.body.best_of +
    `", "` +
    req.body.good_match +
    `")`;
  console.log(sql);
  db.run(sql, (err) => {
    if (err) {
      throw err;
    } else {
      console.log("Match has been added");
    }
  });
});

app.post("/deletepoint", (req, res) => {
  res.json(req.body);
  let sql = `DELETE FROM Point WHERE point_id=` + req.body.point_id;
  db.run(sql, (err) => {
    if (err) {
      throw err;
    } else {
      console.log("Point has been deleted");
    }
  });
});

app.post("/adddate", (req, res) => {
  res.json(req.body);
  let sql = `INSERT INTO Date VALUES (NULL, "` + req.body.date + `")`;
  db.run(sql, (err) => {
    if (err) {
      throw err;
    } else {
      console.log("Date has been added");
    }
  });
});

app.get("/", (req, res) => {
  res.status(200).json({ test: "TEST" });
});

app.get("/dates", (req, res) => {
  let sql = `SELECT date Dates FROM Date`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

app.get("/allopponents", (req, res) => {
  let sql = `SELECT * FROM Opponent`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

// app.get("/matches/:date", (req, res) => {
//     let sql1 = `SELECT * FROM Match WHERE date_id = ` + req.params.date;
//     db.all(sql1, [], (err, rows) => {
//         if (err) {
//             throw err;
//         } else {
//             console.log(rows);
//             // let sql2
//             res.json(rows);
//         }
//     });
// })

app.get("/matches/:date", (req, res) => {
  let sql1 = `SELECT * FROM Match WHERE date = '` + req.params.date + `'`;
  console.log(req.params.date);
  // let sql1 = `SELECT * FROM Date WHERE date = '` + req.params.date + `'`;
  db.all(sql1, [], (err, rows) => {
    if (err) {
      throw err;
    } else {
      console.log(rows);
      // let sql2
      res.json(rows);
    }
  });
});

app.get("/games/:match", (req, res) => {
  let sql = `SELECT * FROM Game WHERE match_id = ` + req.params.match;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

app.get("/points/:game", (req, res) => {
  let sql = `SELECT * FROM Point WHERE game_id = ` + req.params.game;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

app.get("/servespin", (req, res) => {
  let sql = `SELECT serve_spin FROM ServeSpin`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

app.get("/servelength", (req, res) => {
  let sql = `SELECT serve_length FROM ServeLength`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

app.get("/openingtype", (req, res) => {
  let sql = `SELECT opening_type FROM OpeningType`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

app.get("/winby", (req, res) => {
  let sql = `SELECT win_by FROM WinBy`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

app.get("/serveplacement", (req, res) => {
  let sql = `SELECT serve_placement FROM ServePlacement`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

app.get("/opponents", (req, res) => {
  let sql = `SELECT opponent_name FROM Opponent`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on http:localhost:${port}`);
});
