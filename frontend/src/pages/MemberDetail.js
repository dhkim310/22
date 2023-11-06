import React, {useEffect, useState} from "react";
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css'
import {useParams} from "react-router-dom";
import {selectMemberDetail} from "../api/Member";

function MemberDetail(){
    const {id} = useParams();
    const [memberDetail, setMemberDetail] = useState({});
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // async function fetchData() {
        //     try {
        //         const data = await selectMemberDetail(id);
        //         setMemberDetail(data);
        //     }catch (error){
        //         console.log('error', error);
        //     }
        // };
        const fetchData = async () => {
            try {
                const data = await selectMemberDetail(id);
                setMemberDetail(data);
                console.log(memberDetail.memberName)
            } catch (error) {
                console.log("dddsfsd")
            }
        }
        fetchData();
    }, [id])
        // const getWidth = () => {
        //     return window.innerWidth;
        // };
        //
        // setIsMobile(getWidth() < 768);


    
    return(
        <div>
            <div style={{paddingTop: "50px", background: 'rgba(111, 66, 193, 0)', height: '100%', width: 'auto'}}>
                <div className="d-flex align-items-center"
                     style={{height: '70px', padding: '0', width: 'auto'}}>
                    <span
                        style={{fontWeight: 'bold', fontSize: '30px', paddingLeft: '110px', width: '100%'}}>회원 상세내역</span>
                </div>

                <div className="d-flex" style={{width: 'auto', height: '1080px'}}>
                    <div style={{background: 'rgba(214, 51, 132, 0)', height: '100%', width: '85%'}}>
                        <div className="d-flex justify-content-start align-items-center" style={{
                            background: 'rgba(13, 110, 253, 0)',
                            height: '45px',
                            borderTop: '2px ridge rgba(128, 128, 128, 0.32',
                            borderBottom: '2px ridge rgba(128, 128, 128, 0.32',
                            width: '100%'
                        }}>
                            <div className="d-flex justify-content-start"
                                 style={{height: '100%', width: '115px'}}></div>
                            <div className="d-flex justify-content-start align-items-center"
                                 style={{height: '100%', width: '175px'}}><span>이름</span></div>
                            <div className="d-flex justify-content-start align-items-center"
                                 style={{height: '100%', width: '175px'}}><span>휴대폰번호</span></div>
                            <div className="d-flex justify-content-start align-items-center"
                                 style={{height: '100%', width: '175px'}}><span>생년월일</span></div>
                            <div className="d-flex justify-content-start align-items-center"
                                 style={{height: '100%', width: '175px'}}><span>결제은행</span></div>
                            <div className="d-flex justify-content-start align-items-center"
                                 style={{height: '100%', width: '175px'}}><span>결제계좌</span></div>
                        </div>
                        <div style={{width: '100%', height: '20px'}}></div>
                                <div className="d-flex justify-content-start align-items-center" style={{
                                    background: 'rgba(13, 110, 253, 0)',
                                    height: '45px',
                                    borderTop: '2px none rgba(128, 128, 128, 0.32)',
                                    borderBottom: '2px none rgba(128, 128, 128, 0.32)',
                                    width: '100%'
                                }}>
                                    <div className="d-flex justify-content-start"
                                         style={{height: '45px', width: '115px'}}></div>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{height: '45px', width: '175px'}}><span>{memberDetail.memberName}</span></div>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{height: '45px', width: '175px'}}><span>{memberDetail.memberPhoneNumber}</span>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{height: '45px', width: '175px'}}><span>{memberDetail.memberBirthDay}</span></div>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{height: '45px', width: '175px'}}><span>{memberDetail.memberPaymentBank}</span></div>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{height: '45px', width: '175px'}}><span>{memberDetail.memberAccountNumber}</span>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{height: '45px', width: '50px'}}>
                                    </div>
                                </div>
                                <div style={{width: '100%', height: '50px'}}></div>
                    </div>
                    <div style={{background: 'rgba(13, 110, 253, 0)', height: '100%', width: '15%'}}>
                        <div style={{
                            width: '100%',
                            height: '45px',
                            borderTop: '2px ridge rgba(128, 128, 128, 0.32)',
                            borderBottom: '2px ridge rgba(128, 128, 128, 0.32)'
                        }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MemberDetail;