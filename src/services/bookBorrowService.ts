// services/bookBorrowService.ts

import BookModel from '../../models/bookModel';
import BookBorrowModel from '../../models/bookBorrowModel';

class BookBorrowService {
    static async borrowBook(bookId: number, userId: number) {
        try {
            // Kitap ödünç alma işlemi
            const borrowInfo = {
                borrowDate: new Date(),
                // Diğer borrowBook model alanları buraya eklenebilir.
            };

            const borrowedBook = await BookModel.findByPk(bookId);

            if (!borrowedBook) {
                throw new Error('Book not found');
            }

            await borrowedBook.update({ borrowedBy: userId });

            await BookBorrowModel.create({
                ...borrowInfo,
                userId,
                bookId,
                // Diğer borrowBook model alanları buraya eklenebilir.
            });

            return borrowedBook;
        } catch (error) {
            console.error(error);
            throw new Error('Error borrowing book');
        }
    }

    static async returnAndRateBook(bookId: number, userId: number, rating: number) {
        try {
            // Kitap teslim etme ve değerlendirme işlemi
            const returnedBook = await BookModel.findOne({
                where: { id: bookId, borrowedBy: userId },
            });

            if (!returnedBook) {
                throw new Error('Book not found or not borrowed by the user');
            }

            await returnedBook.update({ borrowedBy: null, rating });

            const borrowInfo = {
                returnDate: new Date(),
                rating,
                // Diğer borrowBook model alanları buraya eklenebilir.
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
