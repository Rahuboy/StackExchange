import express from "express";

// Import all the controllers
import {
    answerQuestion,
    upvoteAnswer,
    downvoteAnswer,
    getAnswerByUserId,
    getAnswerByQuestionId
} from "../controllers/answer.js"
import {
    AutocompleteTag,
    AutocompleteUser,
    Autocomplete
} from "../controllers/autocomplete.js"
import {
    getPostByID,
    getPostByUserID,
    getPostByTag,
    getPostByTags,
    editPost,
    deletePost,
    votePost
} from "../controllers/post.js"
import {
    upvoteQuestion,
    downvoteQuestion,
    closeQuestion,
    createQuestion,
    getQuestionByUserId,
    getTopTags,
    getTopQuestions
} from "../controllers/question.js"
import {
    getUserByID,
    getUserByDisplayName,
    createUser
} from "../controllers/user.js"
import {
    Signin,
    Signout,
    Me
}
from "../controllers/auth.js"
import {
    verifyToken
}
from "../middleware/VerifyToken.js"

const router = express.Router();


//Authentication
router.post("/signin", Signin); 
router.post("/signout", Signout); 
router.get("/me", verifyToken, Me);


// Get answer by user ID
// Ex http://127.0.0.1:5002/answer/userid/4?sort_by=score&limit=3
// By default sorts by creation date and returns 10 answers
router.get("/answer/userid/:user_id", verifyToken, getAnswerByUserId); // Tested with frontend

// Get answer by question ID
// Ex http://127.0.0.1:5002/answer/questionid/4?sort_by=score
// By default sorts by score
router.get("/answer/questionid/:question_id/:user_id",verifyToken,  getAnswerByQuestionId); // Tested with frontend
// Answer a question
// Ex http://localhost:5002/question/answer/442654
// Ex body {"user_id":"2", "answer":"This is a test answer"}
// In the body, "user_id" is the id of the person answering the question and answer is the body of the answer (stored as html in the DB)
// If successful, returns "Created answer"
router.post("/question/answer/:post_id",verifyToken ,answerQuestion); // Tested

// Upvote an answer
router.post("/answer/upvote/:post_id", upvoteAnswer); // Tested

// Downvote an answer
router.post("/answer/downvote/:post_id", downvoteAnswer); // Tested



// Autocomplete tag
// Ex http://localhost:5002/autocomplete/tag/co/10
// 'tag_name' is the complete or incomplete tag name. The autocomplete function uses it as a prefix.
// 'limit' is the number of tags to return
// Returns an array of jsons. For the schema of the json, check init.sql
router.get("/autocomplete/tag/:tag_name/:limit",  AutocompleteTag); // Tested

// Autocomplete user
// Ex http://localhost:5002/autocomplete/user/Geoff%20D/10
// You miight have to use things like %20 instead of spaces for the URLs
// As before, 'display_name' is used as a prefix, and 'limit' is the number of users to return
// Returns an array of jsons. For the schema of the json, check init.sql
router.get("/autocomplete/user/:display_name/:limit",  AutocompleteUser); // Tested


// Autocomplete tag and user
// Ex http://localhost:5002/autocomplete/Geoff/10
// 'search' is the complete or incomplete tag name or user display name. The autocomplete function uses it as a prefix.
// 'limit' is the number of tags to return
// Returns an array of jsons. For the schema of the json, check init.sql
router.get("/autocomplete/:search/:limit", Autocomplete); // Tested


// Get post by ID
router.get("/post/id/:post_id",  getPostByID); // Tested with frontend

// Get post by user ID
// Ex http://localhost:5002/post/userid/456?score_flag=1&date_flag=0&limit=5
// score_flag is 1 if you want to sort by score descending, 0 if you want to sort by score ascending. Same for date_flag (sorts by creation_date)
// Using a different value for score_flag or date_flag will not sort.
// Make sure that each tag is surrounded by angle brackets.
// Limit is also implemented
// If successful, returns an array of jsons. For the schema of the json, check init.sql
router.get("/post/userid/:user_id",  getPostByUserID); // Tested

