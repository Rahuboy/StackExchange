import * as React from 'react';
import Head from 'next/head';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import {  createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';

const mdTheme = createTheme({ palette: { mode: 'light' } });

export default function UserDetails(props) {
    const [posts, setPosts] = React.useState([]);
    const [answers, setAnswers] = React.useState([]);
    const [userdetails, setUserDetails] = React.useState();
    const questionsPerPage = 5;
    const answersPerPage = 5;
    async function getUserDetails(){
        const response = await fetch(`http://localhost:5002/user/id/${props?.id}`, {
            method: "GET",
            credentials: 'include'
        });
        const x = await response.json();
        setUserDetails(x);
    }
    async function getQuestions() {
        const response = await fetch(`http://localhost:5002/question/userid/${props?.id}?sort_by=creation_date&limit=${questionsPerPage}`, {
            method: "GET",
            credentials: 'include'
        });
        const x = await response.json();
        setPosts(x);
    }
    async function getAnswers() {
        const response = await fetch(`http://localhost:5002/answer/userid/${props?.id}?sort_by=creation_date&limit=${answersPerPage}`,{
            method: "GET",
            credentials: 'include'
        });
        const x = await response.json();
        setAnswers(x);
    }
    React.useEffect(() => {
        getQuestions();
        getAnswers();
        getUserDetails();
    },[props]);

    return (
        <ThemeProvider theme={mdTheme}>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                    // backgroundImage: 'url(https://source.unsplash.com/random)',
                    // backgroundRepeat: 'no-repeat',
                    // backgroundSize: 'cover',
                    // backgroundPosition: 'center',
                }}
                >
                <Toolbar />
                <Container maxWidth="xl" sx={{ mt: 0, mb: 4 }}>
                    <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={9} xl={10}>
                        <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            // height: 240,
                            fontFamily: 'Roboto',
                        }}
                        >
                        <Typography variant="h4" component="div" gutterBottom> 
                            Profile of {userdetails?.display_name}
                        </Typography>
                        <Typography sx={{fontSize:20}} component="div" gutterBottom color="text.secondary">
                        About {userdetails?.display_name}: 
                                <Typography sx={{fontSize:15, marginTop:-2}} dangerouslySetInnerHTML={{__html: userdetails?.about_me}} component="div" gutterBottom color="text.secondary">
                                </Typography>
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <Typography sx={{fontSize:15}} component="div" gutterBottom color="text.secondary">
                                    Reputation: {userdetails?.reputation}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography sx={{fontSize:15}} component="div" gutterBottom color="text.secondary">
                                    Views: {userdetails?.views}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography sx={{fontSize:15}} component="div" gutterBottom color="text.secondary">
                                    Upvotes: {userdetails?.up_votes}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography sx={{fontSize:15}} component="div" gutterBottom color="text.secondary">
                                    Downvotes: {userdetails?.down_votes}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography sx={{fontSize:15}} component="div" gutterBottom color="text.secondary">
                                    Website URL: <Link href={userdetails?.website_url}>{userdetails?.website_url}</Link>
                                </Typography>
                            </Grid>        
                        </Grid>
                        

                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3} xl={2}>
                        <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                        >
                        <Avatar
                            alt={userdetails?.display_name}
                            src={userdetails?.profile_image_url}
                            sx={{ width: '100%', height: '100%' }}
                        />

                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h6" component="div" gutterBottom>
                                {(posts?.length>0)?`Recent Posts`:`No posts`}

                                </Typography>
                            </Grid>
                            {posts?.map((post) => {
                                return (
                                    <Grid item xs={12}  key={post.id}>
                                        <Card variant="outlined" sx={{ p: 2, display: 'flex', flexDirection: 'column' }} >
                                            <CardContent>
                                                <Typography sx={{fontSize:20}} component="div">
                                                QuestionID {post.id}: {post.title} 
                                                </Typography>
                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                Tags: {post.tags}
                                                </Typography>
                                                <Typography variant="body2" dangerouslySetInnerHTML={{__html:post.body}}>
                                                </Typography>
                                                <Typography sx={{ mb: 1.5, fontSize:14 }} color="text.secondary">
                                                Score: {post.score} Answers: {post.answer_count} View Count: {post.view_count} 
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button href={`/posts/${post.id}`} size="small">Learn More</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>)})}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sx={{mt:4}}>
                                <Typography variant="h6" component="div" gutterBottom >
                                
                                    {(answers?.length>0)?`Recent Answers`:`No answers`}
                                </Typography>
                            </Grid>
                            {answers?.map((answer) => {
                                return (
                                    <Grid item xs={12} key={answer?.id}>
                                        <Card variant="outlined" sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                            <CardContent>
                                                <Typography sx={{fontSize:20}} component="div">
                                                AnswerID: {answer?.id} 
                                                </Typography>
                                                <Typography component={'span'} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                Score: {answer?.score}
                                                </Typography>
                                                <Typography component={'div'} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                </Typography>
                                                <Typography component={'span'} variant="body2" dangerouslySetInnerHTML={{__html:answer.body}}>
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button href={`/posts/${answer?.parent_id}`} size="small">Learn More</Button>
                                            </CardActions>
                                        </Card>
                            </Grid>)})}
                        
                    </Grid>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}