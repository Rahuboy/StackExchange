import { Sequelize, where } from "sequelize";
import { Post, User, Comment, Tag, Vote } from "../models.js";




// Function gets post by post id. Sorts by date or score depending on flags
export const getPostByID = async (req, res) => {
    try {
        let post_id = req.params.post_id; // Expects "post_id" in body of request

        const post = await Post.findOne({ // Finds posts with id = post_id
            where: {
                id: post_id
            }
        });

        res.status(200).json(post); // Returns post
    } catch (error) {
        res.status(500).json(error); // Returns error
    }
};


// Function gets posts by user id. Sorts by date or upvotes depending on flags
export const getPostByUserID = async (req, res) => {
    try {
        let user_id = req.params.user_id; // Expects "user_id" in body of request
        let score_flag = req.query.score_flag; // Expects "score_flag" in body of request
        let date_flag = req.query.date_flag; // Expects "date_flag" in body of request
        let order_list = [];
        let limit_i = Number(req.query.limit)
        if (score_flag == "1") {
            order_list.push(['score', 'DESC']);
        }
        else if (score_flag == "0") {
            order_list.push(['score', 'ASC']);
        }
        if (date_flag == "1") {
            order_list.push(['creation_date', 'DESC']);
        }
        else if (date_flag == "0") {
            order_list.push(['creation_date', 'ASC']);
        }

        console.log("hiiii" + user_id)

        const post = await Post.findAll({ // Finds all posts with owner_user_id = user_id
            where: {
                owner_user_id: user_id 
            },
            order: order_list,
            limit: limit_i
        });

        res.status(200).json(post); // Returns posts
    } catch (error) {
        res.status(500).json(error); // Returns error
    }
};


// Function gets post by tag. Sorts by date or upvotes depending on flags
export const getPostByTag = async (req, res) => {
    try {
        let tag_name = req.query.tag_name; // Expects "tag_name" in body of request
        let score_flag = req.query.score_flag; // Expects "score_flag" in body of request
        let date_flag = req.query.date_flag; // Expects "date_flag" in body of request
        let order_list = [];
        if (score_flag == "1") {
            order_list.push(['score', 'DESC']);
        }
        else if (score_flag == "0") {
            order_list.push(['score', 'ASC']);
        }
        if (date_flag == "1") {
            order_list.push(['creation_date', 'DESC']);
        }
        else if (date_flag == "0") {
            order_list.push(['creation_date', 'ASC']);
        }

        const post = await Post.findAll({ // Finds all posts with tag_name in tags (Looks for the tag_name as a substring in tags)
            where: {
                [Sequelize.Op.and]: [{
                    tags: { [Sequelize.Op.like]: "%" + tag_name + "%" }
                }, {
                    post_type_id: 1
                }]
            },
            order: order_list
        });

        res.status(200).json(post); // Returns posts
    } catch (error) {
        res.status(500).json(error); // Returns error
    }
};



// Function gets post by tags. Sorts by date or upvotes depending on flags
export const getPostByTags = async (req, res) => {
    try {
        let tags = req.query.tags; // Expects "tags" in body of request
        if (typeof(tags) === 'string'){
            tags = Array(tags)
        }
        let score_flag = req.query.score_flag; // Expects "score_flag" in body of request
        let date_flag = req.query.date_flag; // Expects "date_flag" in body of request
        let limit_i = Number(req.query.limit)
        let order_list = [];
        if (score_flag == "1") {
            order_list.push(['score', 'DESC']);
        }
        else if (score_flag == "0") {
            order_list.push(['score', 'ASC']);
        }
        if (date_flag == "1") {
            order_list.push(['creation_date', 'DESC']);
        }
        else if (date_flag == "0") {
            order_list.push(['creation_date', 'ASC']);
        }

        const post = await Post.findAll({ // Finds all posts with tag_name in tags (Looks for the tag_name as a substring in tags)
            where: {
                [Sequelize.Op.and]: [
                    tags.map(tag => {
                        return {
                            tags: {
                                [Sequelize.Op.like]: "%" + tag + "%"
                            }
                        }
                    }), {
                        post_type_id: 1
                    }
                ]
            },
            order: order_list,
            limit: limit_i
        });

        res.status(200).json(post); // Returns posts
    } catch (error) {
        res.status(500).json(error); // Returns error
    }
};


