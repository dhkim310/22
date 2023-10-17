import React, {useState} from "react";
import Modal from "react-modal";
import {salaryInsert} from "../api/Salary";
import {useForm} from "react-hook-form";

function SalaryInsertComponent({isOpen, closeModal}) {
    const {register, formState: {errors}, handleSubmit} = useForm();
    Modal.setAppElement("#root");
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
    // const onValid = async (data) => {
    //     const {salaryBank, salaryAccountNumber, salaryBonus} = data;
    //     await salaryInsert({salaryBank, salaryAccountNumber, salaryBonus})
    //         .then((res) => {
    //             if (res.status === 200) {
    //                 closeModal();
    //                 window.location.reload();
    //             }
    //         })
    //         .catch((err) => {
    //             throw err;
    //         });
    // };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            appElement={document.getElementById("root")}
        >
            <div>
                <div className="d-xxl-flex justify-content-xxl-center align-items-xxl-center"
                     style={{width: '100%', height: '1000px', background: 'rgba(0,0,0,0.56'}}>
                    <div style={{
                        width: '30%',
                        height: '50%',
                        background: 'white',
                        borderRadius: '34px',
                        borderStyle: 'none'
                    }}>
                        <div className="d-xxl-flex justify-content-xxl-center"
                             style={{width: '100%', height: '15%', background: 'rgba(253,126,20,0)'}}>
                            <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                 style={{height: '100%', width: '19%', background: 'rgba(253,126,20,0)'}}>
                                <span style={{fontSize: '22px', fontWeight: 'bold'}}>급여등록</span>
                            </div>
                            <div className="d-xxl-flex justify-content-xxl-end align-items-xxl-center"
                                 style={{height: '100%', width: '69%'}}>
                                <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"
                                        style={{
                                            background: 'url("assets/img/icons8-취소하다-500.png") center / contain no-repeat',
                                            width: '38px',
                                            height: '37px',
                                            borderStyle: 'none'
                                        }}>
                                </button>
                            </div>
                        </div>
                        <div className="d-xxl-flex justify-content-xxl-center"
                             style={{width: '100%', height: '85%', background: 'rgba(253,126,20,0)'}}>
                            <div style={{width: '6%', height: '100%', background: 'rgba(253,126,20,0)'}}></div>
                            <div style={{height: '100%', width: '88%', background: 'rgba(253,126,20,0)'}}>
                                <form onSubmit={handleSubmit(onValid)}>
                                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                         style={{width: '100%', background: 'rgba(214,51,132,0)', height: '20%'}}>
                                        <div className="d-xxl-flex align-items-xxl-center"
                                             style={{background: 'rgba(13,110,253,0)', width: '35%', height: '100%'}}>
                                            <span style={{fontWeight: 'bold'}}>지급은행</span>
                                        </div>
                                        <input type="text" {...register('salaryBank')} style={{height: '30px', width: '240px'}}/>
                                    </div>
                                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                         style={{width: '100%', background: 'rgba(214,51,132,0)', height: '20%'}}>
                                        <div className="d-xxl-flex align-items-xxl-center"
                                             style={{background: 'rgba(13,110,253,0)', width: '35%', height: '100%'}}>
                                            <span style={{fontWeight: 'bold'}}>계좌번호</span>
                                        </div>
                                        <input type="text" {...register('salaryAccountNumber')} style={{height: '30px', width: '240px'}}/>
                                    </div>
                                    <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                         style={{width: '100%', background: 'rgba(214,51,132,0)', height: '20%'}}>
                                        <div className="d-xxl-flex align-items-xxl-center"
                                             style={{background: 'rgba(13,110,253,0)', width: '35%', height: '100%'}}>
                                            <span style={{fontWeight: 'bold'}}>성과금</span>
                                        </div>
                                        <input type="text" {...register('salaryBonus')}style={{height: '30px', width: '240px'}}/>
                                    </div>
                                    <div style={{width: '100%', height: '18%'}}></div>
                                    <div style={{height: '15%', width: '100%'}}>
                                        <div className="d-xxl-flex justify-content-xxl-end align-items-xxl-center"
                                             style={{width: '100%', height: '100%'}}>
                                            <button
                                                className="btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center"
                                                data-bss-hover-animate="pulse" type="submit"
                                                style={{
                                                    width: 'auto',
                                                    height: 'auto',
                                                    fontSize: '12px',
                                                    background: 'black',
                                                    borderStyle: 'none',
                                                    paddingRight: '20px',
                                                    paddingLeft: '20px'
                                                }}>작성
                                            </button>
                                            <div style={{height: '100%', width: '3%'}}></div>
                                            <button
                                                className="btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center"
                                                data-bss-hover-animate="pulse" type="button"
                                                onClick={closeModal} style={{
                                                width: 'auto',
                                                height: 'auto',
                                                fontSize: '12px',
                                                background: 'black',
                                                borderStyle: 'none',
                                                paddingRight: '20px',
                                                paddingLeft: '20px'
                                            }}>취소
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div style={{width: '6%', height: '100%', background: 'rgba(253,126,20,0)'}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default SalaryInsertComponent;