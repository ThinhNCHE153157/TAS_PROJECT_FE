import Header from './component/layout/Header';
import Footer from './component/layout/Footer';
import Sidebar from './component/pages/HOD/layout/Sidebar';
import { BrowserRouter as Routers } from 'react-router-dom';
import Userdetail from './component/pages/HOD/UserDetail';
import TheRouter from './component/router/router';
function App() {
    return (
        <div className="App">
            {/* <Header />
      <Footer /> */}
            {/* <Sidebar /> */}
            <demor />
            <Routers>
                <TheRouter /> {/*Use the renamed component here */}
            </Routers>
        </div>
    );
}

export default App;
