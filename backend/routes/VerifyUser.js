import Jwt, { decode } from "jsonwebtoken";



const verifyUser = (req, res, next) => {
    const token = req.session.token;

    if (!token) {
        return res.status(401).json({ Error: 'You are not authenticated' });
    } else {
        Jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
            if (err) {
                return res.status(401).json({ Error: 'Token is not valid' });
            } else {
                req.userId = decoded.id;
                req.name = decoded.name;

                next();
            }
        });
    }
};


export default verifyUser;
