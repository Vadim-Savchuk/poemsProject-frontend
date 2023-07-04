import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getUser } from '../redux/features/authSlice';

import NotPage          from '../pages/notPage/NotPage';
import HomePage         from '../pages/homePage/HomePage';
import PoemPage         from '../pages/poemPage/PoemPage';
import LoginPage        from '../pages/loginPage/LoginPage';
import AddPoemPage      from '../pages/addPoemPage/AddPoemPage';
import MyPoemsPage      from '../pages/myPoemsPage/MyPoemsPage';
import RegisterPage     from '../pages/registerPage/RegisterPage';
import SelectedPoemPage from '../pages/selectedPoemPage/SelectedPoemPage';

import Loyout from '../components/loyaut/Loyout';

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser())
    }, [])

    return (
        // <BrowserRouter basename='/poemsProject-frontend/'>
        <BrowserRouter>
            <Loyout>
                <Routes>
                    <Route path='/'         element={<HomePage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/login'    element={<LoginPage />} />
                    <Route path='/:id'      element={<PoemPage />} />
                    <Route path='/add'      element={<AddPoemPage />} />
                    <Route path='/mypoems'  element={<MyPoemsPage />} />
                    <Route path='/selected' element={<SelectedPoemPage />} />
                    <Route path='*'         element={<NotPage />} />
                </Routes>
            </Loyout>
        </BrowserRouter>
    );
}

export default App;
