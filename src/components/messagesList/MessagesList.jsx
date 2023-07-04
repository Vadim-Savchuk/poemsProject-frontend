import { useSelector } from 'react-redux';
import './MessagesList.scss'

function MessagesList() {
    const { messages } = useSelector(state => state.messages)

    return (
        <div className="offer">
            <ul className='messages-list'>
                {messages.map((message, index) => {
                    return <li key={index} className='message'>{message}</li>
                }).slice(-5)}
            </ul>
        </div>
    );
}

export default MessagesList;
