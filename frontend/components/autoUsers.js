import React, {useEffect, useState} from 'react';
import {Autocomplete, TextField, Chip, Button } from '@mui/material';
import {useForm, Controller} from 'react-hook-form';

/* Develop a chip */
function devChip (name, getTagProps, index) {
    return <Chip variant="outlined" label={name} {...getTagProps({ index })} color='primary' />
}

/* Final */
export default function AutoSearch(props) {
    /* State variables */
    const [userList, setUserList] = useState([{id:0,account_id:0,reputation:0,views:0,down_votes:0,up_votes:8,display_name:"0",location:"0",profile_image_url:null,website_url:"0",about_me:"0"}])
    const [userVal, setUserVal] = useState()

    /* useEffect */
    useEffect(() => {
        /* fetch for user */
        if((userVal !== undefined) && (userVal !== ''))
        {
            fetch(`http://localhost:5002/autocomplete/user/${userVal}/10`,{
                method: 'GET',
                credentials: 'include'
            }).then(
                response => response.json()
            ).then(
                data => {
                    console.log("Data: " + data);
                    setUserList(data)
                    console.log("Current value: " + userVal)
                }
            )
        }
        else
        {
            fetch(`http://localhost:5002/autocomplete/user/a/10`,{
                method: 'GET',
                credentials: 'include'
            }).then(
                response => response.json()
            ).then(
                data => {
                    console.log("Data: " + data);
                    setUserList(data)
                    console.log("Current value: " + userVal)
                }
            )
        }
    }, [userVal])

    /* Continuously handle changes while typing */
    async function handleChangeUsers(e) {
        await setUserVal(encodeURIComponent(e.target.value));
        console.log('Value is:', e.target.value);
    }

    /* Form vars */
    const {handleSubmit, control} = useForm();

    /* Return */
    return <form onSubmit={handleSubmit(data => props.setDetails(data))}>
        <Controller
            name="users"
            control={control}
            render={({ field: { onChange, value } }) => (
                <Autocomplete
                id="tags-filled"
                options={userList.map((option) => option.id + ":" + option.display_name)}
                renderInput={(params) => (
                    <TextField
                    {...params}
                    variant="filled"
                    label="Users?"
                    placeholder="Enter here..."
                    value={userVal}
                    onChange={handleChangeUsers}
                    />
                )}
                onChange={(_,data) => {
                    onChange(data)
                    return data
                }}
                />
            )}
        />
        <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            type='submit'
          >
            Set Users
          </Button>      
    </form>
}