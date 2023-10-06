import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Main from "./pages/Main";
import Header from "./component/Header";
import PrivateRoute from "./routes/PrivateRoute";
import ReactBigCalendar from "./pages/ReactBigCalendar";
import SweetAlert from "./component/SweetAlert"


function App() {
  return (
    <Router>
        <Header />
        <Routes>
            <Route path="/" element={ <Login /> }/>
            <Route path="/login" element={ <Login /> }/>

            <Route element={<PrivateRoute />}>
            <Route path="/main" element={ <Main /> }/>
            <Route path="/schedule" element={ <ReactBigCalendar />}/>
            <Route path="/sweetalert" element={ <SweetAlert />}/>
            </Route>
        </Routes>
    </Router>

  );
}

export default App;