// Edits a post
export const editPost = async (req, res) => {
    try {
        let post_id = req.params.post_id; // Expects "post_id" in body of request
        let title = req.body.title; // Expects "title" in body of request
        let body = req.body.body; // Expects "body" in body of request
        let tags = req.body.tags; // Expects "tags" in body of request
        let user_id = req.body.user_id; // Expects "user_id" in body of request (user_id of editor)

        const post = await Post.findOne({ // Finds post with post_id
            where: {
                id: post_id
            }
        });

        const editor = await User.findOne({ // Finds user with user_id
            where: {
                id: user_id
            }
        });

        if (post && editor) { // If post and editor exist
            const npostU = await Post.update({ // Updates post with new title, body, tags, and last_editor_user_id
                title: title,
                body: body,
                tags: tags,
                last_editor_user_id: user_id,
                last_editor_display_name: editor.display_name,
                last_edit_date: new Date(),
                last_activity_date: new Date()
            }, {
                where: {
                    id: post_id
                    }
            });

            res.status(200).json("Edited post");
        } else { // If post or editor does not exist
            res.status(404).json("Post or editor not found");
        }
    }   catch (error) {
        res.status(500).json(error);
    }
};


// Deletes a post
export const deletePost = async (req, res) => {
    try {
        let post_id = req.params.post_id; // Expects "post_id" in body of request

        const post = await Post.findOne({ // Finds post with post_id
            where: {
                id: post_id
            }
        });

        let tags = post.tags; // Gets tags of post

        if (post) { // If post exists
            const npostD = await Post.destroy({ // Deletes post
                where: {
                    id: post_id
                }
            });

            if (post.post_type_id == 1) { // If post is a question
                const nanswerD = await Post.destroy({ // Deletes all answers to question
                    where: {
                        parent_id: post_id
                    }
                });

                // Updating tag count
                if (tags){
                console.log("heher")
		        let tags_array = tags.split(">");
		        tags_array = tags_array.map(tag => tag.substring(1, tag.length));
		        tags_array.pop();

		        for (let i = 0; i < tags_array.length; i++) { // For each tag in tags_array
		            const tagU = await Tag.update({ // Update tag's count
		                count: Sequelize.literal('count - 1')
		            }, {
		                where: {
		                    tag_name: tags_array[i]
		                }
		            });
		        }
		 }
            }

            // const dCom = await Comment.destroy({ // Deletes all comments to post
            //     where: {
            //         post_id: post_id
            //     }
            // });

            res.status(200).json({"message":"Post deleted"});
        } else { // If post does not exist
            res.status(404).json({"message":"Post not found"});
        }
    }   catch (error) {
        res.status(500).json(error);
    }
}


