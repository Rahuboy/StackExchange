import * as React from 'react';
import Head from 'next/head'
import Sidebar from '../../../components/sidebar'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useRouter} from 'next/router'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles';
import MyEditor from "../../../components/editor"
import TextField from '@mui/material/TextField';
import AutoTags from '../../../components/autoTags';
import { Button } from '@mui/material';

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
    // const [activeStep, setActiveStep] = React.useState(0);
    const router = useRouter()
    const {userid} = router.query
    const theme = useTheme();
    const [Tags, setTag] = React.useState();
    const [data, setEditorData] = React.useState("");
    const [title, setTitle] = React.useState("");

    const handleSubmit = (event) => {
      event.preventDefault();
      const tagParse = Tags?.tags.map((tag)=>{
        return "<"+tag.split(":")[1]+">";
      })
      // const tagSQL = tagParse?.join("")
      async function postQuestion(){
        const res = await fetch('http://localhost:5002/question/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            owner_user_id: userid,
            title: title,
            body: data,
            tags: tagParse?.join("")
          })
        })
        console.log(await res.json());
        if (res.status === 200) {
          router.push("/dashboard");
        }
      }
      postQuestion();
    }
  return (
    <>
        <Head>
            <title>Create Question</title>
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
          <Typography component="h1" variant="h4" align="center">
            Question Details
          </Typography>
          <Grid spacing={3} container>
            <Grid item xs={12}>
            <TextField
              required
              label="Question Title"
              fullWidth
              autoComplete="given-title"
              variant="outlined"
              onChange={(e)=>setTitle(e.target.value)}
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            
            <Typography sx={{  fontSize:20 }} gutterBottom color="text.secondary">
              Question Description
            </Typography>

            <MyEditor data={setEditorData}/>
          </Grid>
            <Grid item xs={12}>
            <AutoTags setDetails={setTag}/>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Post Question
              </Button>
            </Grid>
          </Grid>
        </Paper>

            </Box>
        </Box>
    </>
  )
}
