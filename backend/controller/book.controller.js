import Books from '../model/book.model.js';

export const handleaddbook = async (req, res) => {
  try {
    const { BookName, BookTitle, Author, SellingPrice, PublishDate } = req.body;

    // Validation
    if (!BookName || !BookTitle || !Author || !SellingPrice || !PublishDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ FIXED HERE
    const bookAdd = new Books({
      BookName,
      BookTitle,
      Author,
      SellingPrice,
      PublishDate
    });

    await bookAdd.save();

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: bookAdd
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error adding book",
      error: error.message
    });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Books.find();

    res.status(200).json({
      success: true,
      message: "Book list retrieved successfully",
      books: books
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const handleBookDelete = async (req, res) => {
  try {
    const { id } = req.params; // ✅ FIX

    const deleted = await Books.findByIdAndDelete(id); // ✅ better method

    res.status(200).json({
      success: true,
      message: "Book deleted successfully"
    });

  } catch (error) {
    console.error("DELETE ERROR:", error); // ✅ debug

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const handleBookUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    const updating = await Books.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updating
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    }); 
  }
}