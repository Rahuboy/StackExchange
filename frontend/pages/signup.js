import * as React from 'react';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import dynamic from "next/dynamic";
import MyEditor from "../components/editor"
import { useRouter } from 'next/router';
const theme = createTheme();

export default function SignUpSide() {
  const [aboutme, setAboutMe] = React.useState("");
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    async function postDetails(){
      const response = await fetch(`http://localhost:5002/user/create`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          display_name: data.get('display_name'),
          location: data.get('location'),
          profile_image_url: data.get('profile_image_url'),
          website_url: data.get('website_url'),
          user_name: data.get('username'),
          password: data.get('password') || data.get('username'),
          about_me: aboutme,
        }),
      });
      console.log(await response.json());
      if (response.status === 200) {
        router.push("/dashboard");
      }
      else {
        alert("Sign up failed. Try a different username.");
      }
    }
    postDetails();
  };
  return (
    <>
    <Head>
      <title>Sign Up</title>
    </Head>
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        {/* <Grid item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        /> */}
        <Grid item xs={12} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="display_name"
                label="Display Name"
                type="text"
                id="display_name"
                autoComplete="current-display-name"
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                defaultValue={"Hyderabad"}
                name="location"
                label="Location"
                type="text"
                id="location"
                autoComplete="current-location"
                autoFocus

              />
              <TextField
                margin="normal"
                fullWidth
                defaultValue={""}
                id="profile_image_url"
                label="Profile image URL (Optional)"
                name="profile_image_url"
                autoComplete="current-profile-image-url"
                autoFocus
                type="url"
              />
              <TextField
                margin="normal"
                fullWidth
                defaultValue={""}
                id="website_url"
                label="Website URL (Optional)"
                name="website_url"
                autoComplete="website-url"
                type="url"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <MyEditor data={setAboutMe}/>
              
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me : Have not implemented"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onSubmit={handleSubmit}
              >
                Sign Up
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="/signin" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </>
  );
}