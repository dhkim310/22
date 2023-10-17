import React, {useEffect, useState} from "react";
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css'
import {selectEmpList} from "../api/Emp";
import {useNavigate} from "react-router-dom";
import SalaryInsertComponent from "../component/SalaryInsertComponent";
import EmpCreateComponent from "../component/EmpCreateComponent";

function EmpSalaryList() {
    const [empList, setEmpList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const navigate = useNavigate();

    // const navigateToSearch = (empName) => {
    //     navigate(`/emp/${empName}`)
    // }
    const navigateToDetail = (id) => {
        navigate(`/salary/list/${id}`)
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await selectEmpList();
                setEmpList(data);
            } catch (error) {
                console.log('error', error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const getWidth = () => {
            return window.innerWidth;
        };

        setIsMobile(getWidth() < 768);
    }, []);

    return (
        <div>
            <div>
                <EmpCreateComponent isOpen={isModalOpen} closeModal={closeModal}/>
            </div>

            <div style={{background: 'rgba(111,66,193,0)', height: '100%', width: 'Auto'}}>
                <div className="d-xxl-flex align-items-xxl-center" style={{
                    height: '70px',
                    paddingTop: '0px',
                    paddingRight: '0px',
                    paddingLeft: '0px',
                    width: 'auto'
                }}>
                    <span style={{
                        fontWeight: 'bold',
                        fontSize: '30px',
                        paddingLeft: '110px',
                        paddingRight: '0px',
                        paddingTop: '0px',
                        paddingBottom: '13px',
                        width: '85%'
                    }}>인사관리</span>
                    <div style={{width: '15%', height: '100%'}}>
                        <div className="d-xxl-flex align-items-xxl-center"
                             style={{height: '50%', width: '100%', background: 'rgba(214,51,132,0)'}}>
                            <input type="search" placeholder="이름 검색" onChange={handleSearchChange}
                                   style={{height: '81%', width: '85%'}}/>
                            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button" style={{
                                background: 'url("assets/img/icons8-수색-144.png") center / contain no-repeat',
                                height: '100%',
                                width: '15%',
                                borderColor: 'rgba(255,255,255,0)'
                            }}/>
                        </div>
                        <div className="d-xxl-flex justify-content-xxl-end align-items-xxl-center"
                             style={{width: '100%', height: '50%', background: 'rgba(111,66,193,0)'}}>
                            <button className="btn btn-primary d-xxl-flex align-items-xxl-center"
                                    data-bss-hover-animate="pulse" type="button" onClick={openModal} style={{
                                fontSize: '13px',
                                fontWeight: 'bold',
                                background: 'black',
                                borderStyle: 'none',
                                height: '80%',
                                width: 'auto'
                            }}>+ 직원생성
                            </button>
                            <div style={{width: '2%', height: '100%'}}/>
                        </div>
                    </div>
                </div>
                <div className="d-xxl-flex" style={{width: 'auto', height: '100%'}}>
                    <div style={{background: 'rgba(214,51,132,0)', height: '100%', width: '100%'}}>
                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{
                            background: 'rgba(13,110,253,0)',
                            height: '45px',
                            borderTop: '2px ridge rgba(128,128,128,0.32)',
                            borderBottom: '2px ridge rgba(128,128,128,0.32)',
                            width: '100%'
                        }}>
                            <div className="d-xxl-flex justify-content-xxl-start"
                                 style={{height: '100%', width: '150px'}}/>
                            <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                 style={{height: '100%', width: '14%'}}><span>이름</span></div>
                            <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                 style={{height: '100%', width: '15%'}}>
                                <select className="form-select" value={selectedDepartment}
                                        onChange={handleDepartmentChange} style={{width: '150px'}}>
                                    <option value="all">부서</option>
                                    <option value="인사부">인사부</option>
                                    <option value="재무부">재무부</option>
                                    <option value="콘텐츠관리부">콘텐츠관리부</option>
                                    <option value="회원관리부">회원관리부</option>
                                </select>
                            </div>
                            <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                 style={{height: '100%', width: '20%'}}>
                                <select className="form-select" value={selectedPosition} onChange={handlePositionChange}
                                        style={{width: '150px'}}>
                                    <option value="all">직급</option>
                                    <option value="사원">사원</option>
                                    <option value="대리">대리</option>
                                    <option value="과장">과장</option>
                                    <option value="부장">부장</option>
                                </select>
                            </div>

                            <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                 style={{height: '100%', width: '24%'}}><span>이메일</span></div>
                            <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                 style={{height: '100%', width: '15%'}}><span>재직상태</span></div>
                        </div>
                        <div style={{width: '100%', height: '20px'}}/>

                        <ul>
                            {filteredHrm.map((e, i) => (
                                <li key={i} style={{listStyleType: 'none'}}>
                                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                         style={{
                                             background: 'rgba(13,110,253,0)',
                                             height: '45px',
                                             borderTop: '2px none rgba(128,128,128,0.32)',
                                             borderBottom: '2px none rgba(128,128,128,0.32)',
                                             width: '100%'
                                         }}>
                                        <div className="d-xxl-flex justify-content-xxl-start"
                                             style={{height: '100%', width: '115px'}}/>
                                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                             style={{height: '100%', width: '15%'}}><span>{e.empName}</span></div>
                                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                             style={{height: '100%', width: '15%'}}><span>{e.dept}</span></div>
                                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                             style={{height: '100%', width: '20%'}}><span>{e.empPosition}</span></div>
                                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                             style={{height: '100%', width: '25%'}}><span>{e.empEmail}</span></div>
                                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                             style={{height: '100%', width: '5%'}}><span>{e.empStatus}</span></div>
                                        <button
                                            className="btn btn-primary text-nowrap d-xxl-flex justify-content-xxl-center align-items-xxl-center"
                                            data-bss-hover-animate="pulse" type="button"
                                            onClick={() => navigateToReshuffle(e.empId)} style={{
                                            fontSize: '13px',
                                            fontWeight: 'bold',
                                            background: 'var(--bs-btn-disabled-color)',
                                            width: 'auto',
                                            height: '80%',
                                            margin: '0px',
                                            padding: '0px',
                                            paddingRight: '9px',
                                            paddingLeft: '9px',
                                            color: 'black',
                                            border: '1px solid black'
                                        }}>인사 변경
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmpSalaryList;
