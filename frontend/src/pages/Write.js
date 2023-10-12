import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css';
import React, { useState, useEffect } from 'react';
import Editor from '../component/Editor';



function Write() {
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
        <div>
            <div>
              <div style={{width: '100%', height: '100%'}}>
                <div className="d-xxl-flex justify-content-xxl-center" style={{width: '100%', height: '1800px', background: 'transparent'}}>
                  <div className="d-xxl-flex justify-content-xxl-center" style={{width: '10%', height: '100%', background: 'white'}}><button className="btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center" data-bss-hover-animate="pulse" type="button" style={{width: '150px', height: '50px', color: 'black', background: 'rgba(13,110,253,0)', borderRadius: '6px', borderColor: 'black', marginTop: '24px'}}>작성 완료</button></div>
                  <div style={{background: 'white', width: '90%', height: '100%'}}>
                    <div style={{width: '100%', height: '7%', borderBottom: '2px ridge rgba(128,128,128,0.26)'}}>
                      <div className="d-xxl-flex align-items-xxl-end" style={{width: '100%', height: '50%'}}><span style={{fontSize: '30px', fontWeight: 'bold', paddingTop: '0px', marginLeft: '41px'}}>공지사항</span></div>
                      <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-end" style={{width: '100%', height: '50%'}} />
                    </div>
                    <div style={{height: '93%'}}>
                      <div className="d-xxl-flex align-items-xxl-center" style={{height: '7%', background: 'transparent'}}>
                        <div className="d-xxl-flex align-items-xxl-center" style={{height: '34%', width: '100%', background: 'transparent'}}>
                          <div className="d-xxl-flex align-items-xxl-center" style={{height: '100%', width: '70%', background: 'rgba(128,128,128,0.34)', borderRadius: '6px'}}><span style={{paddingRight: '0px', paddingLeft: '12px'}}>파일명 쓰면 될듯</span></div>
                          <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{height: '100%', width: '30%', background: 'transparent'}}><button className="btn btn-primary" data-bss-hover-animate="pulse" type="button" style={{color: 'black', background: 'white', borderColor: 'black', marginRight: '0px', marginLeft: '6px'}}>업로드</button></div>
                        </div>
                      </div>
                      <div className="d-xxl-flex align-items-xxl-center" style={{ height: '2%', width: '70%', background: 'rgba(128, 128, 128, 0.34)', marginTop: '-20px' }}>
                        <input type="text" style={{ width: "100%" ,paddingRight: '0px', paddingLeft: '10px'}} placeholder="제목을 입력하세요." />
                      </div>
                      <div className="d-xxl-flex justify-content-xxl-start align-items-xxl" style={{width: '74%', height: '50%'}}><Editor /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        </div>
    )
};

export default Write;