import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "14d"
    });
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // in milliseconds
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks // not accesible via javascript only accesible through http
        sameSite: "strict", // CSRF attacks cross-site request frogery attacks
        secure: process.env.NODE_ENV !== "development"
    })
}