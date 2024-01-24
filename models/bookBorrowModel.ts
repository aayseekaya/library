import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import BookModel from './bookModel';
import UserModel from './userModel';

class BookBorrow extends Model {
    public borrowDate!: Date;
    public returnDate!: Date;
    public score!: number;
    public userId!: number;
    public bookId!: number;
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
        tableName: 'book_borrows',
        schema: 'public',
    }
);

BookBorrow.belongsTo(BookModel, { foreignKey: 'bookId', as: 'book' });
BookBorrow.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });


export default BookBorrow;
