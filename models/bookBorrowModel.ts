// models/bookBorrowModel.ts

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class BookBorrow extends Model {
    public borrowDate!: Date;
    public returnDate!: Date;
    public score!: number;
    public userId!: number;
    public bookId!: number;

    static associate(models: any) {
        // BookBorrow modeli, Users ve Books modelleriyle ilişkilidir.
        BookBorrow.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        BookBorrow.belongsTo(models.Book, { foreignKey: 'bookId', as: 'book' });
    }
}

BookBorrow.init(
    {
        borrowDate: {
            type: DataTypes.DATE,
        },
        returnDate: {
            type: DataTypes.DATE,
        },
        score: {
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'BookBorrow',
        tableName: 'book_borrows', // Veritabanında kullanılacak tablo adı
        schema: 'public', // Şema adı
    }
);

export default BookBorrow;
