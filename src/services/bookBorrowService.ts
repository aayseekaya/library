import BookModel from '../../models/bookModel';
import BookBorrowModel from '../../models/bookBorrowModel';
import User from "../../models/userModel";

class BookBorrowService {
    static async borrowBook(bookId: number, userId: number) {
        try {

            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error('User not found');
            }

            const borrowedBook = await BookModel.findByPk(bookId);
            if (!borrowedBook) {
                throw new Error('Book not found');
            }

            const existingBorrow = await BookBorrowModel.findOne({
                where: {
                    bookId: bookId,
                    returnDate: null,
                }
            });

            if (existingBorrow) {
                throw new Error('Book is already borrowed by someone else');
            }

            const borrowInfo = {
                borrowDate: new Date(),
                score: null
            };

            await borrowedBook.update({ borrowedBy: userId });

            await BookBorrowModel.create({
                ...borrowInfo,
                userId,
                bookId
            });

            return borrowedBook;
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    static async returnAndRateBook(bookId: number, userId: number, score: number) {
        try {
            const returnedBook = await BookModel.findByPk(bookId);

            if (!returnedBook) {
                throw new Error('Book not found or not borrowed by the user');
            }

            const borrowInfo = {
                returnDate: new Date(),
                score
            };

            await BookBorrowModel.update(
                { ...borrowInfo },
                { where: { bookId, userId, returnDate: null } }
            );

            return returnedBook;
        } catch (error) {
            console.error(error);
            throw new Error('Error returning and rating book');
        }
    }
}

export default BookBorrowService;
