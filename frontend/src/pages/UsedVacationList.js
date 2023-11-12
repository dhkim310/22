import React, {useEffect, useState} from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css'
import {useNavigate} from 'react-router-dom';
import {SelectUsedVacationListApi} from "../api/Vacation";

function CommuteList() {
    const [isMobile, setIsMobile] = useState(false);
    const [hoverAnimationList, setHoverAnimationList] = useState([]);
    const [used, setUsed] = useState([]);
    const navigate = useNavigate();
    const navigateToDepartment = () => {
        navigate('/department-hr');
    };
    const navigateToUsedList = () => {
        navigate('/used-list');
    };
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await SelectUsedVacationListApi();
                setUsed(data);
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

    return (
        <div style={{paddingTop: "50px"}}>
            <div>
                <div className="d-flex justify-content-start" style={{width: '100%', height: '100%'}}>
                    <div style={{height: '100%', width: '2%'}}/>
                    <div style={{
                        height: '100%',
                        width: '11%',
                        background: 'rgba(13,110,253,0)',
                        borderRight: '2px ridge rgba(128,128,128,0.32)'
                    }}>
                        <div style={{width: '100%', height: '2%'}}/>
                        <div className="d-flex"
                             style={{width: '100%', height: 'auto', background: 'rgba(220,53,69,0)'}}><span
                            className="d-flex"
                            style={{width: 'auto', height: 'auto', fontWeight: 'bold', fontSize: '20px'}}>근태관리</span>
                        </div>
                        <div style={{width: '100%', background: 'rgba(214,51,132,0)', height: '2000px'}}>
                            <button className="btn btn-primary text-start d-flex justify-content-start"
                                    data-bss-hover-animate="pulse" type="button" onClick={navigateToUsedList} style={{
                                background: 'rgba(13,110,253,0)',
                                borderStyle: 'none',
                                color: 'black',
                                width: 'auto',
                                height: 'auto',
                                paddingRight: '12px',
                                paddingLeft: '0px'
                            }}>내 연차 내역
                            </button>
                        </div>
                    </div>
                    <div style={{width: '87%', height: '100%'}}>

                        <div className="d-flex" style={{width: 'auto', height: '100%'}}>
                            <div style={{background: 'rgba(214,51,132,0)', height: '100%', width: '100%'}}>
                                <div className="d-flex justify-content-start align-items-center" style={{
                                    background: 'rgba(13,110,253,0)',
                                    height: '45px',
                                    borderTop: '2px ridge rgba(128,128,128,0.32)',
                                    borderBottom: '2px ridge rgba(128,128,128,0.32)',
                                    width: '100%'
                                }}>
                                    <div className="d-flex justify-content-start"
                                         style={{height: '100%', width: '30px'}}/>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{height: '100%', width: '7%'}}><span>총 휴가</span></div>

                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{height: '100%', width: '7%'}}><span>총 연차</span></div>

                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{height: '100%', width: '10%'}}><span>사용일</span></div>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{height: '100%', width: '10%'}}><span>시작일</span></div>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{height: '100%', width: '9%'}}><span>종료일</span></div>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{height: '100%', width: '10%'}}><span>사유</span></div>
                                </div>
                                <div style={{width: '100%', height: '20px'}}/>
                                <ul>
                                    {used.map((e, i) => (
                                        <li key={i} style={{listStyleType: 'none'}}>
                                            <div className="d-flex justify-content-start align-items-start"
                                                 style={{
                                                     background: 'rgba(13,110,253,0)',
                                                     height: '45px',
                                                     borderTop: '2px none rgba(128,128,128,0.32)',
                                                     borderBottom: '2px none rgba(128,128,128,0.32)',
                                                     width: '100%'
                                                 }}>
                                                <div className="d-flex justify-content-start align-items-center"
                                                     style={{height: '100%', width: '7%'}}>
                                                    <span>{e.vacationTotalVacation} 일</span></div>
                                                <div className="d-flex justify-content-start align-items-center"
                                                     style={{height: '100%', width: '7%'}}>
                                                    <span>{e.vacationTotalDayOff} 일</span></div>
                                                <div className="d-flex justify-content-start align-items-center"
                                                     style={{height: '100%', width: '10%'}}>
                                                    <span>{e.vacationUsedCount} 일</span></div>
                                                <div className="d-flex justify-content-start align-items-center"
                                                     style={{height: '100%', width: '10%'}}>
                                                    <span>{e.vacationStartDate}</span></div>
                                                <div className="d-flex justify-content-start align-items-center"
                                                     style={{height: '100%', width: '10%'}}>
                                                    <span>{e.vacationEndDate}</span></div>
                                                <div className="d-flex justify-content-start align-items-center"
                                                     style={{height: '100%', width: '25%'}}><span>{e.vacationWhy}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommuteList;