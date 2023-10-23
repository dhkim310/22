import React, {useEffect, useState} from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css';
import {useLocation, useNavigate} from 'react-router-dom';
import {fetchMovieList, insertMovieApi} from '../api/movie';
import PaginationButtons from '../component/PaginationButton';

function MovieList() {
    const [movieList, setMovieList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 (1부터 시작)
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation(); // 현재 위치 가져오기
    const isMoviePage = location.pathname === '/movie'; // "/movie" 경로에 있는지 확인

    const [searchCode, setSearchCode] = useState('');


    const handleSearchChange = (event) => {
        setSearchCode(event.target.value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        // 데이터를 가져오는 비동기 함수를 정의
        const fetchData = async () => {
            try {
                const data = await fetchMovieList(currentPage - 1);
                setMovieList(data.list.content);
                setTotalPages(data.totalPageCount);
            } catch (error) {
                console.error('데이터 가져오기 오류:', error);
            }
        };

        fetchData(); // 데이터 가져오는 함수 호출
    }, [currentPage]);

    const navigate = useNavigate();

    const newMovie = async () => {
        await insertMovieApi()
            .then((res) => {
                if (res.status === 200) {
                    window.location.reload();
                }
            })
            .catch((err) => {
                alert('에러');
            })
    };

    // 클릭 이벤트 핸들러 추가

    const handleMovieClick = () => {
        navigate("/movie");
    };

    const handleServiceMovieClick = () => {
        navigate("/serviceMovie");
    };

    const handleItemClick = (id) => {
        navigate(`/movie/${id}`);
    };


    useEffect(() => {
        const getWidth = () => {
            return window.innerWidth;
        };

        setIsMobile(getWidth() < 768);
    }, []);

    return (
        <div>
            <div style={{paddingTop: "50px", width: '100%', height: '100%'}}>
                <div className="d-xxl-flex justify-content-xxl-center"
                     style={{width: '100%', height: '100%', background: 'transparent'}}>
                    <div className="d-xxl-flex justify-content-xxl-center"
                         style={{width: '10%', height: '100%', background: 'white'}}>
                        <button
                            className="btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center"
                            data-bss-hover-animate="pulse" type="button" onClick={newMovie} style={{
                            width: '150px',
                            height: '50px',
                            color: 'black',
                            background: 'rgba(13,110,253,0)',
                            borderRadius: '6px',
                            borderColor: 'black',
                            marginTop: '24px'
                        }}>컨텐츠 업데이트
                        </button>
                    </div>

                    <div style={{background: 'white', width: '90%', height: '100%'}}>
                        <div
                            style={{width: '100%', height: '7%', borderBottom: '2px ridge rgba(128,128,128,0.26)'}}>
                            <div className="d-xxl-flex align-items-xxl-end" style={{width: '100%', height: '50%'}}>
                                <span style={{
                                    fontSize: '30px',
                                    fontWeight: 'bold',
                                    paddingTop: '0px',
                                    marginLeft: '41px'
                                }}>컨텐츠 목록</span>

                            </div>
                            <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-end"
                                 style={{width: '100%', height: '50%'}}>
                                <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                     style={{width: '30%', height: '100%'}}>
                                    <button
                                        className={`btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center ${isMoviePage ? 'active' : ''}`}
                                        data-bss-hover-animate="pulse"
                                        type="button"
                                        onClick={handleMovieClick}
                                        style={{
                                            width: '150px',
                                            height: '30px',
                                            color: isMoviePage ? 'black' : 'darkgray',
                                            background: 'rgba(255, 255, 255, 1)',
                                            borderRadius: '0px',
                                            border: '0px none black',
                                        }}
                                    >
                                        컨텐츠
                                    </button>
                                    <button
                                        className={`btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center ${isMoviePage ? 'active' : ''}`}
                                        data-bss-hover-animate="pulse"
                                        type="button"
                                        onClick={handleServiceMovieClick}
                                        style={{
                                            width: '150px',
                                            height: '30px',
                                            color: isMoviePage ? 'darkgray' : 'black',
                                            background: 'rgba(255, 255, 255, 1)',
                                            borderRadius: '0px',
                                            borderStyle: 'none',
                                            borderColor: 'black',
                                            borderBottomStyle: 'none',
                                        }}
                                    >
                                        서비스컨텐츠
                                    </button>
                                </div>
                                <div className="d-xxl-flex align-items-xxl-center"
                                     style={{height: '30%', width: '30%', background: 'rgba(214,51,132,0)'}}>
                                    <input type="search" placeholder="코드 검색" onChange={handleSearchChange}
                                           style={{height: '81%', width: '85%'}}/>
                                    <button className="btn btn-primary" data-bss-hover-animate="pulse" type="button"
                                            style={{
                                                background: 'url("assets/img/icons8-수색-144.png") center / contain no-repeat',
                                                height: '100%',
                                                width: '15%',
                                                borderColor: 'rgba(255,255,255,0)'
                                            }}/>
                                </div>

                            </div>
                            <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-end"
                                 style={{width: '100%', height: '50%'}}/>
                        </div>
                        <div style={{width: '100%', height: '100%'}}>
                            <div className="list-group d-xxl-flex" style={{
                                marginLeft: '0px',
                                marginRight: '0px',
                                maxHeight: '1000px',
                                paddingLeft: '40px'
                            }}>
                                <div
                                    className="list-group-item list-group-item-action d-flex flex-row align-items-start"
                                    style={{
                                        height: '30px',
                                        marginBottom: '0px',
                                        width: '80%',
                                        paddingTop: '0px',
                                        paddingRight: '0px',
                                        paddingBottom: '0px',
                                        paddingLeft: '0px',
                                        borderTopRightRadius: '0px',
                                        borderTopLeftRadius: '0px',
                                        borderStyle: 'solid',
                                        borderColor: 'black',
                                        borderRightStyle: 'none',
                                        borderLeftStyle: 'none',
                                        marginTop: '10px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center', // 추가: 세로 중앙 정렬
                                        textAlign: "center"
                                    }}>
                                    <div style={{width: '10%', fontWeight: 'bold'}}>영화 코드</div>
                                    <div style={{width: '30%', fontWeight: 'bold'}}>영화명(한글)</div>
                                    <div style={{width: '30%', fontWeight: 'bold'}}>영화명(원제)</div>
                                    <div style={{width: '35%', fontWeight: 'bold'}}>개봉일</div>
                                    <div style={{width: '10%', fontWeight: 'bold'}}>평점</div>
                                </div>

                                <div>
                                    {movieList.map((item) => (
                                        <button
                                            className="list-group-item list-group-item-action d-flex flex-row align-items-start"
                                            onClick={() => handleItemClick(item.id)} // 클릭 시 상세보기 페이지로 이동
                                            //onClick={openModal}
                                            style={{
                                                height: '50px',
                                                marginBottom: '2px',
                                                marginTop: '30px',
                                                width: '80%',
                                                paddingTop: '0px',
                                                paddingRight: '0px',
                                                paddingBottom: '0px',
                                                paddingLeft: '0px',
                                                borderTopRightRadius: '0px',
                                                borderTopLeftRadius: '0px',
                                                borderStyle: 'none',
                                                borderColor: 'black',
                                                borderRightStyle: 'none',
                                                borderLeftStyle: 'none',
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            }}
                                            key={item.id}
                                        >
                                            <div style={{
                                                width: '10%',
                                                fontWeight: 'bold',
                                                textAlign: 'center'
                                            }}>{item.id}</div>
                                            <div style={{
                                                width: '30%',
                                                fontWeight: 'bold',
                                                textAlign: 'center'
                                            }}>{item.krName}</div>
                                            <div style={{
                                                width: '30%',
                                                fontWeight: 'bold',
                                                textAlign: 'center'
                                            }}>{item.ogName}</div>
                                            <div style={{
                                                width: '35%',
                                                fontWeight: 'bold',
                                                textAlign: 'center'
                                            }}>{item.releaseDate}</div>
                                            <div style={{
                                                width: '10%',
                                                fontWeight: 'bold',
                                                textAlign: 'center'
                                            }}>{item.rating}</div>
                                        </button>
                                    ))}
                                    <div className="d-xxl-flex justify-content-xxl-center" style={{
                                        width: '100%',
                                        height: '45px',
                                        borderLeft: '2px ridge rgba(128,128,128,0.32)'
                                    }}>
                                        <div className="d-xxl-flex justify-content-xxl-end align-items-xxl-center"
                                             style={{width: '47.5%'}}>
                                            <button className="btn btn-primary" data-bss-hover-animate="pulse"
                                                    type="button" style={{
                                                background: 'black',
                                                width: '90px',
                                                borderStyle: 'none',
                                                borderLeftStyle: 'none'
                                            }}>추가
                                            </button>
                                        </div>
                                        <div style={{width: '5%'}}/>
                                        <div className="d-xxl-flex justify-content-xxl-start align-items-xxl-center"
                                             style={{width: '47.5%'}}>
                                            <button className="btn btn-primary" data-bss-hover-animate="pulse"
                                                    type="button"
                                                    style={{background: 'black', borderStyle: 'none'}}>상세보기
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{width: '100%', height: '50px'}}/>

            <div className="d-xxl-flex justify-content-xxl-start"
                 style={{background: 'rgba(111,66,193,0)', height: '109px'}}>
                <div style={{width: '42%', height: '100%'}}/>

                { /* PaginationButtons 컴포넌트 사용 */}
                <PaginationButtons
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default MovieList;
