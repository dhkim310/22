import React, {useEffect, useState} from 'react';
import { selectHrmListApi,insertMessageApi } from '../api/Message';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';

function MessageSend() {
    const navigate = useNavigate();
    const navigateToList = () => {
        navigate("/message");
    };
    const {register, formState: {errors}, handleSubmit} = useForm();
    const onValid = async ({messageContent, messageSubject, messageReceiverEmpId}) => {
        await insertMessageApi({messageContent, messageSubject, messageReceiverEmpId})
            .then((res) => {
                if (res.status === 200) {
                    alert('전송완료')
                    return navigate('/message')
                }
            })
            .catch((err) => {
                alert("전송실패");
                console.error(err);
            })
    };
    const [list, setList] = useState([]);

    useEffect(() => {
        // 데이터를 가져오는 비동기 함수를 정의
        const fetchData = async () => {
            try {
                const data = await selectHrmListApi();
                setList(data);
            } catch (error) {
                console.error('데이터 가져오기 오류:', error);
            }
        };
        fetchData(); // 데이터 가져오는 함수 호출
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ width: '560px', height: '500px', background: 'rgba(111,66,193,0)', borderWidth: '0px', borderBottom: '0px ridge rgba(128,128,128,0.32)' }}>
                <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', background: 'rgba(214,51,132,0)', height: '15%' }}>
                    <div style={{ width: 'auto', height: 'auto' }}><span style={{ fontWeight: 'bold', fontSize: '30px' }}>쪽지 보내기</span></div>
                </div>

                <form onSubmit={handleSubmit(onValid)}>
                <div className="d-flex align-items-center" style={{ width: '100%', background: 'rgba(214,51,132,0)', height: '85%' }}>
                    <div style={{ height: '290px', width: 'auto' }}>
                        <div style={{ width: 'auto', height: '18%' }}>
                            <div style={{ width: 'auto', height: 'auto' }}><span style={{ fontWeight: 'bold', fontSize: '18px' }}>받는 사람</span></div>
                        </div>
                        <div style={{ width: 'auto', height: '10%' }}>
                            <div style={{ width: 'auto', height: 'auto',paddingTop:'25px' }}><span style={{ fontWeight: 'bold', fontSize: '18px' }}>제목</span></div>
                        </div>
                        <div style={{ width: 'auto', height: '25%' }}>
                            <div style={{ width: 'auto', height: 'auto',paddingTop:'35px'  }}><span style={{ fontWeight: 'bold', fontSize: '18px' }}>내용</span></div>
                        </div>
                    </div>
                    <div style={{ width: '80%', height: '100%' }}>
                        <div className="d-flex align-items" style={{ width: '480px', height: '18%', paddingBottom:'40px'}}>
                            <div style={{ width: '80px', height: '100%' }} />
                            <div style={{ width: 'auto', height: 'auto' }}>
                             <div className="divider"/>
                           <select className="form-select" {...register('messageReceiverEmpId')}>

                           {list.map((e) => (
                               <option key={e.empId} value={e.empId}>{e.empName}</option>
                            ))}
                            autoFocus
                           </select></div>

                        </div>
                        <div className="d-flex align-items" style={{ width: '480px', height: '18%' }}>
                            <div style={{ width: '80px', height: '100%' }} />
                            <div style={{ width: 'auto', height: 'auto' }}><input type="text" style={{ width: '400px', height: '45px' }} {...register('messageSubject')}/></div>
                        </div>
                        <div className="d-flex align-items" style={{ width: '480px', height: 'auto' }}>
                            <div style={{ width: '80px', height: '100%' }} />
                            <div style={{ width: 'auto', height: 'auto' }}><textarea style={{ width: '400px', height: '135px' }} {...register('messageContent')}/></div>
                        </div>
                        <div style={{ width: '100%', height: '10%' }} />
                        <div className="d-flex align-items-center" style={{ width: '100%', height: 'auto' }}>
                            <div style={{ height: '100%', width: '100px' }} />
                            <button className="btn btn-primary" type="button" onClick = { navigateToList } style={{ height: 'auto', width: '100px', color: 'black', fontSize: '16px', background: 'rgba(13,110,253,0)', border: '2px ridge black', fontWeight: 'bold' }}>
                                목록으로
                            </button>
                            <div style={{ height: '100%', width: '20px' }} />
                            <button className="btn btn-primary" type="submit" style={{ height: 'auto', width: '100px', color: 'black', fontSize: '16px', background: 'rgba(13,110,253,0)', border: '2px ridge black', fontWeight: 'bold' }}>
                                보내기
                            </button>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </div>
    );
}

export default MessageSend;