import UserModel from '../../models/userModel';

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
            return user;
        } catch (error) {
            console.error(error);
            throw new Error('Error fetching user');
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
