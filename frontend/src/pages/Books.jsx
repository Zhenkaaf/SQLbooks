import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        console.log(res);
        setBooks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Books</h1>
      <div className="books">
        {books.map((item) => (
          <div
            className="book"
            key={item.id_book}
          >
            {item.img_book ? (
              <img
                src={item.img_book}
                alt=""
              />
            ) : (
              <img
                src={
                  "https://lavkababuin.com/image/cachewebp/alias/martin-iden-1058484/martin-iden-1058484-main-1000x1000.webp"
                }
                alt=""
              />
            )}
            <h2>{item.title_book}</h2>
            <p>{item.desc_book}</p>
            <span>{item.price_book}</span>
            <button
              className="delete"
              onClick={() => handleDelete(item.id_book)}
            >
              Delete
            </button>
            <button className="update">
              <Link to={`/update/${item.id_book}`}>Update</Link>
            </button>
          </div>
        ))}
      </div>
      <button>
        <Link to="/add">Add new book</Link>
      </button>
    </div>
  );
};

export default Books;
