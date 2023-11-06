import React, {useEffect, useRef, useState} from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css'
import {passwordUpdate, selectInfo, uploadImage, updateAddress, updateDetailAddress} from '../api/info'
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import Modal from 'react-modal';
import Postcode from 'react-daum-postcode';

function FixInfo() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(''); // 선택한 주소를 저장할 state

    const openModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    const handleAddressSearch = () => {
      openModal(); // 주소 검색 모달 열기
    };

    const handleAddressSelected = async (data) => {
      try {
        await updateAddress({ empAddress: data.address });
        closeModal();
        window.location.reload();
      } catch (error) {
        console.error('Error updating address:', error);
      }
    };
    const {register, formState: {errors}, handleSubmit} = useForm();
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [hoverAnimationList, setHoverAnimationList] = useState([]);
    const [empInfo, setEmpInfo] = useState({});
    const fileInputRef = useRef(null);
    const onValid = async ({password}) => {
        await passwordUpdate({password})
            .then((res) => {
                if (res.status === 200) {
                    alert('수정완료')
                    return navigate('/login')
                }
            })
            .catch((err) => {
                alert('Err');
                console.error(err);
            })
    };

    const onValid1 = async ({empDetailAddress}) => {
        await updateDetailAddress({empDetailAddress})
            .then((res) => {
                if (res.status === 200) {
                    alert('수정완료')
                    return navigate('/fix-info')
                }
            })
            .catch((err) => {
                alert('Err');
                console.error(err);
            })
    };

    const handleImageChange = async (event) => {
        const file = event.target.files[0]; // 선택된 파일
        const formData = new FormData();
        formData.append('file', file); // FormData에 파일 추가 (가정: 'image'는 서버에서 요구하는 필드 이름)

        try {
            // 이미지를 서버에 업로드하는 API 함수 (가정: uploadImage 함수가 이미지를 서버에 업로드)
            const response = await uploadImage(formData);
            setTimeout(() => {
                window.location.reload(); // 2초 후에 페이지 새로고침
            });
            if (response.status === 200) {
                const updatedInfo = {...empInfo, empPicturePath: response.data.imageUrl}; // 가정: 서버 응답에서 새 이미지 URL을 가져옴
                setEmpInfo(updatedInfo);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            // 에러 핸들링
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await selectInfo();
                setEmpInfo(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

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

    return (<div style={{paddingTop: "50px"}}>
        <div className="d-flex align-items-center"
             style={{height: '70px',}}><span style={{
            fontWeight: 'bold',
            fontSize: '30px',
            paddingLeft: '110px',
            paddingRight: '0px',
            paddingTop: '0px',
            paddingBottom: '13px'
        }}>개인정보 수정</span></div>

        <div className="d-flex justify-content-start align-items-end"
             style={{height: '200px', background: 'rgba(111,66,193,0)', width: 'auto'}}>
            <span style={{paddingRight: '0px', paddingLeft: '110px', height: '200px'}}>사진</span>
            <div className="d-flex" style={{
                width: 'auto',
                height: '200px',
                paddingLeft: '0px',
                marginLeft: '49px',
                marginTop: '0px'
            }}>
                <img width={100} height={80} style={{
                    width: 'auto',
                    height: '200px',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    background: `url(${empInfo.empPicturePath}) center / contain no-repeat`
                }} src={empInfo.empPicturePath}/>
            </div>

            <input type="file" style={{display: 'none'}} accept="image/*" onChange={handleImageChange}
                   ref={fileInputRef}/> {/* 파일 선택을 위한 input */}
            <button
                className="btn btn-primary text-nowrap text-center d-flex justify-content-center align-items-center"
                data-bss-hover-animate="pulse" type="button" onClick={() => fileInputRef.current.click()} style={{
                background: 'white',
                height: '26px',
                marginRight: '0px',
                marginLeft: '22px',
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
        <div style={{height: '60px', width: '1393px', paddingLeft: '0px'}}>
            <div style={{height: '60px', width: 'auto', paddingLeft: '0px'}}><span
                style={{paddingRight: '0px', paddingLeft: '110px'}}>이름</span><input type="text" style={{
                marginLeft: '47px', marginTop: '20px'
            }} value={empInfo.empName} readOnly/>
                <div className="d-flex" style={{
                    width: '705px',
                    height: '60px',
                    background: 'rgba(220,53,69,0)',
                    marginTop: '-50px',
                    marginBottom: '0px',
                    marginLeft: '688px'
                }}>
                    <div style={{
                        height: '60px', marginTop: '-1px', paddingRight: '0px', paddingLeft: '0px', width: 'auto'
                    }}><span style={{paddingRight: '0px', paddingLeft: '110px'}}>이메일</span>
                        <input type="text"
                               style={{
                                   marginLeft: '47px', marginTop: '20px', paddingLeft: '0px', width: '327px'
                               }}
                               value={empInfo.empEmail}
                               readOnly/>
                    </div>
                </div>
            </div>
        </div>
        <div style={{height: '60px', marginTop: '-25px'}}>
            <div style={{height: '60px', marginTop: '-25px', width: 'auto'}}><span
                style={{paddingRight: '0px', paddingLeft: '110px'}}>부서</span><input type="text" style={{
                marginLeft: '47px', marginTop: '20px'
            }} value={empInfo.dept} readOnly/></div>
            <div className="d-flex" style={{
                width: '705px',
                height: '60px',
                background: 'rgba(220,53,69,0)',
                marginTop: '-50px',
                marginBottom: '0px',
                marginLeft: '688px'
            }}>
                <form onSubmit={handleSubmit(onValid)}>
                    <div style={{
                        height: '60px', marginTop: '-10px', paddingRight: '0px', paddingLeft: '0px', width: 'auto'
                    }}><span style={{paddingRight: '0px', paddingLeft: '110px'}}>비밀번호</span>
                        <input type="password"
                               style={{
                                   marginLeft: '31px', marginTop: '20px', paddingLeft: '0px', width: '327px'
                               }}
                               defaultValue='1541' {...register('password')}/>
                        <button className="btn btn-primary text-center d-flex align-items-center"
                                data-bss-hover-animate="pulse" type="submit" style={{
                            background: 'var(--bs-black)',
                            height: '30px',
                            marginRight: '0px',
                            marginLeft: '532px',
                            marginTop: '-30px',
                            marginBottom: '0px',
                            borderWidth: '0px'
                        }}>수정
                        </button>
                    </div>
                </form>

            </div>
        </div>
        <div style={{height: '60px', marginTop: '-25px', width: 'auto'}}><span
            style={{paddingRight: '0px', paddingLeft: '110px'}}>직급</span><input type="text" style={{
            marginLeft: '47px', marginTop: '20px'
        }} value={empInfo.empPosition} readOnly/></div>
        <div style={{height: '60px', marginTop: '-25px', width: 'auto'}}><span
            style={{paddingRight: '0px', paddingLeft: '110px'}}>연락처</span><input type="text" style={{
            marginLeft: '31px', marginTop: '20px'
        }} value={empInfo.empPhoneNumber} readOnly/></div>
        <div style={{height: '60px', marginTop: '-25px', width: 'auto'}}><span
            style={{paddingRight: '0px', paddingLeft: '110px'}}>생년월일</span><input type="text" style={{
            marginLeft: '15px', marginTop: '20px'
        }} value={empInfo.empBirthday} readOnly/></div>
        <div style={{height: '60px', marginTop: '-25px', paddingLeft: '0px', width: 'auto'}}><span
            style={{paddingRight: '0px', paddingLeft: '110px'}}>입사일</span><input type="text" style={{
            marginLeft: '31px', marginTop: '20px'
        }} value={empInfo.empStartDate} readOnly/></div>
        <div className="d-flex align-items-center"
             style={{height: '104px', marginTop: '-42px', paddingTop: '0px', width: 'auto'}}><span
            style={{paddingRight: '0px', paddingLeft: '110px'}}>주소</span><input type="text" style={{
            marginLeft: '47px', marginTop: '0px'
        }} value={empInfo.empAddress} readOnly/>
            <button className="btn btn-primary text-center d-flex align-items-center"
                    data-bss-hover-animate="pulse" type="button" onClick={handleAddressSearch} style={{
                background: 'var(--bs-black)', height: '30px', borderWidth: '0px', borderBottomWidth: '0px'
            }}>우편번호 찾기
            </button>
                  <Postcode
                      style={{
                        display: isModalOpen ? 'block' : 'none',
                        position: 'fixed',
                        width: '450px',
                        height: '550px',
                        backgroundColor: 'white',
                        borderStyle: 'solid',
                        top: '50%', // 화면 상단에서 중앙으로 이동
                        left: '50%', // 화면 왼쪽에서 중앙으로 이동
                        transform: 'translate(-50%, -50%)', // 중앙 정렬
                        zIndex: '9999', // 화면 위에 나타나도록 설정
                      }}
                    onComplete={handleAddressSelected}
                  />
                  <form onSubmit={handleSubmit(onValid1)}>
                    <div className="d-flex align-items-center"
                         style={{height: '104px', marginTop: '0px', paddingTop: '0px', width: 'auto'}}><span
                        style={{paddingRight: '0px', paddingLeft: '295px'}}>상세주소</span><input type="text" style={{
                        marginLeft: '35px', marginTop: '0px'
                    }} defaultValue={empInfo.empDetailAddress} {...register('empDetailAddress')} />
                        <button className="btn btn-primary text-center d-flex align-items-center"
                                data-bss-hover-animate="pulse" type="submit" style={{
                            background: 'var(--bs-black)', height: '30px', borderWidth: '0px', borderBottomWidth: '0px'
                        }}>수정
                        </button>
                     </div>
                  </form>
        </div>
    </div>)
}

export default FixInfo;