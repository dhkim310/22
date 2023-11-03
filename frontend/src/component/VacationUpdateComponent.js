import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {useForm} from "react-hook-form";
import {vacationDetail, vacationUpdate} from "../api/Vacation";
import DatePicker from "react-datepicker";

function calculateDayDifference(startDate1, endDate1) {
    if (startDate1 && endDate1) {
        const oneDay = 24 * 60 * 60 * 1000;
        const differenceInDays = Math.round((endDate1 - startDate1) / oneDay);
        return differenceInDays;
    }
    return 0;
}

function VacationUpdateComponent({isOpen, closeModal, empId}) {
    const {register, formState: {errors}, handleSubmit} = useForm();
    const [startdate1, setStartdate] = useState(null);
    const [enddate1, setEnddate] = useState(null);
    const [usedDayOff, setUsedDayOff] = useState(0);
    const [detail, setDetail] = useState({});


    const onValid = async ({
                               totalVacation,
                               usedVacation,
                               totalDayOff,
                               usedDayOff,
                               startDate,
                               endDate,
                               why,
                           }) => {
        const dayOffDifference = calculateDayDifference(startdate1, enddate1);
        await vacationUpdate(empId, {
            empId: empId,
            totalVacation,
            usedVacation,
            totalDayOff,
            usedDayOff: dayOffDifference,
            startDate: startdate1,
            endDate: enddate1,
            why,
        })
            .then((res) => {
                if (res.status === 200) {
                    closeModal();
                    console.log({totalVacation});
                }
            })
            .catch((err) => {
                console.log('err', err)
            })
    };

    useEffect(() => {
        if (startdate1 && enddate1) {
            setUsedDayOff(calculateDayDifference(startdate1, enddate1));
        } else {
            setUsedDayOff(0);
        }
    }, [startdate1, enddate1]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await vacationDetail(empId);
                setDetail(data);
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchData();
    }, [empId]);

    const customModalStyles = {
        content: {
            justifyContent: 'center',
            width: '450px',
            height: '550px',
            backgroundColor: 'white',
            borderRadius: '34px',
            borderStyle: 'solid',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customModalStyles}
            contentLabel="휴가등록 모달"
        >
            <div>
                <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'white',
                    borderRadius: '34px',
                    borderStyle: 'none'
                }}>
                    <div className="d-xxl-flex justify-content-xxl-start"
                         style={{width: '100%', height: '11%', background: 'rgba(253,126,20,0)'}}>
                        <div style={{width: '6%', height: '100%'}}/>
                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center" style={{
                            height: '100%',
                            width: '26%',
                            background: 'rgba(253,126,20,0)',
                            marginBottom: '20px'
                        }}>
                            <span style={{fontSize: '22px', fontWeight: 'bold'}}>휴가 등록 {empId}</span>
                        </div>
                        <div className="d-xxl-flex justify-content-xxl-end align-items-xxl-center"
                             style={{height: '100%', width: '63%'}}>
                            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button" style={{
                                background: 'url("assets/img/icons8-취소하다-500.png") center / contain no-repeat',
                                width: '38px',
                                height: '37px',
                                borderStyle: 'none'
                            }}/>
                        </div>
                    </div>
                    <div className="d-xxl-flex justify-content-xxl-center"
                         style={{width: '100%', height: '85%', background: 'rgba(253,126,20,0)'}}>
                        <div style={{width: '6%', height: '100%', background: 'rgba(253,126,20,0)'}}/>
                        <div className="align-items-xxl-start"
                             style={{height: '100%', width: '88%', background: 'rgba(253,126,20,0)'}}>
                            <div className="justify-content-xxl-center" style={{width: '100%', height: '100%'}}>
                                <div style={{width: '100%', height: '2%', background: 'rgba(214,51,132,0)'}}/>
                                <form onSubmit={handleSubmit(onValid)}>
                                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                         style={{
                                             background: 'rgba(102,16,242,0)',
                                             width: '100%',
                                             height: '10%',
                                             marginTop: '10px',
                                             marginBottom: '10px'
                                         }}>
                                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                             style={{
                                                 background: 'rgba(111,66,193,0)',
                                                 height: '50%',
                                                 width: '100%',
                                                 fontSize: '15px'
                                             }}>
                                            <span>총 휴가</span>
                                        </div>
                                        <div style={{background: 'rgba(111,66,193,0)', height: '2px', width: '100%'}}/>
                                        <div className="d-xxl-flex align-items-xxl-center"
                                             style={{background: 'rgba(111,66,193,0)', height: '40%', width: '100%'}}>
                                            <input type="text" {...register('totalVacation')}
                                                   value={detail.totalVacation}
                                                   />
                                        </div>
                                    </div>

                                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                         style={{
                                             background: 'rgba(102,16,242,0)',
                                             width: '100%',
                                             height: '10%',
                                             marginTop: '10px',
                                             marginBottom: '10px'
                                         }}>
                                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                             style={{
                                                 background: 'rgba(111,66,193,0)',
                                                 height: '50%',
                                                 width: '100%',
                                                 fontSize: '15px'
                                             }}>
                                            <span>사용 휴가</span>
                                        </div>
                                        <div style={{background: 'rgba(111,66,193,0)', height: '2px', width: '100%'}}/>
                                        <div className="d-xxl-flex align-items-xxl-center"
                                             style={{background: 'rgba(111,66,193,0)', height: '40%', width: '100%'}}>
                                            <input type="text" {...register('usedVacation')} />
                                        </div>
                                    </div>
                                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                         style={{
                                             background: 'rgba(102,16,242,0)',
                                             width: '100%',
                                             height: '10%',
                                             marginTop: '10px',
                                             marginBottom: '10px'
                                         }}>
                                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                             style={{
                                                 background: 'rgba(111,66,193,0)',
                                                 height: '50%',
                                                 width: '100%',
                                                 fontSize: '15px'
                                             }}>
                                            <span>총 연차</span>
                                        </div>
                                        <div style={{background: 'rgba(111,66,193,0)', height: '2px', width: '100%'}}/>
                                        <div className="d-xxl-flex align-items-xxl-center"
                                             style={{background: 'rgba(111,66,193,0)', height: '40%', width: '100%'}}>
                                            <input type="text" name="totaldayoff" {...register('totalDayOff')}
                                                   value={detail.totalDayOff}
                                                   readOnly/>
                                        </div>
                                    </div>
                                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                         style={{
                                             background: 'rgba(102,16,242,0)',
                                             width: '100%',
                                             height: '10%',
                                             marginTop: '10px',
                                             marginBottom: '10px'
                                         }}>
                                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                             style={{
                                                 background: 'rgba(111,66,193,0)',
                                                 height: '50%',
                                                 width: '100%',
                                                 fontSize: '15px'
                                             }}>
                                            <span>사용 연차</span>
                                        </div>
                                        <div style={{background: 'rgba(111,66,193,0)', height: '2px', width: '100%'}}/>
                                        <div className="d-xxl-flex align-items-xxl-center"
                                             style={{background: 'rgba(111,66,193,0)', height: '40%', width: '100%'}}>
                                            <input
                                                type="text"
                                                name="useddayoff"
                                                value={usedDayOff}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                         style={{
                                             background: 'rgba(102,16,242,0)',
                                             width: '100%',
                                             height: '10%',
                                             marginTop: '10px',
                                             marginBottom: '10px'
                                         }}>
                                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                             style={{
                                                 background: 'rgba(111,66,193,0)',
                                                 height: '50%',
                                                 width: '100%',
                                                 fontSize: '15px'
                                             }}>
                                            <span>시작일</span>
                                        </div>
                                        <div style={{background: 'rgba(111,66,193,0)', height: '2px', width: '100%'}}/>
                                        <div className="d-xxl-flex align-items-xxl-center"
                                             style={{background: 'rgba(111,66,193,0)', height: '60%', width: '100%'}}>
                                            <DatePicker
                                                selected={startdate1}
                                                onChange={date => setStartdate(date)}
                                                dateFormat="yyyy-MM-dd"
                                                placeholderText="날짜를 선택하세요"
                                                showYearDropdown
                                                yearDropdownItemNumber={30}
                                                scrollableYearDropdown
                                            />
                                        </div>
                                    </div>
                                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                         style={{
                                             background: 'rgba(102,16,242,0)',
                                             width: '100%',
                                             height: '10%',
                                             marginTop: '10px',
                                             marginBottom: '10px'
                                         }}>
                                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                             style={{
                                                 background: 'rgba(111,66,193,0)',
                                                 height: '50%',
                                                 width: '100%',
                                                 fontSize: '15px'
                                             }}>
                                            <span>종료일</span>
                                        </div>
                                        <div style={{background: 'rgba(111,66,193,0)', height: '2px', width: '100%'}}/>
                                        <div className="d-xxl-flex align-items-xxl-center"
                                             style={{background: 'rgba(111,66,193,0)', height: '60%', width: '100%'}}>
                                            <DatePicker
                                                selected={enddate1}
                                                onChange={date => setEnddate(date)}
                                                dateFormat="yyyy-MM-dd"
                                                placeholderText="날짜를 선택하세요"
                                            />
                                        </div>
                                    </div>
                                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                         style={{
                                             background: 'rgba(102,16,242,0)',
                                             width: '100%',
                                             height: '10%',
                                             marginTop: '10px',
                                             marginBottom: '10px'
                                         }}>
                                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                             style={{
                                                 background: 'rgba(111,66,193,0)',
                                                 height: '50%',
                                                 width: '100%',
                                                 fontSize: '15px'
                                             }}>
                                            <span>사유</span>
                                        </div>
                                        <div style={{background: 'rgba(111,66,193,0)', height: '2px', width: '100%'}}/>
                                        <div className="d-xxl-flex align-items-xxl-center"
                                             style={{background: 'rgba(111,66,193,0)', height: '40%', width: '100%'}}>
                                            <input type="text" name="why" {...register('why')} />
                                        </div>
                                    </div>
                                    <div style={{width: '100%', height: '2%', background: 'rgba(214,51,132,0)'}}/>
                                    <div className="d-xxl-flex align-items-xxl-end"
                                         style={{width: '100%', height: '21%'}}>
                                        <div className="d-xxl-flex justify-content-xxl-end align-items-xxl-center"
                                             style={{width: '100%', height: '52%'}}>
                                            <button
                                                className="btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center"
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
    )
}

export default VacationUpdateComponent;