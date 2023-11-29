import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title_book: "",
    desc_book: "",
    price_book: null,
    img_book: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/books/" + bookId, book);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form">
      <h1>Update book</h1>
      <input
        type="text"
        placeholder="title"
        name="title_book"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="description"
        name="desc_book"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="price"
        name="price_book"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="cover"
        name="img_book"
        onChange={handleChange}
      />
      <button onClick={handleClick}>UPDATE</button>
    </div>
  );
};

export default Update;
