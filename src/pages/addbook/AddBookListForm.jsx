import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import style from "./AddBookList.module.css"

const AddBookListForm = () => {
  let navigate = useNavigate()
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
  });

  function handleChange(e) {
    let { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  }

   async function handleSubmit(e) {
    e.preventDefault();
    console.log(bookData)

     axios.post(`http://localhost:5000/users`, bookData);
     console.log("data sent successfully");
     toast.success("Book Listed");
     navigate("/booklist");

  }

  return (
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            value={bookData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="author"
            placeholder="Enter Author"
            value={bookData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="genre"
            placeholder="Enter Genre"
            value={bookData.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="year"
            placeholder="Enter Year"
            value={bookData.year}
            onChange={handleChange}
            required
          />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};

export default AddBookListForm;
