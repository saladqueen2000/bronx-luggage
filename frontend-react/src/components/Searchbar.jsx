import React from 'react'
import '@fontsource/roboto/400.css';
import { TextField, Button, Autocomplete } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";

function HeaderSearchBar() {
    const [list, setList] = React.useState([]);
    const find = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/products');
            const data = response.data.slice(0, 8);
            setList(data)
        } catch (error) {
            console.error('Error:', error.response?.data);
        }
    };
    React.useEffect(() => {
        find();
    }, [])

    const suggestions = list.map((p) => p.name)

    return (
        <div className='headerSearchBar-container'>
            <Autocomplete
                disablePortal
                freeSolo
                options={suggestions}
                className='headerSearchBar-textfield'
                renderInput={(params) =>
                    <TextField
                        {...params}
                        noValidate
                        autoComplete="off"
                        variant="outlined"
                        label="Search any things"
                        className='headerSearchBar-textfield'
                    />}
            />
            <Button variant="contained" className='headerSearchBtn'>Search</Button>
        </div>
    )
}

function FooterSearchBar() {
    return (
        <div>
            <TextField
                noValidate
                autoComplete="off"
                variant="outlined"
                label="Email address"
                InputProps={{
                    endAdornment: (
                        <SendIcon style={{ color: "white", marginRight: "10px", marginTop: "10px" }} />
                    )
                }}
                className='footerSearchBar'
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "transparent", // màu viền bình thường
                        },
                        "&:hover fieldset": {
                            borderColor: "transparent", // viền khi hover
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "transparent", // màu viền khi focus
                        },
                    },
                    // đổi màu label
                    "& .MuiInputLabel-root": {
                        color: "white", // màu label bình thường
                        top: "7.5px",
                        left: "10px",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "transparent", // màu label khi focus
                    },
                }}
            />
        </div>
    )
}

export {
    HeaderSearchBar,
    FooterSearchBar
}