import React, {useEffect, useState} from "react";
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css'
import {useNavigate} from "react-router-dom";
import axios from "axios";

function EmpList() {
    const [isMobile, setIsMobile] = useState(false);
    const [hoverAnimationList, setHoverAnimationList] = useState([]);

    const navigate = useNavigate();

    const navigateToDetail = () => {
        navigate("/api/salary/{id}")
    };

    // useEffect(() => {
    //     const getWidth = () =>{
    //         return window.innerWidth;
    //     };
    //
    //     setIsMobile(getWidth() < 768);
    //
    //     const elements = document.querySelectorAll('[data-bss-hover-animate]')
    //     setHoverAnimationList(elements);
    //
    //     elements.forEach((element) => {
    //         element.addEventListener('mouseenter', () => {
    //             element.classList.add('animated', element.dataset.bssHoverAnimate);
    //         });
    //         element.addEventListener('mouseleave', () => {
    //             element.classList.remove('animated', element.dateset.bssHoverAnimate);
    //         });
    //     });
    // }, []);

    const [empList, setEmpList] = useState([]);

    useEffect(() => {
        axios.get('api/emp')
            .then((response) => {
                setEmpList(response.data.content);
            })
            .catch((error) => {
                console.error('호출오류: ', error);
            });
    }, []);

    return (
        <div>
            <div className="d-xxl-flex" style={{width: 'auto', height: '1080px'}}>
                <div style={{background: 'rgba(214,51,132,0)', height: '100%', width: '85%'}}>
                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{
                        background: 'rgba(13,110,253,0)',
                        height: '45px',
                        borderTop: '2px ridge rgba(128,128,128,0.32)',
                        borderBottom: '2px ridge rgba(128,128,128,0.32)',
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
                    <div style={{width: '100%', height: '20px'}}></div>
                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{
                        background: 'rgba(13,110,253,0)',
                        height: '45px',
                        borderTop: '2px none rgba(128,128,128,0.32)',
                        borderBottom: '2px none rgba(128,128,128,0.32)',
                        width: '100%'
                    }}>
                        <div className="d-xxl-flex justify-content-xxl-start"
                             style={{height: '45px', width: '115px'}}></div>
                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                             style={{height: '45px', width: '230px'}}><span>유재형</span></div>
                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                             style={{height: '45px', width: '230px'}}><span>인턴</span></div>
                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                             style={{height: '45px', width: '230px'}}><span>유교부</span></div>
                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                             style={{height: '45px', width: '300px'}}><span>12000</span></div>
                    </div>
                {/*    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*         style="background: rgba(13,110,253,0);height: 45px;border-top: 2px none rgba(128,128,128,0.32);border-bottom: 2px none rgba(128,128,128,0.32);width: 100%;">*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start" style="height: 45px;width: 115px;"></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>유재형</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>인턴</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>유교부</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 300px;"><span>12000</span></div>*/}
                {/*    </div>*/}
                {/*    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*         style="background: rgba(13,110,253,0);height: 45px;border-top: 2px none rgba(128,128,128,0.32);border-bottom: 2px none rgba(128,128,128,0.32);width: 100%;">*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start" style="height: 45px;width: 115px;"></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>유재형</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>인턴</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>유교부</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 300px;"><span>12000</span></div>*/}
                {/*    </div>*/}
                {/*    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*         style="background: rgba(13,110,253,0);height: 45px;border-top: 2px none rgba(128,128,128,0.32);border-bottom: 2px none rgba(128,128,128,0.32);width: 100%;">*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start" style="height: 45px;width: 115px;"></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>유재형</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>인턴</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>유교부</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 300px;"><span>12000</span></div>*/}
                {/*    </div>*/}
                {/*    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*         style="background: rgba(13,110,253,0);height: 45px;border-top: 2px none rgba(128,128,128,0.32);border-bottom: 2px none rgba(128,128,128,0.32);width: 100%;">*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start" style="height: 45px;width: 115px;"></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>유재형</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>인턴</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>유교부</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 300px;"><span>12000</span></div>*/}
                {/*    </div>*/}
                {/*    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*         style="background: rgba(13,110,253,0);height: 45px;border-top: 2px none rgba(128,128,128,0.32);border-bottom: 2px none rgba(128,128,128,0.32);width: 100%;">*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start" style="height: 45px;width: 115px;"></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>유재형</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>인턴</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>유교부</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 300px;"><span>12000</span></div>*/}
                {/*    </div>*/}
                {/*    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*         style="background: rgba(13,110,253,0);height: 45px;border-top: 2px none rgba(128,128,128,0.32);border-bottom: 2px none rgba(128,128,128,0.32);width: 100%;">*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start" style="height: 45px;width: 115px;"></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>유재형</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>인턴</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>유교부</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 300px;"><span>12000</span></div>*/}
                {/*    </div>*/}
                {/*    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*         style="background: rgba(13,110,253,0);height: 45px;border-top: 2px none rgba(128,128,128,0.32);border-bottom: 2px none rgba(128,128,128,0.32);width: 100%;">*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start" style="height: 45px;width: 115px;"></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>유재형</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>인턴</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>유교부</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 300px;"><span>12000</span></div>*/}
                {/*    </div>*/}
                {/*    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*         style="background: rgba(13,110,253,0);height: 45px;border-top: 2px none rgba(128,128,128,0.32);border-bottom: 2px none rgba(128,128,128,0.32);width: 100%;">*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start" style="height: 45px;width: 115px;"></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>유재형</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>인턴</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>유교부</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 300px;"><span>12000</span></div>*/}
                {/*    </div>*/}
                {/*    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*         style="background: rgba(13,110,253,0);height: 45px;border-top: 2px none rgba(128,128,128,0.32);border-bottom: 2px none rgba(128,128,128,0.32);width: 100%;">*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start" style="height: 45px;width: 115px;"></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>유재형</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>인턴</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 230px;"><span>유교부</span></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="height: 45px;width: 300px;"><span>12000</span></div>*/}
                {/*    </div>*/}
                {/*    <div style="width: 100%;height: 50px;"></div>*/}
                {/*    <div className="d-xxl-flex justify-content-xxl-start"*/}
                {/*         style="background: rgba(111,66,193,0);height: 109px;">*/}
                {/*        <div style="width: 48%;height: 109px;"></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center"*/}
                {/*             style="height: 109px;width: 342px;">*/}
                {/*            <nav>*/}
                {/*                <ul className="pagination">*/}
                {/*                    <li className="page-item"><a className="page-link" aria-label="Previous"*/}
                {/*                                                 href="#"><span aria-hidden="true">«</span></a></li>*/}
                {/*                    <li className="page-item"><a className="page-link" href="#">1</a></li>*/}
                {/*                    <li className="page-item"><a className="page-link" href="#">2</a></li>*/}
                {/*                    <li className="page-item"><a className="page-link" href="#">3</a></li>*/}
                {/*                    <li className="page-item"><a className="page-link" href="#">4</a></li>*/}
                {/*                    <li className="page-item"><a className="page-link" href="#">5</a></li>*/}
                {/*                    <li className="page-item"><a className="page-link" aria-label="Next" href="#"><span*/}
                {/*                        aria-hidden="true">»</span></a></li>*/}
                {/*                </ul>*/}
                {/*            </nav>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div style="background: rgba(13,110,253,0);height: 100%;width: 15%;">*/}
                {/*    <div*/}
                {/*        style="width: 100%;height: 45px;border-top: 2px ridge rgba(128,128,128,0.32);border-bottom: 2px ridge rgba(128,128,128,0.32);"></div>*/}
                {/*    <div style="width: 100%;height: 20px;border-left: 2px ridge rgba(128,128,128,0.32);"></div>*/}
                {/*    <div className="d-xxl-flex justify-content-xxl-center"*/}
                {/*         style="width: 100%;height: 45px;border-left: 2px ridge rgba(128,128,128,0.32);">*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-end align-items-xxl-center"*/}
                {/*             style="width: 47.5%;">*/}
                {/*            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"*/}
                {/*                    style="background: black;width: 90px;border-style: none;border-left-style: none;">급여내역*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*        <div style="width: 5%;"></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="width: 47.5%;">*/}
                {/*            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"*/}
                {/*                    style="background: black;border-style: none;">급여등록*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="d-xxl-flex justify-content-xxl-center"*/}
                {/*         style="width: 100%;height: 45px;border-left: 2px ridge rgba(128,128,128,0.32);">*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-end align-items-xxl-center"*/}
                {/*             style="width: 47.5%;">*/}
                {/*            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"*/}
                {/*                    style="background: black;width: 90px;border-style: none;border-left-style: none;">급여내역*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*        <div style="width: 5%;"></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="width: 47.5%;">*/}
                {/*            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"*/}
                {/*                    style="background: black;border-style: none;">급여등록*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="d-xxl-flex justify-content-xxl-center"*/}
                {/*         style="width: 100%;height: 45px;border-left: 2px ridge rgba(128,128,128,0.32);">*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-end align-items-xxl-center"*/}
                {/*             style="width: 47.5%;">*/}
                {/*            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"*/}
                {/*                    style="background: black;width: 90px;border-style: none;border-left-style: none;">급여내역*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*        <div style="width: 5%;"></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="width: 47.5%;">*/}
                {/*            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"*/}
                {/*                    style="background: black;border-style: none;">급여등록*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="d-xxl-flex justify-content-xxl-center"*/}
                {/*         style="width: 100%;height: 45px;border-left: 2px ridge rgba(128,128,128,0.32);">*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-end align-items-xxl-center"*/}
                {/*             style="width: 47.5%;">*/}
                {/*            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"*/}
                {/*                    style="background: black;width: 90px;border-style: none;border-left-style: none;">급여내역*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*        <div style="width: 5%;"></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="width: 47.5%;">*/}
                {/*            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"*/}
                {/*                    style="background: black;border-style: none;">급여등록*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="d-xxl-flex justify-content-xxl-center"*/}
                {/*         style="width: 100%;height: 45px;border-left: 2px ridge rgba(128,128,128,0.32);">*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-end align-items-xxl-center"*/}
                {/*             style="width: 47.5%;">*/}
                {/*            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"*/}
                {/*                    style="background: black;width: 90px;border-style: none;border-left-style: none;">급여내역*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*        <div style="width: 5%;"></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="width: 47.5%;">*/}
                {/*            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"*/}
                {/*                    style="background: black;border-style: none;">급여등록*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="d-xxl-flex justify-content-xxl-center"*/}
                {/*         style="width: 100%;height: 45px;border-left: 2px ridge rgba(128,128,128,0.32);">*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-end align-items-xxl-center"*/}
                {/*             style="width: 47.5%;">*/}
                {/*            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"*/}
                {/*                    style="background: black;width: 90px;border-style: none;border-left-style: none;">급여내역*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*        <div style="width: 5%;"></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="width: 47.5%;">*/}
                {/*            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"*/}
                {/*                    style="background: black;border-style: none;">급여등록*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="d-xxl-flex justify-content-xxl-center"*/}
                {/*         style="width: 100%;height: 45px;border-left: 2px ridge rgba(128,128,128,0.32);">*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-end align-items-xxl-center"*/}
                {/*             style="width: 47.5%;">*/}
                {/*            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"*/}
                {/*                    style="background: black;width: 90px;border-style: none;border-left-style: none;">급여내역*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*        <div style="width: 5%;"></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="width: 47.5%;">*/}
                {/*            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"*/}
                {/*                    style="background: black;border-style: none;">급여등록*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="d-xxl-flex justify-content-xxl-center"*/}
                {/*         style="width: 100%;height: 45px;border-left: 2px ridge rgba(128,128,128,0.32);">*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-end align-items-xxl-center"*/}
                {/*             style="width: 47.5%;">*/}
                {/*            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"*/}
                {/*                    style="background: black;width: 90px;border-style: none;border-left-style: none;">급여내역*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*        <div style="width: 5%;"></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="width: 47.5%;">*/}
                {/*            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"*/}
                {/*                    style="background: black;border-style: none;">급여등록*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="d-xxl-flex justify-content-xxl-center"*/}
                {/*         style="width: 100%;height: 45px;border-left: 2px ridge rgba(128,128,128,0.32);">*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-end align-items-xxl-center"*/}
                {/*             style="width: 47.5%;">*/}
                {/*            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"*/}
                {/*                    style="background: black;width: 90px;border-style: none;border-left-style: none;">급여내역*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*        <div style="width: 5%;"></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="width: 47.5%;">*/}
                {/*            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"*/}
                {/*                    style="background: black;border-style: none;">급여등록*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="d-xxl-flex justify-content-xxl-center"*/}
                {/*         style="width: 100%;height: 45px;border-left: 2px ridge rgba(128,128,128,0.32);">*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-end align-items-xxl-center"*/}
                {/*             style="width: 47.5%;">*/}
                {/*            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"*/}
                {/*                    style="background: black;width: 90px;border-style: none;border-left-style: none;">급여내역*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*        <div style="width: 5%;"></div>*/}
                {/*        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"*/}
                {/*             style="width: 47.5%;">*/}
                {/*            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"*/}
                {/*                    style="background: black;border-style: none;">급여등록*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                </div>
            </div>
        </div>
    )
};
export default EmpList;
