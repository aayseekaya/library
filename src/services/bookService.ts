import BookModel from '../../models/bookModel';

class BookService {
    async getAllBooks() {
        try {
            const books = await BookModel.findAll();
            return books;
        } catch (error) {
            console.error(error);
            throw new Error('Error fetching books');
        }
    }

    async getBookById(bookId: number) {
        try {
            const book = await BookModel.findByPk(bookId);
            if (!book) {
                throw new Error('Book not found');
            }
            return book;
        } catch (error) {
            console.error(error);
            throw new Error('Error fetching book');
        }
    }

    async createBook(bookData: any) {
        try {
            const newBook = await BookModel.create(bookData);
            return newBook;
        } catch (error) {
            console.error(error);
            throw new Error('Error creating book');
        }
    }

    async deleteBook(bookId: number) {
        try {
            const deletedBookCount = await BookModel.destroy({ where: { id: bookId } });
            if (deletedBookCount === 0) {
                throw new Error('Book not found for deletion');
            }
        } catch (error) {
            console.error(error);
            throw new Error('Error deleting book');
        }
    }
}

export default BookService;
