import './PoemFont.scss'

function PoemFont({ newPoemFont, setNewPoemFont }) {
    const fontsList = [
        'math',
        'cursive',
        "'Courier New', Courier, monospace",
        "Georgia, 'Times New Roman', Times, serif",
        'monospace',
    ]

    return (
        <div className='fonts'>
            {fontsList.map((font, index) => {
                return <button
                    key={index}
                    className='fonts_button'
                    style={{
                        fontFamily: font,
                        borderBottom: newPoemFont === font ? '2px solid black' : 'none',
                    }}
                    onClick={() => setNewPoemFont(font)}
                >Шрифт {index + 1}</button>
            })}
        </div>
    );
}

export default PoemFont;
