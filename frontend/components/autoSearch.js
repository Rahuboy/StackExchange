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
    const [tagList, setTagList] = useState([{count: 0, excerpt_post_id: 0, id: 0, tag_name: "No options", wiki_post_id: 0}]);
    const [tagVal, setTagVal] = useState()
    const [userList, setUserList] = useState([{id:0,account_id:0,reputation:0,views:0,down_votes:0,up_votes:8,display_name:"0",location:"0",profile_image_url:null,website_url:"0",about_me:"0"}])
    const [userVal, setUserVal] = useState()

    /* useEffect */
    useEffect(() => {
        /* fetch for tag */
        if((tagVal !== undefined) && (tagVal !== ''))
        {
            fetch(`http://localhost:5002/autocomplete/tag/${tagVal}/10`,{
                method: 'GET',
                credentials: 'include'
            }).then(
                response => response.json()
            ).then(
                data => {
                    console.log("Data: " + data);
                    setTagList(data)
                    console.log("Current value: " + tagVal)
                }
            )
        }
        else
        {
            fetch(`http://localhost:5002/autocomplete/tag/a/10`,{
                method: 'GET',
                credentials: 'include'
            }).then(
                response => response.json()
            ).then(
                data => {
                    console.log("Data: " + data);
                    setTagList(data)
                    console.log("Current value: " + tagVal)
                }
            )
        }

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
    }, [tagVal, userVal])

    /* Continuously handle changes while typing */
    async function handleChangeTags(e) {
        await setTagVal(e.target.value);
        console.log('Value is:', e.target.value);
    }

    async function handleChangeUsers(e) {
        await setUserVal(e.target.value);
        console.log('Value is:', e.target.value);
    }

    /* Form vars */
    const {handleSubmit, control} = useForm();

    /* Return */
    return <form onSubmit={handleSubmit(data => props.setDetails(data))}>
        <Controller
            name="tags"
            control={control}
            render={({ field: { onChange, value } }) => (
                <Autocomplete
                multiple
                id="tags-filled"
                options={tagList.map((option) => option.id + ":" + option.tag_name)}
                renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    devChip (option, getTagProps, index)
                ))
                }
                renderInput={(params) => (
                    <TextField
                    {...params}
                    variant="filled"
                    label="Tags?"
                    placeholder="Enter here..."
                    value={tagVal}
                    onChange={handleChangeTags}
                    />
                )}
                onChange={(_,data) => {
                    onChange(data)
                    return data
                }}
                />
            )}
        />
        <br/>
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
        <Button type='submit'>Ask</Button>       
    </form>
}