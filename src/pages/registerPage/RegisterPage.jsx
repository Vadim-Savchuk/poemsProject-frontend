import { useEffect, useState }      from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate }        from 'react-router-dom';

import { registerUser } from '../../redux/features/authSlice';

import useMessageActions from '../../hocs/useMessageActions';

import './RegisterPage.scss'

function RegisterPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const messageActions = useMessageActions()

    const fetchRegisterUser = () => {
        try {
            if(!username && !password) {
                return messageActions('Всі поля мають бути заповнені')
            }

            dispatch(registerUser({ username, password }))
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
        <div className='register-page'>
            <div className='auth-offer'>
                <h2 className='title'>Реєстрація</h2>
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
                        placeholder='Password'
                        onChange={e => setPassword(e.target.value)}
                    />

                    <div className='auth_buttons'>
                        <button className='auth_button' onClick={fetchRegisterUser}>Зберегти</button>
                        <Link to='/login' className='auth_button'>Маю акаунт</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
