import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { loginUser } from '../../redux/features/authSlice';

import useMessageActions from '../../hocs/useMessageActions'

import './LoginPage.scss'

function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { user } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const messageActions = useMessageActions()


    const fetchLoginUser = () => {
        try {
            if(!username && !password) {
                return messageActions('Всі поля мають бути заповнені')
            }

            dispatch(loginUser({ username, password }))
            setUsername('')
            setPassword('')
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user, navigate])

    return (
        <div className='login-page'>
            <div className='auth-offer'>
                <h2 className='title'>Авторизація</h2>
                <form className='auth-form' onSubmit={e => e.preventDefault()}>

                    <input
                        type="text"
                        value={username}
                        placeholder='Username'
                        onChange={e => setUsername(e.target.value)}
                    />

                    <input
                        type="text"
                        value={password}
                        placeholder='Username'
                        onChange={e => setPassword(e.target.value)}
                    />

                    <div className='auth_buttons'>
                        <button className='auth_button' onClick={fetchLoginUser}>Увійти</button>
                        <Link to='/register' className='auth_button'>Зареєструватись</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
