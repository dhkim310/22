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
            <div className="d-xxl-flex justify-content-xxl-center" style={{width: '100%', height: '1800px', background: 'transparent'}}>
              <div className="d-xxl-flex justify-content-xxl-center" style={{width: '10%', height: '100%', background: 'white'}}><button className="btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center" data-bss-hover-animate="pulse" type="button" onClick={ navigateToWrite } style={{width: '150px', height: '50px', color: 'black', background: 'rgba(13,110,253,0)', borderRadius: '6px', borderColor: 'black', marginTop: '24px'}}>글쓰기</button></div>
              <div style={{background: 'white', width: '90%', height: '100%'}}>
                <div style={{width: '100%', height: '7%', borderBottom: '2px ridge rgba(128,128,128,0.26)'}}>
                  <div className="d-xxl-flex align-items-xxl-end" style={{width: '100%', height: '50%'}}><span style={{fontSize: '30px', fontWeight: 'bold', paddingTop: '0px', marginLeft: '41px'}}>게시판 홈</span></div>
                  <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-end" style={{width: '100%', height: '50%'}}><button className="btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center" data-bss-hover-animate="pulse" type="button" style={{width: '150px', height: '30px', color: 'black', background: 'rgba(13,110,253,0)', borderRadius: '0px', border: '0px none black'}}>공지사항</button><button className="btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center" data-bss-hover-animate="pulse" type="button" style={{width: '150px', height: '30px', color: 'black', background: 'rgba(13,110,253,0)', borderRadius: '0px', borderStyle: 'none', borderColor: 'black', borderBottomStyle: 'none'}}>사내게시판</button></div>
                </div>
                <div style={{width: '100%', height: '93%'}}>
                  <div className="text-end d-xxl-flex justify-content-xxl-end align-items-xxl-center" style={{height: '50px', background: 'rgba(0,0,0,0)', borderWidth: '0px', borderStyle: 'none', borderBottom: '0px none rgba(0,0,0,0.09)'}}><input type="search" /><button className="btn btn-primary text-nowrap" type="button" style={{background: 'rgba(13,110,253,0)', borderStyle: 'none', width: '54.3px', height: '36px', color: 'black'}}>검색</button></div>
                  <div className="d-xxl-flex list-group" style={{marginLeft: '0px', marginRight: '0px', maxHeight: '1000px', paddingLeft: '40px'}}><a className="list-group-item list-group-item-action flex-column align-items-start" href="#" style={{height: '150px', marginBottom: '2px', width: '1230px', borderStyle: 'none', paddingTop: '0px', paddingRight: '0px', paddingBottom: '0px', paddingLeft: '0px'}}>
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1" style={{fontWeight: 'bold'}}>엄용민의 막대기 싸움</h5>
                      </div>
                      <p className="mb-1">엄용민 막대기 싸움 짐..</p>
                      <div className="d-xxl-flex justify-content-xxl-center" style={{width: '100%', height: '20px'}}>
                        <div style={{width: '20%', height: '100%'}}><span>엄용민 대표</span></div>
                        <div style={{width: '80%', height: '100%'}}><span>2018/08/11 12:08</span></div>
                      </div>
                    </a><a className="list-group-item list-group-item-action flex-column align-items-start" href="#" style={{height: '150px', marginBottom: '2px', width: '1230px', borderStyle: 'none', paddingTop: '0px', paddingRight: '0px', paddingBottom: '0px', paddingLeft: '0px'}}>
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1" style={{fontWeight: 'bold'}}>엄용민의 막대기 싸움</h5>
                      </div>
                      <p className="mb-1">엄용민 막대기 싸움 짐..</p>
                      <div className="d-xxl-flex justify-content-xxl-center" style={{width: '100%', height: '20px'}}>
                        <div style={{width: '20%', height: '100%'}}><span>엄용민 대표</span></div>
                        <div style={{width: '80%', height: '100%'}}><span>2018/08/11 12:08</span></div>
                      </div>
                    </a><a className="list-group-item list-group-item-action flex-column align-items-start" href="#" style={{height: '150px', marginBottom: '2px', width: '1230px', borderStyle: 'none', paddingTop: '0px', paddingRight: '0px', paddingBottom: '0px', paddingLeft: '0px'}}>
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1" style={{fontWeight: 'bold'}}>엄용민의 막대기 싸움</h5>
                      </div>
                      <p className="mb-1">엄용민 막대기 싸움 짐..</p>
                      <div className="d-xxl-flex justify-content-xxl-center" style={{width: '100%', height: '20px'}}>
                        <div style={{width: '20%', height: '100%'}}><span>엄용민 대표</span></div>
                        <div style={{width: '80%', height: '100%'}}><span>2018/08/11 12:08</span></div>
                      </div>
                    </a><a className="list-group-item list-group-item-action flex-column align-items-start" href="#" style={{height: '150px', marginBottom: '2px', width: '1230px', borderStyle: 'none', paddingTop: '0px', paddingRight: '0px', paddingBottom: '0px', paddingLeft: '0px'}}>
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1" style={{fontWeight: 'bold'}}>엄용민의 막대기 싸움</h5>
                      </div>
                      <p className="mb-1">엄용민 막대기 싸움 짐..</p>
                      <div className="d-xxl-flex justify-content-xxl-center" style={{width: '100%', height: '20px'}}>
                        <div style={{width: '20%', height: '100%'}}><span>엄용민 대표</span></div>
                        <div style={{width: '80%', height: '100%'}}><span>2018/08/11 12:08</span></div>
                      </div>
                    </a></div>
                    <nav className="d-flex justify-content-center fixed-bottom" style={{ textAlign: 'center', paddingTop: '15px', marginBottom: '30px' }}>
                    <ul className="pagination">
                      <li className="page-item"><a className="page-link" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
                      <li className="page-item"><a className="page-link">1</a></li>
                      <li className="page-item"><a className="page-link">2</a></li>
                      <li className="page-item"><a className="page-link">3</a></li>
                      <li className="page-item"><a className="page-link">4</a></li>
                      <li className="page-item"><a className="page-link">5</a></li>
                      <li className="page-item"><a className="page-link" aria-label="Next"><span aria-hidden="true">»</span></a></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>

    </div>
    )
};

export default NoticeList;