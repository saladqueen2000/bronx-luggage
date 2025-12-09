import React from 'react'
import '../assets/style/Header.css';
import {
    HeaderSearchBar
} from './Searchbar.jsx'
import { HeaderLogo } from './Logo.jsx'
import {
    HeaderBtnGroup,
    StoreBtnGroup,
    ReturnBtn,
    LinkBtnGroup
} from './HeaderBtnGroup.jsx';
import {
    CategoriesDropdown
} from './HeaderDropdowns.jsx';
import { Box } from '@mui/material'


export default function Header() {
    return (
        <header className='header'>
            <div className="header-upper">
                <span className='header-upper-call'>
                    <Box
                        component="span"
                        sx={{
                            display: { xs: 'none', sm: 'inline' }
                        }}
                    >
                        Need help? Call us:
                    </Box>
                    (+84) 0817070903
                </span>
                <StoreBtnGroup />
            </div>
            <div className='header-middle'>
                <HeaderLogo />
                <HeaderSearchBar />
                <HeaderBtnGroup />
            </div>
            <div className="header-lower">
                <CategoriesDropdown />
                <LinkBtnGroup />
                <ReturnBtn />
            </div>
        </header>
    );
}

//git add .
//git commit -m "linhtinh"
//git push