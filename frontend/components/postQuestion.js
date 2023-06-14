import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles';
import MyEditor from "./editor"
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


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


export default function QuestionDetails() {
  const theme = useTheme();
  const [Tags, setTag] = React.useState([]);
  const [data, setData] = React.useState("");
  const handleChange = (event) => {
      const {
      target: { value },
      } = event;
      setTag(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
      );
  };
  return (
    <React.Fragment>
      {/* <Typography variant="h6" gutterBottom>
        Details
      </Typography> */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="questionTitle"
            name="questionTitle"
            label="Question Title"
            fullWidth
            autoComplete="given-title"
            variant="outlined"
            multiline
          />

        </Grid>
        <Grid item xs={12}>
          <Typography sx={{  fontSize:20 }} gutterBottom color="text.secondary">
            Question Description
          </Typography>
          <MyEditor data={setData}/>
        </Grid>

        
        <Grid item xs={12}>
          <FormControl sx={{ width: '50%', ml:'25%' }}>
          <InputLabel id="demo-multiple-chip-label">Select Tags</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={Tags}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Select Tags" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {tags.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, Tags, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
        </FormControl>
        </Grid>
        
      </Grid>
    </React.Fragment>
  );
}