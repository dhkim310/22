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

    const navigateToNotice = (id) => {
        navigate(`/notice/${id}`)
    }
    const [notice, setNotice] = useState([]);
    const [memo, setMemo] = useState({});
    const [logInfo, setLogInfo] = useState({});
    const [main, setMain] = useState({})
    const [count, setCount] = useState(null)
    const [isMobile, setIsMobile] = useState(false);
    const [hoverAnimationList, setHoverAnimationList] = useState([]);
    const {register, formState: {errors}, handleSubmit} = useForm();

    const onValid = async ({today}) => {
        await commuteApi({today})
            .then((res) => {
                if (res.status === 200) {
                    alert('출근')
                }
                console.log(res);
            })
            .catch((err) => {
                alert('Error')
                console.log("err", err);
            })
    };

    const onValid1 = async ({today}) => {
        await commuteUpdateApi({today})
            .then((res) => {
                if (res.status === 200) {
                    alert('퇴근')
                }
            })
            .catch((err) => {
                alert('Error')
                console.log("err", err);
            })
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

    return (<div style={{paddingTop: "50px"}}>
            <div>
                <MemoComponent isOpen={isModalOpen} closeModal={closeModal} memoContent={memo.memoContent}/>
            </div>

            <div>
                <div className="d-grid d-lg-flex justify-content-lg-center"
                     style={{width: 'auto', height: '100%', minHeight: '0px', background: 'white'}}>
                    <div style={{height: '100%', width: '10%', minHeight: '0px', background: 'white'}}>
                        <div style={{height: '13px'}}/>
                        <div style={{height: 'auto', background: 'rgba(0,0,0,0)', paddingBottom: '5px'}}>
                            <div className="d-lg-flex justify-content-lg-center"
                                 style={{height: '30px', background: 'rgba(126,126,126,0)'}}>
                                <div className="d-lg-flex justify-content-lg-start justify-content-xxl-center"
                                     style={{width: '170px', height: '35px', background: 'black'}}><span
                                    style={{fontSize: '17px', width: 'auto', color: 'white'}}>고객관리</span></div>
                            </div>
                            <button className="btn btn-primary text-center" type="button" style={{
                                background: 'rgba(13,110,253,0)',
                                borderStyle: 'none',
                                width: '98.5px',
                                fontSize: '13px',
                                minWidth: '98.5px',
                                color: 'black',
                                paddingTop: '15px'
                            }}>&nbsp; &nbsp;리스트
                            </button>
                            <button className="btn btn-primary text-center" type="button" style={{
                                background: 'rgba(13,110,253,0)',
                                borderStyle: 'none',
                                width: '98.5px',
                                fontSize: '13px',
                                color: 'black',
                                paddingTop: '0px'
                            }}>등록
                            </button>
                        </div>
                        <div style={{height: 'auto', background: 'rgba(0,0,0,0)', paddingBottom: '5px'}}>
                            <div className="d-lg-flex justify-content-lg-center"
                                 style={{height: '30px', background: 'rgba(126,126,126,0)'}}>
                                <div className="d-lg-flex justify-content-lg-start justify-content-xxl-center"
                                     style={{width: '170px', height: '35px', background: 'black', color: 'white'}}><span
                                    style={{fontSize: '17px', width: 'auto'}}>용민관리</span></div>
                            </div>
                            <button className="btn btn-primary text-center" type="button" style={{
                                background: 'rgba(13,110,253,0)',
                                borderStyle: 'none',
                                width: '98.5px',
                                fontSize: '13px',
                                minWidth: '98.5px',
                                color: 'black',
                                paddingTop: '15px'
                            }}>&nbsp; &nbsp;불주먹
                            </button>
                            <button className="btn btn-primary text-center" type="button" style={{
                                background: 'rgba(13,110,253,0)',
                                borderStyle: 'none',
                                width: '98.5px',
                                fontSize: '13px',
                                color: 'black',
                                paddingTop: '0px'
                            }}>등록
                            </button>
                        </div>
                        <div style={{height: 'auto', background: 'rgba(0,0,0,0)', paddingBottom: '5px'}}>
                            <div className="d-lg-flex justify-content-lg-center"
                                 style={{height: '30px', background: 'rgba(126,126,126,0)'}}>
                                <div className="d-lg-flex justify-content-lg-start justify-content-xxl-center"
                                     style={{width: '170px', height: '35px', background: 'black', color: 'white'}}><span
                                    style={{fontSize: '17px', width: 'auto'}}>현동관리</span></div>
                            </div>
                            <button className="btn btn-primary text-center" type="button" style={{
                                background: 'rgba(13,110,253,0)',
                                borderStyle: 'none',
                                width: '98.5px',
                                fontSize: '13px',
                                minWidth: '98.5px',
                                color: 'black',
                                paddingTop: '15px'
                            }}>&nbsp; &nbsp;물주먹
                            </button>
                            <button className="btn btn-primary text-center" type="button" style={{
                                background: 'rgba(13,110,253,0)',
                                borderStyle: 'none',
                                width: '98.5px',
                                fontSize: '13px',
                                color: 'black',
                                paddingTop: '0px'
                            }}>등록
                            </button>
                        </div>
                        <div style={{height: 'auto', background: 'rgba(0,0,0,0)', paddingBottom: '5px'}}>
                            <div className="d-lg-flex justify-content-xxl-center"
                                 style={{height: '30px', background: 'rgba(126,126,126,0)'}}>
                                <div className="d-lg-flex justify-content-lg-start justify-content-xxl-center"
                                     style={{width: '170px', height: '35px', background: 'black', color: 'white'}}><span
                                    style={{fontSize: '17px', width: 'auto'}}>고객관리</span></div>
                            </div>
                            <button className="btn btn-primary text-center" type="button" style={{
                                background: 'rgba(13,110,253,0)',
                                borderStyle: 'none',
                                width: '98.5px',
                                fontSize: '13px',
                                minWidth: '98.5px',
                                color: 'black',
                                paddingTop: '15px'
                            }}>&nbsp; &nbsp;리스트
                            </button>
                            <button className="btn btn-primary text-center" type="button" style={{
                                background: 'rgba(13,110,253,0)',
                                borderStyle: 'none',
                                width: '98.5px',
                                fontSize: '13px',
                                color: 'black',
                                paddingTop: '0px'
                            }}>등록
                            </button>
                        </div>
                        <div style={{height: 'auto', background: 'rgba(0,0,0,0)', paddingBottom: '5px'}}>
                            <div className="d-lg-flex justify-content-xxl-center"
                                 style={{height: '30px', background: 'rgba(126,126,126,0)'}}>
                                <div className="d-lg-flex justify-content-lg-start justify-content-xxl-center"
                                     style={{width: '170px', height: '35px', background: 'black', color: 'white'}}><span
                                    style={{fontSize: '17px', width: 'auto'}}>근태관리</span></div>
                            </div>
                        </div>
                        <form onSubmit={onValid}>
                            <div className="d-lg-flex justify-content-xxl-center"
                                 style={{height: '30px', background: 'rgba(126,126,126,0)', paddingTop: '10px'}}>
                                <button
                                    className="btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center"
                                    data-bss-hover-animate="pulse" type="submit" style={{
                                    width: '150px',
                                    height: '30px',
                                    color: 'black',
                                    background: 'rgba(13,110,253,0)',
                                    borderRadius: '6px',
                                    borderColor: 'black'
                                }}>출근
                                </button>
                            </div>
                        </form>

                        <form onSubmit={onValid1}>
                            <div className="d-lg-flex justify-content-xxl-center"
                                 style={{height: '30px', background: 'rgba(126,126,126,0)', paddingTop: '22px'}}>
                                <button
                                    className="btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center"
                                    data-bss-hover-animate="pulse" type="submit" style={{
                                    width: '150px',
                                    height: '30px',
                                    color: 'black',
                                    background: 'rgba(13,110,253,0)',
                                    borderRadius: '6px',
                                    borderColor: 'black'
                                }}>퇴근
                                </button>
                            </div>
                        </form>

                        <div style={{
                            height: 'auto', background: 'rgba(0,0,0,0)', paddingBottom: '15px', paddingTop: '37px'
                        }}>
                            <div className="d-lg-flex justify-content-xxl-start"
                                 style={{height: '30px', background: 'rgba(126,126,126,0)', fontSize: '12px'}}><span
                                style={{fontWeight: 'bold'}}>&nbsp; 출근시간 :&nbsp; {logInfo.logCheckIn}</span></div>
                            <div className="d-lg-flex justify-content-xxl-start"
                                 style={{height: '30px', background: 'rgba(126,126,126,0)'}}><span style={{
                                fontSize: '12px', fontWeight: 'bold'
                            }}>&nbsp; 퇴근시간 :&nbsp; {logInfo.logCheckOut}</span></div>
                        </div>
                    </div>
                    <div style={{width: '90%', background: 'var(--bs-gray-200)', height: '100%'}}>

                        <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center" style={{
                            width: 'auto',
                            height: '100%',
                            background: 'rgba(206,212,218,0)',
                            borderBottomStyle: 'none',
                            paddingTop: '27px'
                        }}>
                            <div className="container" style={{maxWidth: '1800px', height: '100%'}}>
                                <div className="row d-xxl-flex justify-content-xxl-end"
                                     style={{paddingTop: '0px', height: '100%'}}>
                                    <div className="col d-xxl-flex align-items-xxl-center" style={{height: '100%'}}>
                                        <div
                                            style={{height: 'auto', background: 'rgba(255,255,255,0)', width: '20px'}}/>
                                        <div style={{height: '850px', background: 'transparent', width: '370px'}}>
                                            <div style={{background: 'white', width: '100%', height: '400px'}}>
                                                <div style={{height: '30px'}}/>
                                                <div style={{
                                                    height: '300px',
                                                    background: `url(${main.empPicturePath}) center / contain no-repeat`
                                                }}/>
                                                <div
                                                    className="d-xxl-flex justify-content-xxl-center align-items-xxl-center"
                                                    style={{height: '70px'}}>
                                                    <div
                                                        className="d-xxl-flex justify-content-xxl-end align-items-xxl-center"
                                                        style={{width: '50%', height: '100%'}}><span style={{
                                                        fontSize: '26px', fontWeight: 'bold'
                                                    }}>{main.empName} {main.empPosition}</span></div>
                                                    <div
                                                        className="d-xxl-flex justify-content-xxl-center align-items-xxl-center"
                                                        style={{width: '50%', height: '100%'}}>
                                                        <button
                                                            className="btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center"
                                                            data-bss-hover-animate="pulse" type="button"
                                                            onClick={navigateToFixInfo} style={{
                                                            width: '120px',
                                                            height: '30px',
                                                            color: 'black',
                                                            background: 'rgba(13,110,253,0)',
                                                            borderRadius: '6px',
                                                            borderColor: 'black'
                                                        }}>정보수정
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-xxl-flex justify-content-xxl-center" style={{
                                                background: 'white',
                                                width: '100%',
                                                height: '200px',
                                                marginTop: '20px',
                                                borderStyle: 'solid'
                                            }}>
                                                <div/>
                                                <div
                                                    className="d-xxl-flex justify-content-xxl-center align-items-xxl-center"
                                                    style={{width: '50%', height: '100%'}}>
                                                    <button className="btn btn-primary" onClick = { navigateToApproval } data-bss-hover-animate="pulse"
                                                            type="button" style={{
                                                        background: 'url("img/3.png") center / contain no-repeat',
                                                        width: '55%',
                                                        height: '65%',
                                                        borderWidth: '0px'
                                                    }}/>
                                                </div>
                                                <div style={{width: '50%', height: '100%'}}>
                                                    <div
                                                        className="d-xxl-flex justify-content-xxl-center align-items-xxl-end"
                                                        style={{
                                                            background: 'transparent', width: '100%', height: '50%'
                                                        }}><span
                                                        style={{fontSize: '27px', fontWeight: 'bold'}}>진행중 결재</span>
                                                    </div>
                                                    <div className="d-xxl-flex justify-content-xxl-center" style={{
                                                        background: 'transparent', width: '100%', height: '50%'
                                                    }}><span style={{fontSize: '31px', fontWeight: 'bold'}}>{count}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{
                                            height: '200px', background: 'rgba(255,255,255,0)', width: '20px'
                                        }}/>
                                        <div style={{height: '850px', background: 'transparent', width: '561px'}}>
                                            <div style={{background: 'white', width: '100%', height: '450px'}}>
                                                <div className="d-xxl-flex align-items-xxl-center" style={{
                                                    height: '50px', borderBottom: '1px ridge rgba(128,128,128,0.24)'
                                                }}><span style={{
                                                    fontSize: '25px', fontWeight: 'bold', paddingLeft: '23px'
                                                }}>공지사항</span></div>
                                                <div
                                                    className="d-xxl-flex justify-content-xxl-center align-items-xxl-center"
                                                    style={{width: '100%', height: '400px'}}>
                                                    <div
                                                        className="d-xxl-flex justify-content-center justify-content-xxl-center align-items-xxl-center list-group"
                                                        style={{
                                                            marginLeft: '0px',
                                                            marginRight: '34px',
                                                            maxHeight: '1000px',
                                                            width: '100%'
                                                        }}>

                                                        <ul>
                                                            {notice.map((e, i) => (
                                                                <li key={i} style={{listStyleType: 'none'}}>
                                                                    <a className="d-xxl-flex justify-content-xxl-center list-group-item list-group-item-action flex-column align-items-start"
                                                                       onClick={() => navigateToNotice(e.id)} style={{
                                                                        height: '70px',
                                                                        marginBottom: '2px',
                                                                        width: '561px'
                                                                    }}>
                                                                        <div
                                                                            className="d-flex w-100 justify-content-between"
                                                                            style={{width: '100%'}}>
                                                                            <h5 className="mb-1"
                                                                                style={{width: '100%'}}>{e.subject}</h5>
                                                                        </div>
                                                                    </a>
                                                                </li>))}
                                                        </ul>


                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{
                                                background: 'white', width: '100%', height: '300px', marginTop: '20px'
                                            }}>
                                                <div className="d-xxl-flex align-items-xxl-center" style={{
                                                    height: '50px', borderBottom: '1px ridge rgba(128,128,128,0.24)'
                                                }}><span style={{
                                                    fontSize: '25px', fontWeight: 'bold', paddingLeft: '23px'
                                                }}>메모</span></div>
                                                <div
                                                    className="d-xxl-flex justify-content-xxl-center align-items-xxl-center"
                                                    onClick={openModal} style={{width: '100%', height: '300px'}}>
                                                    <div
                                                        className="d-xxl-flex justify-content-center justify-content-xxl-center align-items-xxl-center list-group"
                                                        style={{
                                                            marginLeft: '0px',
                                                            marginRight: '0px',
                                                            maxHeight: '1000px',
                                                            width: '100%'
                                                        }}><a
                                                        className="d-xxl-flex list-group-item list-group-item-action flex-column align-items-start"
                                                        style={{height: '300px', marginBottom: '2px', width: '561px'}}>
                                                        <div className="d-flex w-100 justify-content-between"
                                                             style={{width: '100%'}}>
                                                            <h5 className="mb-1"
                                                                style={{width: '100%'}}>{memo.memoContent}</h5>
                                                        </div>
                                                    </a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-xxl-1" style={{maxWidth: '10%', height: '100%'}}><a
                                        data-bss-hover-animate="pulse"
                                        className="list-group-item list-group-item-action flex-column align-items-start"
                                        style={{
                                        height: '200px',
                                        marginBottom: '2px',
                                        width: 'auto',
                                        borderStyle: 'none',
                                        background: 'white'
                                    }}>
                                        <div
                                            className="d-xxl-flex justify-content-xxl-center d-flex w-100 justify-content-between"
                                            style={{background: 'black'}}>
                                            <h5 className="mb-1" style={{color: 'white'}}>9/18</h5>
                                        </div>
                                        <p className="mb-1" style={{
                                            background: 'white',
                                            textAlign: 'center',
                                            borderBottom: '1px ridge rgba(128,128,128,0.18)'
                                        }}>Mon</p>
                                    </a></div>
                                    <div className="col-md-3 col-xxl-1" style={{maxWidth: '10%', height: '100%'}}><a
                                        data-bss-hover-animate="pulse"
                                        className="list-group-item list-group-item-action flex-column align-items-start"
                                        style={{
                                        height: '200px', marginBottom: '2px', width: 'auto', background: 'white'
                                    }}>
                                        <div
                                            className="d-xxl-flex justify-content-xxl-center d-flex w-100 justify-content-between"
                                            style={{background: 'black'}}>
                                            <h5 className="mb-1" style={{color: 'white'}}>9/19</h5>
                                        </div>
                                        <p className="mb-1" style={{
                                            background: 'white',
                                            textAlign: 'center',
                                            borderBottom: '1px ridge rgba(128,128,128,0.18)'
                                        }}>Tue</p>
                                    </a></div>
                                    <div className="col-md-3 col-xxl-1" style={{maxWidth: '10%', height: '100%'}}><a
                                        data-bss-hover-animate="pulse"
                                        className="list-group-item list-group-item-action flex-column align-items-start"
                                        style={{
                                        height: '200px', marginBottom: '2px', width: 'auto', background: 'white'
                                    }}>
                                        <div
                                            className="d-xxl-flex justify-content-xxl-center d-flex w-100 justify-content-between"
                                            style={{background: 'black'}}>
                                            <h5 className="mb-1" style={{color: 'white'}}>9/20</h5>
                                        </div>
                                        <p className="mb-1" style={{
                                            background: 'white',
                                            textAlign: 'center',
                                            borderBottom: '1px ridge rgba(128,128,128,0.18)'
                                        }}>Wed</p>
                                    </a></div>
                                    <div className="col-md-3 col-xxl-1" style={{maxWidth: '10%', height: '100%'}}><a
                                        data-bss-hover-animate="pulse"
                                        className="list-group-item list-group-item-action flex-column align-items-start"
                                        style={{
                                        height: '200px', marginBottom: '2px', width: 'auto', background: 'white'
                                    }}>
                                        <div
                                            className="d-xxl-flex justify-content-xxl-center d-flex w-100 justify-content-between"
                                            style={{background: 'black'}}>
                                            <h5 className="mb-1" style={{color: 'white'}}>9/21</h5>
                                        </div>
                                        <p className="mb-1" style={{
                                            textAlign: 'center', borderBottom: '1px ridge rgba(128,128,128,0.18)'
                                        }}>Thu</p>
                                    </a></div>
                                    <div className="col-md-3 col-xxl-1" style={{maxWidth: '25%', height: '100%'}}><a
                                        data-bss-hover-animate="pulse"
                                        className="list-group-item list-group-item-action flex-column align-items-start"
                                        style={{
                                        height: '200px',
                                        marginBottom: '2px',
                                        width: 'auto',
                                        background: 'white',
                                        borderRadius: '-20px'
                                    }}>
                                        <div
                                            className="d-xxl-flex justify-content-xxl-center d-flex w-100 justify-content-between"
                                            style={{
                                                background: 'black',
                                                borderRadius: '0px',
                                                borderTopLeftRadius: '0px',
                                                borderTopRightRadius: '0px'
                                            }}>
                                            <h5 className="mb-1" style={{color: 'white'}}>9/22</h5>
                                        </div>
                                        <p className="mb-1" style={{
                                            textAlign: 'center', borderBottom: '1px ridge rgba(128,128,128,0.18)'
                                        }}>Fri</p>
                                    </a></div>
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