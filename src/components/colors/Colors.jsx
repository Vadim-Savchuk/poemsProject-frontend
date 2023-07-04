import './Colors.scss'

function Colors({ newPoemBg, setNewPoemBg }) {
    const colorsList = ['#d6d67a', '#fffa41', '#ffafff', '#ef7d6a', '#639b58', '#cee5f7', '#c6ffc1', '#ff5e9a', '#e64f32']

    return (
        <div className='colors'>
            {colorsList.map((color, index) => {
                return <button
                    key={index}
                    className='colors_button'
                    style={{
                        background: color,
                        border: newPoemBg === color ? ' 2px solid black' : ''
                    }}
                    onClick={() => setNewPoemBg(color)}
                ></button>
            })}
        </div>
    );
}

export default Colors;
