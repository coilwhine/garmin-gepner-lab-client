import { getDatabase, push, ref, remove, set } from "firebase/database";
import { UserModel } from "../Models/user-modal";
import firebaseApp from "../firebase-config";

class DatabaseService {

    // getUserByFirstName(firstName: string) {
    //     const db = getDatabase(firebaseApp);
    //     const dataRef = ref(db, 'users/');
    // }

    addNewUser(newUserData: UserModel) {

        const db = getDatabase(firebaseApp);
        const dataRef = ref(db, 'users/');
        const newUserRef = push(dataRef);

        set(newUserRef, {
            firstName: newUserData.firstName,
            lastName: newUserData.lastName,
            age: newUserData.age
        })
            .then(() => {
                console.log("Data added successfully with key:", newUserRef.key);
            })
            .catch((error) => {
                console.error("Error adding data: ", error);
            });
    }

    deleteUserById(userId: string) {
        const db = getDatabase(firebaseApp);
        const dataRef = ref(db, `users/${userId}`);

        remove(dataRef)

            .then(() => {
                console.log("Data deleted successfully!");
            })
            .catch((error) => {
                console.error("Error deleting data: ", error);
            });
    }
}

const databaseService = new DatabaseService();
export default databaseService;