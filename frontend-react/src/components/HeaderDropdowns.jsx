import React from 'react'
import { FormControl, Select, MenuItem } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

function CategoriesDropdown() {
    const [cat, setCat] = React.useState('');
    const handleChange = (event) => {
        setCat(event.target.value);
    };
    return (
        <FormControl variant="standard" sx={{ width: 250 }}>
            <Select
                value={cat}
                onChange={handleChange}
                IconComponent={KeyboardArrowDownIcon}
                displayEmpty
                disableUnderline
                className='catDropdown'
                renderValue={(selected) => {
                    if (!selected) {
                        return <span className='catDropdown-text'>Browse categories</span>;
                    }
                    return selected;
                }}
            >
                <MenuItem value="Category 1">Category 1</MenuItem>
                <MenuItem value="Category 2">Category 2</MenuItem>
                <MenuItem value="Category 3">Category 3</MenuItem>
            </Select>
        </FormControl>
    );
}

export {
    CategoriesDropdown
}