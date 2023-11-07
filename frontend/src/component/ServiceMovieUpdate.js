import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {updateServiceMovieApi, serviceMovieDetailApi} from "../api/serviceMovie";
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ServiceMovieUpdate({isOpen, closeModal, movieId}) {
    const {register, formState: {errors}, handleSubmit} = useForm();
    //useParams(movieId);

    const [amountI, setAmountI] = useState(null);
    const [paymentDateI, setPaymentDateI] = useState(null);
    const [startDateI, setStartDateI] = useState(null);
    const [endDateI, setEndDateI] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [detail, setDetail] = useState({});
    const [date1, setDate1] = useState(null);


    const [amount, setAmount] = useState("");
    const onChange = (e) => {
        setAmount(e.target.value);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await serviceMovieDetailApi(movieId);
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
    }, [movieId]);

    useEffect(() => {
        //console.log('movieId', movieId);
    }, [movieId]);

    const onValid = async ({amount, paymentDate, paymentBank, accountNumber, startDate, endDate, producer}) => {
        await updateServiceMovieApi(movieId, {
            amount,
            paymentDate: paymentDateI,
            paymentBank,
            accountNumber,
            startDate: startDateI,
            endDate: endDateI,
            producer
        })
            .then((res) => {
                if (res.status === 200) {
                    closeModal();
                    window.location.reload();
                    alert("수정 완료");
                }
            })
            .catch((err) => {
                alert("데이터를 모두 입력하세요.");
                console.log('err', err);
                //alert('paymentDate : ' + paymentDate + 'amount : ' + amount);
            });
    };


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={{
                content: {
                    justifyContent: 'center',
                    width: '600px',
                    height: '600px',
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    border: 'none',
                    padding: '20px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)'
                },
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
            }}
            contentLabel="서비스 수정 모달"
        >
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>서비스 수정</h2>
            </div>
            <h4>Id: {movieId}</h4>
            <form onSubmit={handleSubmit(onValid)}>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">판권금액</label>
                    <input type="text" {...register('amount')} defaultValue={detail.amount} className="form-control"
                           id="amount" name="amount"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="paymentDate" className="form-label">판권결제일</label>
                    <br></br>
                    <DatePicker
                        selected={paymentDateI}
                        onChange={date => setPaymentDateI(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText={detail.paymentDate}
                        showYearDropdown
                        yearDropdownItemNumber={30}
                        scrollableYearDropdown
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="paymentBank" className="form-label">결제은행</label>
                    <input type="text" {...register('paymentBank')} defaultValue={detail.paymentBank}
                           className="form-control" id="paymentBank"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="accountNumber" className="form-label">결제계좌</label>
                    <input type="text" {...register('accountNumber')} defaultValue={detail.accountNumber}
                           className="form-control" id="accountNumber"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">서비스 시작일</label>
                    <br></br>
                    <DatePicker
                        selected={startDateI}
                        onChange={date => setStartDateI(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText={detail.startDate}
                        showYearDropdown
                        yearDropdownItemNumber={30}
                        scrollableYearDropdown
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="endDate" className="form-label">서비스 종료일</label>
                    <br></br>
                    <DatePicker
                        selected={endDateI}
                        onChange={date => setEndDateI(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText={detail.endDate}
                        showYearDropdown
                        yearDropdownItemNumber={30}
                        scrollableYearDropdown
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="producer" className="form-label">제작사</label>
                    <input type="text" {...register('producer')} defaultValue={detail.producer} className="form-control"
                           id="producer"/>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" style={{backgroundColor: 'black'}} className="btn btn-primary me-2">수정
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>취소</button>
                </div>
            </form>
        </Modal>
    )
}

export default ServiceMovieUpdate;