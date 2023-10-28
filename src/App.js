import { BrowserRouter as Routers } from 'react-router-dom';
import TheRouter from './component/router/router';
function App() {
    return (
        <div className="App">
            <Routers>
                <TheRouter />
            </Routers>
        </div>
    );
}

export default App;
