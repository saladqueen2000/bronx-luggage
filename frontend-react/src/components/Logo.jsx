import Logo from '../assets/images/logo_images.jpg';
import { Link } from 'react-router-dom';

function HeaderLogo() {
    return (
        <Link to="/" className='headerLogo'>
            <img src={Logo} alt="Logo" className='headerLogo-img'/>
            <span className='headerLogo-text'>Bronx Luggage</span>
        </Link>
    );
}

function FooterLogo() {
    return (
        <Link
            to="/"
            style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
            }}
        >
            <img
                src={Logo}
                alt="Logo"
                style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "25px",
                }}
            />
            <span
                style={{
                    paddingLeft: "7.5px",
                    color: "#1B5A7D",
                    fontFamily: "Poppins",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                }}
            >
                Bronx Luggage
            </span>
        </Link>
    );
}





export {
    HeaderLogo,
    FooterLogo
}
