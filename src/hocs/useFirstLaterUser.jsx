import { useSelector } from "react-redux";

function useFirstLaterUser() {
    const { user }    = useSelector(state => state.auth)
    const username    = user ? user.username : ''
    const firstLetter = username ? username.charAt(0) : '';

    return firstLetter;
}

export default useFirstLaterUser;