// Get post by tag
// Should be deprecated. Just use the API below. 
router.get("/post/tag",  getPostByTag); // Tested

// Get post by tags
// Ex http://localhost:5002/post/tags?score_flag=1&date_flag=0&tags=<comments>&tags=<documentation>&limit=5
// score_flag is 1 if you want to sort by score descending, 0 if you want to sort by score ascending. Same for date_flag (sorts by creation_date)
// Using a different value for score_flag or date_flag will not sort.
// Make sure that each tag is surrounded by angle brackets.
// Limit is also implemented
// If successful, returns an array of jsons. For the schema of the json, check init.sql
router.get("/post/tags",  getPostByTags); // Tested

// Edit post
// Ex http://localhost:5002/post/edit/442654
// Ex body {"title":"My first question 2", "body":"This is my first question 2", "tags":"<comments>", "user_id":"423930"}
// In the body, "user_id" is the id of the person editing the post. (Might need to be deprecated, since we're only allowing owner to edit)
// the request can edit the post title, the post body or the post tags
// If successful, returns "Edited post"
router.put("/post/edit/:post_id", verifyToken, editPost); // Tested

// Delete post
// Ex http://localhost:5002/post/delete/442654
// If the post is a question, deletes all associated answers too. Also decrements corresponding tag count
// If successful, returns "Post deleted"
router.delete("/post/delete/:post_id", deletePost); // Tested 


// Vote on a post
// Ex body {"post_id":"423930", "user_id":"223", "vote_type_id":"2"}
// vote_type_id = 2 for upvotes, 3 for downvotes
router.post("/post/vote", verifyToken, votePost); 


// Get question by user ID and sort by creation_date or score
// Ex http://127.0.0.1:5002/question/userid/4?sort_by=score&limit=3
// By default sorts by creation date and returns 10 answers
router.get("/question/userid/:user_id",verifyToken,  getQuestionByUserId); // Tested with frontend

// Get top k tags
// Ex http://localhost:5002/question/top_tags/10
router.get("/question/top_tags/:limit", getTopTags); // Tested with frontend

// Get top k questions
// Ex http://localhost:5002/question/top_questions/10
router.get("/question/top_questions/:limit", getTopQuestions); // Tested with frontend

// Upvote a question
router.post("/question/upvote/:post_id", upvoteQuestion); // Tested

// Downvote a question
router.post("/question/downvote/:post_id", downvoteQuestion); // Tested

// Create a question
// Ex http://localhost:5002/question/create
// Ex body {"owner_user_id":"423930", "title":"My first question", "body":"This is my first question", "tags":"<comments><usage>"}
// In the body, "owner_user_id" is the id of the person asking the question, title is the title of the question, body is the body of the question (stored as html in the DB)
// and tags is a list of tags. Note that the each individual tag is surrounded by angle brackets.
// Also updates tag count.
// If successful, returns "Created question"
router.post("/question/create", createQuestion); // Tested

// Close a question
router.put("/question/close/:post_id", closeQuestion); 



// Get user by ID
// Ex http://localhost:5002/user/id/4
// If successful, returns a single json containing the user. For schema, check init.sql
router.get("/user/id/:id", verifyToken, getUserByID); // Tested with frontend

// Get user by display name
// Ex http://localhost:5002/user/name/Geoff%20Dalgas
// %20 in the above example is for a space
// If successful, returns array of jsons. Each json is a user with matching display_name (which needn't be unique)
router.get("/user/name/:display_name",verifyToken, getUserByDisplayName); // Tested

// Create a user
// Ex http://localhost:5002/user/create
// Ex body {"display_name":"kg", "location":"hyderabad", "about_me":"Im kg", "user_name":"kg23", "password":"12345"}
// Note:- We might have to store hashed passwords
// If successful, returns "Created user"
// Other body parameters (optional): website_url, profile_image_url
router.post("/user/create", createUser); // Tested

// // Get the vote given by a user to a post
// // Ex http://localhost:5002/user/vote/4/442654
// router.get("/post/answer/:post_id/:user_id", verifyToken, get);

export default router;
