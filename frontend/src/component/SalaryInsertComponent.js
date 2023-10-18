import React, {useState} from "react";
import Modal from "react-modal";
import {salaryInsert} from "../api/Salary";
import {useForm} from "react-hook-form";

function SalaryInsertComponent({isOpen, closeModal}) {
    const {register, formState: {errors}, handleSubmit} = useForm();
    const onValid = async ({salaryBank, salaryAccountNumber, salaryBonus}) => {
        await salaryInsert({salaryBank, salaryAccountNumber, salaryBonus})
            .then((res) => {
                if (res.status === 200){
                    closeModal();
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log('err', err);
            })
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={{
                content: {
                    justifyContent: 'center',
                    width: '450px',
                    height: '550px',
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
                <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <form onSubmit={handleSubmit(onValid)}>
                <div className="mb-3">
                    <label htmlFor="salaryBank" className="form-label">지급은행</label>
                    <input type="text" {...register('salaryBank')} className="form-control" id="salaryBank" />
                </div>
                <div className="mb-3">
                    <label htmlFor="salaryAccountNumber" className="form-label">계좌번호</label>
                    <input type="text" {...register('salaryAccountNumber')} className="form-control" id="salaryAccountNumber" />
                </div>
                <div className="mb-3">
                    <label htmlFor="salaryBonus" className="form-label">성과금</label>
                    <input type="text" {...register('salaryBonus')} className="form-control" id="salaryBonus" />
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary me-2">작성</button>
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>취소</button>
                </div>
            </form>
        </Modal>
    )
}

export default SalaryInsertComponent;