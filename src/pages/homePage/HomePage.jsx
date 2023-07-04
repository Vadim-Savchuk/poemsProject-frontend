import { useEffect }                from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { getAllPoems, getAllselectedPoem } from '../../redux/features/poemsSlice';
import { checkIsAuth }                     from '../../redux/features/authSlice';

import MemoizedCard   from '../../components/card/Card';
import Error  from '../../components/error/Error';
import Loader from '../../components/loader/Loader';

import './HomePage.scss'

function HomePage() {
    const { poems, status, error } = useSelector(state => state.poems)
    const isAuth   = useSelector(checkIsAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllPoems())

        if(isAuth) {
            dispatch(getAllselectedPoem())
        }
    }, [dispatch, isAuth]);

    return (
        <div className='home-page'>

            {status === 'loading' && <Loader />}
            {error && <Error textError={error} />}
            {status === 'fulfilled' && !error && poems.length === 0 && <Error textError={'Покищо порожньо'}/>}

            <ul className='poems-list'>
                {poems?.map(poem => {
                    return <MemoizedCard
                        key={poem._id}
                        poem={poem}
                    />
                })}
            </ul>
        </div>
    );
}

export default HomePage;
