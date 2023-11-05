import React, {useState,useEffect} from "react";
import {selectMessageDetailApi} from "../api/Message";
import {useNavigate,useParams} from "react-router-dom";
import {FormatDate} from '../component/FormatDate';

function MessageDetail() {
    const navigate = useNavigate();
    const [detail,setDetail] = useState({});
    const {id} = useParams()
    const navigateToList = () => {
        navigate("/message");
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
                const data = await selectMessageDetailApi(id);
                setDetail(data);
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
                    <div style={{width: '720px', height: '500px', background: 'rgba(111,66,193,0)', borderWidth: '0px', borderBottom: '0px ridge rgba(128,128,128,0.32)'}}>
                        <div className="d-flex justify-content-center align-items-center" style={{width: '100%', background: 'rgba(214,51,132,0)', height: '15%', borderBottom: '2px ridge rgba(128,128,128,0.32)'}}>
                            <div style={{width: 'auto', height: 'auto'}}><span style={{fontWeight: 'bold', fontSize: '30px'}}>{detail.messageSubject}</span></div>
                        </div>
                        <div style={{width: '100%', background: 'rgba(214,51,132,0)', height: '85%'}}>
                            <div style={{width: '100%', height: '15%', borderBottom: '2px ridge rgba(128,128,128,0.32)'}}>
                                <div className="d-flex align-items-start" style={{height: '50%', width: '25%'}}>
                                    <div style={{width: '15px'}} /><span>{detail.messageSender}</span>
                                </div>
                                <div className="d-flex align-items-start" style={{height: '50%', width: '45%'}}>
                                    <div style={{width: '15px'}} /><span style={{width: '200px'}}>{FormatDate(detail.messageSendTime)}</span>
                                </div>
                            </div>
                            <div className="d-flex" style={{width: '100%', height: '70%', borderBottom: '2px ridge rgba(128,128,128,0.32)'}}>
                                <div style={{width: '15px'}} /><span>{detail.messageContent}</span>
                            </div>
                            <div className="d-flex justify-content-center align-items-center" style={{width: '100%', height: '15%'}}>
                                <button className="btn btn-primary" type="button" onClick = { navigateToList } style={{ height: 'auto', width: '100px', color: 'black', fontSize: '16px', background: 'rgba(13,110,253,0)', border: '2px ridge black', fontWeight: 'bold' }}>
                                    목록으로
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    );
}
export default MessageDetail;