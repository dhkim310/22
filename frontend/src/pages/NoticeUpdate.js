import React, {useEffect, useRef, useState} from 'react';
import Editor from '../component/Editor';
import {useNavigate, useParams} from 'react-router-dom';
import {fetchNoticeDetail, fetchNoticeUpdate} from "../api/Notice";

function NoticeUpdate() {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const {id} = useParams();

    // 게시글 불러오기
    useEffect(() => {
        const fetchNoticeDetailData = async () => {
            try {
                const response = await fetchNoticeDetail(id);
                setSubject(response.subject);
                setContent(response.content);
            } catch (error) {
                console.error('게시글 내용을 불러오는 중 오류 발생:', error);
            }
        };
        fetchNoticeDetailData();
    }, [id]);

    const handlePost = async () => {
        if (subject.length < 2) {
            alert("제목을 입력해주세요");
        } else if (content.length < 2) {
            alert("내용을 입력해주세요");
        } else {
            const requestDto = {
                "subject": subject,
                "content": content,
            };

            const formData = new FormData();
            formData.append('requestDto', new Blob([JSON.stringify(requestDto)], {type: 'application/json'})); // JSON.stringify() 사용

            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                if (file.size > 10 * 1024 * 1024) { // 10MB
                    alert('파일 크기가 10MB를 초과합니다');
                    return;
                }
                formData.append('files', file);
            }

            try {
                // 이 부분을 수정하여 createBoard 함수 사용
                await fetchNoticeUpdate(id, formData);
                alert('수정 완료.')
                navigate('/notice');
            } catch (error) {
                alert('게시물이 업로드 실패.' + error.message)
            }
        }
    }
    const handleEditorChange = (newContent) => {
        setContent(newContent);
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files); // 파일 목록을 배열로 변환
        setSelectedFiles(files);
    };

    const openFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div>
            <div>
                <div style={{paddingTop: "50px", width: '100%', height: '100%'}}>
                    <div className="d-flex justify-content-center"
                         style={{width: '100%', height: '100%', background: 'transparent'}}>
                        <div className="d-flex justify-content-center"
                             style={{width: '10%', height: '100%', background: 'white'}}>
                            <button
                                className="btn btn-primary d-flex justify-content-center align-items-center"
                                data-bss-hover-animate="pulse"
                                type="button"
                                style={{
                                    width: '150px',
                                    height: '50px',
                                    color: 'black',
                                    background: 'rgba(13,110,253,0)',
                                    borderRadius: '6px',
                                    borderColor: 'black',
                                    marginTop: '24px'
                                }}
                                onClick={handlePost}>
                                수정 완료
                            </button>
                        </div>
                        <div style={{background: 'white', width: '90%', height: '100%'}}>
                            <div
                                style={{width: '100%', height: '7%', borderBottom: '2px ridge rgba(128,128,128,0.26)'}}>
                                <div className="d-flex align-items-end" style={{width: '100%', height: '50%'}}>
                                    <span style={{
                                        fontSize: '30px',
                                        fontWeight: 'bold',
                                        paddingTop: '0px',
                                        marginLeft: '41px'
                                    }}>공지사항 작성</span>
                                </div>
                                <div className="d-flex justify-content-start align-items-end"
                                     style={{width: '100%', height: '50%'}}/>
                            </div>
                            <div style={{height: '93%'}}>
                                <div className="d-flex align-items-center"
                                     style={{height: '7%', background: 'transparent'}}>
                                    <div className="d-flex align-items-center"
                                         style={{height: '34%', width: '100%', background: 'transparent'}}>
                                        <div style={{height: '80px'}}></div>
                                        <div className="d-flex align-items-center" style={{
                                            height: '100%',
                                            width: '70%',
                                            background: 'rgba(128,128,128,0.34)',
                                            borderRadius: '6px'
                                        }}>
                                            <span style={{
                                                paddingRight: '0px',
                                                paddingLeft: '12px'
                                            }}>{selectedFiles.length > 0 ? selectedFiles.map((file) => file.name).join(', ') : '파일을 선택하세요'}</span>
                                        </div>
                                        <div className="d-flex justify-content-start align-items-center"
                                             style={{height: '100%', width: '30%', background: 'transparent'}}>
                                            <button className="btn btn-primary" data-bss-hover-animate="pulse"
                                                    type="button"
                                                    onClick={openFileInput}
                                                    style={{
                                                        color: 'black',
                                                        background: 'white',
                                                        borderColor: 'black',
                                                        marginRight: '0px',
                                                        marginLeft: '6px'
                                                    }}>
                                                업로드
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center" style={{
                                    height: '2%',
                                    width: '70%',
                                    background: 'rgba(128, 128, 128, 0.34)',
                                    marginTop: '-20px'
                                }}>
                                    <input type="text" style={{width: '100%', paddingRight: '0px', paddingLeft: '10px'}}
                                           placeholder="제목을 입력하세요." value={subject}
                                           onChange={(e) => setSubject(e.target.value)}/>
                                </div>
                                <div className="d-flex justify-content-start align-items-xxl"
                                     style={{width: '74%', height: '50%'}}>
                                    <Editor content={content} onChange={handleEditorChange}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <input type="file" ref={fileInputRef} style={{display: 'none'}} onChange={handleFileChange} multiple/>
        </div>
    );
}

export default NoticeUpdate;
