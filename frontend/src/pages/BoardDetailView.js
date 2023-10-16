import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css';
import {fetchBoardDetail} from '../api/Board';
import {FormatDate} from '../component/FormatDate';

function BoardDetail() {
    const navigate = useNavigate(); // useNavigate를 항상 호출
    const location = useLocation(); // 현재 위치 가져오기
    const {id} = useParams();
    const [content, setContent] = useState(null); // 초기에 null로 설정
    const pathname = location.pathname;
    const isBoardPage = pathname.startsWith('/api/board/');
    useEffect(() => {
        const fetchBoardDetailData = async () => {
            try {
                const response = await fetchBoardDetail(id);
                setContent(response); // 전체 데이터를 설정
            } catch (error) {
                console.error('게시글 내용을 가져오는 중 오류 발생:', error);
            }
        };
        fetchBoardDetailData();
    }, [id]);

    if (content === null) {
        return <div>Loading...</div>;
    }

    const navigateToWrite = () => {
        navigate('/board-insert');
    };

    const handleNoticeClick = () => {
        navigate("/notice"); // "/api/notice" 대신 실제 경로로 수정
    };

    const handleBoardClick = () => {
        navigate("/board"); // "/api/board" 대신 실제 경로로 수정
    };

    return (
        <div className="d-xxl-flex justify-content-xxl-start"
             style={{width: "100%", background: "rgba(0,0,0,0)", height: 2000}}>
            <div style={{height: "100%", width: "2%"}}/>

            {/* 좌측 사이드바 */}
            <div style={{
                height: "100%",
                width: "11%",
                background: "rgba(13,110,253,0)",
                borderRight: "2px ridge rgba(128,128,128,0.32)"
            }}>
                {/* 글쓰기 버튼 */}
                <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                     style={{background: "rgba(102,16,242,0)", width: "100%", height: "7%"}}>
                    <button
                        className="btn btn-primary" data-bss-hover-animate="pulse" type="button"
                        onClick={navigateToWrite} style={{
                        background: "rgba(13,110,253,0)",
                        border: "2px ridge black",
                        width: "auto",
                        height: "auto",
                        color: "black",
                        paddingRight: 35,
                        paddingLeft: 35
                    }}>
                        글쓰기
                    </button>
                </div>

                {/* 게시판 선택(공지사항, 사내게시판) */}
                <div style={{width: "100%", background: "rgba(13,110,253,0)", height: "7%"}}>
                    <button className="btn btn-primary text-start d-xxl-flex justify-content-xxl-start"
                            data-bss-hover-animate="pulse" type="button" onClick={handleNoticeClick} style={{
                        background: "rgba(13,110,253,0)",
                        borderStyle: "none",
                        color: isBoardPage ? 'darkgray' : 'black',
                        width: "auto",
                        height: "auto",
                        paddingLeft: 0
                    }}>공지사항
                    </button>
                    <button className="btn btn-primary d-xxl-flex" data-bss-hover-animate="pulse" type="button"
                            onClick={handleBoardClick}
                            style={{
                                width: '150px',
                                height: '30px',
                                color: isBoardPage ? 'black' : 'darkgray',
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
            </div>

            {/* 게시글 내용 부분 */}
            <div style={{width: "88%", height: "100%"}}>
                <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{
                    marginTop: "1%",
                    marginBottom: "1%",
                    background: "rgba(13,110,253,0)",
                    width: "100%",
                    height: 70
                }}>
                    <div style={{height: "100%", width: "4%", background: "rgba(220,53,69,0)"}}/>
                    <span style={{width: "auto", height: "auto", fontWeight: "bold", fontSize: 30}}>게시판</span>
                </div>

                {/* 게시글 내용 */}
                <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                     style={{background: "rgba(13,110,253,0)", width: "100%", height: "4%"}}>
                    <div style={{height: "100%", width: "4%", background: "rgba(220,53,69,0)"}}/>
                    <div style={{height: "100%", width: "45%"}}>
                        <div className="d-xxl-flex align-items-xxl-center" style={{
                            width: "100%",
                            height: "60%",
                            borderTop: "2px ridge rgba(128,128,128,0.32)",
                            borderBottomWidth: 0
                        }}>
                            <span style={{
                                width: "auto",
                                height: "auto",
                                fontSize: 18,
                                fontWeight: "bold"
                            }}>{content.subject}</span>
                        </div>
                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                             style={{width: "100%", height: "40%", borderBottom: "2px ridge rgba(128,128,128,0.32)"}}>
                            <div style={{
                                textAlign: "center",
                                height: "auto",
                                width: 45,
                                marginRight: "1%",
                            }}>
                                <span className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                      style={{fontSize: 15, fontWeight: "bold"}}>{content.writer}</span>
                            </div>
                            <div style={{
                                paddingLeft: "4px",
                                textAlign: "center",
                                height: "auto",
                                width: 45,
                            }}>
                                <span className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                      style={{fontSize: 13}}>작성일</span>
                            </div>
                            <div style={{fontSize: 11, marginLeft: "2%"}}>{FormatDate(content.boardModifiedDate)}</div>
                            <div style={{fontSize: 11, marginLeft: "2%"}}>
                                {content.boardModifiedDate ? FormatDate(content.boardModifiedDate) : null}
                            </div>
                        </div>
                    </div>

                    {/* 첨부파일 부분 */}
                    <div style={{height: "100%", width: "47%"}}>
                        <div className="d-xxl-flex justify-content-xxl-end align-items-xxl-center"
                             style={{width: "85%", height: "60%", borderTop: "2px ridge rgba(128,128,128,0.32)"}}>
                            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button" style={{
                                background: "rgba(13,110,253,0)",
                                color: "black",
                                borderStyle: "none"
                            }}>첨부파일(0)
                            </button>
                        </div>
                        <div className="d-xxl-flex justify-content-xxl-end align-items-xxl-center"
                             style={{width: "85%", height: "40%", borderBottom: "2px ridge rgba(128,128,128,0.32)"}}>
                            <div style={{
                                textAlign: "left",
                                height: "auto",
                                width: 45,
                            }}>
                                <span className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                      style={{fontSize: 11}}>조회수</span>
                            </div>
                            <div style={{
                                paddingRight: "3%",
                                borderRight: "3px ridge rgba(128,128,128,0.32)",
                                fontSize: 11,
                                marginRight: "3%"
                            }}>{content.views}
                            </div>
                            <div style={{
                                textAlign: "left",
                                height: "auto",
                                width: 45,
                            }}>
                                <span className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                      style={{fontSize: 11}}>좋아요</span>
                            </div>
                            <div style={{
                                paddingRight: "3%",
                                borderRight: "3px ridge rgba(128,128,128,0.32)",
                                fontSize: 11,
                                marginRight: "3%"
                            }}>11
                            </div>
                            <div style={{
                                textAlign: "left",
                                height: "auto",
                                width: 45,
                            }}>
                                <span className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                      style={{fontSize: 11}}>댓글</span>
                            </div>
                            <div style={{paddingRight: "3%", fontSize: 11}}>2</div>
                        </div>
                    </div>
                </div>

                {/* 게시글 내용(텍스트, 에디터 등) */}
                <div
                    style={{
                        marginTop: "2%",
                        marginLeft: "4%",
                        minHeight: "50%",
                        width: "85%",
                        height: "30%",
                        border: "2px ridge rgba(128,128,128,0.32)",
                        padding: "10px",
                        overflow: "auto"
                    }}
                >
                    {/* html 렌더링 */}
                    <div dangerouslySetInnerHTML={{__html: content.content}}>
                    </div>
                </div>

                {/* 댓글 부분 */}
                <div>
                    {/* 댓글을 추가하세요 */}
                </div>
            </div>
        </div>
    );
}

export default BoardDetail;
