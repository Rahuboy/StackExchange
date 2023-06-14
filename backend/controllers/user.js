import { where } from "sequelize";
import { User, Credential } from "../models.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv";

const env = dotenv.config();

// Function gets user by id
export const getUserByID = async (req, res) => {
    try {
        let user_id = req.params.id; // Expects "id" in body of request

        const user = await User.findOne({ // Finds user with id = user_id
            where: {
                id: user_id
            }
        });
        res.status(200).json(user); // Returns user
    } catch (error) {
        res.status(500).json(error); // Returns error
    }
};


// Function gets user by display name
export const getUserByDisplayName = async (req, res) => {
    try {
        let display_name = req.params.display_name; // Expects "display_name" in body of request

        const user = await User.findAll({ // Finds user with display_name = display_name
            where: {
                display_name: display_name
            }
        });

        res.status(200).json(user); // Returns user
    } catch (error) {
        res.status(500).json(error); // Returns error
    }
};


// Function creates a user and updates credentials
export const createUser = async (req, res) => {
    try {
        let display_name = req.body.display_name; // Expects "display_name" in body of request
        let location = req.body.location; // Expects "location" in body of request
        let profile_image_url = req.body.profile_image_url; // Expects "profile_image" in body of request
        let website_url = req.body.website_url; // Expects "website_url" in body of request
        let about_me = req.body.about_me; // Expects "about_me" in body of request
        let user_name = req.body.user_name; // Expects "user_name" in body of request
        let password = req.body.password; // Expects "password" in body of request

        const newUser = await User.create({ // Creates user
            id: null, // id is auto-incremented 
            account_id: null, 
            reputation: 1, // Default reputation is 1
            views: 0, 
            down_votes: 0, 
            up_votes: 0, 
            display_name: display_name, 
            location: location, 
            profile_image_url: profile_image_url, 
            website_url: website_url, 
            about_me: about_me,
            creation_date: new Date(), 
            last_access_date: new Date()
        });

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        const userID = newUser.id

        const accessToken = jwt.sign({userID, display_name}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        console.log("accessToken"+accessToken);

        const newCredential = await Credential.create({ // Creates credential
            id: newUser.id, // id is auto-incremented
            user_name: user_name, 
            password: hashPassword,
            access_token: accessToken
        });
        console.log("newCredential"+newCredential);
        res.cookie('accessToken', accessToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        
        console.log('cookie set');
        res.status(200).json("User created");
    } catch (error) {
        res.status(500).json(error); // Returns error   
    }
};