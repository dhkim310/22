import React, {useEffect, useState} from 'react';
import { selectMessageListApi } from '../api/Message';
import {useNavigate} from 'react-router-dom';
import {FormatDate} from '../component/FormatDate';

function MessageList() {

    const [message,setMessage] = useState([]);
    const navigate = useNavigate();
    const navigateToDetail= (id) => {
        navigate(`/message/${id}`);
    }
    const navigateToSend = () => {
        navigate("/message-send");
    };
    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        overflow: 'hidden',
    };

    const contentStyle = {
        width: '720px',
        height: '340px',
        background: 'rgba(111,66,193,0)',
        borderWidth: '0px',
        borderBottom: '0px ridge rgba(128,128,128,0.32)',
        position: 'absolute',
        display: 'flex', // 추가된 부분
        flexDirection: 'column', // 추가된 부분
    };

    const textStyle = {
        fontSize: '12px',
        fontWeight: 'bold',
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'flex-end', // 버튼을 오른쪽으로 정렬
        width: '100%',
        height: '20%',
    };
    useEffect(() => {
        // 데이터를 가져오는 비동기 함수를 정의
        const fetchData = async () => {
            try {
                const data = await selectMessageListApi();
                setMessage(data);
            } catch (error) {
                console.error('데이터 가져오기 오류:', error);
            }
        };
        fetchData(); // 데이터 가져오는 함수 호출
    }, []);
    return (
        <div style={containerStyle}>
            <div style={contentStyle}>
                <div>
                    <div>
                        <div style={contentStyle}>
                            <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', background: 'rgba(214,51,132,0)', height: '15%' }}>
                                <div style={{ width: 'auto', height: 'auto' }}><span style={{ ...textStyle, fontSize: '30px' }}>쪽지함</span></div>
                            </div>
                            <div className="d-flex align-items-center" style={{ width: '100%', background: 'rgba(214,51,132,0)', height: '12%', borderBottom: '2px ridge rgba(128,128,128,0.32)' }}>
                                <div className="d-flex align-items-center" style={{ height: 'auto', width: '140px' }}><span style={textStyle}>보낸 사람</span></div>
                                <div className="d-flex align-items-center" style={{ height: 'auto', width: '420px' }}><span style={textStyle}>제목</span></div>
                                <div className="d-flex align-items-center" style={{ height: 'auto', width: '100px' }}><span style={textStyle}>날짜</span></div>
                                <div className="d-flex align-items-center" style={{ height: 'auto', width: '100px' }}><span style={textStyle}>상태</span></div>
                            </div>
                    {message.map((e) => (
                            <div key={e.messageId} className="d-flex align-items-center" onClick={() => navigateToDetail(e.messageId)} style={{ width: '100%', background: 'rgba(214,51,132,0)', height: '12%', borderBottom: '2px ridge rgba(128,128,128,0.32)' }}>
                       <div className="d-flex align-items-center" style={{height: 'auto', width: '150px'}}><span style={{fontSize: '12px', fontWeight: 'bold'}}>{e.messageSenderName}</span></div>
                       <div className="d-flex align-items-center" style={{height: 'auto', width: '400px'}}><span style={{fontSize: '12px', fontWeight: 'bold'}}>{e.messageSubject}</span></div>
                       <div className="d-flex align-items-center" style={{height: 'auto', width: '150px'}}><span style={{fontSize: '12px', fontWeight: 'bold'}}>{FormatDate(e.messageSendTime)}</span></div>
                       <div className="d-flex align-items-center" style={{height: 'auto', width: '100px'}}><span style={{fontSize: '12px', fontWeight: 'bold'}}>{e.messageStatus}</span></div>
                   </div>
                   ))}


                            <div className="d-flex justify-content-end align-items-center" style={{ width: '100%', height: '20%' }}>
                                <div style={buttonContainerStyle}>
                                    <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button" onClick={navigateToSend} style={{ color: 'black', fontSize: '13px', background: 'rgba(13,110,253,0)', borderWidth: '0px', borderBottomWidth: '0px', borderBottomColor: 'rgba(13,110,253,0)' }}>
                                        쪽지 보내기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessageList;