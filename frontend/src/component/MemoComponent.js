import React, { useState } from 'react';
import Modal from 'react-modal';
import { insertMemoApi } from "../api/Memo";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function MemoComponent({ isOpen, closeModal, memoContent }) {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const onValid = async ({ content }) => {
        await insertMemoApi({ content })
        .then((res) => {
            if (res.status === 200) {
                closeModal();
            }
        })
        .catch((err) => {
            console.log("err", err);
        })
    };

    const customModalStyles = {
        content: {
            width: '700px',
            height: '500px',
            backgroundColor: 'white',
            borderRadius: '34px',
            borderStyle: 'solid',
            top: '50%', // top 값을 픽셀 단위로 설정
            left: '50%', // left 값을 픽셀 단위로 설정
            transform: 'translate(-50%, -50%)', // 중앙 정렬을 위한 transform 속성 추가
        },
    };

    return (
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          style={customModalStyles}
          contentLabel="메모 모달"
        >

       <div>
            <div className="modal-content" style={{ width: '100%', height: '100%' }}>
                <div className="modal-header" style={{ marginBottom: '10px' }}>
                    <h5 className="modal-title">메모</h5>
                </div>
                <form onSubmit={ handleSubmit(onValid) }>
                <div className="modal-body">
                    <textarea name="content" style={{ width: '100%', height: '370px' }} defaultValue={memoContent} {...register('content')} />
                </div>
                <div className="modal-footer">
                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#000', border: '1px solid #000' }}>작성</button>
                </div>
                </form>
            </div>
        </div>
        </Modal>
    );
}

export default MemoComponent;
