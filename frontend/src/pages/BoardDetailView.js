import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css';
import {commentDelete, fetchBoardDetail, postComment} from '../api/Board';
import {FormatDate} from '../component/FormatDate';
import Comment from '../component/Comment';

function BoardDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const [commentText, setCommentText] = useState('');
    const {id} = useParams();
    const [content, setContent] = useState(null);
    const pathname = location.pathname;
    const isBoardPage = pathname.startsWith('/api/board/');
    const [moreBtn, setMoreBtn] = useState("댓글보기 ▼");
    const [isView, setIsView] = useState(false);
    const [visibleComments, setVisibleComments] = useState(5); // 초기에 5개의 댓글만 보이도록 설정

    // 게시글 데이터 가져오기
    useEffect(() => {
        const fetchBoardDetailData = async () => {
            try {
                const response = await fetchBoardDetail(id);
                setContent(response);
            } catch (error) {
                console.error('게시글 내용을 가져오는 중 오류 발생:', error);
            }
        };
        fetchBoardDetailData();
    }, [id]);

    const handleCommentView = () => {
        if (moreBtn === "댓글보기 ▼") {
            setMoreBtn("접기 ▲");
            setIsView(true);
        } else {
            setMoreBtn("댓글보기 ▼");
            setIsView(false);
        }
    };

    const handleCommentDelete = (commentId) => {
        commentDelete(commentId)
            .then(() => {
                // 삭제 성공 시 필요한 작업 수행
                // 예를 들어, 댓글 목록을 업데이트하는 로직 추가
                alert("댓글 삭제");
                const updatedContent = {...content};
                updatedContent.boardCommentList = updatedContent.boardCommentList.filter(
                    (comment) => comment.commentId !== commentId
                );
                setContent(updatedContent); // content를 업데이트하여 화면을 다시 그림
            })
            .catch((error) => {
                alert(commentId)
                alert(error); // 삭제 실패 또는 오류 메시지 표시
            });
    };

    const handleCommentSubmit = () => {
        postComment(id, commentText)
            .then((data) => {
                const updatedContent = {...content};
                updatedContent.boardCommentList.unshift({
                    commentId: data.commentId,
                    comment: commentText,
                    // 아래의 정보는 필요에 따라 설정해 주세요
                    writer: data.writer, // 댓글 작성자
                    createdDate: new Date().toJSON(), // 댓글 작성 일자
                });
                setContent(updatedContent);
                setCommentText(''); // 입력창 초기화
            })
            .catch((error) => {
                alert(error); // 오류 메시지 표시
            });
    };

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

    // 버튼 클릭 시 스크롤을 맨 위로 올려주는 함수
    const goTop = () => {
        window.scrollTo({top: 10, behavior: "smooth"});
    };

    const goComment = () => {
        window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});
    };

    const handleCommentChange = (e) => {
        setCommentText(e.target.value); // 댓글 입력창의 텍스트 업데이트
    };

    const handleMoreComments = () => {
        setVisibleComments((prevVisibleComments) => prevVisibleComments + 5);
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
                display: "flex", // Flex 컨테이너로 설정
                flexDirection: "column", // 수직 정렬을 위해 column 방향으로 설정
                alignItems: "center", // 수평 중앙 정렬
            }}>
                {/* 글쓰기 버튼 */}
                <div className="d-xxl-flex justify-content-center align-items-xxl-center"
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
                <div className="d-xxl-flex justify-content-center align-items-xxl-center"
                     style={{width: "100%", background: "rgba(13, 110, 253, 0)", height: "2%"}}>
                    <div style={{width: "50%", display: "flex", justifyContent: "center"}}>
                        <button className="btn btn-primary text-start d-xxl-flex justify-content-xxl-start"
                                data-bss-hover-animate="pulse" type="button" onClick={handleNoticeClick}
                                style={{
                                    color: isBoardPage ? 'darkgray' : 'black',
                                    background: "rgba(13, 110, 253, 0)",
                                    borderStyle: "none",
                                    width: "auto",
                                    height: "auto",
                                }}>공지사항
                        </button>
                    </div>
                </div>
                <div className="d-xxl-flex justify-content-center align-items-xxl-center"
                     style={{width: "100%", background: "rgba(13, 110, 253, 0)", height: "2%"}}>
                    <div style={{width: "50%", display: "flex", justifyContent: "center"}}>
                        <button className="btn btn-primary text-start d-xxl-flex justify-content-xxl-start"
                                data-bss-hover-animate="pulse" type="button" onClick={handleNoticeClick}
                                style={{
                                    color: isBoardPage ? 'black' : 'darkgray',
                                    background: 'rgba(255, 255, 255, 1)',
                                    width: "auto",
                                    height: "auto",
                                    borderRadius: '0px',
                                    borderStyle: 'none',
                                    borderColor: 'black',
                                    borderBottomStyle: 'none',
                                }}
                        >게시판
                        </button>
                    </div>
                </div>
            </div>

            {/* 게시글 내용 부분 */}
            <div style={{width: "75%", height: "100%"}}>
                <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{
                    marginTop: "1%",
                    background: "rgba(13,110,253,0)",
                    width: "100%",
                    height: 70
                }}>
                    <div style={{height: "100%", width: "4%", background: "rgba(220,53,69,0)"}}/>
                    <span style={{width: "auto", height: "auto", fontWeight: "bold", fontSize: 35}}>게시판</span>
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
                                fontSize: 25,
                                fontWeight: "bold"
                            }}>{content.subject}</span>
                        </div>
                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                             style={{width: "100%", height: "40%", borderBottom: "2px ridge rgba(128,128,128,0.32)"}}>
                            <div style={{
                                textAlign: "center",
                                height: "auto",
                                width: "auto",
                                marginRight: "1%",
                            }}>
                                <span className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                      style={{fontSize: 20, fontWeight: "bold"}}>{content.writer}</span>
                            </div>
                            <div style={{fontSize: 14, marginLeft: "2%"}}>{FormatDate(content.boardCreatedDate)}</div>
                            <div style={{fontSize: 14, marginLeft: "2%"}}>
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
                                      style={{fontSize: 14}}>조회수</span>
                            </div>
                            <div style={{
                                paddingRight: "3%",
                                borderRight: "3px ridge rgba(128,128,128,0.32)",
                                fontSize: 14,
                                marginRight: "3%"
                            }}>{content.views}
                            </div>
                            <div style={{
                                textAlign: "left",
                                height: "auto",
                                width: 45,
                            }}>
                                <span className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                      style={{fontSize: 14}}>좋아요</span>
                            </div>
                            <div style={{
                                paddingRight: "3%",
                                borderRight: "3px ridge rgba(128,128,128,0.32)",
                                fontSize: 14,
                                marginRight: "3%"
                            }}>11
                            </div>
                            <div style={{
                                textAlign: "left",
                                height: "auto",
                                width: 45,
                            }}>
                                <span className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                      style={{fontSize: 14}}>댓글
                                </span>
                            </div>
                            <div style={{paddingRight: "3%", fontSize: 14}}>
                                {content && content.boardCommentList && content.boardCommentList.length > 0 ? (
                                    <button
                                        onClick={goComment}
                                        style={{
                                            width: "auto",
                                            height: "auto",
                                            fontSize: 12,
                                            background: "transparent",
                                            border: "none",  // 테두리 없애기
                                            paddingRight: 20,
                                            paddingLeft: 20,
                                            paddingTop: 6,
                                            paddingBottom: 6,
                                            marginBottom: "2%",
                                            color: "black"
                                        }}
                                    >({content.boardCommentList.length})</button>
                                ) : (
                                    <button onClick={goComment}>(0)</button>
                                )}
                            </div>
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
                        overflow: "auto",
                    }}
                >
                    {/* html 렌더링 게시글 내용 */}
                    <div dangerouslySetInnerHTML={{__html: content.content}}>
                    </div>
                </div>
                {/* 댓글 부분 */}
                <div>
                    {/* 댓글을 추가하세요 */}
                    <div
                        className="d-xxl-flex justify-content-xxl-start"
                        style={{width: "100%", height: "87%"}}
                    >
                        <div style={{width: "4%", height: "100%"}}/>
                        <div style={{width: "85%", height: "100%"}}>
                            <div style={{width: "100%", height: "3%"}}/>
                            <textarea
                                style={{marginTop: "4%", width: "100%", height: "15vh"}}
                                value={commentText}
                                onChange={handleCommentChange}
                                placeholder={"댓글 입력창"}
                            />
                            <div style={{width: "100%", height: "3%"}}/>
                            <div style={{width: "100%", height: "8%"}}>
                                <div
                                    className="d-xxl-flex justify-content-xxl-end align-items-xxl-center"
                                    style={{width: "100%", height: "40%"}}
                                >
                                    <div className="btn-group" role="group"/>
                                    <button
                                        className="btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center"
                                        data-bss-hover-animate="pulse"
                                        style={{
                                            width: "auto",
                                            height: "auto",
                                            fontSize: 12,
                                            background: "black",
                                            borderStyle: "none",
                                            paddingRight: 20,
                                            paddingLeft: 20,
                                            paddingTop: 6,
                                            paddingBottom: 6,
                                            marginBottom: "2%",
                                        }}
                                        onClick={handleCommentSubmit}
                                    >
                                        등록
                                    </button>
                                </div>
                            </div>
                            <div
                                className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                style={{
                                    width: "100%",
                                    height: "3%",
                                    background: "rgba(102,16,242,0)",
                                }}
                            >
                                <div
                                    className="d-xxl-flex align-items-xxl-center"
                                    style={{
                                        height: "auto",
                                        width: 115,
                                        borderRight: "2px ridge rgba(128,128,128,0.32)"
                                    }}
                                >
                                    <span>전체 댓글</span>
                                </div>
                                <div
                                    className="d-xxl-flex justify-content-xxl-center align-items-xxl-center"
                                    style={{width: 100, height: "auto"}}
                                >
                                </div>
                                <div
                                    className="d-xxl-flex justify-content-xxl-end align-items-xxl-center"
                                    style={{
                                        width: "93%",
                                        height: "100%",
                                        background: "rgba(13,110,253,0)"
                                    }}
                                >
                                    <div
                                        className="d-xxl-flex justify-content-xxl-center align-items-xxl-center"
                                        style={{
                                            height: "auto",
                                            width: 115,
                                            borderRight: "2px ridge rgba(128,128,128,0.32)"
                                        }}
                                    >
                                        <span
                                            onClick={goTop}
                                            style={{
                                                marginRight: "2%",
                                                fontSize: "16px",
                                                whiteSpace: "nowrap",
                                                cursor: "pointer", // 마우스 포인터 모양 변경
                                                color: "black", // 마우스 오버 시 색상 변경
                                            }}
                                            onMouseEnter={(e) => {
                                                // 마우스 오버 시 색상 변경
                                                e.target.style.color = "red";
                                            }}
                                            onMouseLeave={(e) => {
                                                // 마우스 이탈 시 원래 색상으로 복원
                                                e.target.style.color = "black";
                                            }}
                                        >본문보기</span>
                                    </div>
                                    <div
                                        className="d-xxl-flex justify-content-xxl-center align-items-xxl-center"
                                        onClick={handleCommentView}
                                        style={{height: "auto", width: 115}}
                                    >
                                        <span>{moreBtn}</span>
                                    </div>
                                </div>
                            </div>
                            {isView && content.boardCommentList.slice(0, visibleComments).map((comment, i) => (
                                <Comment key={i} comment={comment} onDelete={handleCommentDelete}/>
                            ))}
                            {isView && content.boardCommentList.length > visibleComments && (
                                <button
                                    className="btn btn-primary"
                                    data-bss-hover-animate="pulse"
                                    type="button"
                                    onClick={handleMoreComments} // 더보기 버튼을 클릭하면 handleMoreComments 함수가 호출됩니다.
                                    style={{
                                        background: "rgba(13, 110, 253, 0)",
                                        color: "darkgray",
                                        borderStyle: "none",
                                    }}
                                >
                                    ...더보기
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoardDetail;
