import express from 'express';
import { handleaddbook, getAllBooks ,handleBookDelete, handleBookUpdate} from '../controller/book.controller.js';

const router = express.Router();

// for adding a book
router.post("/addbook", handleaddbook);
router.delete("/deletebook/:id", handleBookDelete);
router.get("/booklists", getAllBooks)
router.put("/updatebook/:id", handleBookUpdate);
export default router;