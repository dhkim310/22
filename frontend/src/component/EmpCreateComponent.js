import React, {useState} from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {insertEmpApi} from "../api/Emp";
import {useForm, useFiled} from 'react-hook-form';


function EmpCreateComponent({isOpen, closeModal}) {

    const {register, formState: {errors}, handleSubmit} = useForm();
    const [birthdate, setBirthdate] = useState(null);
    const [joindate, setJoindate] = useState(null);

    const onValid = async ({
                               empName,
                               empEmail,
                               empDeptId,
                               empPosition,
                               empAmount,
                               empBirthday,
                               empPhoneNumber,
                               empAddress,
                               empGender,
                               empStartDate
                           }) => {
        await insertEmpApi({
            empName,
            empEmail,
            empDeptId,
            empPosition,
            empAmount,
            empBirthday: birthdate,
            empPhoneNumber,
            empAddress,
            empGender,
            empStartDate: joindate
        })
            .then((res) => {
                if (res.status === 200) {
                    closeModal();
                    window.location.reload();
                }
            })
            .catch((err) => {
                alert('에러 : 이메일이 이미 존재하거나 기입하지 않은 데이터가 있습니다.');
            })
    };

    const customModalStyles = {
        content: {
            justifyContent: 'center', // 수평 가운데 정렬
            width: '450px',
            height: '550px',
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
                <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'white',
                    borderRadius: '34px',
                    borderStyle: 'none'
                }}>
                    <div className="d-flex justify-content-start"
                         style={{width: '100%', height: '11%', background: 'rgba(253,126,20,0)'}}>
                        <div style={{width: '6%', height: '100%'}}/>
                        <div className="d-flex justify-content-start align-items-center" style={{
                            height: '100%',
                            width: '26%',
                            background: 'rgba(253,126,20,0)',
                            marginBottom: '20px'
                        }}>
                            <span style={{fontSize: '22px', fontWeight: 'bold'}}>직원 생성</span>
                        </div>
                        <div className="d-flex justify-content-end align-items-center"
                             style={{height: '100%', width: '63%'}}>
                            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button" style={{
                                background: 'url("assets/img/icons8-취소하다-500.png") center / contain no-repeat',
                                width: '38px',
                                height: '37px',
                                borderStyle: 'none'
                            }}/>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center"
                         style={{width: '100%', height: '85%', background: 'rgba(253,126,20,0)'}}>
                        <div style={{width: '6%', height: '100%', background: 'rgba(253,126,20,0)'}}/>
                        <div className="align-items-start"
                             style={{height: '100%', width: '88%', background: 'rgba(253,126,20,0)'}}>
                            <div className="justify-content-center" style={{width: '100%', height: '100%'}}>
                                <div style={{width: '100%', height: '2%', background: 'rgba(214,51,132,0)'}}/>
                                <form onSubmit={handleSubmit(onValid)}>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{
                                             background: 'rgba(102,16,242,0)',
                                             width: '100%',
                                             height: '10%',
                                             marginTop: '10px',
                                             marginBottom: '10px'
                                         }}>
                                        <div className="d-flex justify-content-start align-items-center"
                                             style={{
                                                 background: 'rgba(111,66,193,0)',
                                                 height: '50%',
                                                 width: '100%',
                                                 fontSize: '15px'
                                             }}>
                                            <span>이름</span>
                                        </div>
                                        <div style={{background: 'rgba(111,66,193,0)', height: '2px', width: '100%'}}/>
                                        <div className="d-flex align-items-center"
                                             style={{background: 'rgba(111,66,193,0)', height: '40%', width: '100%'}}>
                                            <input type="text" {...register('empName')}/>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{
                                             background: 'rgba(102,16,242,0)',
                                             width: '100%',
                                             height: '10%',
                                             marginTop: '10px',
                                             marginBottom: '10px'
                                         }}>
                                        <div className="d-flex justify-content-start align-items-center"
                                             style={{
                                                 background: 'rgba(111,66,193,0)',
                                                 height: '50%',
                                                 width: '100%',
                                                 fontSize: '15px'
                                             }}>
                                            <span>이메일</span>
                                        </div>
                                        <div style={{background: 'rgba(111,66,193,0)', height: '2px', width: '100%'}}/>
                                        <div className="d-flex align-items-center"
                                             style={{background: 'rgba(111,66,193,0)', height: '40%', width: '100%'}}>
                                            <input type="email" {...register('empEmail')} />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{
                                             background: 'rgba(102,16,242,0)',
                                             width: '100%',
                                             height: '10%',
                                             marginTop: '10px',
                                             marginBottom: '10px'
                                         }}>
                                        <div className="d-flex justify-content-start align-items-center"
                                             style={{
                                                 background: 'rgba(111,66,193,0)',
                                                 height: '50%',
                                                 width: '100%',
                                                 fontSize: '15px'
                                             }}>
                                            <span>연락처</span>
                                        </div>
                                        <div style={{background: 'rgba(111,66,193,0)', height: '2px', width: '100%'}}/>
                                        <div className="d-flex align-items-center"
                                             style={{background: 'rgba(111,66,193,0)', height: '40%', width: '100%'}}>
                                            <input type="text" name="empPhoneNumber" {...register('empPhoneNumber')} />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{
                                             background: 'rgba(102,16,242,0)',
                                             width: '100%',
                                             height: '10%',
                                             marginTop: '10px',
                                             marginBottom: '10px'
                                         }}>
                                        <div className="d-flex justify-content-start align-items-center"
                                             style={{
                                                 background: 'rgba(111,66,193,0)',
                                                 height: '50%',
                                                 width: '100%',
                                                 fontSize: '15px'
                                             }}>
                                            <span>부서</span>
                                        </div>
                                        <div className="divider"/>
                                        <select className="form-select" {...register('empDeptId.deptId')}
                                                defaultValue="10">
                                            <option value="10" selected>인사부</option>
                                            <option value="20">재무부</option>
                                            <option value="30">콘텐츠관리부</option>
                                            <option value="40">회원관리부</option>
                                        </select>

                                    </div>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{
                                             background: 'rgba(102,16,242,0)',
                                             width: '100%',
                                             height: '10%',
                                             marginTop: '10px',
                                             marginBottom: '10px'
                                         }}>
                                        <div className="d-flex justify-content-start align-items-center"
                                             style={{
                                                 background: 'rgba(111,66,193,0)',
                                                 height: '50%',
                                                 width: '100%',
                                                 fontSize: '15px'
                                             }}>
                                            <span>직급</span>
                                        </div>
                                        <div className="divider"/>
                                        <select className="form-select" {...register('empPosition')} defaultValue="사원">
                                            <option value="사원" selected>사원</option>
                                            <option value="대리">대리</option>
                                            <option value="과장">과장</option>
                                            <option value="부장">부장</option>
                                        </select>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{
                                             background: 'rgba(102,16,242,0)',
                                             width: '100%',
                                             height: '10%',
                                             marginTop: '10px',
                                             marginBottom: '10px'
                                         }}>
                                        <div className="d-flex justify-content-start align-items-center"
                                             style={{
                                                 background: 'rgba(111,66,193,0)',
                                                 height: '50%',
                                                 width: '100%',
                                                 fontSize: '15px'
                                             }}>
                                            <span>생년월일</span>
                                        </div>
                                        <div style={{background: 'rgba(111,66,193,0)', height: '2px', width: '100%'}}/>
                                        <div className="d-flex align-items-center"
                                             style={{background: 'rgba(111,66,193,0)', height: '60%', width: '100%'}}>
                                            <DatePicker
                                                selected={birthdate}
                                                onChange={date => setBirthdate(date)}
                                                dateFormat="yyyy-MM-dd"
                                                placeholderText="날짜를 선택하세요"
                                                showYearDropdown
                                                yearDropdownItemNumber={30}
                                                scrollableYearDropdown
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{
                                             background: 'rgba(102,16,242,0)',
                                             width: '100%',
                                             height: '10%',
                                             marginTop: '10px',
                                             marginBottom: '10px'
                                         }}>
                                        <div className="d-flex justify-content-start align-items-center"
                                             style={{
                                                 background: 'rgba(111,66,193,0)',
                                                 height: '50%',
                                                 width: '100%',
                                                 fontSize: '15px'
                                             }}>
                                            <span>입사일</span>
                                        </div>
                                        <div style={{background: 'rgba(111,66,193,0)', height: '2px', width: '100%'}}/>
                                        <div className="d-flex align-items-center"
                                             style={{background: 'rgba(111,66,193,0)', height: '60%', width: '100%'}}>
                                            <DatePicker
                                                selected={joindate}
                                                onChange={date => setJoindate(date)}
                                                dateFormat="yyyy-MM-dd"
                                                placeholderText="날짜를 선택하세요"
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{
                                             background: 'rgba(102,16,242,0)',
                                             width: '100%',
                                             height: '10%',
                                             marginTop: '10px',
                                             marginBottom: '10px'
                                         }}>
                                        <div className="d-flex justify-content-start align-items-center"
                                             style={{
                                                 background: 'rgba(111,66,193,0)',
                                                 height: '50%',
                                                 width: '100%',
                                                 fontSize: '15px'
                                             }}>
                                            <span>성별</span>
                                        </div>
                                        <div className="divider"/>
                                        <select className="form-select" {...register('empGender')} defaultValue="남성">
                                            <option value="남성" selected>남성</option>
                                            <option value="여성">여성</option>
                                        </select>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center"
                                         style={{
                                             background: 'rgba(102,16,242,0)',
                                             width: '100%',
                                             height: '10%',
                                             marginTop: '10px',
                                             marginBottom: '10px'
                                         }}>
                                        <div className="d-flex justify-content-start align-items-center"
                                             style={{
                                                 background: 'rgba(111,66,193,0)',
                                                 height: '50%',
                                                 width: '100%',
                                                 fontSize: '15px'
                                             }}>
                                            <span>주소</span>
                                        </div>
                                        <div style={{background: 'rgba(111,66,193,0)', height: '2px', width: '100%'}}/>
                                        <div className="d-flex align-items-center"
                                             style={{background: 'rgba(111,66,193,0)', height: '40%', width: '100%'}}>
                                            <input type="text" {...register('empAddress')} />
                                        </div>
                                    </div>
                                    <div style={{width: '100%', height: '2%', background: 'rgba(214,51,132,0)'}}/>
                                    <div className="d-flex align-items-end"
                                         style={{width: '100%', height: '21%'}}>
                                        <div className="d-flex justify-content-end align-items-center"
                                             style={{width: '100%', height: '52%'}}>
                                            <button
                                                className="btn btn-primary d-flex justify-content-center align-items-center"
                                                data-bss-hover-animate="pulse" type="submit" style={{
                                                width: '15%',
                                                height: '60%',
                                                fontSize: '12px',
                                                background: 'black',
                                                borderStyle: 'none'
                                            }}>작성
                                            </button>
                                            <div style={{height: '100%', width: '0%'}}/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div style={{width: '6%', height: '100%', background: 'rgba(253,126,20,0)'}}/>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default EmpCreateComponent;

