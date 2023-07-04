import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import './Search.scss'

function Search() {
    const [searchInput, setSearchInput] = useState('')

    const { poems } = useSelector(state => state.poems)

    const searchPoems = poems?.filter(poem => {
        if (poem.title.toLowerCase().includes(searchInput.toLowerCase())) {
            return true
        }

        return false
    })

    const clearinputSearch = () => {
        setSearchInput('')
    }

    return (
        <div className="search">
            <form className='search_form'>
                <input
                    type="text"
                    value={searchInput}
                    className='search_input'
                    onChange={e => setSearchInput(e.target.value)}
                />
                {searchInput && <button className='search_clear-button' onClick={clearinputSearch}>&#215;</button>}
            </form>
            <ul className='search_result'>
                {searchInput &&
                    searchPoems.map(poem => {
                        return <li key={poem._id}>
                            <Link to={poem._id} onClick={clearinputSearch}>{poem.title}</Link>
                        </li>
                    })
                }
            </ul>
        </div>
    );
}

export default Search;
