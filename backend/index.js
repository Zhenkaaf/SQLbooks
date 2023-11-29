import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "newLife2022",
  database: "lama",
});
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello from back)");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books_table";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q =
    "INSERT INTO books_table (`title_book`, `desc_book`, `price_book`, `img_book`) VALUES (?)";
  const values = [
    req.body.title_book,
    req.body.desc_book,
    req.body.price_book,
    req.body.cover,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books_table WHERE id_book = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books_table SET `title_book` = ?, `desc_book` = ?, `price_book` = ?, `img_book` = ? WHERE id_book = ?";
  const values = [
    req.body.title_book,
    req.body.desc_book,
    req.body.price_book,
    req.body.cover,
  ];
  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updeted");
  });
});

app.listen(8800, () => {
  console.log("connected to backend");
});

//start---node index.js---npm start
