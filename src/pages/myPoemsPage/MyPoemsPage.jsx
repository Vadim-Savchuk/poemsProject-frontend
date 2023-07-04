import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import axios from '../../utils/axios'

import Card from '../../components/card/Card'
import Loader from '../../components/loader/Loader'
import Error from '../../components/error/Error'

import useFirstLaterUser from '../../hocs/useFirstLaterUser'

import './MyPoemsPage.scss'

function MyPoemsPage() {
    const [myPoems, setMyPoems] = useState([])
    const [loading, setloading] = useState(false)
    const [error, setError] = useState('')

    const popularPoems = myPoems.sort((a, b) => b.views - a.views).slice(0, 5)
    const totalPoemsViews = myPoems.reduce((count, poem) => count + poem.views, 0)
    const totalPoemsLikes = myPoems.reduce((count, poem) => count + poem.likes.length, 0)

    const firstLatter = useFirstLaterUser()

    const { username } = useSelector(state => state.auth.user) || ''
    const { selectedPoem } = useSelector(state => state.poems)

    const fetchMyAllPoems = async () => {
        try {
            const { data, status } = await axios.get('poem/user/me')

            if (status !== 200) {
                setError('Сталась помилка не вдалось отримати інформацію')
            }

            setMyPoems(data)
            setloading(false)
        } catch (error) {
            console.log(`Помилка при створені користувача на Frontend у функції fetchMyAllPoems. Error ${error}`);
            setError('Сталась помилка не вдалось отримати інформацію')
            setloading(false)
        }
    }

    useEffect(() => {
        fetchMyAllPoems()
        setloading(true)
    }, [])

    return (
        <div className='my-poems-page'>
            <div className='poems'>

                {loading && <Loader />}
                {error && <Error textError={error} />}

                {!loading && !error && myPoems.length !== 0 &&
                    <>
                        {/* Популярні Вірші */}
                        <div className='popular-poems box'>
                            <h2 className='title'>Популярні вірші</h2>
                            <ul className='popular-poems_lisy list'>
                                {
                                    popularPoems.map(popularPoem => {
                                        return <Card key={popularPoem._id} poem={popularPoem} />
                                    })
                                }
                            </ul>
                        </div>

                        {/* Всі Мої вірші */}
                        <div className='my-all-poems box'>
                            <h2 className='title'>Всі мої вірші</h2>
                            <ul className='popular-poems_lisy list'>
                                {
                                    myPoems.map(poem => {
                                        return <Card
                                            key={poem._id}
                                            poem={poem}
                                        />
                                    })
                                }
                            </ul>
                        </div>
                    </>
                }

                {!loading && !error && myPoems.length === 0 &&
                    <Error textError={'У вас покищо пусто'} />
                }
            </div>

            <div className="info-offer">
                <div className='info'>
                    <div className='user-icon'>{firstLatter}</div>
                    <div className='username'>{username}</div>
                    <div>Всього Переглядів {totalPoemsViews}</div>
                    <div>Всього Вподобань {totalPoemsLikes}</div>
                    <div>Всього Збережень {selectedPoem.length}</div>
                    <div>Всього Віршів {myPoems.length}</div>
                </div>
            </div>
        </div>
    );
}

export default MyPoemsPage;
