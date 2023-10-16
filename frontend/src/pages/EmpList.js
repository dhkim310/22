import React, {useEffect, useState} from "react";
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css'
import PaginationButtons from "../component/PaginationButton";
import {selectEmpList} from "../api/Emp";

function EmpList() {
    const [empList, setEmpList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 (1부터 시작)
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
    const [isMobile, setIsMobile] = useState(false);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await selectEmpList(currentPage - 1);
                setEmpList(data.list.content);
                setTotalPages(data.totalPageCount);
            } catch (error) {
                console.log('error', error);
            }
        }
        fetchData();
    }, [currentPage]);

    useEffect(() => {
        const getWidth = () => {
            return window.innerWidth;
        };

        setIsMobile(getWidth() < 768);
    }, []);

    return (
        <div>
            <div style={{background: 'rgba(111, 66, 193, 0)', height: '100%', width: 'Auto'}}>
                <div className="d-xxl-flex align-items-xxl-center"
                     style={{height: '70px', padding: '0', width: 'auto'}}>
                    <span style={{fontWeight: 'bold', fontSize: '30px', paddingLeft: '110px', width: '85%'}}>급여관리</span>
                    <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center"
                         style={{width: '15%', height: '100%'}}>
                        <input type="search"/>
                        <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"
                                placeholder="이름을 검색하세요" style={{
                            background: 'url("assets/img/icons8-수색-144.png") center / contain no-repeat',
                            height: '30px',
                            width: '30px',
                            borderColor: 'rgba(255, 255, 255, 0)'
                        }}></button>
                    </div>
                </div>

                <div className="d-xxl-flex" style={{width: 'auto', height: '1080px'}}>
                    <div style={{background: 'rgba(214, 51, 132, 0)', height: '100%', width: '85%'}}>
                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{
                            background: 'rgba(13, 110, 253, 0)',
                            height: '45px',
                            borderTop: '2px ridge rgba(128, 128, 128, 0.32',
                            borderBottom: '2px ridge rgba(128, 128, 128, 0.32',
                            width: '100%'
                        }}>
                            <div className="d-xxl-flex justify-content-xxl-start"
                                 style={{height: '100%', width: '115px'}}></div>
                            <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                 style={{height: '100%', width: '230px'}}><span>이름</span></div>
                            <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                 style={{height: '100%', width: '230px'}}><span>직급</span></div>
                            <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                 style={{height: '100%', width: '230px'}}><span>부서</span></div>
                            <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                 style={{height: '100%', width: '300px'}}><span>연봉</span></div>
                        </div>
                        {empList.map((item, index) => (
                            <div key={index}>
                                <div style={{width: '100%', height: '20px'}}></div>
                                <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{
                                    background: 'rgba(13, 110, 253, 0)',
                                    height: '45px',
                                    borderTop: '2px none rgba(128, 128, 128, 0.32)',
                                    borderBottom: '2px none rgba(128, 128, 128, 0.32',
                                    width: '100%'
                                }}>
                                    <div className="d-xxl-flex justify-content-xxl-start"
                                         style={{height: '45px', width: '115px'}}></div>
                                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                         style={{height: '45px', width: '230px'}}><span>{item.empName}</span></div>
                                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                         style={{height: '45px', width: '230px'}}><span>{item.empPosition}</span></div>
                                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                         style={{height: '45px', width: '230px'}}><span>{item.dept}</span></div>
                                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                         style={{height: '45px', width: '300px'}}><span>{item.empAmount}</span></div>
                                </div>
                            </div>
                            ))}
                            </div>
                            <div style={{background: 'rgba(13, 110, 253, 0)', height: '100%', width: '15%'}}>
                        <div style={{
                            width: '100%',
                            height: '45px',
                            borderTop: '2px ridge rgba(128, 128, 128, 0.32)',
                            borderBottom: '2px ridge rgba(128, 128, 128, 0.32)'
                        }}></div>
                        <div style={{
                            width: '100%',
                            height: '20px',
                            borderLeft: '2px ridge rgba(128, 128, 128, 0.32)'
                        }}></div>
                        <div className="d-xxl-flex justify-content-xxl-center"
                             style={{width: '100%', height: '45px', borderLeft: '2px ridge rgba(128, 128, 128, 0.32)'}}>
                            <div className="d-xxl-flex justify-content-xxl-end align-items-xxl-center"
                                 style={{width: '47.5%'}}>
                                <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"
                                        style={{
                                            background: 'black',
                                            width: '90px',
                                            borderStyle: 'none',
                                            borderLeftStyle: 'none'
                                        }}>급여내역
                                </button>
                            </div>
                            <div style={{width: '5%'}}></div>
                            <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                 style={{width: '47.5%'}}>
                                <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"
                                        style={{background: 'black', borderStyle: 'none'}}>급여등록
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{width: '100%', height: '50px'}}/>

            <div className="d-xxl-flex justify-content-xxl-start"
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

    )
}

export default EmpList;
