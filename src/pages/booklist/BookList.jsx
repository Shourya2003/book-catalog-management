import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import style from "./BookList.module.css";

const BookList = () => {
  const [allUsers, setAllUsers] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Fetching all users
  useEffect(() => {
    async function getAllUsers() {
      const { data } = await axios.get("http://localhost:5000/users");
      setAllUsers(data);
    }
    getAllUsers();
  }, [toggle]);

  // Function to delete a user
  function handleDelete(id) {
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then(() => {
        toast.success("Book deleted");
        setToggle(!toggle); // Toggles the state to re-fetch all users
      })
      .catch((err) => {
        toast.error("Unable to delete");
        console.log(err);
      });
  }

  // Sorting function
  function handleSort(key) {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  }

  // Sorting logic
  const sortedUsers = allUsers
    ? [...allUsers].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      })
    : [];

  return (
    <div className={style.container}>
      <table className={style.table} border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th onClick={() => handleSort("title")}>TITLE</th>
            <th onClick={() => handleSort("author")}>AUTHOR</th>
            <th onClick={() => handleSort("genre")}>GENRE</th>
            <th onClick={() => handleSort("year")}>YEAR</th>
            <th colSpan={2}>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.title}</td>
              <td>{user.author}</td>
              <td>{user.genre}</td>
              <td>{user.year}</td>
              <td>
                <button>
                  <Link to={`/edit/${user.id}`}>Edit</Link>
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
