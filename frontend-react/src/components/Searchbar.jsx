import '@fontsource/roboto/400.css';
import { TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function HeaderSearchBar() {
    return (
        <div style={{
            height: "50px",
            width: "500px",
            backgroundColor: "white",
            borderRadius: "15px",
            display: "flex"
        }}>
            <TextField
                noValidate
                autoComplete="off"
                variant="outlined"
                label="Search any things"
                sx={{
                    height: "50px",
                    maxHeight: "50px",
                    width: "350px",
                    maxWidth: "350px",
                    backgroundColor: "white",
                    borderRadius: "15px",
                    fontFamily: "Poppins",
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
                        color: "black", // màu label bình thường
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "transparent", // màu label khi focus
                    }
                }}
            />
            <Button
                variant="contained"
                sx={{
                    height: "50px",
                    maxHeight: "50px",
                    width: "150px",
                    maxWidth: "150px",
                    backgroundColor: "#EDA415",
                    borderRadius: "15px",
                    fontFamily: "Poppins",
                    fontSize: "1rem",
                    textTransform: "none",
                }}
            >
                Search
            </Button>
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
                sx={{
                    height: "70px",
                    maxHeight: "70px",
                    width: "500px",
                    maxWidth: "500px",
                    backgroundColor: "#EDA415",
                    borderRadius: "22.5px",
                    marginLeft: "100px",
                    fontFamily: "Poppins",
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