import { auth } from "../config/firebase.js"

const verifyToken = async (req, res, next) => {
    try{
        const token = req.headers.authorization?.split("Bearer ")[1];

        if(!token) {
            return res.status(401).json({ error: "Unauthorized"});
        }

        const decodedToken = await auth.verifyIdToken(token);

        req.user = decodedToken;

        next();
        
    } catch (error) {
        res.status(401).json({ error: "Invalid Token"});
    }
}

export default verifyToken;