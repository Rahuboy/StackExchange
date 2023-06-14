import * as React from 'react';
import Head from 'next/head'
import Sidebar from '../../../components/sidebar'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {useRouter} from 'next/router'
import Box from '@mui/material/Box'
import MyEditor from "../../../components/editor"
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AutoTags from '../../../components/autoTags';
import { Card, CardContent, Chip } from '@mui/material';

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

const tags = [
  'Python',
  'Rust',
  'C++',
  'Error',
  'DBMS',
  'OS',
  'KG',
  'Rishit',
  'Suryaansh',
  'Rahuboy',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}



export default function question(props) {
    const router = useRouter()
    const {qid} = router.query
    const [Tags, setTag] = React.useState([]);
    const [data, setData] = React.useState("");
    const [question, setQuestion] = React.useState();
    const [actualuserdetails, setActualUserDetails] = React.useState();
    const [title, setTitle] = React.useState("");
    const [oldTags,setOldTags] = React.useState();
    console.log(question)
    console.log("Question: ", tagParse(question?.tags))

    // Tag Parse
    function tagParse(t) {
      if(t !== undefined){
      var a = t.split("><")
      a[0] = a[0].substr(1, a[0].length)
      a[a.length - 1] = a[a.length - 1].substr(0, a[a.length - 1].length - 1)
      return a
      }
    }

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
    async function getQuestion(){
        const res = await fetch(`http://localhost:5002/post/id/${qid}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
        })
        const json = await res.json()
        if (!res.ok) throw Error(json.message)
        setQuestion(json)
        setOldTags(json.tags)
    }
    const handleSubmit = (event) => {
        console.log(Tags);
        event.preventDefault();
        const tagParse = Tags?.tags?.map((tag)=>{
          return "<"+tag.split(":")[1]+">";
        })
        console.log(tagParse);
        console.log(data);
        console.log(qid);
        console.log(title);
        async function updatePost(){
            const res = await fetch(`http://localhost:5002/post/edit/${qid}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    post_id: qid,
                    title: title,
                    body: data,
                    tags: tagParse?.join(""),
                    user_id: actualuserdetails?.id
                }),
            })
            const json = await res.json()
            if (!res.ok) throw Error(json.message)
            console.log(json)
            router.push(`/posts/${qid}`)
        }
        updatePost()
    };
    React.useEffect(() => {
        if (!router.isReady) return;
          console.log("loading");
          getQuestion();
    }, [router.isReady]);
    console.log(Tags)
  return (
    <>
        <Head>
            <title>Edit Question</title>
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
                mb: 4 ,
                // backgroundImage: 'url(https://source.unsplash.com/random)',
                // backgroundRepeat: 'no-repeat',
                // backgroundSize: 'cover',
                // backgroundPosition: 'center',
            }}
            >
        <Paper variant="outlined" sx={{ m:4, my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Edit Question Details
          </Typography>
          <Grid container spacing={3} sx={{mt:2}}>
        
        <Grid item xs={12}>
         {(question?.title)?
         <TextField
                required
                id="questionTitle"
                name="questionTitle"
                label="Question Title"
                fullWidth
                autoComplete="given-title"
                defaultValue={question?.title}
                variant="outlined"
                onChange={(e)=>{setTitle(e.target.value)}}
                multiline
            />:<></>}
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{  fontSize:20 }} gutterBottom color="text.secondary">
            Question Description
          </Typography>
          <MyEditor data={setData} placeholder={question?.body}/>
        </Grid>

        
        <Grid item xs={12}>
          <Grid item xs={6} marginLeft='25%'>
            <Card variant="outlined" sx={{ p: 2, display: 'flex', flexDirection: 'column' }} >
              <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Present Tags: {tagParse(question?.tags)?.map((tag) => {
                      return <Chip variant='outlined' label={tag} color='primary'/>
                    })}
                  </Typography>
              </CardContent>
            </Card>
          </Grid>
          <br/>
          <Stack spacing={3} sx={{ ml: "25%", width: "50%" }}>
            <AutoTags setDetails={setTag} default={question?.tags}/>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
              >
              Edit Question
            </Button>
          </Stack>
            
        </Grid>
      </Grid>
          
        </Paper>

            </Box>
        </Box>
    </>
  )
}
