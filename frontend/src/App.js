import ProizvodiLista from './components/ProizvodiLista';
import DodajProizvod from './components/DodajProizvod';

function App() {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Web shop – kozmetika</h1>

            <DodajProizvod />

            <hr />

            <ProizvodiLista />
        </div>
    );
}

export default App;
