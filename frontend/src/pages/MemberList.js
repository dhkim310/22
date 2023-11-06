import React, {useEffect, useState} from "react";
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css'
import {selectMemberList} from "../api/Member";
import {useNavigate} from "react-router-dom";

function MemberList() {
    const [memberList, setMemberList] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await selectMemberList();
                setMemberList(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        const getWidth = () => {
            return window.innerWidth;
        };
        setIsMobile(getWidth() < 768);

        fetchData();
    }, []);

    const navigate = useNavigate();

    const navigateToDetail = (id) => {
        navigate(`/member/detail/${id}`)
    }

    return (
        <div style={{paddingTop: "50px"}}>
            <div style={{background: 'rgba(111,66,193,0)', height: '100%', width: 'Auto'}}>
                <div className="d-flex align-items-center" style={{
                    height: '70px',
                    paddingTop: '0px',
                    paddingRight: '0px',
                    paddingLeft: '0px',
                    width: 'auto'
                }}>
                    <span style={{
                        fontWeight: 'bold',
                        fontSize: '30px',
                        paddingLeft: '110px',
                        paddingRight: '0px',
                        paddingTop: '0px',
                        paddingBottom: '13px',
                        width: '85%'
                    }}>회원관리</span>
                </div>
                <div className="d-flex" style={{ width: 'auto', height: '100%' }}>
                    <div style={{ background: 'rgba(214,51,132,0)', height: '100%', width: '100%' }}>
                        <div className="d-flex justify-content-start align-items-center" style={{
                            background: 'rgba(13,110,253,0)',
                            height: '45px',
                            borderTop: '2px ridge rgba(128,128,128,0.32)',
                            borderBottom: '2px ridge rgba(128,128,128,0.32)',
                            width: '100%'
                        }}>
                            <div className="d-flex justify-content-start"
                                 style={{ height: '100%', width: '150px' }} />
                            <div className="d-flex justify-content-start align-items-center"
                                 style={{ height: '100%', width: '15%' }}><span>회원번호</span></div>
                            <div className="d-flex justify-content-start align-items-center"
                                 style={{ height: '100%', width: '15%' }}><span>이름</span></div>
                            <div className="d-flex justify-content-start align-items-center"
                                 style={{ height: '100%', width: '20%' }}><span>이메일</span></div>
                            <div className="d-flex justify-content-start align-items-center"
                                 style={{ height: '100%', width: '15%' }}><span>가입일</span></div>
                            <div className="d-flex justify-content-start align-items-center"
                                 style={{ height: '100%', width: '15%' }}><span>이용요금제</span></div>
                            <div className="d-flex justify-content-start align-items-center"
                                 style={{ height: '100%', width: '15%' }}><span>결제금액</span></div>
                        </div>
                        <div style={{ width: '100%', height: '20px' }} />

                        <ul>
                            {memberList.map((e, i) => (
                                <li key={i} style={{ listStyleType: 'none' }}>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{
                                             background: 'rgba(13,110,253,0)',
                                             height: '45px',
                                             borderTop: '2px none rgba(128,128,128,0.32)',
                                             borderBottom: '2px none rgba(128,128,128,0.32)',
                                             width: '100%',
                                             position: 'relative', // Add this line to enable button positioning
                                         }}>
                                        <div className="d-flex justify-content-start"
                                             style={{ height: '100%', width: '130px' }} />
                                        <div className="d-flex justify-content-start align-items-center"
                                             style={{ height: '100%', width: '14%' }}><span>{e.memberId}</span></div>
                                        <div className="d-flex justify-content-start align-items-center"
                                             style={{ height: '100%', width: '14%' }}><span>{e.memberName}</span></div>
                                        <div className="d-flex justify-content-start align-items-center"
                                             style={{ height: '100%', width: '22%' }}><span>{e.memberEmail}</span></div>
                                        <div className="d-flex justify-content-start align-items-center"
                                             style={{ height: '100%', width: '16%' }}><span>{e.memberJoinDate}</span></div>
                                        <div className="d-flex justify-content-start align-items-center"
                                             style={{ height: '100%', width: '16%' }}><span>{e.memberRatePlan}</span></div>
                                        <div className="d-flex justify-content-start align-items-center"
                                             style={{ height: '100%', width: '14%' }}>
                                            <span>{e.memberPaymentPrice}</span>
                                            <button
                                                onClick={() => navigateToDetail(e.memberId)}
                                                style={{
                                                    fontSize: '13px',
                                                    fontWeight: 'bold',
                                                    background: 'var(--bs-btn-disabled-color)',
                                                    width: 'auto',
                                                    height: '80%',
                                                    margin: '0px',
                                                    padding: '0px',
                                                    paddingRight: '9px',
                                                    paddingLeft: '9px',
                                                    color: 'black',
                                                    border: '1px solid black',
                                                    position: 'absolute',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    right: '10px',
                                                }}
                                            >
                                                상세 정보
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MemberList;