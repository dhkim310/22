import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from './pages/Login';
import Main from "./pages/Main";
import Header from "./component/Header";
import PrivateRoute from "./routes/PrivateRoute";
import ReactBigCalendar from "./pages/ReactBigCalendar";
import FixInfo from "./pages/FixInfo";
import ApprovalList from "./pages/ApprovalList";
import ApprovalComplete from "./pages/ApprovalComplete"
import ApprovalDetail from "./pages/ApprovalDetail"
import ApprovalCompleteDetail from "./pages/ApprovalCompleteDetail"
import SweetAlert from "./component/SweetAlert"
import NoticeInsert from "./pages/NoticeInsert"
import NoticeList from "./pages/NoticeList"
import BoardInsert from "./pages/BoardInsert";
import BoardList from "./pages/BoardList";
import MemoComponent from "./component/MemoComponent"
import Hrm from "./pages/Hrm"
import Reshuffle from "./pages/Reshuffle"
import EmpSalaryList from "./pages/EmpSalaryList";
import EmpSalary from "./pages/EmpSalary";
import MovieList from "./pages/MovieList";
import NoticeDetail from "./pages/NoticeDetailView";
import BoardDetail from "./pages/BoardDetailView";
import DepartmentCommuteList from "./pages/DepartmentCommuteList";
import CommuteList from "./pages/CommuteList";
import MemberList from "./pages/MemberList";
import MessageList from "./component/MessageList";
import MessageSend from "./component/MessageSend";
import ServiceMovieList from "./pages/ServiceMovieList";
import MemberDetail from "./pages/MemberDetail";
import ApprovalInsert from "./pages/ApprovalInsert";
import BoardUpdate from "./pages/BoardUpdate";
import NoticeUpdate from "./pages/NoticeUpdate";
import MessageDetail from "./component/MessageDetail";
import MovieDetail from "./pages/MovieDetail";
import VacationUpdateComponent from "./component/VacationUpdateComponent";

function App() {

    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>

                <Route element={<PrivateRoute/>}>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/main" element={<Main/>}/>
                    <Route path="/approval-insert" element={<ApprovalInsert/>}/>
                    <Route path="/approval-list" element={<ApprovalList/>}/>
                    <Route path="/approval-complete" element={<ApprovalComplete/>}/>
                    <Route path="/approval/:id" element={<ApprovalDetail/>}/>
                    <Route path="/approval-complete/:id" element={<ApprovalCompleteDetail/>}/>
                    <Route path="/fix-info" element={<FixInfo/>}/>
                    <Route path="/schedule" element={<ReactBigCalendar/>}/>
                    <Route path="/sweetalert" element={<SweetAlert/>}/>
                    <Route path="/notice-insert" element={<NoticeInsert/>}/>
                    <Route path="/board-insert" element={<BoardInsert/>}/>
                    <Route path="/board" element={<BoardList/>}/>
                    <Route path="/board/:id" element={<BoardDetail/>}/>
                    <Route path="/board-update/:id" element={<BoardUpdate/>}/>
                    <Route path="/notice" element={<NoticeList/>}/>
                    <Route path="/notice/:id" element={<NoticeDetail/>}/>
                    <Route path="/notice-update/:id" element={<NoticeUpdate/>}/>
                    <Route path="/hrm" element={<Hrm/>}/>
                    <Route path="/memo" element={<MemoComponent/>}/>
                    <Route path="/reshuffle/:id" element={<Reshuffle/>}/>
                    <Route path="/salary" element={<EmpSalaryList/>}/>
                    <Route path="/salary/list/:id" element={<EmpSalary/>}/>
                    <Route path="/movie" element={<MovieList/>}/>
                    <Route path="/department-hr" element={<DepartmentCommuteList/>}/>
                    <Route path="/commute/:id" element={<CommuteList/>}/>
                    <Route path="/member" element={<MemberList/>}/>
                    <Route path="/message" element={<MessageList/>}/>
                    <Route path="/message-send" element={<MessageSend/>}/>
                    <Route path="/message/:id" element={<MessageDetail/>}/>
                    <Route path="/member/detail/:id" element={<MemberDetail/>}/>
                    <Route path="/serviceMovie" element={<ServiceMovieList/>}/>
                    <Route path="/movieDetail/:id" element={<MovieDetail/>}/>
                    <Route path="/vacation/:id" element={<VacationUpdateComponent/>}/>
                </Route>
            </Routes>
        </Router>

    );
}

export default App;
