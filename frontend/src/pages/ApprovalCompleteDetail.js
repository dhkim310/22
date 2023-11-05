import React, {useEffect, useState} from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css'
import {useNavigate, useParams} from 'react-router-dom';
import {SelectApprovalDetailApi} from '../api/Approval';
import DownloadFile from "../component/DownloadFile";

function ApprovalCompleteDetail() {
    const {id} = useParams();
    const [isMobile, setIsMobile] = useState(false);
    const [hoverAnimationList, setHoverAnimationList] = useState([]);
    const [detail, setDetail] = useState({});
    const navigate = useNavigate();
    const [fileListIsOpen, setFileListIsOpen] = useState(false);

    const navigateToCompleteList = () => {
        navigate("/approval-complete");
    };
    const navigateToApproval = () => {
        navigate("/approval-list");
    };

    const openFileList = () => {
        setFileListIsOpen(true);
    };

    const closeFileList = () => {
        setFileListIsOpen(false);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await SelectApprovalDetailApi(id);
                setDetail(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const getWidth = () => {
            return window.innerWidth;
        };

        setIsMobile(getWidth() < 768);

        const elements = document.querySelectorAll('[data-bss-hover-animate]');
        setHoverAnimationList(elements);

        elements.forEach((element) => {
            element.addEventListener('mouseenter', () => {
                element.classList.add('animated', element.dataset.bssHoverAnimate);
            });
            element.addEventListener('mouseleave', () => {
                element.classList.remove('animated', element.dataset.bssHoverAnimate);
            });
        });
        fetchData();
    }, []);

    return (
        <div>
            <div>
                <div className="d-flex justify-content-start"
                     style={{paddingTop: "50px", width: '100%', background: 'rgba(0,0,0,0)', height: '800px'}}>
                    <div style={{height: '100%', width: '2%'}}/>
                    <div style={{
                        height: '100%',
                        width: '10%',
                        background: 'rgba(13,110,253,0)',
                        borderRight: '2px ridge rgba(128,128,128,0.32)'
                    }}>
                        <div className="text-nowrap d-flex justify-content-start align-items-center"
                             style={{background: 'rgba(102,16,242,0)', width: '100%', height: '7%'}}>
                            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button" style={{
                                background: 'rgba(13,110,253,0)',
                                width: 'auto',
                                height: 'auto',
                                color: 'black',
                                border: '1px ridge black',
                            }}>새 결재 진행
                            </button>
                        </div>
                        <div className="text-nowrap d-flex"
                             style={{width: '100%', height: 'auto', background: 'rgba(220,53,69,0)'}}><span
                            className="d-flex"
                            style={{width: 'auto', height: 'auto', fontWeight: 'bold', fontSize: '20px'}}>결재하기</span>
                        </div>
                        <div style={{width: '100%', background: 'rgba(214,51,132,0)', height: '7%'}}>
                            <button className="btn btn-primary text-nowrap d-flex justify-content-start"
                                    data-bss-hover-animate="pulse" type="button" onClick={navigateToApproval} style={{
                                background: 'rgba(13,110,253,0)',
                                borderStyle: 'none',
                                color: 'black',
                                width: 'auto',
                                height: 'auto',
                                paddingRight: '12px',
                                paddingLeft: '0px'
                            }}>결재 대기 문서
                            </button>
                            <button className="btn btn-primary text-nowrap d-flex" data-bss-hover-animate="pulse" type="button"
                                    onClick={navigateToCompleteList} style={{
                                background: 'rgba(13,110,253,0)',
                                borderStyle: 'none',
                                color: 'black',
                                width: 'auto',
                                height: 'auto',
                                paddingLeft: '0px'
                            }}>결재 완료 문서
                            </button>
                        </div>
                    </div>
                    <div style={{width: '88%', height: '90%'}}>
                        <div style={{background: 'rgba(220,53,69,0)', height: '82%', width: '100%'}}>
                            <div style={{width: '88%', height: '100%'}}>
                                <div className="d-flex justify-content-start align-items-center"
                                     style={{background: 'rgba(13,110,253,0)', width: '100%', height: '70px'}}>
                                    <div style={{height: '100%', width: '4%', background: 'rgba(220,53,69,0)'}}/>
                                    <span style={{
                                        width: 'auto',
                                        height: 'auto',
                                        fontWeight: 'bold',
                                        fontSize: '30px'
                                    }}>결재</span>
                                </div>
                                <div className="d-flex justify-content-start align-items-center"
                                     style={{background: 'rgba(13,110,253,0)', width: '100%', height: '10%'}}>
                                    <div style={{height: '100%', width: '4%', background: 'rgba(220,53,69,0)'}}/>
                                    <div style={{height: '100%', width: '45%'}}>
                                        <div className="d-flex align-items-center" style={{
                                            width: '100%',
                                            height: '60%',
                                            borderTop: '2px ridge rgba(128,128,128,0.32)',
                                            borderBottomWidth: '0px'
                                        }}><span style={{
                                            width: 'auto',
                                            height: 'auto',
                                            fontWeight: 'bold'
                                        }}>{detail.approvalSubject}</span></div>
                                        <div className="d-flex justify-content-start align-items-center"
                                             style={{
                                                 width: '100%',
                                                 height: '40%',
                                                 borderBottom: '2px ridge rgba(128,128,128,0.32)'
                                             }}>
                                            <div style={{
                                                height: 'auto',
                                                width: '90px',
                                                borderRight: '2px ridge rgba(128,128,128,0.32)'
                                            }}><span
                                                className="d-flex justify-content-start align-items-center"
                                                style={{fontSize: '11px'}}>{detail.approvalDrafter}</span></div>
                                            <div className="d-flex align-items-end" style={{
                                                height: 'auto',
                                                width: '75px',
                                                borderRight: '2px ridge rgba(128,128,128,0.32)'
                                            }}>
                                                <div style={{height: '100%', width: '10%'}}/>
                                                <span
                                                    className="d-flex justify-content-start align-items-center"
                                                    style={{fontSize: '11px'}}>{detail.approvalUpLoadDate}</span>
                                            </div>
                                            <div className="d-flex align-items-end"
                                                 style={{height: 'auto', width: '75px'}}>
                                                <div style={{height: '100%', width: '10%'}}/>
                                                <span
                                                    className="d-flex justify-content-start align-items-center"
                                                    style={{fontSize: '11px'}}></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{height: '100%', width: '47%'}}>
                                        <div className="d-flex justify-content-end align-items-center"
                                             style={{
                                                 width: '85%',
                                                 height: '60%',
                                                 borderTop: '2px ridge rgba(128,128,128,0.32)'
                                             }}>
                                            <button
                                                className="btn btn-primary"
                                                data-bss-hover-animate="pulse"
                                                type="button"
                                                style={{
                                                    background: 'rgba(13,110,253,0)',
                                                    color: 'black',
                                                    borderStyle: 'none',
                                                }}
                                                onClick={fileListIsOpen ? closeFileList : openFileList}
                                            >
                                                {fileListIsOpen ? '닫기' : `첨부파일(${detail.approvalFileList ? detail.approvalFileList.length : 0})`}
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
                                                        <div style={{
                                                            marginTop: "50px",
                                                            fontSize: "20px",
                                                            marginBottom: "3%"
                                                        }}>파일 다운로드
                                                        </div>
                                                        {fileListIsOpen &&
                                                            detail &&
                                                            detail.approvalFileList &&
                                                            detail.approvalFileList.length > 0 &&
                                                            detail.approvalFileList.map((file, index) => (
                                                                <li key={index}
                                                                    style={{fontSize: '16px', marginBottom: "2%"}}>
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
                                                 width: '85%',
                                                 height: '40%',
                                                 borderBottom: '2px ridge rgba(128,128,128,0.32)'
                                             }}>
                                            <div style={{
                                                height: 'auto',
                                                width: '70px',
                                                borderRight: '2px ridge rgba(128,128,128,0.32)'
                                            }}><span
                                                className="d-flex justify-content-start align-items-center"
                                                style={{fontSize: '11px'}}>결재권자</span></div>
                                            <div className="d-flex align-items-end" style={{
                                                height: 'auto',
                                                width: '70px',
                                                borderRight: '2px ridge rgba(128,128,128,0.32)'
                                            }}>
                                                <div style={{height: '100%', width: '10%'}}/>
                                                <span
                                                    className="d-flex justify-content-start align-items-center"
                                                    style={{fontSize: '11px'}}/>
                                            </div>
                                            <span
                                                className="d-flex justify-content-start align-items-center"
                                                style={{fontSize: '11px'}}>{detail.approvalCheckMan}</span>
                                            <div className="d-flex align-items-end"
                                                 style={{height: 'auto', width: '40px'}}>
                                                <div style={{height: '100%', width: '10%'}}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        marginTop: "2%",
                                        marginLeft: "4%",
                                        minHeight: "50%",
                                        width: "85%",
                                        height: "100%",
                                        border: "2px ridge rgba(128,128,128,0.32)",
                                        padding: "10px",
                                        overflow: "auto",
                                    }}
                                >
                                    {/* html 렌더링 게시글 내용 */}
                                    <div dangerouslySetInnerHTML={{__html: detail.approvalContent}}>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="d-flex justify-content-start align-items-center"
                                 style={{width: '50%', height: '100%', marginLeft: '3%'}}>

                            </div>
                            <div style={{width: '50%', height: '100%'}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ApprovalCompleteDetail;