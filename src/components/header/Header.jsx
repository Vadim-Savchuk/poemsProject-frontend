import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import useFirstLaterUser from '../../hocs/useFirstLaterUser';

import { checkIsAuth, logout } from '../../redux/features/authSlice';

import Logo     from '../logo/Logo';
import Search   from '../search/Search';
import UserMenu from '../userMenu/UserMenu';

import './Header.scss'

function Header() {
    const isAuth = useSelector(checkIsAuth)

    const dispatch    = useDispatch()
    const firstLetter = useFirstLaterUser()

    const logoutUser = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
    }

    return (
        <header className='header'>

            {/* Logo */}
            <Logo />

            {/* Button Add */}
            <Link to={'/add'} className='button'>Додати</Link>

            {/* Search */}
            <Search />

            {/* User Menu */}
            <UserMenu isAuth={isAuth} logoutUser={logoutUser} firstLetter={firstLetter}/>

        </header >
    );
}

export default Header;
