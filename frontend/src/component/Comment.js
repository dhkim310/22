// Comment.js

import React from 'react';
import {FormatDate} from './FormatDate';

function Comment({comment, onDelete}) {
    const handleDeleteClick = () => {
        onDelete(comment.commentId);
    };

    return (
        <div>
            <div style={{
                display: "flex",
                alignItems: "center",
                marginTop: "2%",
                marginBottom: "1%",
                width: "100%",
                height: "3%",
                fontSize: "15px",
                justifyContent: "space-between",
                borderTop: "1px ridge rgba(125,125,125,0.32)",
            }}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <span style={{
                        marginTop: "1%",
                        marginRight: "2%",
                        fontSize: "16px",
                        whiteSpace: "nowrap"
                    }}>{comment.writer}</span>
                </div>
                <div style={{display: "flex", alignItems: "center"}}>
                    <span style={{
                        fontSize: "13px",
                        color: "rgb(128,128,128)",
                        whiteSpace: "nowrap",
                    }}>
                        {FormatDate(comment.createdDate)}
                    </span>
                    <button
                        onClick={handleDeleteClick}
                        style={{
                            marginLeft: "10px",
                            background: "rgba(13,110,253,0)",
                            border: "2px ridge black",
                            width: "auto",
                            height: "auto",
                            color: "black",
                        }}>X
                    </button>
                </div>
            </div>
            <div style={{
                fontSize: "15px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "95%",
                display: "-webkit-box",
                WebkitLineClamp: 3, // 표시할 줄 수
                WebkitBoxOrient: "vertical",
            }}>
                {comment.comment}
            </div>
        </div>
    );
}

export default Comment;