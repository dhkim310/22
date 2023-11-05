import React, {useEffect, useState} from "react";
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css'
import {useNavigate, useParams} from "react-router-dom";
import {salaryDelete, selectSalaryList} from "../api/Salary";

function EmpSalary() {
    const {id} = useParams();
    const [salaryList, setSalaryList] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await selectSalaryList(id);
                setSalaryList(data);
            } catch (error) {
                console.log('error', error);
            }
        };

        const getWidth = () => {
            return window.innerWidth;
        };

        setIsMobile(getWidth() < 768);
        fetchData();
    }, [])

    const onDelete = (id) => {
        const shouldDelete = window.confirm("삭제하시겠습니까?");
        if (shouldDelete) {
            try {
                salaryDelete(id).then(() => {
                    window.location.reload();
                });
            } catch (error) {
                console.error('Error deleting salary:', error);
            }
        }
    };

    return (
        <div>
            <div style={{paddingTop: "50px", background: 'rgba(111, 66, 193, 0)', height: '100%', width: 'auto'}}>
                <div className="d-flex align-items-center"
                     style={{height: '70px', padding: '0', width: 'auto'}}>
                    <span
                        style={{fontWeight: 'bold', fontSize: '30px', paddingLeft: '110px', width: '100%'}}>급여내역</span>
                </div>

                <div className="d-flex" style={{width: 'auto', height: '1080px'}}>
                    <div style={{background: 'rgba(214, 51, 132, 0)', height: '100%', width: '85%'}}>
                        <div className="d-flex justify-content-start align-items-center" style={{
                            background: 'rgba(13, 110, 253, 0)',
                            height: '45px',
                            borderTop: '2px ridge rgba(128, 128, 128, 0.32',
                            borderBottom: '2px ridge rgba(128, 128, 128, 0.32',
                            width: '100%'
                        }}>
                            <div className="d-flex justify-content-start"
                                 style={{height: '100%', width: '115px'}}></div>
                            <div className="d-flex justify-content-start align-items-center"
                                 style={{height: '100%', width: '175px'}}><span>지급은행</span></div>
                            <div className="d-flex justify-content-start align-items-center"
                                 style={{height: '100%', width: '200px'}}><span>계좌번호</span></div>
                            <div className="d-flex justify-content-start align-items-center"
                                 style={{height: '100%', width: '175px'}}><span>지급금액(월)</span></div>
                            <div className="d-flex justify-content-start align-items-center"
                                 style={{height: '100%', width: '175px'}}><span>성과금</span></div>
                            <div className="d-flex justify-content-start align-items-center"
                                 style={{height: '100%', width: '175px'}}><span>제세공과금</span></div>
                            <div className="d-flex justify-content-start align-items-center"
                                 style={{height: '100%', width: '175px'}}><span>지급일</span></div>
                        </div>
                        <div style={{width: '100%', height: '20px'}}></div>
                        {salaryList.map((item, index) => (
                            <div key={index}>
                                <div className="d-flex justify-content-start align-items-center" style={{
                                    background: 'rgba(13, 110, 253, 0)',
                                    height: '45px',
                                    borderTop: '2px none rgba(128, 128, 128, 0.32)',
                                    borderBottom: '2px none rgba(128, 128, 128, 0.32)',
                                    width: '100%'
                                }}>
                                    <div className="d-flex justify-content-start"
                                         style={{height: '45px', width: '115px'}}></div>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{height: '45px', width: '175px'}}><span>{item.salaryBank}</span></div>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{height: '45px', width: '200px'}}>
                                        <span>{item.salaryAccountNumber}</span></div>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{height: '45px', width: '175px'}}><span>{item.salaryPayMoney}</span>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{height: '45px', width: '175px'}}><span>{item.salaryBonus}</span></div>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{height: '45px', width: '175px'}}><span>{item.salaryTax}</span></div>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{height: '45px', width: '175px'}}><span>{item.salaryPayDate}</span>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{height: '45px', width: '50px'}}>
                                    </div>
                                    <button
                                        className="btn btn-danger"
                                        data-bss-hover-animate="pulse"
                                        type="button"
                                        onClick={() => onDelete(item.salaryId)}
                                        style={{
                                            background: 'black',
                                            borderStyle: 'none',
                                            width: '70px',
                                        }}
                                    >
                                        삭제
                                    </button>
                                </div>
                                <div style={{width: '100%', height: '50px'}}></div>
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmpSalary;
