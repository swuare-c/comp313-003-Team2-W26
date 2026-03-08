import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/firebase/config.js";
import { useEffect, useState } from "react";

export default function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    return user;
}