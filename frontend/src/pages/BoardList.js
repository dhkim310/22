import React, {useEffect, useState} from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css';
import {useLocation, useNavigate} from 'react-router-dom';
import {fetchBoardSearchList} from '../api/Board';
import {FormatDate} from "../component/FormatDate";
import PaginationButtons from '../component/PaginationButton';

function BoardList() {
    const [boardList, setBoardList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 (1부터 시작)
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation(); // 현재 위치 가져오기
    const isBoardPage = location.pathname === '/board'; // "/board" 경로에 있는지 확인

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchBoardSearchList(searchKeyword, currentPage - 1);
                setBoardList(data.list.content);
                setTotalPages(data.totalPageCount);
            } catch (error) {
                console.error('데이터 가져오기 오류:', error);
            }
        };

        fetchData(); // 데이터 가져오는 함수 호출
    }, [currentPage]);

    const navigate = useNavigate();
    const navigateToWrite = () => {
        navigate("/board-insert");
    };

    // 클릭 이벤트 핸들러 추가
    const handleNoticeClick = () => {
        navigate("/notice");
    };

    const handleBoardClick = () => {
        navigate("/board");
    };

    const handleItemClick = (id) => {
        navigate(`/board/${id}`)
    }

    const [searchKeyword, setSearchKeyword] = useState('');

    const handleSearch = async () => {
        try {
            const data = await fetchBoardSearchList(searchKeyword, currentPage - 1);
            setBoardList(data.list.content);
            setTotalPages(data.totalPageCount);
        } catch (error) {
            console.error('데이터 가져오기 오류:', error);
        }
    };

    useEffect(() => {
        const getWidth = () => {
            return window.innerWidth;
        };

        setIsMobile(getWidth() < 768);
    }, []);

    return (
        <div>
            <div style={{paddingTop: "50px", width: '100%', height: '100%'}}>
                <div className="d-flex justify-content-center"
                     style={{width: '100%', height: '100%', background: 'transparent'}}>
                    <div className="d-flex justify-content-start align-items-center"
                         style={{marginTop: "3%", marginLeft: "3%", width: '10%', height: '100%', background: 'white'}}>
                        <button
                            className="btn btn-primary d-flex justify-content-center align-items-center"
                            data-bss-hover-animate="pulse" type="button" onClick={navigateToWrite} style={{
                            background: "rgba(13,110,253,0)",
                            border: "2px ridge black",
                            width: "auto",
                            height: "auto",
                            color: "black",
                            paddingRight: 35,
                            paddingLeft: 35
                        }}>글쓰기
                        </button>
                    </div>
                    <div style={{background: 'white', width: '90%', height: '100%'}}>
                        <div
                            style={{width: '81%', height: '7%', borderBottom: '2px ridge rgba(128,128,128,0.26)'}}>
                            <div className="d-flex align-items-end" style={{width: '100%', height: '50%'}}>
                                <span style={{
                                    fontSize: '30px',
                                    fontWeight: 'bold',
                                    paddingTop: '0px',
                                    marginLeft: '41px'
                                }}>게시판</span>
                            </div>
                            <div className="d-flex justify-content-start align-items-end"
                                 style={{width: '100%', height: '50%'}}>
                                <div className="d-flex justify-content-start align-items-center"
                                     style={{width: '30%', height: '100%'}}>
                                    <button
                                        className={`btn btn-primary d-flex justify-content-center align-items-center ${isBoardPage ? 'active' : ''}`}
                                        data-bss-hover-animate="pulse"
                                        type="button"
                                        onClick={handleNoticeClick}
                                        style={{
                                            width: '150px',
                                            height: '30px',
                                            color: isBoardPage ? 'black' : 'darkgray',
                                            background: 'rgba(255, 255, 255, 1)',
                                            borderRadius: '0px',
                                            border: '0px none black',
                                        }}
                                    >
                                        공지사항
                                    </button>
                                    <button
                                        className={`btn btn-primary d-flex justify-content-center align-items-center ${isBoardPage ? 'active' : ''}`}
                                        data-bss-hover-animate="pulse"
                                        type="button"
                                        onClick={handleBoardClick}
                                        style={{
                                            width: '150px',
                                            height: '30px',
                                            color: isBoardPage ? 'darkgray' : 'black',
                                            background: 'rgba(255, 255, 255, 1)',
                                            borderRadius: '0px',
                                            borderStyle: 'none',
                                            borderColor: 'black',
                                            borderBottomStyle: 'none',
                                        }}
                                    >
                                        게시판
                                    </button>
                                </div>
                                <div className="d-flex justify-content-end align-items-center"
                                     style={{width: '70%', height: '100%'}}>
                                    <input type="search"
                                           onChange={(e) => setSearchKeyword(e.target.value)}
                                           onKeyUp={(e) => {
                                               if (e.key === 'Enter') {
                                                   handleSearch();
                                               }
                                           }}
                                           placeholder='제목으로 검색'
                                    />
                                    <button onClick={handleSearch} className="btn btn-primary text-nowrap" type="button"
                                            style={{
                                                background: 'url("img/Search.png") center / contain no-repeat',
                                                borderStyle: 'none',
                                                width: '54.3px',
                                                height: '36px',
                                                color: 'black'
                                            }}>
                                    </button>
                                </div>
                            </div>
                            <div className="d-flex justify-content-start align-items-end"
                                 style={{width: '100%', height: '50%'}}/>
                        </div>
                        <div style={{width: '100%', height: '100%'}}>
                            <div className="list-group d-flex" style={{
                                marginLeft: '0px',
                                marginRight: '0px',
                                maxHeight: '1000px',
                                paddingLeft: '40px'
                            }}>
                                <div
                                    className="list-group-item list-group-item-action d-flex flex-row align-items-start"
                                    style={{
                                        height: '30px',
                                        marginBottom: '0px',
                                        width: '80%',
                                        paddingTop: '0px',
                                        paddingRight: '0px',
                                        paddingBottom: '0px',
                                        paddingLeft: '0px',
                                        borderTopRightRadius: '0px',
                                        borderTopLeftRadius: '0px',
                                        borderStyle: 'solid',
                                        borderColor: 'black',
                                        borderRightStyle: 'none',
                                        borderLeftStyle: 'none',
                                        marginTop: '10px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center', // 추가: 세로 중앙 정렬
                                        textAlign: "center",
                                    }}>

                                    <div style={{width: '5%', fontWeight: 'bold', whiteSpace: "nowrap"}}>글번호</div>
                                    <div style={{width: '50%', fontWeight: 'bold', whiteSpace: "nowrap"}}>제목</div>
                                    <div style={{width: '10%', fontWeight: 'bold', whiteSpace: "nowrap"}}>조회수</div>
                                    <div style={{width: '10%', fontWeight: 'bold', whiteSpace: "nowrap"}}>작성자</div>
                                    <div style={{width: '35%', fontWeight: 'bold', whiteSpace: "nowrap"}}>작성일</div>
                                </div>

                                <div>
                                    {boardList.map((item) => (
                                        <button
                                            className="list-group-item list-group-item-action d-flex flex-row align-items-center"
                                            onClick={() => handleItemClick(item.id)} // 클릭 시 상세보기 페이지로 이동
                                            style={{
                                                height: '50px',
                                                marginBottom: '2px',
                                                marginTop: '15px',
                                                width: '80%',
                                                paddingTop: '0px',
                                                paddingRight: '0px',
                                                paddingBottom: '0px',
                                                paddingLeft: '0px',
                                                borderTopRightRadius: '0px',
                                                borderTopLeftRadius: '0px',
                                                borderStyle: 'none',
                                                borderColor: 'black',
                                                borderRightStyle: 'none',
                                                borderLeftStyle: 'none',
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            }}
                                            key={item.id}
                                        >
                                            <div style={{
                                                width: '5%',
                                                fontWeight: 'bold',
                                                textAlign: 'center'
                                            }}>{item.id}</div>
                                            <div style={{
                                                width: '50%',
                                                fontWeight: 'bold',
                                                textAlign: 'left'
                                            }}>{item.subject}</div>
                                            <div style={{
                                                width: '10%',
                                                fontWeight: 'bold',
                                                textAlign: 'center'
                                            }}>{item.views}</div>
                                            <div style={{
                                                width: '10%',
                                                fontWeight: 'bold',
                                                textAlign: 'center'
                                            }}>{item.writer}</div>
                                            <div style={{
                                                width: '35%',
                                                fontWeight: 'bold',
                                                textAlign: 'center'
                                            }}>{FormatDate(item.boardCreatedDate)}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{width: '100%', height: '50px'}}/>

            <div className="d-flex justify-content-start"
                 style={{background: 'rgba(111,66,193,0)', height: '109px'}}>
                <div style={{width: '42%', height: '100%'}}/>
                { /* PaginationButtons 컴포넌트 사용 */}
                <PaginationButtons
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default BoardList;