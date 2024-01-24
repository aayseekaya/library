import BookModel from '../../models/bookModel';
import BookBorrowModel from '../../models/bookBorrowModel';
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
            const borrowRecords = await BookBorrowModel.findAll({
                where: { bookId },
            });

            const scores = borrowRecords.map((record) => record.score);
            const averageScore = scores.length > 0 ? scores.reduce((acc: number, score: number) => acc + score, 0) / scores.length : 0;

            return {
                book: {
                    ...book.toJSON(),
                    averageScore,
                },
            };
        } catch (error) {
            console.error(error);
            throw new Error('Error fetching book details');
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
}

export default BookService;
