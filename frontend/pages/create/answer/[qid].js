import * as React from 'react';
import Head from 'next/head'
import Sidebar from '../../../components/sidebar'
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {useRouter} from 'next/router'
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box'
import MyEditor from "../../../components/editor"
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import DoneIcon from '@mui/icons-material/Done';
// const steps = ['Details','Review Question'];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};




export default function answer(props) {
    // const [activeStep, setActiveStep] = React.useState(0);
    const router = useRouter()
    const {qid} = router.query
    const [data, setData] = React.useState("");
    const [post,setPost] = React.useState();
    const [answers, setAnswers] = React.useState();
    const [userdetails,setUserDetails] = React.useState();
    const [actualuserdetails, setActualUserDetails] = React.useState();
    async function getUser() {
      const response = await fetch(`http://localhost:5002/user/id/${post?.owner_user_id}`, {
          method: "GET",
          credentials: 'include'
      });
      const x = await response.json();
      setUserDetails(x);
  }
    async function getPost() {
      const response = await fetch(`http://localhost:5002/post/id/${qid}`, {
          method: "GET",
          credentials: 'include'
      });
      const x = await response.json();
      setPost(x);
    }
    async function getAnswer() {
      const response = await fetch(`http://localhost:5002/answer/questionid/${qid}/${actualuserdetails?.id}?sort_by=score`, {
          method: "GET",
          credentials: 'include'
      });
      const x = await response.json();
      setAnswers(x.p);
    } 
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(data)
      async function postAnswer(){
        const response = await fetch(`http://localhost:5002/question/answer/${qid}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            post_id: qid,
            user_id: actualuserdetails?.id,
            answer: data,
          })
        });
        console.log(await response.json());
        if (response.status === 200) {
          router.push("/dashboard");
        }
      }
      postAnswer();
    };
    async function actualGetUser() {
      // e.preventDefault();
        try {
        const response = await fetch(`http://localhost:5002/me`, {
          method: "GET",
          credentials: 'include'
        });
        if (response.status === 401) {
          console.log("Unauthorized");
          router.push("/signin");
        }
        setActualUserDetails(await response.json());
      } catch (err) {
        console.log(err);
      }
        return ;
    }
    React.useEffect(()=>{
      actualGetUser();
    },[])
    React.useEffect(() => {
      if (!router.isReady) return;
        console.log("loading");
        getPost();
        
        // getUser();
        
    }, [router.isReady]);
    // React.useEffect(()=>{
    //   if (actualuserdetails)
    //   getAnswer();
    // },[actualuserdetails])
    React.useEffect(()=>{
      if (!router.isReady) return;
      getAnswer();
      console.log("hi")
      
    },[actualuserdetails, router.isReady])
    React.useEffect(() => {
      if (!post) return;
        console.log("loading");
        getUser();
    }, [post]);
    function makeDate(date) {
      if (date == null) return "";
      const t = date.split(/[-T:.]/);
      const d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
      return d.toLocaleString();
  }
  return (
    <>
        <Head>
            <title>Create Answer</title>
        </Head>
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
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
                mb: 4 ,
                // backgroundImage: 'url(https://source.unsplash.com/random)',
                // backgroundRepeat: 'no-repeat',
                // backgroundSize: 'cover',
                // backgroundPosition: 'center',
            }}
            >

        <Paper variant="outlined" sx={{ m:4, my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom>
                  Question
                </Typography>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    // height: 240,
                    fontFamily: 'Roboto',
                  }}
                >
                <Typography variant="h2" component="div" sx={{fontSize:25}}>  
                {post?.title}
                </Typography>
                <Typography sx={{fontSize:20}} component="div" gutterBottom color="text.secondary" dangerouslySetInnerHTML={{__html:post?.body}}>
                
                </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Typography sx={{fontSize:15}} component="div" gutterBottom color="text.secondary">
                                Score: {post?.score}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography sx={{fontSize:15}} component="div" gutterBottom color="text.secondary">
                                Views: {post?.view_count}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{fontSize:15}} component="div" gutterBottom color="text.secondary">
                                Tags: {post?.tags}
                            </Typography>
                        </Grid>     
                    </Grid>
                  
                  <Grid item xs={3} sx={{ml:"75%"}}>
                    <Card sx={{ maxWidth: "100%"}}>
                        <CardHeader
                            avatar={
                            <Avatar
                              alt={userdetails?.display_name}
                              src={userdetails?.profile_image_url}
                            />
                            }
                            title={userdetails?.display_name}
                            subheader={makeDate(post?.creation_date)}
                        />
                    </Card>
                    </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Paper>

              <Paper variant="outlined" sx={{ m:4, my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
              <Typography variant="h6" component="div" gutterBottom>
                  Answer 
                </Typography>
          {/* <QuestionDetails /> */}
          <Grid container spacing={3} sx={{mt:2}}>
        <Grid item xs={12}>
          <Typography sx={{  fontSize:20 }} gutterBottom color="text.secondary">
            Answer Description
          </Typography>
          
          <MyEditor data={setData}/>
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Post
          </Button>
        </Grid>
        
      </Grid>
              </Paper>
              <Paper variant="outlined" sx={{ m:4, my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>

              <Grid item xs={12}>
              {(answers?.length>0)?<Typography variant="h6" component="div" gutterBottom>
                  Answers
                </Typography>:<Typography variant="h6" component="div" gutterBottom>
                  No Answers 
                </Typography>}
                
                
                <Grid container spacing={3}>    
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
                                        {(answer?.id == post?.accepted_answer_id) ? 
                                            <Chip 
                                                label="Accepted Answer"
                                                sx={{color:"#00a152", fontWeight:"bold"}}
                                                disabled
                                                variant="outlined"
                                                icon = {<DoneIcon style={{color:"#00a152"}}/>}
                                            />
                                            :<></>}
                                        </Typography>
                                        <Typography component={'span'} variant="body2" dangerouslySetInnerHTML={{__html:answer.body}}>
                                        </Typography>
                                    </CardContent>
                                    <CardHeader
                                            avatar={
                                            <Avatar
                                            alt={answer?.last_editor_display_name}
                                            src={answer?.last_editor_display_name}
                                            />
                                            }
                                            // action={
                                            // <IconButton aria-label="settings">
                                            //     <MoreVertIcon />
                                            // </IconButton>
                                            // }
                                            title={answer?.last_editor_user_id}
                                            subheader={makeDate(answer?.last_edit_date)}
                                        />
                                </Card>
                            </Grid>)})}
                </Grid>
                
              </Grid>
              </Paper>
            {/* <Copyright sx={{ pt: 4 }} /> */}
        

            </Box>
        </Box>
    </>
  )
}
