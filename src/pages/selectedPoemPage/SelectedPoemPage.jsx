import { useSelector } from 'react-redux';
import Card from '../../components/card/Card'

import './SelectedPoemPage.scss'


function SelectedPoemPage() {
    const { selectedPoem } = useSelector(state => state.poems)

    return (
        <div className='selected-poem-page'>
            <h2 className='title'>Збережені</h2>

            <ul className='poems-list'>
                {selectedPoem?.map(poem => {
                    return <Card
                        key={poem._id}
                        poem={poem}
                    />
                })}
            </ul>
        </div>
    );
}

export default SelectedPoemPage;
