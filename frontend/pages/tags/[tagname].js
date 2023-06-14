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
import {useRouter} from 'next/router'
import Sidebar from '../../components/sidebar';

const mdTheme = createTheme({ palette: { mode: 'light' } });

export default function TagPage() {
    const router = useRouter()
    const {tagname} = router.query;
    const [posts, setPosts] = React.useState();
    const questionsPerPage = 5;
    async function getQuestions() {
        const response = await fetch(`http://localhost:5002/post/tags?score_flag=1&tags=<${tagname}>&limit=${questionsPerPage}`, {
            method: "GET",
            credentials: 'include'
        });
        const x = await response.json();
        console.log(x);
        setPosts(x);
    }
    console.log(posts);
    React.useEffect(() => {
      if (!router.isReady) return;
      console.log("loading")
        getQuestions();
    },[router.isReady]);

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar/>
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
                        
                        <Grid item xs={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" component="div" gutterBottom>
                                    Posts for tag {tagname}

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
                        {/* <Grid item xs={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" component="div" gutterBottom>
                                    Recent Answers
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
                                            </Card>
                                </Grid>)})}
                            
                        </Grid>
                        </Grid> */}
                    </Container>
                </Box>
            </ThemeProvider>
        </Box>
    );
}




