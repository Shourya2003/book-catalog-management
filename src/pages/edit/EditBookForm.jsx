import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const EditBookForm = () =>  {

  let navigate = useNavigate();
  let { id } = useParams();
  let [user, setUsers] = useState({
    title: "",
    author:"",
    genre:"",
    year:"",
  });

   useEffect(() => {
     async function getEditUser() {
       try {
         let { data } = await axios.get(`http://localhost:5000/users/${id}`);
         setUsers(data);
       } catch {
         console.log(" Wrong");
       }
     }
     getEditUser();
   }, [id]);

   function handleChange(e) {
     let { name, value } = e.target;
     setUsers({ ...user, [name]: value });
   }

   async function handleSubmit(e) {
     e.preventDefault();

     let { data } = await axios.put(`http://localhost:5000/users/${id}`, user);
     setUsers(data);

     toast.success("edited successfully");
     navigate("/booklist");
   }
   return (
     <section>
       <form onSubmit={handleSubmit}>
         <div>
          
           <input
             type="text"
             name="title"
             id="title"
             placeholder="Enter title"
             value={user?.title}
             required
             onChange={handleChange}
           />
         </div>

         <div>
           <input
             type="text"
             name="author"
             id="author"
             placeholder="Enter author"
             value={user?.author}
             required
             onChange={handleChange}
           />
         </div>

         <div >
       
           <input
             type="text"
             name="genre"
             id="genre"
             value={user?.genre}
             placeholder="Enter genre"
             required
             onChange={handleChange}
           />
         </div>
         <div >
       
           <input
             type="text"
             name="year"
             id="year"
             value={user?.year}
             placeholder="Enter year"
             required
             onChange={handleChange}
           />
         </div>

         <div >
           <input type="submit" value="Update" />
         </div>
       </form>
     </section>
   );
}

export default EditBookForm