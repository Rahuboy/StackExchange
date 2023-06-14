# About Frameworks
The frontend of this project has been written in Next.js, which is an open source web development framework which extends the functionalities of React based webpages. This project has also been supported by MaterialUI which helps us import ready-made components.

# Pages
- create/answer/[qid].js: This page allows the user to add an answer to an already existing question. The question and all the previous answers are also displayed.
- create/question/[userid].js: This page allows the user to create a question with tags, description and other details.
- edit/answer/[answerid].js: This allows the user to edit an already existing answer. The previous answers are already displayed on the editor.
- edit/question/[qid].js: This allows the owner of the question to edit details and tags. One must note that the previous tags of the questions are shown. But the one must include the previous tags while editing to endure they are not missing.
- posts/[postid].js: This page shows the question, along with its details and the subsequent answers. It allows the creator of the question to edit the question, and the people who answered the question to edit their answers.
- tags/[tagname].js: This page shows the top five tags.
- dashboard.js: This page shows the details of the user who has logged in and the questions he/she has created. The page also gives options to the user to edit or delete questions.
- explore.js: This page allows users (even guest users) to serach for posts, linked to multiple tags (or) created by a particular user. This options can also increase the search result-set, and sort the results by score and time.
- signin.js: Allows the user to login. Note that a cookie containing the access token is created. The access token allows the user to be logged  in for a maximum of 24 hours.
- signup.js: Allows guest users to sign up and create an account. Creating an account enables the individual to create, edit and delete questions. It also allows the individuals to give and edit answers to previously existing questions. The password for the new user is the username by default.

# Components
- autoTags.js: A form component using <Autocomplete> and <Controller> that fetches values from the database based on present tag values. The presently selected tags are shown in the <TextField> as <Chips>.
- autoUsers.js: A similar component to autoTags, but modified for users.
- editor.js: A text-field like component that allows people to easily post answers and questions with necessary formatting.
- sidebar.js: Provides a side navigation panel that allows individuals to access the best questions and tags. Also allows a quick way to create question to authenticated users.
- userDetails.js: A <Card>-like component providing details of a user. Is used in question-posts, answers etc.

# Contributors:
- Kushagra Gupta (MistyRavager): Authentication, Dashboard and Create/Delete Questions 
- Rishit D (purplehand52): Autocomplete, Search/Explore, Edit Question