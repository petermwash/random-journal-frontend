import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config";

export const register = async (email: string, password: string)  => {
    try {
        const userResponse = await createUserWithEmailAndPassword(
          auth, 
          email, 
          password
        );
        const user = userResponse.user

        return user;

    } catch (error) {
        throw error;
    }
}

export const login = async (email: string, password: string)  => {
    try {
        const userResponse = await signInWithEmailAndPassword(
          auth, 
          email, 
          password
        );
        const user = userResponse.user

        return user;

    } catch (error) {
        throw error;
    }
}

