import { auth } from '../config/firebase.js';

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await auth.createUser({
            email,
            password,
        });

        res.status(201).json({
            message: "User created successfully",
            uid: user.uid
        })
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
}

const loginUser = async (req, res) => {
    res.json({ message: "Login handled via Firebase Auth on frontend"})
}

export {registerUser, loginUser};