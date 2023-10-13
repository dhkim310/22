import React, { useState } from 'react';
import Modal from 'react-modal';

function EmpCreateComponent({ isOpen, closeModal }) {

    const customModalStyles = {
        content: {
            justifyContent: 'center', // 수평 가운데 정렬
            width: '450px',
            height: '500px',
            backgroundColor: 'white',
            borderRadius: '34px',
            borderStyle: 'solid',
            top: '50%', // top 값을 픽셀 단위로 설정
            left: '50%', // left 값을 픽셀 단위로 설정
            transform: 'translate(-50%, -50%)', // 중앙 정렬을 위한 transform 속성 추가
        },
    };

    return (
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          style={customModalStyles}
          contentLabel="직원생성 모달"
        >
            <div>
                <div style={{ width: '100%', height: '100%', background: 'white', borderRadius: '34px', borderStyle: 'none' }}>
                    <div className="d-xxl-flex justify-content-xxl-start" style={{ width: '100%', height: '11%', background: 'rgba(253,126,20,0)' }}>
                        <div style={{ width: '6%', height: '100%' }} />
                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ height: '100%', width: '26%', background: 'rgba(253,126,20,0)', marginBottom: '20px' }}>
                            <span style={{ fontSize: '22px', fontWeight: 'bold' }}>직원 생성</span>
                        </div>
                        <div className="d-xxl-flex justify-content-xxl-end align-items-xxl-center" style={{ height: '100%', width: '63%' }}>
                            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button" style={{ background: 'url("assets/img/icons8-취소하다-500.png") center / contain no-repeat', width: '38px', height: '37px', borderStyle: 'none' }} />
                        </div>
                    </div>
                    <div className="d-xxl-flex justify-content-xxl-center" style={{ width: '100%', height: '85%', background: 'rgba(253,126,20,0)' }}>
                        <div style={{ width: '6%', height: '100%', background: 'rgba(253,126,20,0)' }} />
                        <div className="align-items-xxl-start" style={{ height: '100%', width: '88%', background: 'rgba(253,126,20,0)' }}>
                            <div className="justify-content-xxl-center" style={{ width: '100%', height: '100%' }}>
                                <div style={{ width: '100%', height: '2%', background: 'rgba(214,51,132,0)' }} />

                                 <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ background: 'rgba(102,16,242,0)', width: '100%', height: '10%', marginTop: '10px' ,marginBottom: '10px' }}>
                                     <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ background: 'rgba(111,66,193,0)', height: '50%', width: '100%', fontSize: '15px' }}>
                                         <span>이름</span>
                                     </div>
                                     <div style={{ background: 'rgba(111,66,193,0)', height: '2px', width: '100%' }} />
                                     <div className="d-xxl-flex align-items-xxl-center" style={{ background: 'rgba(111,66,193,0)', height: '40%', width: '100%' }}>
                                         <input type="text" />
                                     </div>
                                 </div>

                                 <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ background: 'rgba(102,16,242,0)', width: '100%', height: '10%', marginTop: '10px' ,marginBottom: '10px' }}>
                                     <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ background: 'rgba(111,66,193,0)', height: '50%', width: '100%', fontSize: '15px' }}>
                                         <span>아이디</span>
                                     </div>
                                     <div style={{ background: 'rgba(111,66,193,0)', height: '2px', width: '100%' }} />
                                     <div className="d-xxl-flex align-items-xxl-center" style={{ background: 'rgba(111,66,193,0)', height: '40%', width: '100%' }}>
                                         <input type="text" />
                                     </div>
                                 </div>
                                 <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ background: 'rgba(102,16,242,0)', width: '100%', height: '10%', marginTop: '10px' ,marginBottom: '10px' }}>
                                     <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ background: 'rgba(111,66,193,0)', height: '50%', width: '100%', fontSize: '15px' }}>
                                         <span>연락처</span>
                                     </div>
                                     <div style={{ background: 'rgba(111,66,193,0)', height: '2px', width: '100%' }} />
                                     <div className="d-xxl-flex align-items-xxl-center" style={{ background: 'rgba(111,66,193,0)', height: '40%', width: '100%' }}>
                                         <input type="text" />
                                     </div>
                                 </div>
                                 <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ background: 'rgba(102,16,242,0)', width: '100%', height: '10%', marginTop: '10px' ,marginBottom: '10px' }}>
                                     <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ background: 'rgba(111,66,193,0)', height: '50%', width: '100%', fontSize: '15px' }}>
                                         <span>직급</span>
                                     </div>
                                     <div style={{ background: 'rgba(111,66,193,0)', height: '2px', width: '100%' }} />
                                     <div className="d-xxl-flex align-items-xxl-center" style={{ background: 'rgba(111,66,193,0)', height: '40%', width: '100%' }}>
                                         <input type="text" />
                                     </div>
                                 </div>
                                 <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ background: 'rgba(102,16,242,0)', width: '100%', height: '10%', marginTop: '10px' ,marginBottom: '10px' }}>
                                     <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ background: 'rgba(111,66,193,0)', height: '50%', width: '100%', fontSize: '15px' }}>
                                         <span>생년월일</span>
                                     </div>
                                     <div style={{ background: 'rgba(111,66,193,0)', height: '2px', width: '100%' }} />
                                     <div className="d-xxl-flex align-items-xxl-center" style={{ background: 'rgba(111,66,193,0)', height: '40%', width: '100%' }}>
                                         <input type="text" />
                                     </div>
                                 </div>
                                 <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ background: 'rgba(102,16,242,0)', width: '100%', height: '10%', marginTop: '10px' ,marginBottom: '10px' }}>
                                     <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ background: 'rgba(111,66,193,0)', height: '50%', width: '100%', fontSize: '15px' }}>
                                         <span>입사일</span>
                                     </div>
                                     <div style={{ background: 'rgba(111,66,193,0)', height: '2px', width: '100%' }} />
                                     <div className="d-xxl-flex align-items-xxl-center" style={{ background: 'rgba(111,66,193,0)', height: '40%', width: '100%' }}>
                                         <input type="text" />
                                     </div>
                                 </div>
                                 <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ background: 'rgba(102,16,242,0)', width: '100%', height: '10%', marginTop: '10px' ,marginBottom: '10px' }}>
                                     <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ background: 'rgba(111,66,193,0)', height: '50%', width: '100%', fontSize: '15px' }}>
                                         <span>재직상태</span>
                                     </div>
                                     <div style={{ background: 'rgba(111,66,193,0)', height: '2px', width: '100%' }} />
                                     <div className="d-xxl-flex align-items-xxl-center" style={{ background: 'rgba(111,66,193,0)', height: '40%', width: '100%' }}>
                                         <input type="text" />
                                     </div>
                                 </div>
                                 <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ background: 'rgba(102,16,242,0)', width: '100%', height: '10%', marginTop: '10px' ,marginBottom: '10px' }}>
                                     <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ background: 'rgba(111,66,193,0)', height: '50%', width: '100%', fontSize: '15px' }}>
                                         <span>성별</span>
                                     </div>
                                     <div style={{ background: 'rgba(111,66,193,0)', height: '2px', width: '100%' }} />
                                     <div className="d-xxl-flex align-items-xxl-center" style={{ background: 'rgba(111,66,193,0)', height: '40%', width: '100%' }}>
                                         <input type="text" />
                                     </div>
                                 </div>
                                 <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ background: 'rgba(102,16,242,0)', width: '100%', height: '10%', marginTop: '10px' ,marginBottom: '10px' }}>
                                     <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{ background: 'rgba(111,66,193,0)', height: '50%', width: '100%', fontSize: '15px' }}>
                                         <span>주소</span>
                                     </div>
                                     <div style={{ background: 'rgba(111,66,193,0)', height: '2px', width: '100%' }} />
                                     <div className="d-xxl-flex align-items-xxl-center" style={{ background: 'rgba(111,66,193,0)', height: '40%', width: '100%' }}>
                                         <input type="text" />
                                     </div>

                            </div>
                                <div style={{ width: '100%', height: '2%', background: 'rgba(214,51,132,0)' }} />
                                <div className="d-xxl-flex align-items-xxl-end" style={{ width: '100%', height: '21%' }}>
                                    <div className="d-xxl-flex justify-content-xxl-end align-items-xxl-center" style={{ width: '100%', height: '52%' }}>
                                        <button className="btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center" data-bss-hover-animate="pulse" type="button" style={{ width: '15%', height: '60%', fontSize: '12px', background: 'black', borderStyle: 'none' }}>작성</button>
                                        <div style={{ height: '100%', width: '0%' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ width: '6%', height: '100%', background: 'rgba(253,126,20,0)' }} />
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default EmpCreateComponent;

