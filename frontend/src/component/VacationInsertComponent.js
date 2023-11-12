import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {useForm} from "react-hook-form";
import {vacationDetail, vacationInsert} from "../api/Vacation";
import DatePicker from "react-datepicker";

function calculateDayDifference(startDate1, endDate1) {
    if (startDate1 && endDate1) {
        const oneDay = 24 * 60 * 60 * 1000;
        const differenceInDays = Math.round((endDate1 - startDate1) / oneDay) + 1;
        return differenceInDays;
    }
    return 0;
}

function VacationInsertComponent({isOpen, closeModal, empId}) {
    const {register, formState: {errors}, handleSubmit} = useForm();
    const [startdate1, setStartdate] = useState(null);
    const [enddate1, setEnddate] = useState(null);
    const [usedCount, setUsedCount] = useState(0);
    const [detail, setDetail] = useState({});
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await vacationDetail(empId);
                setDetail(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const getWidth = () => {
            return window.innerWidth;
        };

        setIsMobile(getWidth() < 768);

        fetchData();
    }, [empId]);


    const onValid = async ({
                               vacationTotalVacation,
                               vacationTotalDayOff,
                               vacationUsedCount,
                               vacationStartDate,
                               vacationEndDate,
                               vacationWhy,
                           }) => {
        const startDate = new Date(startdate1);
        const endDate = new Date(enddate1);

        if (startDate > endDate) {
            alert("날짜를 다시 입력하세요");
            setUsedCount(null);
            setStartdate(null);
            setEnddate(null);
        } else {
            const dayOffDifference = calculateDayDifference(startdate1, enddate1);
            const totalVacation = parseInt(detail.vacationTotalVacation, 10);
            const totalDayOff = parseInt(detail.vacationTotalDayOff, 10);
            let newTotalVacation = totalVacation - dayOffDifference;
            let newTotalDayOff = totalDayOff - Math.max(0, dayOffDifference - totalVacation);

            if (newTotalVacation < 0) {
                newTotalVacation = 0;
            }

            if (dayOffDifference > totalVacation + totalDayOff) {
                alert("사용일이 남은 휴가보다 많습니다.");
                setUsedCount(null);
                setStartdate(null);
                setEnddate(null);
            } else {
                await vacationInsert({
                    empId: empId,
                    vacationTotalVacation: newTotalVacation,
                    vacationUsedVacation: dayOffDifference,
                    vacationTotalDayOff: newTotalDayOff,
                    vacationUsedCount: dayOffDifference,
                    vacationStartDate: startdate1,
                    vacationEndDate: enddate1,
                    vacationWhy,
                })
                    .then((res) => {
                        if (res.status === 200) {
                            closeModal();
                            alert('휴가 등록 완료!');
                            window.location.reload();
                        }
                    })
                    .catch((err) => {
                        alert('값을 모두 입력하세요');
                        console.log('err', err);
                    });
            }
        }
    };


    useEffect(() => {
        if (startdate1 && enddate1) {
            setUsedCount(calculateDayDifference(startdate1, enddate1));
        } else {
            setUsedCount(0);
        }
    }, [startdate1, enddate1]);


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
                    <div className="d-flex justify-content-start"
                         style={{width: '100%', height: '11%', background: 'rgba(253,126,20,0)'}}>
                        <div style={{width: '6%', height: '100%'}}/>
                        <div className="d-flex justify-content-start align-items-center" style={{
                            height: '100%',
                            width: '26%',
                            background: 'rgba(253,126,20,0)',
                            marginBottom: '20px'
                        }}>
                            <span style={{fontSize: '22px', fontWeight: 'bold'}}>휴가 등록</span>
                        </div>
                        <div className="d-flex justify-content-end align-items-center"
                             style={{height: '100%', width: '63%'}}>
                            <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button" style={{
                                background: 'url("assets/img/취소.png") center / contain no-repeat',
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
                                            <span>총 휴가</span>
                                        </div>
                                        <div style={{background: 'rgba(111,66,193,0)', height: '2px', width: '100%'}}/>
                                        <div className="d-flex align-items-center"
                                             style={{background: 'rgba(111,66,193,0)', height: '40%', width: '100%'}}>
                                            <input type="text"
                                                   value={detail.vacationTotalVacation}
                                                   readOnly/>
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
                                            <span>총 연차</span>
                                        </div>
                                        <div style={{background: 'rgba(111,66,193,0)', height: '2px', width: '100%'}}/>
                                        <div className="d-flex align-items-center"
                                             style={{background: 'rgba(111,66,193,0)', height: '40%', width: '100%'}}>
                                            <input type="text" name="totaldayoff" {...register('vacationTotalDayOff')}
                                                   value={detail.vacationTotalDayOff}
                                                   autoFocus/>
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
                                            <span>사용일</span>
                                        </div>
                                        <div style={{background: 'rgba(111,66,193,0)', height: '2px', width: '100%'}}/>
                                        <div className="d-flex align-items-center"
                                             style={{background: 'rgba(111,66,193,0)', height: '40%', width: '100%'}}>
                                            <input
                                                type="text"
                                                name="usedCount"
                                                value={usedCount}
                                                readOnly
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
                                            <span>시작일</span>
                                        </div>
                                        <div style={{background: 'rgba(111,66,193,0)', height: '2px', width: '100%'}}/>
                                        <div className="d-flex align-items-center"
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
                                            <span>종료일</span>
                                        </div>
                                        <div style={{background: 'rgba(111,66,193,0)', height: '2px', width: '100%'}}/>
                                        <div className="d-flex align-items-center"
                                             style={{background: 'rgba(111,66,193,0)', height: '60%', width: '100%'}}>
                                            <DatePicker
                                                selected={enddate1}
                                                onChange={date => setEnddate(date)}
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
                                            <span>사유</span>
                                        </div>
                                        <div style={{background: 'rgba(111,66,193,0)', height: '2px', width: '100%'}}/>
                                        <div className="d-flex align-items-center"
                                             style={{background: 'rgba(111,66,193,0)', height: '40%', width: '100%'}}>
                                            <input type="text" name="why" {...register('vacationWhy')} />
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
    )
}

export default VacationInsertComponent;