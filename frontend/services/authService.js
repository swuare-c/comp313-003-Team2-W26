import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../src/firebase/config.js";

export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        return userCredential.user;
    } catch (error) {
        throw error.message;
    }
};