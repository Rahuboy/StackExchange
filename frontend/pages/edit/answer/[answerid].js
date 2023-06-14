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
    const {answerid} = router.query
    const [Tags, setTag] = React.useState([]);
    const [data, setData] = React.useState("");
    const [answer, setAnswer] = React.useState();
    const [actualuserdetails, setActualUserDetails] = React.useState();
    const [title, setTitle] = React.useState("");

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
    async function getAnswer(){
        const res = await fetch(`http://localhost:5002/post/id/${answerid}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
        })
        const json = await res.json()
        if (!res.ok) throw Error(json.message)
        setAnswer(json)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        async function updatePost(){
            const res = await fetch(`http://localhost:5002/post/edit/${answerid}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    post_id: answerid,
                    title: title,
                    body: data,
                    user_id: actualuserdetails?.id
                }),
            })
            const json = await res.json()
            if (!res.ok) throw Error(json.message)
            console.log(json)
            router.push(`/posts/${answer?.parent_id}`)
        }
        updatePost()
    };
    React.useEffect(() => {
        if (!router.isReady) return;
          console.log("loading");
          getAnswer();
    }, [router.isReady]);
  return (
    <>
        <Head>
            <title>Edit Answer</title>
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
            Edit Answer Details
          </Typography>
          <Grid container spacing={3} sx={{mt:2}}>
        
        <Grid item xs={12}>
          <Typography sx={{  fontSize:20 }} gutterBottom color="text.secondary">
            Answer Description
          </Typography>
          <MyEditor data={setData} placeholder={answer?.body}/>
        </Grid>
        <Grid item xs={12}>
            <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
            >
            Edit Post
            </Button>
        </Grid>
      </Grid>
          
        </Paper>

            </Box>
        </Box>
    </>
  )
}
