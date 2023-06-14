import * as React from 'react';
import Sidebar from '../components/sidebar'
import Head from 'next/head';
import Box from '@mui/material/Box';
import UserDetails from '../components/userDetails';
import { Button } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';


export default function Dashboard(props) {
  const [userdetails,setUserDetails] = React.useState();
  const router = useRouter();


  async function actualGetUser() {
      try {
      const response = await fetch(`http://localhost:5002/me`, {
        method: "GET",
        credentials: 'include'
      });
      if (response.status === 401) {
        console.log("Unauthorized");
        router.push("/signin");
      }
      setUserDetails(await response.json());
    } catch (err) {
      console.log(err);
    }

      return ;
  }
  React.useEffect(() => {
    actualGetUser();
  }, [])

    return (
    <>
    <Head>
        <title>Dashboard</title>
    </Head>
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      {/* <Button onClick={(e)=> {actualGetUser(e)}}>Click</Button> */}
      
      {(userdetails)?<UserDetails id={userdetails.id}/>:<></>}
    </Box>
    </>
    );
}