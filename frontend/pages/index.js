import Head from 'next/head'
// import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Sidebar from '../components/sidebar'
import BackToTop from '../components/backtotop'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, makeStyles, ThemeProvider } from '@mui/material/styles';
import BGimage from '../public/images/bg1.jpg'
import styles from '../styles/Home.module.css'
import Explore from '@mui/icons-material/Explore'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import * as React from 'react';
import { useRouter } from 'next/router';

export default function Home({ allPostsData }) {
  const router = useRouter()

  async function actualGetUser() {
      try {
      const response = await fetch(`http://localhost:5002/me`, {
        method: "GET",
        credentials: 'include'
      });
      if (response.status === 200) {
        console.log("AutoLogin");
        router.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }

      return ;
  }
  React.useEffect(() => {
    actualGetUser();
  }, [])

  return (
    // <Layout home>
    <>
    
      <Head>
        <title>Home</title>
      </Head>
      {/* <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={12}
          sx={{
            // backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundImage: `url(${BGimage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        </Grid> */}
        <Box sx={{
          
            // backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundImage: `url("images/bg2_cropped.jpg")`,
            // backgroundColor: 'red',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize:'cover',
            // backgroundPosition: 'center',
            height: '100vh',
        }}>
          <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid item sm={4} md ={8}/>
            <Grid item sm={4} md={4} >
              <Grid item sm={12} md={5}  sx={{ml:"30%",my:"25%"}}>
              <Button className={styles.button} sx={{marginBottom:1}} href="/signup" ><LockOpenRoundedIcon/> SignUp</Button>
              <Button className={styles.button} sx={{marginBottom:1}} href="/signin" ><LoginRoundedIcon/> Login</Button>
              <Button className={styles.button} sx={{marginBottom:1}} href="/explore" ><Explore/> Explore</Button>

              {/* <button className={styles.button} role="button">Button 33</button> */}
              </Grid>
            </Grid>
          </Grid>
        </Box>
        
      {/* <div className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
      </div>
      <div className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </div> */}
    </>
    // </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
