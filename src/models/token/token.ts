import jwt from 'jsonwebtoken';



export const token = jwt.sign({}, "averycryptictoken", { expiresIn: "1h" }) 
