import React, {useEffect, useState} from "react";
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css'
import {useParams} from "react-router-dom";
import {selectSalaryList} from "../api/Salary";
import {useNavigate} from "react-router-dom";

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

    return (
        <div>
            <div style={{background: 'rgba(111, 66, 193, 0)', height: '100%', width: 'auto'}}>
                <div className="d-xxl-flex align-items-xxl-center"
                     style={{height: '70px', padding: '0', width: 'auto'}}>
                    <span
                        style={{fontWeight: 'bold', fontSize: '30px', paddingLeft: '110px', width: '100%'}}>급여내역</span>
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
                                 style={{height: '100%', width: '175px'}}><span>지급은행</span></div>
                            <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                 style={{height: '100%', width: '200px'}}><span>계좌번호</span></div>
                            <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                 style={{height: '100%', width: '175px'}}><span>지급금액(월)</span></div>
                            <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                 style={{height: '100%', width: '175px'}}><span>성과금</span></div>
                            <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                 style={{height: '100%', width: '175px'}}><span>제세공과금</span></div>
                            <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                 style={{height: '100%', width: '175px'}}><span>지급일</span></div>
                        </div>
                        <div style={{width: '100%', height: '20px'}}></div>
                        {salaryList.map((item, index) => (
                            <div key={index}>
                                <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{
                                    background: 'rgba(13, 110, 253, 0)',
                                    height: '45px',
                                    borderTop: '2px none rgba(128, 128, 128, 0.32)',
                                    borderBottom: '2px none rgba(128, 128, 128, 0.32)',
                                    width: '100%'
                                }}>
                                    <div className="d-xxl-flex justify-content-xxl-start"
                                         style={{height: '45px', width: '115px'}}></div>
                                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                         style={{height: '45px', width: '175px'}}><span>{item.salaryBank}</span></div>
                                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                         style={{height: '45px', width: '200px'}}>
                                        <span>{item.salaryAccountNumber}</span></div>
                                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                         style={{height: '45px', width: '175px'}}><span>{item.salaryPayMoney}</span>
                                    </div>
                                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                         style={{height: '45px', width: '175px'}}><span>{item.salaryBonus}</span></div>
                                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                         style={{height: '45px', width: '175px'}}><span>{item.salaryTax}</span></div>
                                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                         style={{height: '45px', width: '175px'}}><span>{item.salaryPayDate}</span>
                                    </div>
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
                        <div style={{
                            width: '100%',
                            height: '20px',
                            borderLeft: '2px ridge rgba(128, 128, 128, 0.32)'
                        }}></div>
                        <div className="d-xxl-flex justify-content-xxl-center"
                             style={{width: '100%', height: '45px', borderLeft: '2px ridge rgba(128, 128, 128, 0.32)'}}>
                            <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center"
                                 style={{width: '50%'}}>
                                <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"
                                        style={{background: 'black', borderStyle: 'none', width: '70px'}}>삭제
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EmpSalary;
