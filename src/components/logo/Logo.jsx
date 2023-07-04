import { Link } from 'react-router-dom'

import './Logo.scss'

import imgLogo from './img/logo.png'

function Logo() {
    return (
        <Link to={'/'} className='logo'>
            <img src={imgLogo} alt="Logo" />
        </Link>
    );
}

export default Logo;
