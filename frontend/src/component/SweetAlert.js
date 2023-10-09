import React, { useEffect } from "react";
import Swal from "sweetalert2";

const Workspace = () => {
  useEffect(() => {
    Swal.fire({
      title: '야옹',
      width: 600,
      padding: '3em',
      color: '#716add',
      background: '#fff url(/images/trees.png)',
      backdrop: `
        rgba(0,0,0,0.63)
        url("img/nyan-cat-nyan.gif")
        left top
        no-repeat
      `
    });
  }, []); // 빈 배열을 넘겨줘서 페이지가 처음 로드될 때 한 번만 실행되도록 합니다.

};

export default Workspace;