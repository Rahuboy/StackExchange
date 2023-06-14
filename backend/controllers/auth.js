import { where } from "sequelize";
import { Credential, User } from "../models.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


// Function takes user_id and password, and checks if present in 'credentials' database
// export const authenticateUser = async (user_id, password) => {
//     try {
//         let res = await Credential.findOne({ // Find user_id and password in 'credentials' database
//             where: {
//                 user_name: user_id,
//                 password: password
//             }
//         });

//         if (res) { // If user_id and password are present in 'credentials' database, return true
//             return true;
//         } else {
//             return false; // Else return false
//         }
//     } catch (error) {
//         return false;
//     }
// };



export const Signin = async(req, res) => {
    try {
        const cred = await Credential.findAll({
            where:{
                user_name: req.body.user_name
            }
        });

        const user = await User.findOne({
            where:{
                id: cred[0].id
            }
        });

        let credDate = user.creation_date;
        credDate = credDate.toString();
        credDate = credDate.split(" ");
        credDate = credDate[3];

        const date = new Date();
        const year = '2023'

        if (credDate >= year) {
            const match = await bcrypt.compare(req.body.password, cred[0].password);

            if(!match) return res.status(400).json({msg: "Wrong Password"});

            const userId = user.id;
            const name = user.display_name;
            const accessToken = jwt.sign({userId, name}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '1d'
            });
            await Credential.update({access_token: accessToken},{
                where:{
                    id: userId
                }
            });
            res.cookie('accessToken', accessToken,{
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            res.json("User successfully logged in");
        } else {
            const match = (cred[0].password === req.body.password);

            if (!match) {
                return res.status(400).json({msg: "Wrong Password"});
            }

            const userId = user.id;
            const name = user.display_name;
            const accessToken = jwt.sign({userId, name}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '1d'
            });
            await Credential.update({access_token: accessToken},{
                where:{
                    id: userId
                }
            });
            res.cookie('accessToken', accessToken,{
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            res.json("User successfully logged in");
        }   
    } catch (error) {
        res.status(404).json({msg:"Unable to log in"});
    }
};



export const Signout = async(req, res) => {
    const accessToken = req.cookies.accessToken;
    if(!accessToken) return res.sendStatus(204);
    const cred = await Credential.findAll({
        where:{
            access_token: accessToken
        }
    });
    if(!cred[0]) return res.sendStatus(204);
    const userId = cred[0].id;
    await Credential.update({access_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('accessToken');
    return res.sendStatus(200);
};


export const Me = async(req, res) => {
    const accessToken = req.cookies.accessToken;
    if(!accessToken) return res.sendStatus(401);
    const cred = await Credential.findAll({
        where:{
            access_token: accessToken
        }
    });
    if(!cred[0]) return res.sendStatus(401);
    const user = await User.findOne({
        where:{
            id: cred[0].id
        }
    });
    return res.json(user);
}