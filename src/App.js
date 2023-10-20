import Header from "./component/layout/Header";
import Footer from "./component/layout/Footer";
import Sidebar from "./component/pages/HOD/layout/Sidebar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserProfile from "./component/pages/UserProfile/UserProfile";
function App() {
  return (
    <div>
      {/* <Header />
      <Footer /> 
      <Sidebar />*/}
      
      <UserProfile />
    </div>
    
  );
}

export default App;
