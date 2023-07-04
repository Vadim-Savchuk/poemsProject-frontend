import './NotPage.scss'

function NotPage() {
    return (
        <div className='not-page'>
            <div className='error-message'>
                <h3 className='title'>Error 404</h3>
                <div>Такої адреси не існує</div>
            </div>
        </div>
    );
}

export default NotPage;
