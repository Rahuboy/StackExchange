import React, {useEffect, useId, useImperativeHandle, useState} from 'react';
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
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { formGroupClasses } from '@mui/material';
import AutoTags from '../components/autoTags';
import AutoUsers from '../components/autoUsers';

/* Icons */
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


export default function Explore() {
  /* State */
  const [formTagData, setFormTagData] = useState()
  const [formUserData, setFormUserData] = useState()
  const [posts, setPosts] = useState()
  const [currChk, setCurrChk] = useState() // Checks if presently checks for tags
  const [currFlag, setCurrFlag] = useState() // Checks if dateFlag
  const [scoreFlag, setScoreFlag] = useState(1)
  const [dateFlag, setDateFlag] = useState(0)
  const [recNum, setRecNum] = useState(10)
  const [start, setStart] = useState(false)
  const [actualuserdetails,setActualUserDetails] = React.useState();
  useEffect(()=>{
    actualGetUser();
  },[])
  /* useEffect: Tracks changes in Tags */
  async function actualGetUser() {
    try {
    const response = await fetch(`http://localhost:5002/me`, {
      method: "GET",
      credentials: 'include'
    });
    if (response.status === 401) {
      console.log("Unauthorized");
    }
    setActualUserDetails(await response.json());
  } catch (err) {
    console.log(err);
  }

    return ;
}
  useEffect(() => {
    // Parse object to get tagSQL
    const tagParse = formTagData?.tags.map((tag)=>{
      return "&tags=<"+encodeURIComponent(tag.split(":")[1])+">";
    })
    const tagSQL = tagParse?.join("")
    console.log(tagSQL)

    // Fetch
    setRecNum(10)
    setCurrFlag(false)
    setStart(true)
    if(tagSQL != '' && tagSQL != undefined)
    {
      fetch(`http://localhost:5002/post/tags?score_flag=${scoreFlag}&date_flag=2${tagSQL}&limit=${recNum}`,{
                method: 'GET',
                credentials: 'include'
            }).then(
                response => response.json()
            ).then(
                data => {
                  console.log(data)
                  setCurrChk(true)
                  setPosts(data)
                }
            )
    }
  }, [formTagData])
  
  /* useEffect: Tracks changes in Users */
  useEffect(() => {
    // Parse object to get userID
    const userSQL = formUserData?.users.split(":")[0]
    console.log("http://localhost:5002/post/userid/"+userSQL+"?score_flag="+scoreFlag+"&date_flag="+dateFlag+"&limit="+recNum)

    // Fetch
    setRecNum(10)
    setCurrFlag(false)
    setStart(true)
    if(userSQL != '' && userSQL != undefined)
    {
      fetch(`http://localhost:5002/post/userid/${userSQL}?score_flag=${scoreFlag}&date_flag=2&limit=${recNum}`,{
                method: 'GET',
                credentials: 'include'
            }).then(
                response => response.json()
            ).then(
                data => {
                  setCurrChk(false)
                  setPosts(data)
                }
            )
    }
  }, [formUserData])

  /* useEffect: Sorts by Score */
  useEffect(() => {
    setCurrFlag(false)
    if(currChk)
    {
      // Parse object to get tagSQL
      const tagParse = formTagData?.tags.map((tag)=>{
        return "&tags=<"+encodeURIComponent(tag.split(":")[1])+">";
      })
      const tagSQL = tagParse?.join("")
      console.log(tagSQL)

      // Fetch
      if(tagSQL != '' && tagSQL != undefined)
      {
        fetch(`http://localhost:5002/post/tags?score_flag=${scoreFlag}&date_flag=2${tagSQL}&limit=${recNum}`,{
                  method: 'GET',
                  credentials: 'include'
              }).then(
                  response => response.json()
              ).then(
                  data => {
                    setCurrChk(true)
                    setPosts(data)
                  }
              )
      }
    }
    else{
      // Parse object to get userID
      const userSQL = formUserData?.users.split(":")[0]
      console.log("http://localhost:5002/post/userid/"+userSQL+"?score_flag="+scoreFlag+"&date_flag="+dateFlag+"&limit="+recNum)

      // Fetch
      if(userSQL != '' && userSQL != undefined)
      {
        fetch(`http://localhost:5002/post/userid/${userSQL}?score_flag=${scoreFlag}&date_flag=2&limit=${recNum}`,{
                  method: 'GET',
                  credentials: 'include'
              }).then(
                  response => response.json()
              ).then(
                  data => {
                    setCurrChk(false)
                    setPosts(data)
                  }
              )
      }
    }
  }, [scoreFlag])

  /* useEffect: Sorts by Date */
  useEffect(() => {
    setCurrFlag(true)
    if(currChk)
    {
      // Parse object to get tagSQL
      const tagParse = formTagData?.tags.map((tag)=>{
        return "&tags=<"+encodeURIComponent(tag.split(":")[1])+">";
      })
      const tagSQL = tagParse?.join("")
      console.log(tagSQL)

      // Fetch
      if(tagSQL != '' && tagSQL != undefined)
      {
        fetch(`http://localhost:5002/post/tags?score_flag=2&date_flag=${dateFlag}${tagSQL}&limit=${recNum}`,{
                  method: 'GET',
                  credentials: 'include'
              }).then(
                  response => response.json()
              ).then(
                  data => {
                    setCurrChk(true)
                    setPosts(data)
                  }
              )
      }
    }
    else{
      // Parse object to get userID
      const userSQL = formUserData?.users.split(":")[0]
      console.log("http://localhost:5002/post/userid/"+userSQL+"?score_flag="+scoreFlag+"&date_flag="+dateFlag+"&limit="+recNum)

      // Fetch
      if(userSQL != '' && userSQL != undefined)
      {
        fetch(`http://localhost:5002/post/userid/${userSQL}?score_flag=2&date_flag=${dateFlag}&limit=${recNum}`,{
                  method: 'GET',
                  credentials: 'include'
              }).then(
                  response => response.json()
              ).then(
                  data => {
                    setCurrChk(false)
                    setPosts(data)
                  }
              )
      }
    }
  }, [dateFlag])

  /* More! */
  useEffect(() => {
    if(currChk)
    {
      // Parse object to get tagSQL
      const tagParse = formTagData?.tags.map((tag)=>{
        return "&tags=<"+encodeURIComponent(tag.split(":")[1])+">";
      })
      const tagSQL = tagParse?.join("")
      console.log(tagSQL)

      // Fetch
      setScoreFlag(1)
      setDateFlag(0)
      if(tagSQL != '' && tagSQL != undefined)
      {
        fetch(`http://localhost:5002/post/tags?score_flag=${scoreFlag}&date_flag=${dateFlag}${tagSQL}&limit=${recNum}`,{
                  method: 'GET',
                  credentials: 'include'
              }).then(
                  response => response.json()
              ).then(
                  data => {
                    setCurrChk(true)
                    setPosts(data)
                  }
              )
      }
    }
    else{
      // Parse object to get userID
      const userSQL = formUserData?.users.split(":")[0]
      console.log("http://localhost:5002/post/userid/"+userSQL+"?score_flag="+scoreFlag+"&date_flag="+dateFlag+"&limit="+recNum)

      // Fetch
      setScoreFlag(1)
      setDateFlag(0)
      if(userSQL != '' && userSQL != undefined)
      {
        fetch(`http://localhost:5002/post/userid/${userSQL}?score_flag=${scoreFlag}&date_flag=${dateFlag}&limit=${recNum}`,{
                  method: 'GET',
                  credentials: 'include'
              }).then(
                  response => response.json()
              ).then(
                  data => {
                    setCurrChk(false)
                    setPosts(data)
                  }
              )
      }
    }
  }, [recNum])

  /* Make Date */
  function makeDate(date) {
    if (date == null) return "";
    const t = date.split(/[-T:.]/);
    const d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
    return d.toLocaleString();
}

  /* Main Return */
  return (
  <>
  <Head>
      <title>Explore</title>
  </Head>
  <Box sx={{ display: 'flex' }}>
    <Sidebar/> 
    {/* no login */}
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
            <Grid item xs={12} >
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 600,
                  fontFamily: 'Roboto',
                }}
              >
                <Typography variant="h4" component="div" gutterBottom sx={{marginLeft: "25%", width: "50%"}}> 
                  What are you looking for?
                </Typography>

                <Stack spacing={3} sx={{ ml: "25%", width: "50%" }}>
                  <AutoTags setDetails={setFormTagData}/>
                  <AutoUsers setDetails={setFormUserData}/>
                </Stack>

                <Button onClick={() => setScoreFlag(scoreFlag==1? 0: 1)}><SortByAlphaIcon/> : Sort by Score {scoreFlag? <><ArrowUpwardIcon/><p>DESC</p></> : <><ArrowDownwardIcon/><p>ASC</p></>}</Button>
                <Button onClick={() => setDateFlag(dateFlag==1? 0: 1)}><SortByAlphaIcon/> : Sort by Date  {dateFlag? <><ArrowUpwardIcon/><p>DESC</p></> : <><ArrowDownwardIcon/><p>ASC</p></>}</Button>
                
                <Grid container spacing={2}>
                  <Grid item xs={6} textAlign='left'>
                    {(start) ? (
                      currFlag==true? <Chip label={"Sorting by Date : " + (dateFlag==1? "Descending":"Ascending")}/> : <Chip label={"Sorting by Score : " + (scoreFlag==1? "Descending":"Ascending")}/>
                    ): ""}
                  </Grid>
                  <Grid item xs={6} textAlign='right'>
                    {(start) ? (<Chip label={"Sorting based on " + (currChk?"tags":"user")}/>) : ""}
                  </Grid>
                </Grid>

              </Paper>
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
                              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                              User ID: {post.owner_user_id}
                              </Typography>
                              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                              Date: {makeDate(post.creation_date)}
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
                  </Grid>)
                })}

            {/* More */}
            <Grid item xs={12}>
              <Button onClick={()=>setRecNum(recNum + 5)}>More</Button>
            </Grid>
            <Grid item xs={12}>
              <Chip label={posts? (posts.length + " records!") : "No records!"}/>
            </Grid>
            
            <Grid item xs={6} sx={{ml:"25%"}}>
              <Typography variant="h6" component="div" gutterBottom sx={{textAlign:'center'}}>
                Didn't find what you were looking for?
              </Typography>
              {/* <Card variant="outlined" sx={{ p: 2, display: 'flex', flexDirection: 'column' }}> */}
                  
                  {(actualuserdetails)?<Button variant="outlined" href={`/create/question/${actualuserdetails?.id}`} sx={{width:"100%"}}>
                      Create a post
                  </Button>:<Button variant="outlined" href="/signin" sx={{width:"100%"}}>
                      Login to create a post
                  </Button>}
                  
              {/* </Card> */}
            </Grid>
          </Grid>
          {/* <Copyright sx={{ pt: 4 }} /> */}
        </Container>
      </Box>
  </Box>
  </>
  );
}