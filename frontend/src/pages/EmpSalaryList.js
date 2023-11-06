import React, {useEffect, useState} from "react";
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css'
import {selectEmpList} from "../api/Emp";
import {useNavigate} from "react-router-dom";
import SalaryInsertComponent from "../component/SalaryInsertComponent";

function EmpSalaryList() {
    const [empList, setEmpList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [selectedPosition, setSelectedPosition] = useState('all'); // Default value for job position filter
    const [selectedDepartment, setSelectedDepartment] = useState('all'); // Default value for department filter
    const [isMobile, setIsMobile] = useState(false);
    const [hoverAnimationList, setHoverAnimationList] = useState([]);
    const [selectedEmpId, setSelectedEmpId] = useState(null);


    const openModal = (empId) => {
        setSelectedEmpId(empId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedEmpId(null);
        setIsModalOpen(false);
    };
    const handleSearchChange = (event) => {
        setSearchName(event.target.value);
    };

    const handlePositionChange = (event) => {
        setSelectedPosition(event.target.value);
    };

    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
    };

    const navigate = useNavigate();

    const navigateToDetail = (id) => {
        navigate(`/salary/list/${id}`)
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const dept = "재무부";
                if (dept === "재무부") {
                    const data = await selectEmpList();
                    setEmpList(data);
                } else {
                    alert("권한이 없습니다");
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

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

    const filteredEmp = empList.filter((employee) =>
        employee.empName.toLowerCase().includes(searchName.toLowerCase()) &&
        (selectedPosition === 'all' || employee.empPosition === selectedPosition) &&
        (selectedDepartment === 'all' || employee.dept === selectedDepartment)
    );

    return (
        <div style={{paddingTop: "50px",}}>
            <div>
                <SalaryInsertComponent isOpen={isModalOpen} closeModal={closeModal} empId={selectedEmpId}/>
            </div>

            <div style={{background: 'rgba(111,66,193,0)', height: '100%', width: 'Auto'}}>
                <div className="d-flex align-items-center" style={{
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
                    }}>급여관리</span>
                    <div style={{width: '15%', height: '100%'}}>
                        <div className="d-flex align-items-center"
                             style={{height: '50%', width: '100%', background: 'rgba(214,51,132,0)'}}>
                            <input type="search" placeholder="이름 검색" onChange={handleSearchChange}
                                   style={{height: '81%', width: '85%'}}/>
                            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button" style={{
                                background: 'url("img/Search.png") center / contain no-repeat',
                                height: '100%',
                                width: '15%',
                                borderColor: 'rgba(255,255,255,0)'
                            }}/>
                        </div>
                    </div>
                </div>
                <div className="d-flex" style={{width: 'auto', height: '100%'}}>
                    <div style={{background: 'rgba(214,51,132,0)', height: '100%', width: '100%'}}>
                        <div className="d-flex justify-content-start align-items-center" style={{
                            background: 'rgba(13,110,253,0)',
                            height: '45px',
                            borderTop: '2px ridge rgba(128,128,128,0.32)',
                            borderBottom: '2px ridge rgba(128,128,128,0.32)',
                            width: '100%'
                        }}>
                            <div className="d-flex justify-content-start" style={{height: '100%', width: '10%'}}/>
                            <div className="d-flex justify-content-start align-items-center"
                                 style={{height: '100%', width: '15%'}}><span>사번</span></div>
                            <div className="d-flex justify-content-start align-items-center"
                                 style={{height: '100%', width: '15%'}}><span>이름</span></div>
                            <div className="d-flex justify-content-start align-items-center"
                                 style={{height: '100%', width: '20%'}}>
                                <select className="form-select" value={selectedDepartment}
                                        onChange={handleDepartmentChange} style={{width: '150px'}}>
                                    <option value="all">부서</option>
                                    <option value="인사부">인사부</option>
                                    <option value="재무부">재무부</option>
                                    <option value="콘텐츠관리부">콘텐츠관리부</option>
                                    <option value="회원관리부">회원관리부</option>
                                </select>
                            </div>
                            <div className="d-flex justify-content-start align-items-center"
                                 style={{height: '100%', width: '18%'}}>
                                <select className="form-select" value={selectedPosition} onChange={handlePositionChange}
                                        style={{width: '150px'}}>
                                    <option value="all">직급</option>
                                    <option value="사원">사원</option>
                                    <option value="대리">대리</option>
                                    <option value="과장">과장</option>
                                    <option value="부장">부장</option>
                                </select>
                            </div>
                            <div className="d-flex justify-content-start align-items-center"
                                 style={{height: '100%', width: '20%'}}><span>연봉</span></div>
                        </div>
                        <div style={{width: '100%', height: '20px'}}/>

                        <ul>
                            {filteredEmp.map((e, i) => (
                                <li key={i} style={{listStyleType: 'none'}}>
                                    <div className="d-flex justify-content-start align-items-center" style={{
                                        background: 'rgba(13,110,253,0)',
                                        height: '45px',
                                        borderTop: '2px none rgba(128,128,128,0.32)',
                                        borderBottom: '2px none rgba(128,128,128,0.32)',
                                        width: '100%'
                                    }}>
                                        <div className="d-flex justify-content-start"
                                             style={{height: '100%', width: '9.5%'}}/>
                                        <div className="d-flex justify-content-start align-items-center"
                                             style={{height: '100%', width: '16%'}}><span>{e.empId}</span></div>
                                        <div className="d-flex justify-content-start align-items-center"
                                             style={{height: '100%', width: '18%'}}><span>{e.empName}</span></div>
                                        <div className="d-flex justify-content-start align-items-center"
                                             style={{height: '100%', width: '22%'}}><span>{e.dept}</span></div>
                                        <div className="d-flex justify-content-start align-items-center"
                                             style={{height: '100%', width: '18%'}}><span>{e.empPosition}</span></div>
                                        <div className="d-flex justify-content-start align-items-center"
                                             style={{height: '100%', width: '15%'}}><span>{e.empAmount}</span></div>
                                        <button
                                            className="btn btn-primary text-nowrap d-flex justify-content-center align-items-center"
                                            data-bss-hover-animate="pulse" type="button"
                                            onClick={() => navigateToDetail(e.empId)}
                                            style={{
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
                                                border: '1px solid black',
                                                marginRight: '30px'
                                            }}>
                                            급여 내역
                                        </button>
                                        <button
                                            className="btn btn-primary text-nowrap d-flex justify-content-center align-items-center"
                                            data-bss-hover-animate="pulse"
                                            type="button"
                                            onClick={() => openModal(e.empId)}
                                            style={{
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
                                                border: '1px solid black',
                                            }}
                                        >
                                            급여 등록
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
