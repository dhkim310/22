import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css';
import {fetchNoticeDelete, fetchNoticeDetail} from '../api/Notice';
import {FormatDate} from '../component/FormatDate';
import DownloadFile from '../component/DownloadFile';

function NoticeDetail() {
    const navigate = useNavigate(); // useNavigate를 항상 호출
    const location = useLocation(); // 현재 위치 가져오기
    const {id} = useParams();
    const [content, setContent] = useState(null); // 초기에 null로 설정
    const pathname = location.pathname;
    const isNoticePage = pathname.startsWith('/api/notice/');
    const [fileListIsOpen, setFileListIsOpen] = useState(false);

    useEffect(() => {
        const noticeDetail = async () => {
            try {
                const data = await fetchNoticeDetail(id);
                setContent(data); // 전체 데이터를 설정
            } catch (error) {
                console.error('게시글 내용을 가져오는 중 오류 발생:', error);
            }
        };
        noticeDetail();
    }, [id]);

    if (content === null) {
        return <div>Loading...</div>;
    }

    const navigateToWrite = () => {
        navigate('/notice-insert');
    };

    const handleNoticeClick = () => {
        navigate("/notice"); // "/api/notice" 대신 실제 경로로 수정
    };

    const handleBoardClick = () => {
        navigate("/board"); // "/api/board" 대신 실제 경로로 수정
    };

    const openFileList = () => {
        setFileListIsOpen(true);
    };

    const closeFileList = () => {
        setFileListIsOpen(false);
    };

    const handleUpdate = (id) => {
        navigate(`/notice-update/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await fetchNoticeDelete(id);
            navigate('/notice'); // 삭제 성공시 공지사항 리스트로 이동
        } catch (error) {
            alert('삭제할 수 없는 글입니다.', error);
        }
    };

    return (
        <div
            style={{
                paddingTop: "50px",
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            }}
        >
            <div className="d-flex justify-content-start"
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
                    <div className="d-flex justify-content-center align-items-center"
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
                    <div className="d-flex justify-content-center align-items-center"
                         style={{width: "100%", background: "rgba(13, 110, 253, 0)", height: "2%"}}>
                        <div style={{width: "50%", display: "flex", justifyContent: "center"}}>
                            <button className="btn btn-primary text-start d-flex justify-content-start"
                                    data-bss-hover-animate="pulse" type="button" onClick={handleNoticeClick}
                                    style={{
                                        color: isNoticePage ? 'black' : 'darkgray',
                                        background: 'rgba(255, 255, 255, 1)',
                                        borderStyle: "none",
                                        width: "auto",
                                        height: "auto",
                                    }}>공지사항
                            </button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center"
                         style={{width: "100%", background: "rgba(13, 110, 253, 0)", height: "2%"}}>
                        <div style={{width: "50%", display: "flex", justifyContent: "center"}}>
                            <button className="btn btn-primary text-start d-flex justify-content-start"
                                    data-bss-hover-animate="pulse" type="button" onClick={handleBoardClick}
                                    style={{
                                        color: isNoticePage ? 'darkgray' : 'black',
                                        background: "rgba(13, 110, 253, 0)",
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
                    <div className="d-flex justify-content-start align-items-center" style={{
                        marginTop: "1%",
                        marginBottom: "1%",
                        background: "rgba(13,110,253,0)",
                        width: "100%",
                        height: 70
                    }}>
                        <div style={{height: "100%", width: "4%", background: "rgba(220,53,69,0)"}}/>
                        <span style={{width: "auto", height: "auto", fontWeight: "bold", fontSize: 30}}>공지사항</span>
                    </div>

                    {/* 게시글 내용 */}
                    <div className="d-flex justify-content-start align-items-center"
                         style={{background: "rgba(13,110,253,0)", width: "100%", height: "4%"}}>
                        <div style={{height: "100%", width: "4%", background: "rgba(220,53,69,0)"}}/>
                        <div style={{height: "100%", width: "45%"}}>
                            <div className="d-flex align-items-center" style={{
                                width: "100%",
                                height: "60%",
                                borderTop: "2px ridge rgba(128,128,128,0.32)",
                                borderBottomWidth: 0
                            }}>
                            <span style={{
                                width: "auto",
                                height: "auto",
                                fontSize: 20,
                                fontWeight: "bold",
                            }}>{content.subject}</span>
                            </div>
                            <div className="d-flex justify-content-start align-items-center"
                                 style={{
                                     width: "100%",
                                     height: "40%",
                                     borderBottom: "2px ridge rgba(128,128,128,0.32)"
                                 }}>
                                <div style={{
                                    textAlign: "center",
                                    height: "auto",
                                    width: 45,
                                    marginRight: "1%",
                                }}>
                                <span className="d-flex justify-content-start align-items-center"
                                      style={{whiteSpace: "nowrap", fontSize: 15, fontWeight: "bold"}}>{content.writer}</span>
                                </div>
                                <div style={{
                                    paddingLeft: "4px",
                                    textAlign: "center",
                                    height: "auto",
                                    width: 45,
                                }}>
                                <span className="d-flex justify-content-start align-items-center"
                                      style={{fontSize: 13}}>작성일</span>
                                </div>
                                <div style={{
                                    fontSize: 11,
                                    marginLeft: "2%"
                                }}>{FormatDate(content.noticeCreatedDate)}
                                </div>
                                <div style={{fontSize: 11, marginLeft: "2%", marginRight: "1%"}}>
                                    {content.noticeModifiedDate ? FormatDate(content.noticeModifiedDate) : null}
                                </div>
                                <div style={{
                                    textAlign: "left",
                                    height: "auto",
                                    width: 45,
                                }}>
                                <span className="d-flex justify-content-start align-items-center"
                                      style={{fontSize: 11}}>조회수</span>
                                </div>
                                <div style={{
                                    paddingRight: "3%",
                                    fontSize: 11,
                                    marginRight: "3%"
                                }}>{content.views}
                                </div>
                            </div>
                        </div>

                        {/* 첨부파일 부분 */}
                        <div style={{height: "100%", width: "47%"}}>
                            <div
                                className="d-flex justify-content-end align-items-center"
                                style={{width: '85%', height: '60%', borderTop: '2px ridge rgba(128,128,128,0.32)'}}
                            >
                                <button
                                    className="btn btn-primary"
                                    data-bss-hover-animate="pulse"
                                    type="button"
                                    style={{
                                        background: 'rgba(13,110,253,0)',
                                        color: 'black',
                                        borderStyle: 'none',
                                        marginBottom: "1%",
                                    }}
                                    onClick={fileListIsOpen ? closeFileList : openFileList}
                                >
                                    {fileListIsOpen ? '닫기' : `첨부파일(${content.noticeFileList ? content.noticeFileList.length : 0})`}
                                </button>
                                {fileListIsOpen &&
                                    <div
                                        style={{
                                            position: 'fixed',
                                            top: "5%",
                                            right: 0,
                                            bottom: "5%",
                                            width: '15%',
                                            background: 'rgba(0, 0, 0, 0.1)',
                                            color: 'black', overflowY: 'auto',
                                            whiteSpace: "nowrap"
                                        }}>
                                        <ul>
                                            <div style={{marginTop: "50px", fontSize: "20px", marginBottom: "3%"}}>파일
                                                다운로드
                                            </div>
                                            {fileListIsOpen &&
                                                content &&
                                                content.noticeFileList &&
                                                content.noticeFileList.length > 0 &&
                                                content.noticeFileList.map((file, index) => (
                                                    <li key={index} style={{fontSize: '16px', marginBottom: "2%"}}>
                                                        {file.name}
                                                        <DownloadFile file={file}/>
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                }
                            </div>
                            <div className="d-flex justify-content-end align-items-center"
                                 style={{
                                     width: "85%",
                                     height: "40%",
                                     borderBottom: "2px ridge rgba(128,128,128,0.32)"
                                 }}>
                                {/* 수정 버튼 */}
                                {content.hasPermission && ( // content에 권한 정보인 hasPermission이 존재하고 true일 때만 수정 버튼을 보여줍니다
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleUpdate(content.id)}
                                        style={{
                                            background: 'rgba(0, 0, 0)',
                                            marginBottom: '20px',
                                            marginRight: '1%',
                                            borderColor: 'black'
                                        }}
                                    >
                                        수정
                                    </button>
                                )}
                                {/* 삭제 버튼*/}
                                {content.hasPermission && ( // content에 권한 정보인 hasPermission이 존재하고 true일 때만 수정 버튼을 보여줍니다
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleDelete(content.id)} // 이벤트 핸들러 함수를 작성해야 합니다.
                                        style={{
                                            background: 'rgba(0, 0, 0)',
                                            marginBottom: "20px",
                                            borderColor: 'black'
                                        }} // borderColor를 추가하여 검정색으로 설정
                                    >
                                        삭제
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 게시글 내용(텍스트, 에디터 등) */}
                    <div
                        style={{
                            marginTop: "2%",
                            marginLeft: "4%",
                            minHeight: "20%",
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
                </div>
            </div>
        </div>
    );
}

export default NoticeDetail;
