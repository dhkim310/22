import React, { useState, useEffect } from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css'
import { selectInfo, passwordUpdate } from '../api/info'
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function FixInfo() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [hoverAnimationList, setHoverAnimationList] = useState([]);
    const [empInfo, setEmpInfo] = useState({});
    const onValid = async ({password}) =>{
        await passwordUpdate({password})
        .then((res) => {
            if(res.status === 200) {
                alert('수정완료')
                return navigate('/login')
            }
        })
        .catch((err)=> {
            alert('Err');
            console.error(err);
        })
    };

    useEffect(() => {
        async function fetchData() {
            try {
                // 공지사항 세부 정보를 가져오는 API 호출
                const data = await selectInfo();
                setEmpInfo(data); // 데이터를 notice 상태 변수에 설정
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
        <div>
              <div className="d-xxl-flex align-items-xxl-center" style={{height: '70px', paddingTop: '0px', paddingRight: '0px', paddingLeft: '0px'}}><span style={{fontWeight: 'bold', fontSize: '30px', paddingLeft: '110px', paddingRight: '0px', paddingTop: '0px', paddingBottom: '13px'}}>개인정보 수정</span></div>
              <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-end" style={{height: '200px', background: 'rgba(111,66,193,0)', width: 'auto'}}><span style={{paddingRight: '0px', paddingLeft: '110px', height: '200px'}}>사진</span>
                <div className="d-xxl-flex" style={{width: 'auto', background: 'url("https://cdn.bootstrapstudio.io/placeholders/1400x800.png"), rgba(220,53,69,0)', height: '200px', paddingLeft: '0px', marginLeft: '49px', marginTop: '0px'}}><img width={100} height={80} style={{width: 'auto', height: '200px', borderWidth: '1px', borderStyle: 'solid', background: 'url("https://cdn.bootstrapstudio.io/placeholders/1400x800.png") center / contain no-repeat'}} src="assets/img/f05ee6c832afa3bac801c2c1825426ba.jpg" /></div><button className="btn btn-primary text-nowrap text-center d-xxl-flex justify-content-xxl-center align-items-xxl-center" data-bss-hover-animate="pulse" type="button" style={{background: 'white', height: '26px', marginRight: '0px', marginLeft: '22px', marginTop: '0px', marginBottom: '0px', borderRadius: '0px', color: 'black', border: '1px solid black', width: '53px', paddingRight: '0px', paddingTop: '0px', paddingLeft: '0px', paddingBottom: '0px'}}>수정</button>
              </div>
              <div style={{height: '60px', width: '1393px', paddingLeft: '0px'}}>
                <div style={{height: '60px', width: 'auto', paddingLeft: '0px'}}><span style={{paddingRight: '0px', paddingLeft: '110px'}}>이름</span><input type="text" style={{marginLeft: '47px', marginTop: '20px'}} value={empInfo.empName} readOnly/>
                  <div className="d-xxl-flex" style={{width: '705px', height: '60px', background: 'rgba(220,53,69,0)', marginTop: '-50px', marginBottom: '0px', marginLeft: '688px'}}>
                    <div style={{height: '60px', marginTop: '-1px', paddingRight: '0px', paddingLeft: '0px', width: 'auto'}}><span style={{paddingRight: '0px', paddingLeft: '110px'}}>이메일</span><input type="text" style={{marginLeft: '47px', marginTop: '20px', paddingLeft: '0px', width: '327px'}} value={empInfo.empEmail} readOnly/></div>
                  </div>
                </div>
              </div>
              <div style={{height: '60px', marginTop: '-25px'}}>
                <div style={{height: '60px', marginTop: '-25px', width: 'auto'}}><span style={{paddingRight: '0px', paddingLeft: '110px'}}>부서</span><input type="text" style={{marginLeft: '47px', marginTop: '20px'}} value={empInfo.dept} readOnly/></div>
                <div className="d-xxl-flex" style={{width: '705px', height: '60px', background: 'rgba(220,53,69,0)', marginTop: '-50px', marginBottom: '0px', marginLeft: '688px'}}>
                <form onSubmit={ handleSubmit(onValid) }>
                  <div style={{height: '60px', marginTop: '-10px', paddingRight: '0px', paddingLeft: '0px', width: 'auto'}}><span style={{paddingRight: '0px', paddingLeft: '110px'}}>비밀번호</span><input type="password" style={{marginLeft: '31px', marginTop: '20px', paddingLeft: '0px', width: '327px'}} defaultValue={empInfo.password} {...register('password')}/><button className="btn btn-primary text-center d-xxl-flex align-items-xxl-center" data-bss-hover-animate="pulse" type="submit" style={{background: 'var(--bs-black)', height: '30px', marginRight: '0px', marginLeft: '532px', marginTop: '-30px', marginBottom: '0px', borderWidth: '0px'}}>수정</button></div>
                </form>

                </div>
              </div>
              <div style={{height: '60px', marginTop: '-25px', width: 'auto'}}><span style={{paddingRight: '0px', paddingLeft: '110px'}}>직급</span><input type="text" style={{marginLeft: '47px', marginTop: '20px'}} value={empInfo.empPosition} readOnly/></div>
              <div style={{height: '60px', marginTop: '-25px', width: 'auto'}}><span style={{paddingRight: '0px', paddingLeft: '110px'}}>연락처</span><input type="text" style={{marginLeft: '31px', marginTop: '20px'}} value={empInfo.empPhoneNumber} readOnly/></div>
              <div style={{height: '60px', marginTop: '-25px', width: 'auto'}}><span style={{paddingRight: '0px', paddingLeft: '110px'}}>생년월일</span><input type="text" style={{marginLeft: '15px', marginTop: '20px'}} value={empInfo.empBirthday} readOnly/></div>
              <div style={{height: '60px', marginTop: '-25px', paddingLeft: '0px', width: 'auto'}}><span style={{paddingRight: '0px', paddingLeft: '110px'}}>입사일</span><input type="text" style={{marginLeft: '31px', marginTop: '20px'}} value={empInfo.empStartDate} readOnly/></div>
              <div className="d-xxl-flex align-items-xxl-center" style={{height: '104px', marginTop: '-42px', paddingTop: '0px', width: 'auto'}}><span style={{paddingRight: '0px', paddingLeft: '110px'}}>주소</span><input type="text" style={{marginLeft: '47px', marginTop: '0px'}} value={empInfo.empAddress} readOnly/><button className="btn btn-primary text-center d-xxl-flex align-items-xxl-center" data-bss-hover-animate="pulse" type="button" style={{background: 'var(--bs-black)', height: '30px', borderWidth: '0px', borderBottomWidth: '0px'}}>우편번호 찾기</button><input type="text" style={{marginBottom: '0px', marginTop: '71px', marginLeft: '-311px', paddingLeft: '0px', width: '368px'}} value={empInfo.empDetailAddress} readOnly/></div>
        </div>
    )
};

export default FixInfo;