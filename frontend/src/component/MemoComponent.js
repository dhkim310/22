import React from 'react';
import Modal from 'react-modal';
import {insertMemoApi} from "../api/Memo";
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import Editor from "./Editor";

function MemoComponent({isOpen, closeModal, memoContent}) {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const [content, setContent] = React.useState(memoContent || ''); // Initialize content state with memoContent or an empty string

    const onValid = async (data) => {
        try {
            const res = await insertMemoApi(data);
            if (res.status === 200) {
                closeModal();
                window.location.reload();
            }
        } catch (err) {
            console.log("Error", err);
        }
    };

    const handleEditorChange = (value) => {
        // Update the content state with the new value from the Editor
        setContent(value);
    };

    const customModalStyles = {
        content: {
            width: '700px',
            height: '500px',
            backgroundColor: 'white',
            borderStyle: 'solid',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    Modal.setAppElement('#root');

    return (
        <div id="root">
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={customModalStyles}
                contentLabel="메모 모달"
            >
                <div>
                    <div className="modal-content" style={{width: '100%', height: '100%'}}>
                        <div className="modal-header" style={{marginBottom: '10px'}}>
                            <h5 className="modal-title">메모</h5>
                        </div>
                        <form onSubmit={handleSubmit(() => onValid({content}))}>
                            <div className="modal-body" style={{ width: '100%', height: '400px', overflow: 'auto' }}>
                                <Editor content={memoContent} onChange={handleEditorChange} />
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#000', border: '1px solid #000' }}>작성</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default MemoComponent;