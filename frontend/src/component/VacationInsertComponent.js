import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {salaryInsert} from "../api/Salary";
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";

function SalaryInsertComponent({isOpen, closeModal, empId}) {
    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm();

    const onValid = async ({salaryBank, salaryAccountNumber, salaryBonus}) => {
        await salaryInsert({
            empId: empId,
            salaryBank,
            salaryAccountNumber,
            salaryBonus,
        })
            .then((res) => {
                if (res.status === 200) {
                    closeModal();
                    alert('급여가 지급되었습니다.')
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log("err", err);
                alert(err);
            });
    };
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={{
                content: {
                    justifyContent: 'center',
                    width: '450px',
                    height: '450px',
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    border: 'none',
                    padding: '20px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                },
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
            }}
            contentLabel="급여등록 모달"
        >
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>급여등록</h2>
            </div>
            <p className="mb-3" style={{fontSize: '1.1rem', fontWeight: 'bold'}}>사원번호 : <span
                style={{fontSize: '0.9rem', color: 'black'}}>{empId}</span></p>

            <form onSubmit={handleSubmit(onValid)}>
                <div className="mb-3">
                    <label htmlFor="salaryBank" className="form-label">지급은행</label>
                    <select className="form-select" {...register('salaryBank')} className="form-control"
                            id="salaryBank">
                        <option value="신한은행">신한은행</option>
                        <option value="국민은행">국민은행</option>
                        <option value="우리은행">우리은행</option>
                        <option value="하나은행">하나은행</option>
                        <option value="SC제일은행">SC제일은행</option>
                        <option value="NH농협은행">NH농협은행</option>
                        <option value="카카오뱅크">카카오뱅크</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="salaryAccountNumber" className="form-label">계좌번호</label>
                    <input type="text" {...register('salaryAccountNumber')} className="form-control"
                           id="salaryAccountNumber"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="salaryBonus" className="form-label">성과금</label>
                    <input type="text" {...register('salaryBonus')} defaultValue="0" className="form-control"
                           id="salaryBonus"/>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" style={{backgroundColor: 'black'}} className="btn btn-primary me-2">작성
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>취소</button>
                </div>
            </form>
        </Modal>
    )
}

export default SalaryInsertComponent;