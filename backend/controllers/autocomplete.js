import { Sequelize, where } from "sequelize";
import { Tag, User } from "../models.js";



// Function autocompletes tag (returns json with tag)
export const AutocompleteTag = async (req, res) => {
    try {
        let tag_name = req.params.tag_name; // Expects "tag_name" in body of request
        let limit_i = req.params.limit; // Expects "limit" in body of request
        // cast limit_i to int
        limit_i = parseInt(limit_i);

        const tag = await Tag.findAll({ // Finds all tags with tag_name in tags (Looks for the tag_name as a substring in tags)
            where: {
                tag_name: {
                    [Sequelize.Op.like]: tag_name + "%" 
                }
            },
            limit: limit_i // Limits the number of tags returned
        });

        res.status(200).json(tag); // Returns tags
    } catch (error) {
        res.status(500).json(error); // Returns error
    }
};


// Function autocompletes user (returns json with user)
export const AutocompleteUser = async (req, res) => {
    try {
        let display_name = req.params.display_name; // Expects "display_name" in body of request
        let limit_i = req.params.limit; // Expects "limit" in body of request
        limit_i = parseInt(limit_i);

        const user = await User.findAll({ // Finds all users with display_name in display_name (Looks for the display_name as a substring in display_name)
            where: {
                display_name: {
                    [Sequelize.Op.like]: display_name + "%"
                }
            },
            limit: limit_i // Limits the number of users returned
        });

        res.status(200).json(user); // Returns users
    } catch (error) {
        res.status(500).json(error); // Returns error
    }
};

export const Autocomplete = async (req, res) => {
    try {
        let search = req.params.search; // Expects "search" in body of request
        let limit_i = req.params.limit; // Expects "limit" in body of request
        limit_i = parseInt(limit_i);

        console.log(search);

        const tag = await Tag.findAll({ // Finds all tags with tag_name in tags (Looks for the tag_name as a substring in tags)
            where: {
                tag_name: {
                    [Sequelize.Op.like]: search + "%" 
                }
            },
            limit: limit_i // Limits the number of tags returned
        });

        const user = await User.findAll({ // Finds all users with display_name in display_name (Looks for the display_name as a substring in display_name)
            where: {
                display_name: {
                    [Sequelize.Op.like]: search + "%"
                }
            },
            limit: limit_i // Limits the number of users returned
        });

        // console.log(tag);
        // console.log(user);
        let result = {
            "tags": tag,
            "users": user
        }
        // console.log(result);
        res.status(200).json(result); // Returns json
    } catch (error) {
        res.status(500).json(error);
    }
};