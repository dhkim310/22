import React, { useState, useEffect } from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function NoticeList() {
    const [isMobile, setIsMobile] = useState(false);
    const [hoverAnimationList, setHoverAnimationList] = useState([]);

    const navigate = useNavigate();
        const navigateToWrite = () => {
            navigate("/write");
        };

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

    const [noticeList, setNoticeList] = useState([]);

    useEffect(() => {
        axios.get('/api/list') // API 엔드포인트에 맞게 수정
            .then((response) => {
                setNoticeList(response.data.content); // 데이터를 가져와서 상태에 저장
            })
            .catch((error) => {
                console.error('API 호출 오류:', error);
            });
    }, []);

    return (
    <div>
            <div>
              <div style={{width: '100%', height: '100%'}}>
                <div className="d-xxl-flex justify-content-xxl-center" style={{width: '100%', height: '100%', background: 'transparent'}}>
                  <div className="d-xxl-flex justify-content-xxl-center" style={{width: '10%', height: '100%', background: 'white'}}><button className="btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center" data-bss-hover-animate="pulse" type="button" onClick={ navigateToWrite } style={{width: '150px', height: '50px', color: 'black', background: 'rgba(13,110,253,0)', borderRadius: '6px', borderColor: 'black', marginTop: '24px'}}>글쓰기</button></div>
                  <div style={{background: 'white', width: '90%', height: '100%'}}>
                    <div style={{width: '100%', height: '7%', borderBottom: '2px ridge rgba(128,128,128,0.26)'}}>
                      <div className="d-xxl-flex align-items-xxl-end" style={{width: '100%', height: '50%'}}><span style={{fontSize: '30px', fontWeight: 'bold', paddingTop: '0px', marginLeft: '41px'}}>게시판 홈</span></div>
                      <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-end" style={{width: '100%', height: '50%'}}>
                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{width: '30%', height: '100%'}}><button className="btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center" data-bss-hover-animate="pulse" type="button" style={{width: '150px', height: '30px', color: 'black', background: 'rgba(13,110,253,0)', borderRadius: '0px', border: '0px none black'}}>공지사항</button><button className="btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center" data-bss-hover-animate="pulse" type="button" style={{width: '150px', height: '30px', color: 'black', background: 'rgba(13,110,253,0)', borderRadius: '0px', borderStyle: 'none', borderColor: 'black', borderBottomStyle: 'none'}}>사내게시판</button></div>
                        <div className="d-xxl-flex justify-content-xxl-end align-items-xxl-center" style={{width: '70%', height: '100%'}}><input type="search" /><button className="btn btn-primary text-nowrap" type="button" style={{background: 'rgba(13,110,253,0)', borderStyle: 'none', width: '54.3px', height: '36px', color: 'black'}}>검색</button></div>
                      </div>
                      <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-end" style={{width: '100%', height: '50%'}} />
                    </div>
                    <div style={{width: '100%', height: '100%'}}>
                      <div className="list-group d-xxl-flex" style={{marginLeft: '0px', marginRight: '0px', maxHeight: '1000px', paddingLeft: '40px'}}><a className="list-group-item list-group-item-action d-flex flex-row align-items-start" style={{height: '30px', marginBottom: '0px', width: '80%', paddingTop: '0px', paddingRight: '0px', paddingBottom: '0px', paddingLeft: '0px', borderTopRightRadius: '0px', borderTopLeftRadius: '0px', borderStyle: 'solid', borderColor: 'black', borderRightStyle: 'none', borderLeftStyle: 'none', marginTop: '10px'}}>
                          <div className="text-nowrap d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{width: '5%', height: '100%', borderRightWidth: '1px', borderRightStyle: 'none'}}><span style={{fontWeight: 'bold'}}>글번호</span></div>
                          <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{width: '50%', height: '100%', borderRightWidth: '1px', borderRightStyle: 'none'}}><span className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{fontWeight: 'bold', width: '50%', paddingRight: '0px', paddingLeft: '20px', height: '100%', borderRightWidth: '1px', borderRightStyle: 'none'}}>제목</span></div>
                          <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{width: '10%', height: '100%', borderRightWidth: '1px', borderRightStyle: 'none'}}><span style={{fontWeight: 'bold'}}>조회수</span></div>
                          <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{width: '10%', height: '100%', borderWidth: '0px', borderStyle: 'none', borderRightWidth: '1px', borderRightStyle: 'none'}}><span style={{fontWeight: 'bold'}}>작성자</span></div>
                          <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{width: '35%', height: '100%'}}><span style={{fontWeight: 'bold'}}>작성일</span></div>
                        </a><a className="list-group-item list-group-item-action d-flex flex-row align-items-start" style={{height: '100px', marginBottom: '2px', width: '80%', paddingTop: '0px', paddingRight: '0px', paddingBottom: '0px', paddingLeft: '0px', borderTopRightRadius: '0px', borderTopLeftRadius: '0px', borderStyle: 'none', borderColor: 'black', borderRightStyle: 'none', borderLeftStyle: 'none'}}>
                          <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{width: '5%', height: '100%', borderRightWidth: '1px', borderRightStyle: 'none'}}><span style={{fontWeight: 'bold'}}>1</span></div>
                          <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{width: '50%', height: '100%', borderRightWidth: '1px', borderRightStyle: 'none'}}><span className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{fontWeight: 'bold', width: 'auto', paddingRight: '0px', paddingLeft: '20px', height: '100%', borderRightWidth: '1px', borderRightStyle: 'none'}}>고구려의 흥망성쇠</span></div>
                          <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{width: '10%', height: '100%', borderRightWidth: '1px', borderRightStyle: 'none'}}><span style={{fontWeight: 'bold'}}>12</span></div>
                          <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{width: '10%', height: '100%', borderWidth: '0px', borderStyle: 'none', borderRightWidth: '1px', borderRightStyle: 'none'}}><span style={{fontWeight: 'bold'}}>유재형</span></div>
                          <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{width: '35%', height: '100%'}}><span style={{fontWeight: 'bold'}}>2034-10-01 T 24:00:00</span></div>
                        </a><a className="list-group-item list-group-item-action d-flex flex-row align-items-start" style={{height: '100px', marginBottom: '2px', width: '80%', paddingTop: '0px', paddingRight: '0px', paddingBottom: '0px', paddingLeft: '0px', borderTopRightRadius: '0px', borderTopLeftRadius: '0px', borderStyle: 'none', borderColor: 'black', borderRightStyle: 'none', borderLeftStyle: 'none'}}>
                          <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{width: '5%', height: '100%', borderRightWidth: '1px', borderRightStyle: 'none'}}><span style={{fontWeight: 'bold'}}>1</span></div>
                          <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{width: '50%', height: '100%', borderRightWidth: '1px', borderRightStyle: 'none'}}><span className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{fontWeight: 'bold', width: 'auto', paddingRight: '0px', paddingLeft: '20px', height: '100%', borderRightWidth: '1px', borderRightStyle: 'none'}}>고구려의 흥망성쇠</span></div>
                          <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{width: '10%', height: '100%', borderRightWidth: '1px', borderRightStyle: 'none'}}><span style={{fontWeight: 'bold'}}>12</span></div>
                          <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{width: '10%', height: '100%', borderWidth: '0px', borderStyle: 'none', borderRightWidth: '1px', borderRightStyle: 'none'}}><span style={{fontWeight: 'bold'}}>유재형</span></div>
                          <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{width: '35%', height: '100%'}}><span style={{fontWeight: 'bold'}}>2034-10-01 T 24:00:00</span></div>
                        </a><a className="list-group-item list-group-item-action d-flex flex-row align-items-start" style={{height: '100px', marginBottom: '2px', width: '80%', paddingTop: '0px', paddingRight: '0px', paddingBottom: '0px', paddingLeft: '0px', borderTopRightRadius: '0px', borderTopLeftRadius: '0px', borderStyle: 'none', borderColor: 'black', borderRightStyle: 'none', borderLeftStyle: 'none'}}>
                          <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{width: '5%', height: '100%', borderRightWidth: '1px', borderRightStyle: 'none'}}><span style={{fontWeight: 'bold'}}>1</span></div>
                          <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{width: '50%', height: '100%', borderRightWidth: '1px', borderRightStyle: 'none'}}><span className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{fontWeight: 'bold', width: 'auto', paddingRight: '0px', paddingLeft: '20px', height: '100%', borderRightWidth: '1px', borderRightStyle: 'none'}}>고구려의 흥망성쇠</span></div>
                          <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{width: '10%', height: '100%', borderRightWidth: '1px', borderRightStyle: 'none'}}><span style={{fontWeight: 'bold'}}>12</span></div>
                          <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{width: '10%', height: '100%', borderWidth: '0px', borderStyle: 'none', borderRightWidth: '1px', borderRightStyle: 'none'}}><span style={{fontWeight: 'bold'}}>유재형</span></div>
                          <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{width: '35%', height: '100%'}}><span style={{fontWeight: 'bold'}}>2034-10-01 T 24:00:00</span></div>
                        </a><a className="list-group-item list-group-item-action d-flex flex-row align-items-start" style={{height: '100px', marginBottom: '2px', width: '80%', paddingTop: '0px', paddingRight: '0px', paddingBottom: '0px', paddingLeft: '0px', borderTopRightRadius: '0px', borderTopLeftRadius: '0px', borderStyle: 'none', borderColor: 'black', borderRightStyle: 'none', borderLeftStyle: 'none'}}>
                          <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{width: '5%', height: '100%', borderRightWidth: '1px', borderRightStyle: 'none'}}><span style={{fontWeight: 'bold'}}>1</span></div>
                          <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{width: '50%', height: '100%', borderRightWidth: '1px', borderRightStyle: 'none'}}><span className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{fontWeight: 'bold', width: 'auto', paddingRight: '0px', paddingLeft: '20px', height: '100%', borderRightWidth: '1px', borderRightStyle: 'none'}}>고구려의 흥망성쇠</span></div>
                          <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{width: '10%', height: '100%', borderRightWidth: '1px', borderRightStyle: 'none'}}><span style={{fontWeight: 'bold'}}>12</span></div>
                          <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{width: '10%', height: '100%', borderWidth: '0px', borderStyle: 'none', borderRightWidth: '1px', borderRightStyle: 'none'}}><span style={{fontWeight: 'bold'}}>유재형</span></div>
                          <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{width: '35%', height: '100%'}}><span style={{fontWeight: 'bold'}}>2034-10-01 T 24:00:00</span></div>
                        </a><a className="list-group-item list-group-item-action d-flex flex-row align-items-start" style={{height: '100px', marginBottom: '2px', width: '80%', paddingTop: '0px', paddingRight: '0px', paddingBottom: '0px', paddingLeft: '0px', borderTopRightRadius: '0px', borderTopLeftRadius: '0px', borderStyle: 'none', borderColor: 'black', borderRightStyle: 'none', borderLeftStyle: 'none'}}>
                          <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{width: '5%', height: '100%', borderRightWidth: '1px', borderRightStyle: 'none'}}><span>1</span></div>
                          <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{width: '50%', height: '100%', borderRightWidth: '1px', borderRightStyle: 'none'}}><span className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{width: 'auto', paddingRight: '0px', paddingLeft: '20px', height: '100%', borderRightWidth: '1px', borderRightStyle: 'none'}}>고구려의 흥망성쇠</span></div>
                          <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{width: '10%', height: '100%', borderRightWidth: '1px', borderRightStyle: 'none'}}><span>12</span></div>
                          <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{width: '10%', height: '100%', borderWidth: '0px', borderStyle: 'none', borderRightWidth: '1px', borderRightStyle: 'none'}}><span>유재형</span></div>
                          <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{width: '35%', height: '100%'}}><span>2034-10-01 T 24:00:00</span></div>
                        </a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{width: '100%', height: '50px'}} />
            <div className="d-xxl-flex justify-content-xxl-start" style={{background: 'rgba(111,66,193,0)', height: '109px'}}>
              <div style={{width: '42%', height: '100%'}} />
              <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center position-fixed" style={{height: '100%', width: '62%'}}>
                <nav className="d-flex justify-content-center fixed-bottom" style={{ textAlign: 'center', paddingTop: '54px' }}>
                  <ul className="pagination">
                    <li className="page-item"><a className="page-link" aria-label="Previous" href="#"><span aria-hidden="true">«</span></a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">4</a></li>
                    <li className="page-item"><a className="page-link" href="#">5</a></li>
                    <li className="page-item"><a className="page-link" aria-label="Next" href="#"><span aria-hidden="true">»</span></a></li>
                  </ul>
                </nav>
              </div>
            </div>
    </div>
    )
};

export default NoticeList;