import React, { useState, useEffect } from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css'

function Approval() {
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
                  <div className="justify-content-xxl-center align-items-xxl-start" style={{width: '10%', height: '100%', background: 'white'}}>
                    <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-start" style={{width: '100%', height: '5%', background: 'transparent'}}><button className="btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center" data-bss-hover-animate="pulse" type="button" style={{width: '150px', height: '50px', color: 'black', background: 'rgba(13,110,253,0)', borderRadius: '6px', borderColor: 'black', marginTop: '24px'}}>새 결재 진행</button></div>
                    <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-end" style={{width: '100%', height: '4%', background: 'transparent'}}><span style={{fontSize: '22px', fontWeight: 'bold', paddingTop: '9px'}}>결재상태</span></div>
                    <div style={{width: '100%', height: '5%', background: 'transparent'}}>
                      <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-end" style={{width: '100%', height: '50%', background: 'transparent', borderWidth: '0px', borderStyle: 'none', borderBottom: '0px none rgba(128,128,128,0.2)', borderLeftStyle: 'none'}}><button className="btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center" data-bss-hover-animate="pulse" type="button" style={{width: '150px', height: '30px', color: 'black', background: 'rgba(13,110,253,0)', borderRadius: '0px', border: '0px none black'}}>결재 대기 문서</button></div>
                      <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-start" style={{width: '100%', height: '50%', background: 'transparent'}}><button className="btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center" data-bss-hover-animate="pulse" type="button" style={{width: '150px', height: '30px', color: 'black', background: 'rgba(13,110,253,0)', borderRadius: '0px', border: '0px none black'}}>사내게시판</button></div>
                    </div>
                  </div>
                  <div style={{background: 'white', width: '90%', height: '100%'}}>
                    <div style={{width: '100%', height: '7%', borderBottom: '2px ridge rgba(128,128,128,0.26)', borderLeft: '1px ridge rgba(128,128,128,0.21)'}}>
                      <div className="d-xxl-flex align-items-xxl-end" style={{width: '100%', height: '50%'}}>
                        <div className="d-xxl-flex justify-content-xxl-start" style={{width: '50%', height: '50%'}}><span style={{fontSize: '30px', fontWeight: 'bold', paddingTop: '0px', marginLeft: '41px'}}>결재 문서</span></div>
                      </div>
                      <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-end" style={{width: '100%', height: '50%'}}>
                        <div className="d-xxl-flex justify-content-xxl-start" style={{width: '50%', height: '50%'}}><span className="d-xxl-flex justify-content-xxl-center" style={{width: '150px', height: '30px'}}>엄용민 인턴</span><span className="d-xxl-flex justify-content-xxl-start" style={{width: '150px', height: '30px'}}>12:05:12</span><span className="d-xxl-flex justify-content-xxl-start" style={{width: '100px', height: '30px'}}>2023/09/25</span></div>
                        <div className="d-xxl-flex justify-content-xxl-end" style={{width: '50%', height: '100%'}}><button className="btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center" data-bss-hover-animate="pulse" type="button" style={{width: '75px', height: '25px', color: 'black', background: 'url("assets/img/icons8-파일-편집-100.png") center / contain no-repeat, rgba(13,110,253,0)', borderRadius: '6px', marginTop: '24px', borderStyle: 'none', borderColor: 'black'}} /><button className="btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center" data-bss-hover-animate="pulse" type="button" style={{width: '75px', height: '25px', color: 'black', background: 'url("assets/img/icons8-부-100.png") center / contain no-repeat, rgba(13,110,253,0)', borderRadius: '6px', marginTop: '24px', borderStyle: 'none', borderColor: 'black'}} /><button className="btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center" data-bss-hover-animate="pulse" type="button" style={{width: '75px', height: '25px', color: 'black', background: 'url("assets/img/KakaoTalk_20230925_125929673.png") center / contain no-repeat, rgba(13,110,253,0)', borderRadius: '6px', marginTop: '24px', borderStyle: 'none', borderColor: 'black'}} /><button className="btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center" data-bss-hover-animate="pulse" type="button" style={{width: '75px', height: '25px', color: 'black', background: 'url("assets/img/icons8-인쇄-100.png") center / contain no-repeat, rgba(13,110,253,0)', borderRadius: '6px', marginTop: '24px', borderStyle: 'none', borderColor: 'black'}} /></div>
                      </div>
                    </div>
                    <div style={{width: '100%', height: '93%', borderLeft: '1px ridge rgba(128,128,128,0.2)'}} />
                  </div>
                </div>
              </div>
            </div>

        </div>
    )
};

export default Approval;