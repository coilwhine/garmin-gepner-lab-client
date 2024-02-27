import { DataSnapshot, get, getDatabase, push, ref, remove, set } from "firebase/database";
import { UserModel } from "../Models/user-modal";
import firebaseApp from "../firebase-config";

class DatabaseService {

    async getUsersByFirstName(firstName: string): Promise<UserModel[] | null> {
        const db = getDatabase(firebaseApp);
        const usersRef = ref(db, 'users');

        try {
            const usersSnapshot = await get(usersRef);

            if (usersSnapshot.exists()) {
                let userFound = false;
                const usersList: UserModel[] = [];

                usersSnapshot.forEach((childSnapshot: DataSnapshot) => {
                    const user = childSnapshot.val();
                    if (user.firstName === firstName) {
                        userFound = true;
                        usersList.push(user);
                    }
                });
                if (userFound) {
                    console.log(usersList);
                    return usersList;
                } else {
                    console.log("No user found with the specified first name.");
                    return null;
                }

            } else {
                console.log("No users found in the database.");
                return null;
            }
        } catch (error) {
            console.error("Error getting user by first name:", error);
            throw error;
        }
    }

    async addNewUser(newUserData: UserModel) {

        const db = getDatabase(firebaseApp);
        const dataRef = ref(db, 'users/');
        const newUserRef = push(dataRef);
        try {
            const result = await set(newUserRef, {
                firstName: newUserData.firstName,
                lastName: newUserData.lastName,
                age: newUserData.age
            })

            console.log("Data added successfully with key:", newUserRef.key);
            return result
        } catch (error) {
            console.error("Error adding data:", error);
            throw error;
        };
    }

    async deleteUserById(userId: string) {
        const db = getDatabase(firebaseApp);
        const dataRef = ref(db, `users/${userId}`);

        try {
            await remove(dataRef);
            console.log("Data deleted successfully!");
        } catch (error) {
            console.error("Error deleting data: ", error);
        };
    }
}

const databaseService = new DatabaseService();
export default databaseService;