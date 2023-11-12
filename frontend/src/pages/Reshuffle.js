import React, {useEffect, useState} from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css'
import {useNavigate, useParams} from 'react-router-dom';
import {selectHrmDetailApi, updateHrmApi} from '../api/Emp';
import {useForm} from 'react-hook-form';
import DatePicker from 'react-datepicker';

function Reshuffle() {

    const [date1, setDate1] = useState(null);
    const {id} = useParams();
    const {register, formState: {errors}, handleSubmit} = useForm();
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [hoverAnimationList, setHoverAnimationList] = useState([]);
    const [detail, setDetail] = useState({});
    const onValid = async ({empDeptId, empPosition, empEndDate, empStatus}) => {
        await updateHrmApi(id, {empDeptId, empPosition, empEndDate: date1, empStatus})
            .then((res) => {
                if (res.status === 200) {
                    alert('인사이동 완료')
                    return navigate('/hrm-list')
                }
            })
            .catch((err) => {
                alert("데이터를 모두 입력하세요.");
                console.error(err);
            })
    };
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await selectHrmDetailApi(id);
                setDetail(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
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
        fetchData();
    }, []);

    return (
        <div style={{paddingTop: "50px"}}>
            <div>
                <div className="d-flex align-items-center"
                     style={{height: '70px', paddingTop: '0px', paddingRight: '0px', paddingLeft: '0px'}}><span style={{
                    fontWeight: 'bold',
                    fontSize: '30px',
                    paddingLeft: '110px',
                    paddingRight: '0px',
                    paddingTop: '0px',
                    paddingBottom: '13px'
                }}>인사정보</span></div>
                <div className="d-flex justify-content-start align-items-end"
                     style={{height: '200px', background: 'rgba(111,66,193,0)', width: 'auto'}}><span
                    style={{paddingRight: '0px', paddingLeft: '110px', height: '200px'}}>사진</span>
                    <div className="d-flex" style={{
                        width: 'auto',
                        height: '200px',
                        paddingLeft: '0px',
                        marginLeft: '49px',
                        marginTop: '0px'
                    }}><img width={100} height={80} style={{
                        width: 'auto',
                        height: '200px',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        background: `url(../${detail.empPicturePath}) center / contain no-repeat`
                    }}/></div>
                </div>
                <form onSubmit={handleSubmit(onValid)}>
                    <div style={{height: '60px', width: '1393px', paddingLeft: '0px'}}>
                        <div style={{height: '60px', width: 'auto', paddingLeft: '0px'}}><span
                            style={{paddingRight: '0px', paddingLeft: '110px'}}>이름</span><input type="text" style={{
                            marginLeft: '47px',
                            marginTop: '20px'
                        }} defaultValue={detail.empName} readOnly/></div>
                    </div>
                    <div style={{height: '60px', display: 'flex', alignItems: 'center'}}>
                        <span style={{paddingRight: '45px', paddingLeft: '110px'}}>부서</span>
                        <div className="divider"/>
                        <select className="form-select" style={{width: '193px'}} {...register('empDeptId.deptId')} >
                            <option value="error" selected>부서</option>
                            <option value="10">인사부</option>
                            <option value="20">재무부</option>
                            <option value="30">콘텐츠관리부</option>
                            <option value="40">회원관리부</option>
                        </select>
                    </div>

                    <div style={{height: '60px', display: 'flex', alignItems: 'center'}}>
                        <span style={{paddingRight: '45px', paddingLeft: '110px'}}>직급</span>
                        <div className="divider"/>
                        <select className="form-select" style={{width: '193px'}} {...register('empPosition')}>
                            <option>직급</option>
                            <option value="사원">사원</option>
                            <option value="대리">대리</option>
                            <option value="과장">과장</option>
                            <option value="부장">부장</option>
                        </select>
                    </div>
                    <div style={{height: '60px', marginTop: '-10px', paddingLeft: '0px', width: 'auto'}}><span
                        style={{paddingRight: '0px', paddingLeft: '110px'}}>입사일</span><input type="text" style={{
                        marginLeft: '31px',
                        marginTop: '20px'
                    }} value={detail.empStartDate} readOnly/></div>
                    <div div style={{height: '60px', display: 'flex', alignItems: 'center'}}><span
                        style={{whiteSpace: 'nowrap', paddingRight: '30px', paddingLeft: '110px'}}>퇴직일</span>
                        <div className="d-flex align-items-center"
                             style={{background: 'rgba(111,66,193,0)', height: '60%', width: '100%'}}>
                            <DatePicker
                                selected={date1}
                                onChange={date => setDate1(date)}
                                dateFormat="yyyy-MM-dd"
                                placeholderText={detail.empEndDate}
                            />
                        </div>
                    </div>


                    <div style={{height: '60px', display: 'flex', alignItems: 'center'}}>
                        <span style={{paddingRight: '15px', paddingLeft: '110px'}}>재직상태</span>
                        <div className="divider"/>
                        <select className="form-select" style={{width: '193px'}} {...register('empStatus')} >
                            <option>재직상태</option>
                            <option value="재직">재직</option>
                            <option value="휴직">휴직</option>
                            <option value="퇴직">퇴직</option>
                        </select>
                    </div>
                    <div style={{
                        height: '60px',
                        marginTop: '-25px',
                        paddingRight: '0px',
                        paddingLeft: '0px',
                        width: 'auto'
                    }}><span style={{paddingRight: '0px', paddingLeft: '110px'}}>이메일</span><input type="text" style={{
                        marginLeft: '31px',
                        marginTop: '20px',
                        paddingLeft: '0px',
                        width: '327px'
                    }} value={detail.empEmail} readOnly/></div>
                    <div className="d-flex justify-content-start align-items-center" style={{
                        height: '60px',
                        marginTop: '-25px',
                        paddingRight: '0px',
                        paddingLeft: '0px',
                        width: 'auto'
                    }}>
                        <button
                            className="btn btn-primary text-nowrap text-center d-flex justify-content-center align-items-center"
                            data-bss-hover-animate="pulse" type="submit" style={{
                            background: 'white',
                            height: '26px',
                            marginRight: '0px',
                            marginLeft: '538px',
                            marginTop: '0px',
                            marginBottom: '0px',
                            borderRadius: '0px',
                            color: 'black',
                            border: '1px solid black',
                            width: '53px',
                            paddingRight: '0px',
                            paddingTop: '0px',
                            paddingLeft: '0px',
                            paddingBottom: '0px'
                        }}>수정
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Reshuffle;