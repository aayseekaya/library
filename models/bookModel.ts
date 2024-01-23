import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class Book extends Model {
    public id!: number;
    public name!: string;
}

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    },
    {
        sequelize,
        tableName: 'books',
        modelName: 'Book',
        schema: 'public',
    }
);

export default Book;