export const votePost = async (req, res) => {
    try {
        let post_id = req.body.post_id;
        let voter_id = req.body.user_id;
        let vote_type_id = req.body.vote_type_id; // 2 for upvote, 3 for downvote
        const vote = await Vote.findOne({ // Finds vote with post_id and voter_id
            where: {
                post_id: post_id,
                user_id: voter_id
            }
        });

        const post = await Post.findOne({ // Finds post with post_id
            where: {
                id: post_id
            }
        });

        const voter = await User.findOne({ // Finds user with user_id
            where: {
                id: voter_id
            }
        });

        const owner = await User.findOne({ // Finds user with user_id
            where: {
                id: post.owner_user_id
            }
        });

        // let vote_id = vote.id;
        // let old_vote_type_id = vote.vote_type_id;
        if(vote_type_id == 2)  {
            console.log("a1")

            if(vote) {
                let vote_id = vote.id;
                let old_vote_type_id = vote.vote_type_id;   
                const nvoteD = await Vote.destroy({ // Deletes vote
                    where: {
                        id: vote_id
                    }
                });
                if (old_vote_type_id == 2) {
                    const npostU = await Post.update({ // Updates post's score
                        score: Sequelize.literal('score - 1')
                    }, {
                        where: {
                            id: post_id
                        }
                    });
                    const nvoterU = await User.update({ // Updates voter's upvote count
                        up_votes: Sequelize.literal('up_votes - 1')
                    }, {
                        where: {
                            id: voter_id
                        }
                    });
                    const nuserU = await User.update({ // Updates owner's reputation
                        reputation: Sequelize.literal('reputation - 5')
                    }, {
                        where: {
                            id: post.owner_user_id
                        }
                    });
                }
                else if (old_vote_type_id == 3) {
                    const npostU = await Post.update({ // Updates post's score
                        score: Sequelize.literal('score + 1')
                    }, {
                        where: {
                            id: post_id
                        }
                    });
                    const nvoterU = await User.update({ // Updates voter's downvote count
                        down_votes: Sequelize.literal('down_votes - 1')
                    }, {
                        where: {
                            id: voter_id
                        }
                    });
                    const nuserU = await User.update({ // Updates owner's reputation
                        reputation: Sequelize.literal('reputation + 5')
                    }, {
                        where: {
                            id: post.owner_user_id
                        }
                    });
                }
            }
            if (!(vote && vote.vote_type_id == 2)) {
                const nvoteC = await Vote.create({ // Creates vote
                    id: null, // Auto-incremented
                    post_id: post_id,
                    user_id: voter_id,
                    vote_type_id: vote_type_id,
                    bounty_amount: null,
                    creation_date: new Date()
                });
                const npostU2 = await Post.update({ // Updates post's score
                    score: Sequelize.literal('score + 1')
                }, {
                    where: {
                        id: post_id
                    }
                });
                const nvoterU2 = await User.update({ // Updates voter's upvote count
                    up_votes: Sequelize.literal('up_votes + 1')
                }, {
                    where: {
                        id: voter_id
                    }
                });
                const nuserU2 = await User.update({ // Updates owner's reputation
                    reputation: Sequelize.literal('reputation + 5')
                }, {
                    where: {
                        id: post.owner_user_id
                    }
                });
            }
            console.log("a")
        }
        else if(vote_type_id == 3) {
            console.log("b")

            if(vote) {
                let vote_id = vote.id;
                let old_vote_type_id = vote.vote_type_id;
                const nvoteD = await Vote.destroy({ // Deletes vote
                    where: {
                        id: vote_id
                    }
                });
                if (old_vote_type_id == 2) {
                    const npostU = await Post.update({ // Updates post's score
                        score: Sequelize.literal('score - 1')
                    }, {
                        where: {
                            id: post_id
                        }
                    });
                    const nvoterU = await User.update({ // Updates voter's upvote count
                        up_votes: Sequelize.literal('up_votes - 1')
                    }, {
                        where: {
                            id: voter_id
                        }
                    });
                    const nuserU = await User.update({ // Updates owner's reputation
                        reputation: Sequelize.literal('reputation - 5')
                    }, {
                        where: {
                            id: post.owner_user_id
                        }
                    });
                }
                else if (old_vote_type_id == 3) {
                    const npostU = await Post.update({ // Updates post's score
                        score: Sequelize.literal('score + 1')
                    }, {
                        where: {
                            id: post_id
                        }
                    });
                    const nvoterU = await User.update({ // Updates voter's downvote count
                        down_votes: Sequelize.literal('down_votes - 1')
                    }, {
                        where: {
                            id: voter_id
                        }
                    });
                    const nuserU = await User.update({ // Updates owner's reputation
                        reputation: Sequelize.literal('reputation + 5')
                    }, {
                        where: {
                            id: post.owner_user_id
                        }
                    });
                }
            }
            if (!(vote && vote.vote_type_id == 3)) {
                const nvoteC = await Vote.create({ // Creates vote
                    id: null, // Auto-incremented
                    post_id: post_id,
                    user_id: voter_id,
                    vote_type_id: vote_type_id,
                    bounty_amount: null,
                    creation_date: new Date()
                });
                const npostU2 = await Post.update({ // Updates post's score
                    score: Sequelize.literal('score - 1')
                }, {
                    where: {
                        id: post_id
                    }
                });
                const nvoterU2 = await User.update({ // Updates voter's downvote count
                    down_votes: Sequelize.literal('down_votes + 1')
                }, {
                    where: {
                        id: voter_id
                    }
                });
                const nuserU2 = await User.update({ // Updates owner's reputation
                    reputation: Sequelize.literal('reputation - 5')
                }, {
                    where: {
                        id: post.owner_user_id
                    }
                });
            }
            console.log("b1")

        }
        console.log("123")
        return res.status(200).json("Vote made");
    } catch (error) {
        res.status(500).json(error);
    }
}


export const getVoteStatus = async (post_id, user_id) => {
    try {
        const post = await Post.findOne({ // Finds post with post_id
            where: {
                id: post_id
            }
        });

        if (post) { // If post exists
            const vote = await Vote.findOne({ // Finds vote with post_id and user_id
                where: {
                    post_id: post_id,
                    user_id: user_id
                }
            });

            if (vote) { // If vote exists
                let v = parseInt(vote.vote_type_id);
                if (v == 2) {
                    return 1;
                } else if (v == 3) {
                    return -1;
                }
            } else { // If vote does not exist
                return 0;
            }
        } else { // If post does not exist
            return -2;
        }
    }  catch (error) {
        return error;
    }
};