import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from './pages/Login';
import Main from "./pages/Main";
import Header from "./component/Header";
import PrivateRoute from "./routes/PrivateRoute";
import ReactBigCalendar from "./pages/ReactBigCalendar";
import FixInfo from "./pages/FixInfo";
import Approval from "./pages/Approval";
import ApprovalComplete from "./pages/ApprovalComplete"
import ApprovalDetail from "./pages/ApprovalDetail"
import SweetAlert from "./component/SweetAlert"
import NoticeInsert from "./pages/NoticeInsert"
import NoticeList from "./pages/NoticeList"
import BoardInsert from "./pages/BoardInsert";
import BoardList from "./pages/BoardList";
import MemoComponent from "./component/MemoComponent"
import Hrm from "./pages/Hrm"
import Reshuffle from "./pages/Reshuffle"
import EmpList from "./pages/EmpList";
function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>

                <Route element={<PrivateRoute/>}>
                    <Route path="/main" element={<Main/>}/>
                    <Route path="/approval" element={<Approval/>}/>
                    <Route path="/approval-complete" element={<ApprovalComplete/>}/>
                    <Route path="/approval-detail" element={<ApprovalDetail/>}/>
                    <Route path="/fix-info" element={<FixInfo/>}/>
                    <Route path="/schedule" element={<ReactBigCalendar/>}/>
                    <Route path="/sweetalert" element={<SweetAlert/>}/>
                    <Route path="/notice-insert" element={<NoticeInsert/>}/>
                    <Route path="/board-insert" element={<BoardInsert/>}/>
                    <Route path="/board" element={<BoardList/>}/>
                    <Route path="/notice" element={<NoticeList/>}/>
                    <Route path="/hrm" element={<Hrm/>}/>
                    <Route path="/memo" element={<MemoComponent/>}/>
                    <Route path="/reshuffle/:id" element={ <Reshuffle />}/>
                    <Route path="/emp" element={ <EmpList/>}/>

                </Route>
            </Routes>
        </Router>

    );
}

export default App;
