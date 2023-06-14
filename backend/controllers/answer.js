import { Sequelize, where } from "sequelize";
import { Post, User, Vote } from "../models.js";
import { getVoteStatus } from "./post.js";


export const getAnswerByQuestionId = async (req, res) => {
    try {
        let question_id = req.params.question_id; // Expects "question_id" in params of request
        let user_id = req.params.user_id;
        let sort_by = req.query.sort_by;

        if (sort_by == null || sort_by == "undefined" || sort_by == NaN) {
            sort_by = "score";
        }
        console.log("h1")
        const post = await Post.findAll({ // Finds all posts with parent_id = question_id
            where: {
                parent_id: question_id,
                post_type_id: 2
            },
            order: [
                [sort_by, 'DESC']
            ]
        });
        console.log("3")
        let x={};
        x.p = post.map((a)=>{
            return a.get()
        });
        let vote_status = [];

        for (let i = 0; i< post.length; i++) {
            let vote_s = await getVoteStatus(post[i].id, user_id);
            // console.log(post[i])
            // post[i].vote_status = vote_s;
            vote_status.push(vote_s);
        }
        x.vote_status = vote_status;
        // console.log("abdcd")
        // console.log(x)
        // res.status(200).json(post); // Returns posts
        res.status(200).json(x); // Returns posts

    } catch (error) {
        res.status(500).json(error); // Returns error
    }
};


export const getAnswerByUserId = async (req, res) => {
    try {
        let user_id = req.params.user_id; // Expects "user_id" in params of request
        let sort_by = req.query.sort_by;
        let count = Number(req.query.limit);

        if (sort_by == null || sort_by == "undefined" || sort_by == NaN) {
            sort_by = "creation_date";
        }

        if (req.query.limit == null || req.query.limit == "undefined" || req.query.limit === NaN) {
            count = 100;
        }

        const post = await Post.findAll({ // Finds all posts with owner_user_id = user_id
            where: {
                owner_user_id: user_id,
                post_type_id: 2
            },
            order: [
                [sort_by, 'DESC']
            ],
            limit: count
        });

        res.status(200).json(post); // Returns posts
    } catch (error) {
        res.status(500).json(error); // Returns error
    }
};



// Function answers question
export const answerQuestion = async (req, res) => {
    try {
        let post_id = req.params.post_id;  // Expects "post_id" in body of request (post_id of question)
        let user_id = req.body.user_id;  // Expects "user_id" in body of request (user_id of answerer)
        let answer = req.body.answer;  // Expects "answer" in body of request (body of answer to question)

        const post = await Post.findOne({ // Checks if post exists
            where: {
                id: post_id,
                post_type_id: 1
            }
        });

        if (post) {
            const  user = await User.findOne({   // Get user info of answerer
                where: {
                    id: user_id,
                }
            });

            const postUpdate = await Post.update({ // Updates post (increments answer_count and updates last_activity_date)
                last_activity_date: new Date(),
                answer_count: Sequelize.literal('answer_count + 1')
            }, {
                where: {
                    id: post_id
                }
            });

            const newPost = await Post.create({ // Creates new post (answer post has post_type_id = 2)
                id: null, // ID is auto-incremented
                post_type_id: 2,
                parent_id: post_id,
                owner_user_id: user_id,
                owner_display_name: user.display_name,
                score: 0,
                view_count: 0,
                comment_count: 0,
                answer_count: null,
                body: answer,
                content_license: "CC BY-SA 2.5",
                creation_date: new Date(),
                last_activity_date: new Date(),
                last_edit_date: new Date(),
                last_editor_user_id: user_id,
                last_editor_display_name: user.display_name,
                community_owned_date: null,
                closed_date: null,
                title: null,
                tags: null,
                favorite_count: null,
                accepted_answer_id: null
            });

            res.status(200).json("Created answer");
        } else {
            res.status(404).json("Post not found");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};


// upvote answer will also add to the upvote count of the upvoter, and increase reputation of owner of answer by 10
export const upvoteAnswer = async (req, res) => {
    try {
        let post_id = req.params.post_id; // Expects "post_id" in body of request (post_id of answer)
        let user_id = req.body.user_id; // Expects "user_id" in body of request (user_id of upvoter)

        const post = await Post.findOne({ // Find post
            where: {
                id: post_id 
            }
        });

        const owner = await User.findOne({ // Find owner of post
            where: {
                id: post.owner_user_id
            }
        });

        const user = await User.findOne({ // Find user
            where: {
                id: user_id
            }
        })

        if (post && owner) { // If both post and owner exist
            const vote = await Vote.create({ // Create a vote
                id: null, //ID is auto-incremented
                post_id: post_id,
                user_id: user_id,
                vote_type_id: 2, // Upvote
                bounty_amount: null,
                creation_date: new Date()
            });

            const nuserU = await User.update({ // Update owner's reputation
                reputation: owner.reputation + 10,
            }, {
                where: {
                    id: owner.id
                }
            });

            const nuserU2 = await User.update({ // Update user's upvote count
                up_votes: user.up_votes + 1
            }, {
                where: {
                    id: user.id
                }
            });

            const nPostU = await Post.update({ // Update post's score
                score: post.score + 1,
                last_activity_date: new Date()
            }, {
                where: {
                    id: post.id
                }
            });

            res.status(200).json("Upvote Answer");
        } else {
            res.status(404).json("Post or owner not found");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};


// downvote answer will also add to the downvote count of the downvoter, and decrease reputation of owner of answer by 2. It also decreases the reputation of the downvoter by 1
export const downvoteAnswer = async (req, res) => {
    try {
        let post_id = req.params.post_id; // Expects "post_id" in body of request (post_id of answer)
        let user_id = req.body.user_id; // Expects "user_id" in body of request (user_id of downvoter)

        const post = await Post.findOne({ // Find post
            where: {
                id: post_id
            }
        });

        const owner = await User.findOne({ // Find owner of post
            where: {
                id: post.owner_user_id
            }
        });

        const user = await User.findOne({ // Find user
            where: {
                id: user_id
            }
        })


        if (post && owner) { // If both post and owner exist
            const vote = await Vote.create({ // Create a vote
                id: null, //ID is auto-incremented
                post_id: post_id,
                user_id: user_id,
                vote_type_id: 3, // 3 is downvote
                bounty_amount: null,
                creation_date: new Date()
            });

            const nuserU = await User.update({ // Update owner's reputation
                reputation: owner.reputation - 2, 
            }, {
                where: {
                    id: owner.id
                }
            });
 
            const nuserU2 = await User.update({ // Update user's downvote count and decrease reputation by 1
                down_votes: user.down_votes + 1,
                reputation: user.reputation - 1
            }, {
                where: {
                    id: user.id
                }
            });

            const nPostU = await Post.update({ // Update post's score
                score: post.score - 1,
                last_activity_date: new Date()
            }, {
                where: {
                    id: post.id
                }
            });

            res.status(200).json("answer downvoted");
        } else {
            res.status(404).json("Post not found");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};


