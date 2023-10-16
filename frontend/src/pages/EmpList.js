import React, {useEffect, useState} from "react";
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css'
import {emp} from "../api/Emp";
import axios from "axios";

function EmpList() {
    const [isMobile, setIsMobile] = useState(false);
    const [hoverAnimationList, setHoverAnimationList] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [empList, setEmpList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/emp'); // emp 함수 대신 axios로 직원 목록 데이터를 가져옴
                setEmpList(response.data); // 가져온 데이터를 empList 상태에 저장
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

    const empList1 = empList.filter((employee) => employee.empName.toLowerCase().includes(searchName.toLowerCase()));

    return (
        <div>
            <div style={{ background: 'rgba(111, 66, 193, 0)', height: '100%', width: 'Auto' }}>
                <div className="d-xxl-flex align-items-xxl-center" style={{ height: '70px', paddingTop: '0px', paddingRight: '0px', paddingLeft: '0px', width: 'auto' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '30px', paddingLeft: '110px', paddingRight: '0px', paddingTop: '0px', paddingBottom: '13px', width: '85%' }}>급여관리</span>
                    <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{ width: '15%', height: '100%' }}>
                        <input type="search" placeholder="사원 이름을 입력하세요"/>
                        <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button" style={{ background: 'url("assets/img/icons8-수색-144.png") center / contain no-repeat', height: '30px', width: '30px', borderColor: 'rgba(255, 255, 255, 0)' }}></button>
                    </div>
                </div>
            </div>

            <div className="d-xxl-flex" style={{ width: 'auto', height: '1080px' }}>
                <div style={{ background: 'rgba(214, 51, 132, 0)', height: '100%', width: '85%' }}>
                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ background: 'rgba(13, 110, 253, 0', height: '45px', borderTop: '2px ridge rgba(128, 128, 128, 0.32', borderBottom: '2px ridge rgba(128, 128, 128, 0.32', width: '100%' }}>
                        <div className="d-xxl-flex justify-content-xxl-start" style={{ height: '100%', width: '115px' }}></div>
                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ height: '100%', width: '230px' }}><span>이름</span></div>
                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ height: '100%', width: '230px' }}><span>직급</span></div>
                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ height: '100%', width: '230px' }}><span>부서</span></div>
                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ height: '100%', width: '300px' }}><span>연봉</span></div>
                    </div>
                    <div style={{width: '100%', height: '20px'}}></div>
                    <ul>
                        {empList1.map((e, i) => (
                            <li key={i} style={{ listStyleType: 'none'}}>
                                <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ background: 'rgba(13, 110, 253, 0)', height: '45px', borderTop: '2px none rgba(128, 128, 128, 0.32)', borderBottom: '2px none rgba(128, 128, 128, 0.32)', width: '100%' }}>
                                    <div className="d-xxl-flex justify-content-xxl-start" style={{ height: '45px', width: '115px' }}></div>
                                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ height: '45px', width: '230px' }}><span>{e.empName}</span></div>
                                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ height: '45px', width: '230px' }}><span>{e.empPosition}</span></div>
                                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ height: '45px', width: '230px' }}><span>{e.dept}</span></div>
                                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ height: '45px', width: '300px' }}><span>{e.empAmount}</span></div>
                                </div>
                                <div className="d-xxl-flex justify-content-xxl-center" style={{ width: '100%', height: '45px', borderLeft: '2px ridge rgba(128, 128, 128, 0.32)' }}>
                                    <div className="d-xxl-flex justify-content-xxl-end align-items-xxl-center" style={{ width: '47.5%' }}>
                                        <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button" style={{ background: 'black', width: '90px', borderStyle: 'none', borderLeftStyle: 'none' }}>급여내역</button>
                                    </div>
                                    <div style={{ width: '5%' }}></div>
                                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ width: '47.5%' }}>
                                        <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button" style={{ background: 'black', borderStyle: 'none' }}>급여등록</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default EmpList;
