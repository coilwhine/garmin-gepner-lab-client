import { DataSnapshot, get, push, ref, remove, set } from "firebase/database";
import { UserModel } from "../Models/user-modal";
import { firebaseDB } from "../firebase-config";

class UsersService {

    async getUserByEmail(email: string): Promise<UserModel | null> {

        const usersRef = ref(firebaseDB, 'users');

        try {
            const usersSnapshot = await get(usersRef);

            if (usersSnapshot.exists()) {

                usersSnapshot.forEach((childSnapshot: DataSnapshot) => {
                    const user = childSnapshot.val();
                    if (user.email === email) {
                        user.key = childSnapshot.key;
                        console.log(user);
                        return user;
                    }
                });

                return null;

            } else {
                console.log("No user found in the database.");
                return null;
            }

        } catch (error) {
            console.error("Error getting user by email:", error);
            throw error;
        }
    }

    async getUsersByEmail(email: string): Promise<UserModel[] | null> {

        const usersRef = ref(firebaseDB, 'users');

        try {
            const usersSnapshot = await get(usersRef);

            if (usersSnapshot.exists()) {
                let userFound = false;
                const usersList: UserModel[] = [];

                usersSnapshot.forEach((childSnapshot: DataSnapshot) => {
                    const user = childSnapshot.val();
                    if (user.email === email) {
                        userFound = true;
                        user.key = childSnapshot.key;
                        usersList.push(user);
                    }
                });
                if (userFound) {
                    console.log(usersList);
                    return usersList;
                } else {
                    console.log("No user found with the specified email.");
                    return null;
                }

            } else {
                console.log("No users found in the database.");
                return null;
            }
        } catch (error) {
            console.error("Error getting user by email:", error);
            throw error;
        }
    }

    async addNewUser(newUserData: UserModel): Promise<void> {

        const dataRef = ref(firebaseDB, 'users/');
        const newUserRef = push(dataRef);
        try {
            await set(newUserRef, {
                email: newUserData.email,
                password: newUserData.password
            })

            console.log("Data added successfully with key:", newUserRef.key);
            return;

        } catch (error) {
            console.error("Error adding data:", error);
            throw error;
        };
    }

    async deleteUserById(userId: string): Promise<void> {
        const dataRef = ref(firebaseDB, `users/${userId}`);

        try {
            await remove(dataRef);
            console.log("Data deleted successfully!");
            return;

        } catch (error) {
            console.error("Error deleting data: ", error);
        };
    }

}

const usersService = new UsersService();
export default usersService;