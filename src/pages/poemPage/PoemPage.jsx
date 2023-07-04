import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams }   from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import axios from '../../utils/axios'

import useMessageActions from '../../hocs/useMessageActions'

import { likedPoem, removePoem, selectedPoem } from '../../redux/features/poemsSlice'
import { checkIsAuth } from '../../redux/features/authSlice'

import './PoemPage.scss'

import authorImg   from './img/quill-pen.png'
import likesImg    from './img/heart.png'
import redLikesImg from './img/redheart.png'
import starImg     from './img/star.png'
import darkStarImg from './img/darkstar.png'
import viewsImg    from './img/witness.png'
import removeImg   from './img/remove.png'

function PoemPage() {
    const [poem, setPoem] = useState(null)
    const [isInitialRender, setIsInitialRender] = useState(true)

    const { user }       = useSelector(state => state.auth)
    const allSelectPoems = useSelector(state => state.poems.selectedPoem)
    const isAuth         = useSelector(checkIsAuth)

    const messageActions = useMessageActions()

    const isSelected = allSelectPoems.some(p => p._id === poem?._id)
    const isLiked    = poem?.likes.some(p => p === user?._id)

    const params   = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Основний вірш
    const fetchPoemById = useCallback(async () => {
        try {
            const { data } = await axios.get(`/poem/${params.id}`)
                setPoem(data)

                if (isInitialRender) {
                    setIsInitialRender(false)

                    fetchIncrementViews()
                }
        } catch (error) {
            console.log(error);
        }
    }, [params.id, isInitialRender])

    // Збільшення переглядів при першому рендерингу
    const fetchIncrementViews = useCallback(async () => {
        await axios.put(`/poem/${params.id}/increment`)

    }, [params.idfetchIncrementViews])

    // Видалити поему
    const fetchRemovePoem = useCallback(() => {
        dispatch(removePoem(poem?._id));
        navigate('/');
      }, [dispatch, navigate, poem]);

    // Лайкнути поему
    const fetchLikedPoem = useCallback(async () => {
        if(!isAuth) {
            return messageActions('Треба бути авторизованим')
        }

        await dispatch(likedPoem(poem?._id))

        fetchPoemById()
    }, [dispatch, fetchPoemById, isAuth, messageActions, poem])

    // Додати до обраного
    const fetchSelectedPoem = useCallback(() => {
        if (!isAuth) {
          return messageActions('Треба бути авторизованим');
        }
      
        dispatch(selectedPoem(poem?._id));
      }, [dispatch, isAuth, messageActions, poem]);

    useEffect(() => {
        fetchPoemById()
    }, [fetchPoemById])

    return (
        <div className='poem-page'>
            <div className='poem-text'>
                <h2 className='title'>{poem?.title}</h2>
                <div className='all-poem'>{poem?.poem}</div>
            </div>
            <div className='poem-info'>
                <div className="poem-box">
                    <div className='author'>
                        <img src={authorImg} alt='author' />
                        <div>{poem?.username}</div>
                    </div>
                    <div className='likes'>
                        <button onClick={fetchLikedPoem}>
                            <img src={isLiked ? redLikesImg : likesImg} alt='author' />
                        </button>
                        <div>{poem?.likes.length}</div>
                    </div>
                    <div className='views'>
                        <img src={viewsImg} alt='author' />
                        <div>{poem?.views}</div>
                    </div>
                    <div className='select'>
                        <button onClick={fetchSelectedPoem}>
                            <img src={isSelected ? darkStarImg : starImg} alt='author' />
                        </button>
                    </div>
                    {
                        user?._id === poem?.author && (
                            <div className='remove'>
                                <button onClick={fetchRemovePoem}>
                                    <img src={removeImg} alt='author' />
                                    <span>Видалити</span>
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className='poem-text'>
                <h2 className='title'>Опис</h2>
                <div className='all-poem'>{poem?.description}</div>
            </div>
        </div>
    );
}

export default PoemPage;
