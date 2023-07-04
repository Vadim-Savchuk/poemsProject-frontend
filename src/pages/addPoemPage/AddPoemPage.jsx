import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { addPoem } from '../../redux/features/poemsSlice';
import { checkIsAuth } from '../../redux/features/authSlice';

import Colors from '../../components/colors/Colors';
import PoemFont from '../../components/poemFont/PoemFont';

import useMessageActions from '../../hocs/useMessageActions';

import './AddPoemPage.scss'

function AddPoemPage() {
    const isAuth = useSelector(checkIsAuth)

    const [newPoemTitle, setNewPoemTitle] = useState('')
    const [newPoemText, setNewPoemText] = useState('')
    const [newPoemDesc, setNewPoemDesc] = useState('')
    const [newPoemBg, setNewPoemBg] = useState('')
    const [newPoemFont, setNewPoemFont] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const messageActions = useMessageActions()

    const fetchAddPoem = () => {
        if (!isAuth) {
            return messageActions('Ви маєте бути авторизовані')
        }

        if (!newPoemTitle && !newPoemText) {
            return messageActions('Поля "Назва" та "Текст" мають бути заповнені')
        }

        const newPoem = {
            title: newPoemTitle,
            poem: newPoemText,
            description: newPoemDesc,
            background: newPoemBg,
            font: newPoemFont,
        }

        dispatch(addPoem(newPoem))
        navigate('/',)
    }

    return (
        <div className='add-poem-page'>
            <div className='add_form-offer'>
                <form className='add_form' onSubmit={e => e.preventDefault()}>

                    {/* Title */}
                    <label htmlFor="title">Назва вашого віршу</label>
                    <input
                        id='title'
                        type="text"
                        value={newPoemTitle}
                        placeholder='Назва'
                        onChange={e => setNewPoemTitle(e.target.value.trim())}
                    />

                    {/* Text */}
                    <label htmlFor="text">Текст вашого віршу</label>
                    <textarea
                        id="text"
                        value={newPoemText}
                        placeholder='Текст віршу'
                        onChange={e => setNewPoemText(e.target.value.trim())}
                    ></textarea>

                    {/* Description */}
                    <label htmlFor="description">Текст вашого віршу</label>
                    <textarea
                        id="description"
                        value={newPoemDesc}
                        placeholder='Опис вашого віршу'
                        onChange={e => setNewPoemDesc(e.target.value.trim())}
                    ></textarea>

                    <button onClick={fetchAddPoem}>Зберегти</button>
                </form>
            </div>

            {/* Settings */}
            <div className='add_settings-offer'>

                <h3 className='title'>Колір фону</h3>
                <Colors newPoemBg={newPoemBg} setNewPoemBg={setNewPoemBg} />

                <h3 className='title'>Шрифти</h3>
                <PoemFont newPoemFont={newPoemFont} setNewPoemFont={setNewPoemFont} />

            </div>
        </div>
    );
}

export default AddPoemPage;
