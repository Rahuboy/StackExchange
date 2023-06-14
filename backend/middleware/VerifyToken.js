import jwt from "jsonwebtoken";
 
export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if(token){
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if(err){
                console.log(err.message);
                // res.redirect('/signin');
                return res.sendStatus(401);
            } else {
                console.log(decodedToken);
                next();
            }
        }); 
    } else {
        // res.redirect('/signin');
        return res.sendStatus(401);
    }
};