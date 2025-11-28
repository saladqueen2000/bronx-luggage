import React from 'react'
import '../assets/style/Header.css';
import {
    HeaderSearchBar
} from './Searchbar.jsx'
import { HeaderLogo } from './Logo.jsx'
import {
    HeaderBtnGroup,
    StoreBtnGroup,
    ReturnBtn
} from './HeaderBtnGroup.jsx';
import {
    CategoriesDropdown,
    DropdownGroup
} from './HeaderDropdowns.jsx';


export default function Header() {
    return (
        <header className='header'>
            <div className="header-upper">
                <span
                    style={{
                        marginLeft: "40px",
                        marginTop: "7.5px"
                    }}
                >
                    Need help? Call us: (+84) 0817070903
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
                <DropdownGroup />
                <ReturnBtn />
            </div>
        </header>
    );
}