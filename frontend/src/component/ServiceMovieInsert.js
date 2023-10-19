import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {serviceMovieInsert} from "../api/movie";
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ServiceMovieInsert({ isOpen, closeModal, movieId }) {
    const {register, formState: {errors}, handleSubmit} = useForm();
    const {id} = useParams();

    const [paymentDateI, setPaymentDateI] = useState(null);
    const [startDateI, setStartDateI] = useState(null);
    const [endDateI, setEndDateI] = useState(null);

    useEffect(() => {
        console.log('movieId', movieId);
    }, [movieId]);

    const onValid = async ({ amount, paymentDate, paymentBank, accountNumber, startDate, endDate, producer }) => {
        await serviceMovieInsert(movieId, { amount, paymentDate:paymentDateI, paymentBank, accountNumber, startDate:startDateI, endDate:endDateI, producer })
            .then((res) => {
                if (res.status === 200) {
                    closeModal();
                    window.location.reload();
                }
            })
            .catch((err) => {
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
            contentLabel="서비스 등록 모달"
        >
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>서비스 등록</h2>
            </div>
            <h4>Id: {movieId}</h4>
            <form onSubmit={handleSubmit(onValid)}>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">판권금액</label>
                    <input type="text" {...register('amount')} className="form-control" id="amount" />
                </div>
                <div className="mb-3">
                    <label htmlFor="paymentDate" className="form-label">판권결제일</label>
                    <br></br>
                    <DatePicker
                        selected={paymentDateI}
                        onChange={date => setPaymentDateI(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="날짜를 선택하세요"
                        showYearDropdown
                        yearDropdownItemNumber={30}
                        scrollableYearDropdown
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="paymentBank" className="form-label">결제은행</label>
                    <input type="text" {...register('paymentBank')} defaultValue= "0" className="form-control" id="paymentBank" />
                </div>
                <div className="mb-3">
                    <label htmlFor="accountNumber" className="form-label">결제계좌</label>
                    <input type="text" {...register('accountNumber')} defaultValue= "0" className="form-control" id="accountNumber" />
                </div>
                <div className="mb-3">
                <label htmlFor="startDate" className="form-label">서비스 시작일</label>
                    <br></br>
                    <DatePicker
                        selected={startDateI}
                        onChange={date => setStartDateI(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="날짜를 선택하세요"
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
                        placeholderText="날짜를 선택하세요"
                        showYearDropdown
                        yearDropdownItemNumber={30}
                        scrollableYearDropdown
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="producer" className="form-label">제작사</label>
                    <input type="text" {...register('producer')} defaultValue= "0" className="form-control" id="producer" />
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" style={{backgroundColor: 'black'}} className="btn btn-primary me-2">등록</button>
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>취소</button>
                </div>
            </form>
        </Modal>
    )
}

export default ServiceMovieInsert;