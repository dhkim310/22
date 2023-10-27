import React, {useEffect, useState} from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css'
import {useNavigate} from 'react-router-dom';
import Alarm from '../component/Alarm'


function Header() {

    const allowedPaths = ['/','/login','/message','/message-send'];
    const navigate = useNavigate();
    const navigateToCat = () => {
        navigate("/sweetalert");
    };
    const navigateToMain = () => {
        navigate("/main");
    };
    const navigateToSchedule = () => {
        navigate("/schedule");
    };
    const navigateToList = () => {
        navigate("/notice");
    };
    const navigateToHrm = () => {
        navigate("/hrm");
    };
    const navigateToApprovalList = () => {
        navigate("/approval");
    };
    const navigateToEmpList = () => {
        navigate("/salary")
    };
    const navigateToMovieList = () => {
        navigate("/movie")
    };
    const navigateToMemberList = () => {
        navigate("/member")
    }
    const navigateToMessageList = () => {
         const width = 800;
         const height = 500;
         const left = window.innerWidth / 2 - width / 2;
         const top = window.innerHeight / 2 - height / 2;
         window.open('/message', '_blank', `width=${width},height=${height},left=${left}`);
    }
    const [isMobile, setIsMobile] = useState(false);
    const [hoverAnimationList, setHoverAnimationList] = useState([]);


    useEffect(() => {
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
    }, []);

    return (
    allowedPaths.includes(window.location.pathname) ? null : (
        <div>
            <Alarm/>
            <div>
                <div className="d-lg-flex align-items-lg-center justify-content-xxl-start"
                     style={{width: 'auto', height: '50px', background: '#000000'}}>
                    <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"
                            onClick={navigateToMain} style={{
                        borderStyle: 'none',
                        height: '50px',
                        borderRadius: '0px',
                        width: '25%',
                        background: 'url("img/logo.png") center / contain no-repeat'
                    }}></button>
                    <div style={{height: 'auto', width: '400px'}}/>
                    <div className="d-lg-flex justify-content-lg-end justify-content-xxl-start"
                         style={{height: 'auto', width: '100%'}}>
                        <div className="btn-group d-lg-flex justify-content-lg-center" role="group" style={{
                            height: 'auto',
                            width: 'auto',
                            fontSize: '14px',
                            maxHeight: 'none',
                            maxWidth: 'none'
                        }}>
                            <button className="btn btn-primary text-nowrap" data-bss-hover-animate="pulse" type="button"
                                    onClick={navigateToMemberList}
                                    style={{borderStyle: 'none', background: 'rgba(0,0,0,0)'}}>회원관리
                            </button>
                            <button className="btn btn-primary text-nowrap" data-bss-hover-animate="pulse" type="button"
                                    onClick={navigateToSchedule}
                                    style={{borderStyle: 'none', background: 'rgba(0,0,0,0)'}}>일정
                            </button>
                            <button className="btn btn-primary text-nowrap" data-bss-hover-animate="pulse" type="button"
                                    onClick={navigateToList}
                                    style={{borderStyle: 'none', background: 'rgba(0,0,0,0)'}}>게시판
                            </button>
                            <button className="btn btn-primary text-nowrap" data-bss-hover-animate="pulse" type="button"
                                    onClick={navigateToEmpList}
                                    style={{borderStyle: 'none', background: 'rgba(0,0,0,0)'}}>급여관리
                            </button>
                            <button className="btn btn-primary text-nowrap" data-bss-hover-animate="pulse" type="button"
                                    onClick={navigateToHrm}
                                    style={{borderStyle: 'none', background: 'rgba(0,0,0,0)'}}>인사관리
                            </button>
                            <button className="btn btn-primary text-nowrap" data-bss-hover-animate="pulse" type="button"
                                    onClick={navigateToApprovalList}
                                    style={{borderStyle: 'none', background: 'rgba(0,0,0,0)'}}>결재
                            </button>
                            <button className="btn btn-primary text-nowrap" data-bss-hover-animate="pulse" type="button"
                                    onClick={navigateToMovieList}
                                    style={{borderStyle: 'none', background: 'rgba(0,0,0,0)'}}>콘텐츠관리
                            </button>
                        </div>
                    </div>
                    <div className="d-lg-flex justify-content-lg-end" style={{height: 'auto', width: '100%'}}>
                        <button className="btn btn-primary text-nowrap" type="button" onClick={navigateToMessageList}
                                style={{borderStyle: 'none',height: '35px', background: 'url("img/message.png") center / contain no-repeat', width: '30px'}}>
                        </button>
                        <button className="btn btn-primary text-nowrap" type="button" onClick={navigateToCat}
                                style={{borderStyle: 'none', background: 'rgba(0,0,0,0)', width: '90px'}}>로그아웃
                        </button>
                    </div>
                </div>
            </div>
        </div>
        )
    );
};

export default Header;