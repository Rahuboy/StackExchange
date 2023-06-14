import * as React from 'react';
import Sidebar from '../components/sidebar'
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
import CardHeader  from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Post() {
    return (
    <>
    <Head>
        <title>Post</title>
    </Head>
    <Box sx={{ display: 'flex' }}>
      <Sidebar/>
      
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
              {/* Chart */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    // height: 240,
                    fontFamily: 'Roboto',
                  }}
                >
                  <Typography variant="h2" component="div" gutterBottom sx={{fontSize:25}}>  
                    What is the meaning of life?
                  </Typography>
                  <Typography sx={{fontSize:20}} component="div" gutterBottom color="text.secondary">
                    What actually is life?
                  </Typography>
                  <Grid item xs={3} sx={{ml:"75%"}}>
                    <Card sx={{ maxWidth: "100%"}}>
                        <CardHeader
                            avatar={
                            // <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                            //     R
                            // </Avatar>
                            <Avatar
                              alt="SuriBaka"
                              src="/images/profile.jpg"
                            />
                            }
                            // action={
                            // <IconButton aria-label="settings">
                            //     <MoreVertIcon />
                            // </IconButton>
                            // }
                            title="Suryaansh Jain"
                            subheader="June 69, 2069"
                        />
                    </Card>
                    </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  Answers
                </Typography>
                <Card variant="outlined" sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <CardContent>
                    <Typography sx={{fontSize:20}} component="div">
                      Question: What is the meaning of life?
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Tag1 Tag2 Tag3
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontSize:14 }} color="text.secondary">
                      Upvotes: 100 Downvotes: 0 Answers: 10 
                    </Typography>
                    <Typography variant="body2">
                      Top Answer :<br/>
                      the condition that distinguishes animals and plants from inorganic matter, including the capacity for growth, reproduction, functional activity, and continual change preceding death.
                    </Typography>
                  </CardContent>
                <CardActions>
                  <Button href='#' size="small">Learn More</Button>
                </CardActions>
                </Card>
                <Card variant="outlined" sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <CardContent>
                    <Typography sx={{fontSize:20}} component="div">
                      Question: What is the meaning of life?
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Tag1 Tag2 Tag3
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontSize:14 }} color="text.secondary">
                      Upvotes: 100 Downvotes: 0 Answers: 10 
                    </Typography>
                    <Typography variant="body2">
                      Top Answer :<br/>
                      the condition that distinguishes animals and plants from inorganic matter, including the capacity for growth, reproduction, functional activity, and continual change preceding death.
                    </Typography>
                  </CardContent>
                <CardActions>
                  <Button href='#' size="small">Learn More</Button>
                </CardActions>
                </Card>
                <Card variant="outlined" sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <CardContent>
                    <Typography sx={{fontSize:20}} component="div">
                      Question: What is the meaning of life?
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Tag1 Tag2 Tag3
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontSize:14 }} color="text.secondary">
                      Upvotes: 100 Downvotes: 0 Answers: 10 
                    </Typography>
                    <Typography variant="body2">
                      Top Answer :<br/>
                      the condition that distinguishes animals and plants from inorganic matter, including the capacity for growth, reproduction, functional activity, and continual change preceding death.
                    </Typography>
                  </CardContent>
                <CardActions>
                  <Button href='#' size="small">Learn More</Button>
                </CardActions>
                </Card>
              </Grid>
              {/* <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  Recent Answers
                </Typography>
                <Card variant="outlined" sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <CardContent>
                    <Typography sx={{fontSize:20}} component="div">
                      Question: What is the meaning of life? Part 2
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Tag1 Tag2 Tag3
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontSize:14 }} color="text.secondary">
                      Upvotes Received: 100 Downvotes: 0 Answers: 10 
                    </Typography>
                    <Typography variant="body2">
                      Your Answer {'(Top Answer??)'} :<br/>
                      the condition that distinguishes animals and plants from inorganic matter, including the capacity for growth, reproduction, functional activity, and continual change preceding death.
                    </Typography>
                  </CardContent>
                <CardActions>
                  <Button href='#' size="small">Learn More</Button>
                </CardActions>
                </Card>
              </Grid> */}
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
        </Box>
    </Box>
    </>
    );
}