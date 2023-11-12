import React, {useEffect, useState} from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css'
import {useNavigate, useParams} from 'react-router-dom';
import {commuteListSelectApi} from "../api/Commute";

function CommuteList() {
    const [isMobile, setIsMobile] = useState(false);
    const [hoverAnimationList, setHoverAnimationList] = useState([]);
    const [commute, setCommute] = useState([]);
    const navigate = useNavigate();
    const navigateToDepartment = () => {
        navigate('/department-hr');
    };

    const {id} = useParams();
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await commuteListSelectApi(id);
                setCommute(data);
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
                            <button className="btn btn-primary d-flex" data-bss-hover-animate="pulse" type="button"
                                    onClick={navigateToDepartment} style={{
                                background: 'rgba(13,110,253,0)',
                                borderStyle: 'none',
                                color: 'black',
                                width: 'auto',
                                height: 'auto',
                                paddingLeft: '0px'
                            }}>부서별 근태 현황
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
                                         style={{height: '100%', width: '15%'}}><span>날짜</span></div>

                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{height: '100%', width: '15%'}}><span>출근 시각</span></div>

                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{height: '100%', width: '20%'}}><span>퇴근 시각</span></div>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{height: '100%', width: '15%'}}><span>상태</span></div>
                                </div>
                                <div style={{width: '100%', height: '20px'}}/>
                                <ul>
                                    {commute.map((e, i) => (
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
                                                     style={{height: '100%', width: '15%'}}><span>{e.logDate}</span>
                                                </div>
                                                <div className="d-flex justify-content-start align-items-center"
                                                     style={{height: '100%', width: '15%'}}><span>{e.logCheckIn}</span>
                                                </div>
                                                <div className="d-flex justify-content-start align-items-center"
                                                     style={{height: '100%', width: '20%'}}><span>{e.logCheckOut}</span>
                                                </div>
                                                <div className="d-flex justify-content-start align-items-center"
                                                     style={{height: '100%', width: '25%'}}><span>{e.logStatus}</span>
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
};

export default CommuteList;