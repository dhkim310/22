import React, { useState } from 'react';
import Modal from 'react-modal';

function MemoComponent({ isOpen, closeModal, memoContent }) {

    const customModalStyles = {
        content: {
            width: '700px',
            height: '500px',
            backgroundColor: 'white',
            borderRadius: '34px',
            borderStyle: 'solid',
            top: window.innerHeight / 2 - 350,
            left: window.innerWidth / 2 - 350,
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
                <div className="modal-body">
                    <textarea style={{ width: '100%', height: '370px' }} defaultValue={memoContent} />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" style={{ backgroundColor: '#000', border: '1px solid #000' }}>작성</button>
                </div>
            </div>
        </div>
        </Modal>
    );
}

export default MemoComponent;
