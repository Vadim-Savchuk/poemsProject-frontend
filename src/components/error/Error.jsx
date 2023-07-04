import './Error.scss'

function Error({textError}) {
    return (
        <div className='error-offer'>
            <h2 className='error-title'>{textError}</h2>
        </div>
    );
}

export default Error;
