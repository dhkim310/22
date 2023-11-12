import React, {useEffect, useState} from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css'
import {useNavigate} from 'react-router-dom';
import {SelectApprovalSuccessListApi} from '../api/Approval';
import PaginationButtons from '../component/PaginationButton';

function Approval() {
    const [isMobile, setIsMobile] = useState(false);
    const [hoverAnimationList, setHoverAnimationList] = useState([]);
    const [approvalList, setApprovalList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 (1부터 시작)
    const [totalPages, setTotalPages] = useState(); // 전체 페이지 수
    const navigate = useNavigate();
    const navigateToApproval = () => {
        navigate("/approval-list");
    };
    const navigateToDetail = (id) => {
        navigate(`/approval-complete/${id}`);
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const navigateToApprovalInsert = () => {
        navigate("/approval-insert")
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await SelectApprovalSuccessListApi(currentPage - 1);
                setApprovalList(data.list.content);
                setTotalPages(data.totalPageCount);
            } catch (error) {
                console.error('데이터 가져오기 오류:', error);
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
    }, [currentPage]);

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
                        <div className="d-flex justify-content-start align-items-center"
                             style={{background: 'rgba(102,16,242,0)', width: '100%', height: '7%'}}>
                            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"
                                    onClick={navigateToApprovalInsert} style={{
                                background: 'rgba(13,110,253,0)',
                                border: '1px ridge black',
                                width: 'auto',
                                height: 'auto',
                                color: 'black'
                            }}>새 결재 진행
                            </button>
                        </div>
                        <div className="d-flex"
                             style={{width: '100%', height: 'auto', background: 'rgba(220,53,69,0)'}}><span
                            className="d-flex"
                            style={{width: 'auto', height: 'auto', fontWeight: 'bold', fontSize: '20px'}}>결재하기</span>
                        </div>
                        <div style={{width: '100%', background: 'rgba(214,51,132,0)', height: '7%'}}>
                            <button className="btn btn-primary text-start d-flex justify-content-start"
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
                            <button className="btn btn-primary d-flex" data-bss-hover-animate="pulse" type="button"
                                    style={{
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
                    <div style={{width: '88%', height: '100%'}}>
                        <div className="d-flex justify-content-start align-items-center"
                             style={{background: 'rgba(13,110,253,0)', width: '100%', height: '8%'}}>
                            <div style={{height: '100%', width: '4%', background: 'rgba(220,53,69,0)'}}/>
                            <span style={{
                                width: 'auto',
                                height: 'auto',
                                fontWeight: 'bold',
                                fontSize: '34px'
                            }}>결재 완료 문서</span>
                        </div>
                        <div style={{background: 'rgba(220,53,69,0)', height: '82%', width: '100%'}}>
                            <div className="d-flex justify-content-start align-items-center" style={{
                                width: '100%',
                                height: '5%',
                                background: 'rgba(220,53,69,0)',
                                borderTop: '2px ridge rgba(128,128,128,0.32)',
                                borderBottom: '2px ridge rgba(128,128,128,0.32)'
                            }}>
                                <div style={{height: '100%', width: '4%', background: 'rgba(220,53,69,0)'}}/>
                                <div className="d-flex align-items-center"
                                     style={{height: '100%', width: '13%', background: 'rgba(220,53,69,0)'}}>
                                    <span>기안일</span></div>
                                <div className="d-flex align-items-center"
                                     style={{height: '100%', width: '41%', background: 'rgba(220,53,69,0)'}}>
                                    <span>제목</span></div>
                                <div className="d-flex align-items-center"
                                     style={{height: '100%', width: '8%', background: 'rgba(220,53,69,0)'}}>
                                    <span>기안자</span></div>
                                <div className="d-flex align-items-center"
                                     style={{height: '100%', width: '8%', background: 'rgba(220,53,69,0)'}}>
                                    <span>결재권자</span></div>
                                <div className="d-flex align-items-center"
                                     style={{height: '100%', width: '13%', background: 'rgba(220,53,69,0)'}}>
                                    <span>결재상태</span></div>
                                <div className="d-flex align-items-center"
                                     style={{height: '100%', width: '13%', background: 'rgba(220,53,69,0)'}}>
                                    <span>승인날짜</span></div>
                            </div>
                            <div>
                                {approvalList.map((item) => (
                                    <div
                                        className="d-flex justify-content-center justify-content-start align-items-center list-group"
                                        style={{marginLeft: '0px', marginRight: '0px', width: '100%', height: '100%'}}>
                                        <a className="d-flex list-group-item list-group-item-action flex-column align-items-start"
                                           onClick={() => navigateToDetail(item.approvalId)} style={{
                                            height: '100%',
                                            marginBottom: '2px',
                                            width: '100%',
                                            padding: '0px',
                                            maxHeight: '5%',
                                            borderStyle: 'none'
                                        }}>
                                            <div className="d-flex justify-content-start align-items-center"
                                                 style={{
                                                     width: '100%',
                                                     background: 'rgba(220,53,69,0)',
                                                     height: '100%'
                                                 }}>
                                                <div style={{
                                                    height: '100%',
                                                    width: '4%',
                                                    background: 'rgba(220,53,69,0)'
                                                }}/>
                                                <div className="d-flex align-items-center" style={{
                                                    height: '100%',
                                                    width: '13%',
                                                    background: 'rgba(220,53,69,0)'
                                                }}><span>{item.approvalUpLoadDate}</span></div>
                                                <div className="d-flex align-items-center" style={{
                                                    height: '100%',
                                                    width: '41%',
                                                    background: 'rgba(220,53,69,0)'
                                                }}><span>{item.approvalSubject}</span></div>
                                                <div className="d-flex align-items-center" style={{
                                                    height: '100%',
                                                    width: '8%',
                                                    background: 'rgba(220,53,69,0)'
                                                }}><span>{item.approvalDrafter}</span></div>
                                                <div className="d-flex align-items-center" style={{
                                                    height: '100%',
                                                    width: '8%',
                                                    background: 'rgba(220,53,69,0)'
                                                }}><span>{item.approvalCheckMan}</span></div>
                                                <div className="d-flex align-items-center" style={{
                                                    height: '100%',
                                                    width: '13%',
                                                    background: 'rgba(220,53,69,0)'
                                                }}><span>{item.approvalCheck}</span></div>
                                                <div className="d-flex align-items-center" style={{
                                                    height: '100%',
                                                    width: '13%',
                                                    background: 'rgba(220,53,69,0)'
                                                }}><span>{item.approvalSuccessDate}</span></div>
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="d-flex justify-content-start"
                             style={{background: 'rgba(111,66,193,0)', height: '109px'}}>
                            <div style={{width: '50%', height: '100%'}}/>
                            { /* PaginationButtons 컴포넌트 사용 */}
                            <PaginationButtons
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Approval;