import React, { useEffect, useState } from 'react';
import './home.css';
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

// ✅ LIVE BACKEND URL
const API = "https://own-web-axon.onrender.com/api/books";

const Home = () => {

  const [books, setBooks] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editId, setEditId] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  // ✅ ADD / UPDATE
  const onSubmit = async (formData) => {
    try {

      if (isUpdating) {
        const response = await axios.put(
          `${API}/updatebook/${editId}`,
          formData
        );

        if (response.data.success) {
          toast.success("Book updated successfully ✅");
        } else {
          toast.error("Update failed ❌");
        }

        setIsUpdating(false);
        setEditId(null);

      } else {
        const response = await axios.post(
          `${API}/addbook`,
          formData
        );

        if (response.data.success) {
          toast.success("Book added successfully ✅");
        } else {
          toast.error("Add failed ❌");
        }
      }

      reset();
      getAllbooklist();

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong ❌");
    }
  };

  // ✅ GET ALL BOOKS
  const getAllbooklist = async () => {
    try {
      const response = await axios.get(`${API}/booklists`);
      setBooks(response.data.books || []);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API}/deletebook/${id}`);

      if (response.data.success) {
        toast.success("Book deleted successfully ✅");
        getAllbooklist();
      } else {
        toast.error("Failed to delete ❌");
      }

    } catch (error) {
      console.error(error);
      toast.error("Error deleting ❌");
    }
  };

  // ✅ EDIT
  const handleUpdate = (book) => {
    setIsUpdating(true);
    setEditId(book._id);

    reset({
      BookName: book.BookName || "",
      BookTitle: book.BookTitle || "",
      Author: book.Author || "",
      SellingPrice: book.SellingPrice || "",
      PublishDate: book.PublishDate
        ? new Date(book.PublishDate).toISOString().split("T")[0]
        : ""
    });
  };

  useEffect(() => {
    getAllbooklist();
  }, []);

  return (
    <div className='shivm'>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="home-wrapper">
          <h1 className="title">📚 Book Details</h1>

          <div className="grid-container">

            <div className="field">
              <span>Book Name</span>
              <input {...register("BookName", { required: "Required" })} />
              {errors.BookName && <p>{errors.BookName.message}</p>}
            </div>

            <div className="field">
              <span>Book Title</span>
              <input {...register("BookTitle", { required: "Required" })} />
              {errors.BookTitle && <p>{errors.BookTitle.message}</p>}
            </div>

            <div className="field">
              <span>Author</span>
              <input {...register("Author", { required: "Required" })} />
              {errors.Author && <p>{errors.Author.message}</p>}
            </div>

            <div className="field">
              <span>Price</span>
              <input type="number" {...register("SellingPrice", { required: "Required" })} />
              {errors.SellingPrice && <p>{errors.SellingPrice.message}</p>}
            </div>

            <div className="field">
              <span>Publish Date</span>
              <input type="date" {...register("PublishDate", { required: "Required" })} />
              {errors.PublishDate && <p>{errors.PublishDate.message}</p>}
            </div>

          </div>

          <button type="submit" className="save-btn">
            {isUpdating ? "Update Book" : "Save Book"}
          </button>
        </div>
      </form>

      <div className="table-wrapper">
        <h2>📖 Book List</h2>

        <table className="book-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {books.length > 0 ? books.map((book, index) => (
              <tr key={book._id}>
                <td>{index + 1}</td>
                <td>{book.BookName}</td>
                <td>{book.BookTitle}</td>
                <td>{book.Author}</td>
                <td>₹{book.SellingPrice}</td>
                <td>{new Date(book.PublishDate).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleUpdate(book)}>Edit</button>
                  <button onClick={() => handleDelete(book._id)}>Delete</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="7">No books found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;