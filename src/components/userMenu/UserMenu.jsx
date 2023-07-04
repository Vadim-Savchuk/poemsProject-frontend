import { Link } from 'react-router-dom';

import './UserMenu.scss'

function UserMenu({ isAuth, logoutUser, firstLetter}) {
    
    return (
        <div className='user'>
            {isAuth
                ? (
                    <div className='user_auth'>
                        <div className='user-icon'>{firstLetter}</div>

                        <ul className='user_links'>
                            <li>
                                <Link to='/mypoems'>Всі вірші</Link>
                            </li>
                            <li>
                                <Link to='/selected'>Збережені</Link>
                            </li>
                            <li>
                                <button onClick={logoutUser}>Вийти</button>
                            </li>
                        </ul>
                    </div>
                )
                : <Link to={'/login'} className='button user_button--color'>Увійти</Link>
            }
        </div>
    );
}

export default UserMenu;
