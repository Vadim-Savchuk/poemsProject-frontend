import { memo, useCallback }        from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link }                     from 'react-router-dom'

import { likedPoem, selectedPoem } from '../../redux/features/poemsSlice'
import { checkIsAuth }             from '../../redux/features/authSlice'

import useMessageActions from '../../hocs/useMessageActions'

import './Card.scss'

import likeImg     from './img/heart.png'
import redLikeImg  from './img/redheart.png'
import viewImg     from './img/witness.png'
import starImg     from './img/star.png'
import darkStarImg from './img/darkstar.png'
import authorImg   from './img/quill-pen.png'

function Card({ poem }) {
    const dispatch       = useDispatch()
    const allSelectPoems = useSelector(state => state.poems.selectedPoem)
    const { user }       = useSelector(state => state.auth)
    const isAuth         = useSelector(checkIsAuth)

    const actionMessage = useMessageActions()
    
    const isSelected = (allSelectPoems.some(p => p._id === poem._id))
    const isLiked    = (poem.likes.some(p => p === user?._id))

    const updatePoemHandler = useCallback((e) => {
        e.preventDefault()
        if(!isAuth) {
            return actionMessage('Потрібно бути авторизованим')
        }
        if (e.target.closest('button').className === 'like') {
            return dispatch(likedPoem(poem._id))
        }
        if (e.target.closest('button').className === 'selected') {
            return dispatch(selectedPoem(poem._id))
        }
    }, [isAuth, poem._id])

    return (
        <li className='card'>
            <Link to={`/${poem._id}`} style={{ background: poem.background, fontFamily: poem.font }}>
                {/* Шторка читати повністю */}
                <div className='card_more'>
                    <h3>Читати повністю</h3>
                </div>

                {/* Головна інформація про вірш*/}
                <h3 className='card_title'>{poem.title}</h3>
                <div className='card_text'>{poem.poem}</div>

                {/* Шторка з інформацію про лайки і тд.. */}
                <div className='card_info'>
                    <div className='card_buttons'>
                        <div className='card_button'>
                            <button className='like' onClick={updatePoemHandler}>
                                <img src={isLiked ? redLikeImg : likeImg} alt="Like" />
                            </button>
                            <div>{poem.likes.length}</div>
                        </div>
                        <div className='card_button'>
                            <img src={viewImg} alt="Views" />
                            <div>{poem.views}</div>
                        </div>
                        <div className='card_button'>
                            <button className='selected' onClick={updatePoemHandler}>
                                <img src={isSelected ? darkStarImg : starImg} alt="Like" />
                            </button>
                        </div>
                    </div>
                    <div className='card_author'>
                        <img src={authorImg} alt="Author" />
                        <div>{poem.username}</div>
                    </div>
                </div>
            </Link>
        </li>
    );
}

const MemoizedCard = memo(Card)

export default MemoizedCard;
