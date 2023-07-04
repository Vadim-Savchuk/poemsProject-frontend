import Header       from '../header/Header'
import MessagesList from '../messagesList/MessagesList';

import './Loyout.scss'

function Loyout({ children }) {
    return (
        <div className='wrapper'>
            <Header />
            <main className="container">
                {children}
                <MessagesList />
            </main>
        </div>
    );
}

export default Loyout;
