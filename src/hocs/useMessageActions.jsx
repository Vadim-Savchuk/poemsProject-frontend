import { useDispatch } from 'react-redux';
import { addMessages, removeMessages } from '../redux/features/messagesSlice'

function useMessageActions() {
    const dispatch = useDispatch();

    const addMessageFunc = (message) => {
        dispatch(addMessages(message));
        setTimeout(() => {
            dispatch(removeMessages(message));
        }, 10000);
    };

    return addMessageFunc;
}

export default useMessageActions;