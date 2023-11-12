import React, {useEffect, useState} from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css'
import {commuteApi, commuteSelectApi, commuteUpdateApi} from '../api/Commute';
import {selectNoticeTop4Api} from "../api/Notice";
import {selectEmp} from "../api/info";
import {selectMemoApi} from '../api/Memo';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import MemoComponent from "../component/MemoComponent";
import {ApprovalCountApi} from '../api/Approval';
import {FormatDate} from "../component/FormatDate";
import '../component/MemoComponent.css';
import DeptEmpTree from "../component/Sidebar";

function Main() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const navigate = useNavigate();
    const navigateToFixInfo = () => {
        navigate("/fix-info");
    };

    const navigateToApproval = () => {
        navigate("/approval-list");
    };

    const handleItemClick = (id) => {
        navigate(`/notice/${id}`)
    };

    const [notice, setNotice] = useState([]);
    const [memo, setMemo] = useState({});
    const [logInfo, setLogInfo] = useState({});
    const [main, setMain] = useState({})
    const [count, setCount] = useState(null)
    const [isMobile, setIsMobile] = useState(false);
    const [hoverAnimationList, setHoverAnimationList] = useState([]);
    const {register, handleSubmit} = useForm(); // useForm 훅 사용

    const fetchCommuteData = async () => {
        // 버튼 클릭 시 새로운 데이터 불러오기
        try {
            const commuteData = await commuteSelectApi();
            setLogInfo(commuteData);
        } catch (error) {
            alert('Error fetching commute data:', error);
        }
    };

    const onValid = handleSubmit(async ({today}) => {
        try {
            const response = await commuteApi({today});
            if (response.status === 200) {
                alert('출근');
                await fetchCommuteData(); // 출근 성공 후 데이터 다시 가져오기
            }
        } catch (error) {
            console.error('Error during commute:', error);
            alert('Error');
        }
    });

    const onValid1 = handleSubmit(async ({today}) => {
        try {
            const response = await commuteUpdateApi({today});
            if (response.status === 200) {
                alert('퇴근');
                await fetchCommuteData(); // 퇴근 성공 후 데이터 다시 가져오기
            }
        } catch (error) {
            console.error('Error during commute:', error);
            alert('Error');
        }
    });

    const navigateToUsedList = () => {
        navigate('/used-list');
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await commuteSelectApi();
                setLogInfo(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        async function fetchData1() {
            try {
                const data1 = await selectMemoApi();
                setMemo(data1);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        async function fetchData2() {
            try {
                const data2 = await selectNoticeTop4Api();
                setNotice(data2);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        async function fetchData3() {
            try {
                const data3 = await selectEmp();
                setMain(data3);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        async function fetchData4() {
            try {
                const data4 = await ApprovalCountApi();
                setCount(data4);
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
        fetchData1();
        fetchData2();
        fetchData3();
        fetchData4();
    }, []);

    return (
        <div style={{paddingTop: "50px"}}>
            <div>
                <MemoComponent isOpen={isModalOpen} closeModal={closeModal} memoContent={memo.memoContent}/>
            </div>
            <div style={{display: 'flex'}}>
                <div style={{width: '10%', height: '100%'}}>
                    <DeptEmpTree/>
                </div>
                <div className="d-flex justify-content-center align-items-center" style={{
                    height: '1080px',
                    filter: 'brightness(111%) grayscale(1%)',
                    background: '#ffffff',
                    display: 'block',
                    width: '90%'
                }}>
                    <div style={{width: '80%', height: '100%'}}>
                        <div style={{width: '100%', height: '5%', background: 'transparent'}}/>
                        <div className="align-items-center"
                             style={{width: '100%', height: '95%', background: 'transparent'}}>
                            <div className="d-flex justify-content-center"
                                 style={{width: '100%', minWidth: '0px', height: '40%', background: 'transparent'}}>
                                <div className="d-flex justify-content-start"
                                     style={{width: '40%', height: '100%', background: 'transparent'}}>
                                    <div style={{
                                        width: '90%',
                                        height: '100%',
                                        background: 'transparent',
                                        borderRadius: '5px',
                                        borderWidth: '2px',
                                        borderStyle: 'solid'
                                    }}>
                                        <div className="d-flex justify-content-center align-items-center"
                                             style={{width: '100%', height: '70%'}}>
                                            <div className="d-flex justify-content-center align-items-center"
                                                 style={{width: '40%', height: '100%'}}><img src={main.empPicturePath}
                                                                                             style={{
                                                                                                 width: '70%',
                                                                                                 height: '70%',
                                                                                                 borderRadius: '5px',
                                                                                                 borderWidth: '0px',
                                                                                                 borderStyle: 'solid'
                                                                                             }} width={138}
                                                                                             height={201}/>
                                            </div>
                                            <div className="d-flex align-items-center"
                                                 style={{width: '60%', height: '100%'}}>
                                                <div style={{width: '80%', height: '80%'}}>
                                                    <div className="justify-content-center align-items-center"
                                                         style={{width: '100%', height: '60%'}}>
                                                        <div className="d-flex align-items-end"
                                                             style={{width: '100%', height: '60%'}}>
                                                        <span style={{
                                                            fontWeight: 'bold',
                                                            fontSize: '21px'
                                                        }}>{main.empDept}</span>
                                                        </div>
                                                        <div className="d-flex align-items-center"
                                                             style={{width: '100%', height: '30%'}}><span style={{
                                                            fontWeight: 'bold',
                                                            fontSize: '21px',
                                                            marginRight: '10px'
                                                        }}>{main.empPosition}</span><span style={{
                                                            fontWeight: 'bold',
                                                            fontSize: '21px'
                                                        }}>{main.empName}</span></div>
                                                        <div style={{width: '100%', height: '50%'}}>
                                                            <div className="d-flex align-items-end"
                                                                 style={{width: '100%', height: '50%'}}><span
                                                                className="text-nowrap" style={{
                                                                fontSize: '17px',
                                                                marginRight: '27px'
                                                            }}>이메일</span><span className="text-nowrap"
                                                                               style={{fontSize: '17px'}}>{main.empEmail}</span>
                                                            </div>
                                                            <div style={{width: '100%', height: '50%'}}><span
                                                                className="text-nowrap" style={{
                                                                fontSize: '17px',
                                                                marginRight: '10px'
                                                            }}>전화번호</span><span className="text-nowrap"
                                                                                style={{fontSize: '17px'}}>{main.empPhoneNumber}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{width: '20%', height: '100%'}}>
                                                    <button className="btn btn-primary" data-bss-hover-animate="pulse"
                                                            type="button" onClick={navigateToFixInfo} style={{
                                                        background: 'url("img/fixinfo.png") center / contain no-repeat',
                                                        width: '100%',
                                                        height: '10%',
                                                        borderWidth: '0px',
                                                        marginTop: '10px'
                                                    }}/>
                                                    <button className="btn btn-primary" data-bss-hover-animate="pulse"
                                                            type="button" onClick={navigateToUsedList} style={{
                                                        background: 'url("img/vacation.png") center / contain no-repeat',
                                                        width: '100%',
                                                        height: '10%',
                                                        borderWidth: '0px',
                                                        marginTop: '10px'
                                                    }}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="justify-content-center align-items-center" style={{
                                            width: '100%',
                                            height: '30%',
                                            borderTopWidth: '2px',
                                            borderTopStyle: 'solid'
                                        }}>
                                            <div className="d-flex justify-content-center align-items-center"
                                                 style={{width: '100%', height: '50%'}}>
                                                <div className="d-flex align-items-center"
                                                     style={{width: '50%', height: '100%'}}>
                                                    <button className="btn btn-primary" data-bss-hover-animate="pulse"
                                                            type="button" onClick={onValid} style={{
                                                        background: 'white',
                                                        color: 'black',
                                                        borderWidth: '1px',
                                                        borderColor: 'black',
                                                        marginLeft: '20px',
                                                        width: '70%',
                                                        height: 'auto'
                                                    }}>출근
                                                    </button>
                                                </div>
                                                <div className="d-flex align-items-center"
                                                     style={{width: '50%', height: '100%'}}>
                                                    <span>{logInfo.logCheckIn}</span>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center"
                                                 style={{width: '100%', height: '50%'}}>
                                                <div className="d-flex align-items-center"
                                                     style={{width: '50%', height: '100%'}}>
                                                    <button className="btn btn-primary" data-bss-hover-animate="pulse"
                                                            type="button" onClick={onValid1} style={{
                                                        background: 'white',
                                                        color: 'black',
                                                        borderWidth: '1px',
                                                        borderColor: 'black',
                                                        marginLeft: '20px',
                                                        width: '70%',
                                                        height: 'auto'
                                                    }}>퇴근
                                                    </button>
                                                </div>
                                                <div className="d-flex align-items-center"
                                                     style={{width: '50%', height: '100%'}}>
                                                    <span>{logInfo.logCheckOut}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center align-items-center"
                                     style={{width: '60%', height: '100%', background: 'transparent'}}>
                                    <div style={{
                                        width: '30%',
                                        height: '100%',
                                        borderWidth: '2px',
                                        borderStyle: 'solid',
                                        borderRadius: '5px'
                                    }}>
                                        <div className="d-flex justify-content-center align-items-center" style={{
                                            width: '100%',
                                            height: '10%',
                                            borderBottomWidth: '2px',
                                            borderBottomStyle: 'solid'
                                        }}><span className="text-nowrap" style={{fontWeight: 'bold'}}>진행중 결재</span>
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center"
                                             style={{width: '100%', height: '60%'}}>
                                            <button className="btn btn-primary" data-bss-hover-animate="pulse"
                                                    onClick={navigateToApproval} type="button"
                                                    style={{
                                                        background: 'url("img/approval.png") center / contain no-repeat, white',
                                                        color: 'black',
                                                        marginLeft: '0px',
                                                        width: '70%',
                                                        height: '60%',
                                                        padding: '0px 0px',
                                                        paddingTop: '-2px',
                                                        borderWidth: '0px',
                                                        borderColor: 'black',
                                                        borderBottomWidth: '0px'
                                                    }}/>
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center" style={{
                                            width: '100%',
                                            height: '30%',
                                            borderTopWidth: '2px',
                                            borderTopStyle: 'solid'
                                        }}><span className="text-nowrap"
                                                 style={{fontWeight: 'bold', fontSize: '30px'}}>{count} 건</span></div>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center"
                                         style={{width: '90%', height: '100%'}}>
                                        <div style={{width: '5%', height: '100%'}}/>
                                        <div style={{
                                            width: '95%',
                                            height: '100%',
                                            borderWidth: '2px',
                                            borderStyle: 'solid',
                                            borderRadius: '5px',
                                        }}>
                                            <div className="text-nowrap d-flex align-items-center" style={{
                                                width: '100%',
                                                height: '10%',
                                                borderBottomWidth: '2px',
                                                borderBottomStyle: 'solid'
                                            }}><span className="text-nowrap"
                                                     style={{fontWeight: 'bold', marginLeft: '10px'}}>메모</span></div>
                                            <div
                                                className="d-flex justify-content-center justify-content-center align-items-center list-group"
                                                style={{
                                                    marginLeft: '0px',
                                                    marginRight: '0px',
                                                    maxHeight: '1000px',
                                                    width: '100%',
                                                    height: '90%',
                                                }}
                                            >
                                                <div
                                                    className="back color-6 SMN_effect-6 list-group-item list-group-item-action flex-column align-items-start"
                                                    onClick={openModal}
                                                    style={{
                                                        height: '100%',
                                                        marginBottom: '0px',
                                                        width: '100%',
                                                        overflow: 'auto'
                                                    }}
                                                >
                                                    <div className="d-flex w-100 justify-content-between"
                                                         style={{fontSize: '20px'}}>
                                                        <h5 className="mb-1" data-hover={memo.memoContent}
                                                            style={{width: '100%'}}>
                                                            <div
                                                                dangerouslySetInnerHTML={{__html: memo.memoContent}}></div>
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center"
                                 style={{
                                     marginTop: '2%',
                                     width: '100%',
                                     minWidth: '0px',
                                     height: '40%',
                                     background: 'transparent',
                                     borderWidth: '2px',
                                     borderStyle: 'solid',
                                     borderRadius: '5px'
                                 }}>
                                <div style={{width: '100%', height: '100%'}}>
                                    <div className="list-group d-xxl-flex" style={{
                                        width: '100%',
                                        maxHeight: '1000px',
                                    }}>
                                        <div className="d-flex justify-content-start align-items-center" style={{
                                            marginLeft: '10px',
                                            marginTop: '10px',
                                            marginBottom: '10px',
                                            ontSize: '30px',
                                            fontWeight: 'bold'
                                        }}>공지사항
                                        </div>
                                        <div
                                            className="list-group-item list-group-item-action d-flex flex-row align-items-start"
                                            style={{
                                                height: '30px',
                                                width: '100%',
                                                paddingTop: '0px',
                                                paddingRight: '0px',
                                                paddingBottom: '0px',
                                                paddingLeft: '0px',
                                                borderTopRightRadius: '0px',
                                                borderTopLeftRadius: '0px',
                                                borderStyle: 'solid',
                                                borderColor: 'black',
                                                borderRightStyle: 'none',
                                                borderLeftStyle: 'none',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center', // 추가: 세로 중앙 정렬
                                                textAlign: "center",
                                            }}>

                                            <div style={{width: '5%', fontWeight: 'bold', whiteSpace: "nowrap"}}>글번호
                                            </div>
                                            <div style={{width: '50%', fontWeight: 'bold', whiteSpace: "nowrap"}}>제목
                                            </div>
                                            <div style={{width: '10%', fontWeight: 'bold', whiteSpace: "nowrap"}}>조회수
                                            </div>
                                            <div style={{width: '10%', fontWeight: 'bold', whiteSpace: "nowrap"}}>작성자
                                            </div>
                                            <div style={{width: '35%', fontWeight: 'bold', whiteSpace: "nowrap"}}>작성일
                                            </div>
                                        </div>
                                        <div>
                                            {notice.map((item) => (
                                                <button
                                                    className="list-group-item list-group-item-action d-flex flex-row align-items-center"
                                                    onClick={() => handleItemClick(item.id)}
                                                    style={{
                                                        height: '50px',
                                                        marginBottom: '2px',
                                                        marginTop: '15px',
                                                        width: '100%',
                                                        paddingTop: '0px',
                                                        paddingRight: '0px',
                                                        paddingBottom: '0px',
                                                        paddingLeft: '0px',
                                                        borderTopRightRadius: '0px',
                                                        borderTopLeftRadius: '0px',
                                                        borderStyle: 'none',
                                                        borderColor: 'black',
                                                        borderRightStyle: 'none',
                                                        borderLeftStyle: 'none',
                                                        display: 'flex',
                                                        justifyContent: 'space-between'
                                                    }}
                                                    key={item.id}
                                                >
                                                    <div style={{
                                                        width: '5%',
                                                        fontWeight: 'bold',
                                                        textAlign: 'center'
                                                    }}>{item.id}</div>
                                                    <div style={{
                                                        width: '50%',
                                                        fontWeight: 'bold',
                                                        textAlign: 'left'
                                                    }}>{item.subject}</div>
                                                    <div style={{
                                                        width: '10%',
                                                        fontWeight: 'bold',
                                                        textAlign: 'center'
                                                    }}>{item.views}</div>
                                                    <div style={{
                                                        width: '10%',
                                                        fontWeight: 'bold',
                                                        textAlign: 'center'
                                                    }}>{item.writer}</div>
                                                    <div style={{
                                                        width: '35%',
                                                        fontWeight: 'bold',
                                                        textAlign: 'center'
                                                    }}>{FormatDate(item.createdDate)}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;