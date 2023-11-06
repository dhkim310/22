import React, { useEffect, useState } from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMovieDetail } from '../api/movie';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';

function MovieDetail() {
  const [date1, setDate1] = useState(null);
  const { id } = useParams();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [hoverAnimationList, setHoverAnimationList] = useState([]);
  const [detail, setDetail] = useState({});

  const handleMovieClick = () => {
    navigate("/movie");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchMovieDetail(id);
        setDetail(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    const getWidth = () => {
      return window.innerWidth;
    };

    setIsMobile(getWidth() < 768);

    const elements = document.querySelectorAll('[data-bss-hover-animate]');
    setHoverAnimationList(elements);

    elements.forEach((element) => {
      element.addEventListener('mouseenter', () => {
        element.classList.add('animated', element.dataset.bssHoverAnimate);
      });
      element.addEventListener('mouseleave', () => {
        element.classList.remove('animated', element.dataset.bssHoverAnimate);
      });
    });
    fetchData();
  }, []);

  const imageStyle = {
    width: '220px', // 이미지 폭을 조정
    marginBottom: '3%',
    height: 'auto', // 이미지 높이를 자동으로 조정
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '5px', // 이미지 모서리를 둥글게
  };

  const contentStyle = {
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: '20px',
  };

    const buttonStyle = {
      background: 'white',
      height: '40px',
      width: '200px',
      border: '1px solid black',
      borderRadius: '5px',
      color: 'black',
      marginBottom: '4%',
      marginLeft: 'auto',
      marginRight: 'auto',
      position: 'fixed',

    };

  return (
    <div style={{ paddingTop: "80px" }}>
      <div>
        <div style={{ height: '70px', paddingTop: '0px', paddingRight: '0px', paddingLeft: '0px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '30px', textAlign: 'center', display: 'block' }}>
            영화 상세 정보
          </span>
        </div>
        <div className="d-flex justify-content-center" style={{ paddingTop: '20px' }}>
          <img
            style={imageStyle}
            src={detail.moviePosterPath}
            alt={detail.krName}
          />
        </div>
        <div style={contentStyle}>
          <div>한글 제목 : {detail.krName}</div><br></br>
          <div>원제 : {detail.ogName}</div><br></br>
          <div>줄거리 : {detail.movieOverView}</div><br></br>
          <div>
            <button
              className= "justify-content-center fixed-bottom"
              data-bss-hover-animate="pulse"
              type="submit"
              onClick={() => handleMovieClick()}
              style={buttonStyle}
            >
              영화 리스트로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
