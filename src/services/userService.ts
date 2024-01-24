import UserModel from '../../models/userModel';
import BookBorrowModel from '../../models/bookBorrowModel';
import BookModel from '../../models/bookModel';
import { Op } from 'sequelize';

class UserService {
    async getAllUsers() {
        try {
            const users = await UserModel.findAll();
            return users;
        } catch (error) {
            console.error(error);
            throw new Error('Error fetching users');
        }
    }

    async getUserById(userId: number) {
        try {
            const user = await UserModel.findByPk(userId);
            if (!user) {
                throw new Error('User not found');
            }

            const currentBorrows = await BookBorrowModel.findAll({
                where: {
                    userId: userId,
                    returnDate: null,
                },
                include: [{
                    model: BookModel,
                    as: 'book',
                }],
            });

            const pastBorrows = await BookBorrowModel.findAll({
                where: {
                    userId: userId,
                    returnDate: {
                        [Op.ne]: null,
                    },
                },
                include: [{
                    model: BookModel,
                    as: 'book',
                }],
            });

            return {
                user,
                currentBorrows,
                pastBorrows,
            };
        } catch (error) {
            console.error(error);
            throw new Error('Error fetching user details');
        }
    }

    async createUser(userData: any) {
        try {
            const newUser = await UserModel.create(userData);
            return newUser;
        } catch (error) {
            console.error(error);
            throw new Error('Error creating user');
        }
    }
}

export default UserService;
