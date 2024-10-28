import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddBookListForm from "./pages/addbook/AddBookListForm";
// import BookList from "./pages/booklist/BookList";
import EditBookForm from "./pages/edit/EditBookForm";
import Navbar from "./component/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/notfound/NotFound";
const BookList = lazy(() => import("./pages/booklist/BookList"));

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<AddBookListForm />}></Route>
          <Route path="/booklist" element={<BookList />}></Route>
          <Route path="/edit/:id" element={<EditBookForm />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
