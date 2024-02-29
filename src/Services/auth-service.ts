import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseAuth } from "../firebase-config";

class AuthService {

    async login(emailInput: string, passwordInput: string) {

        try {
            const userCredentials = await signInWithEmailAndPassword(firebaseAuth, emailInput, passwordInput);

            console.log(userCredentials.user);

        } catch (error) {
            console.error(error);
        }
    };

    async logout() {

        try {
            await signOut(firebaseAuth);
        } catch (error) {
            console.error(error);
        };
    };

    async signin(emailInpurt: string, passwordInput: string) {

        try {

            const userCredentials = await createUserWithEmailAndPassword(firebaseAuth, emailInpurt, passwordInput);

            console.log(userCredentials.user);

        } catch (error) {
            console.error(error);
        }

    };
};

const authService = new AuthService();
export default authService;