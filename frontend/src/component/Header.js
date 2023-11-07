import React, { useEffect, useState, useRef } from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css';
import { useNavigate } from 'react-router-dom';
import Alarm from '../component/Alarm';
import { removeCookieToken } from '../storage/Cookie';

function Header() {
  const url_b = window.location.pathname.startsWith('/login');
  const url_c = window.location.pathname.startsWith('/message');

  const navigate = useNavigate();
  const navigateToMain = () => {
    navigate('/main');
  };
  const navigateToSchedule = () => {
    navigate('/schedule');
  };
  const navigateToList = () => {
    navigate('/notice');
  };
  const navigateToBoard = () => {
    navigate('/board');
  };
  const navigateToHrm = () => {
    navigate('/hrm');
  };
  const navigateToApprovalList = () => {
    navigate('/approval-list');
  };
  const navigateToEmpList = () => {
    navigate('/salary');
  };
  const navigateToMovieList = () => {
    navigate('/movie');
  };
  const navigateToMemberList = () => {
    navigate('/member');
  };
  const navigateToCommute = () => {
    navigate('/department-hr');
  };
  const navigateToServiceMovieList = () => {
      navigate('/serviceMovie');
  };

  const logout = () => {
    removeCookieToken();
    window.location.reload();
  };

  const navigateToMessageList = () => {
    const width = 800;
    const height = 500;
    const left = window.innerWidth / 2 - width / 2;
    window.open('/message', '_blank', `width=${width},height=${height},left=${left}`);
  };

  const [isMobile, setIsMobile] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownVisible1, setDropdownVisible1] = useState(false);
  const [dropdownVisible2, setDropdownVisible2] = useState(false);

  const dropdownRef = useRef(null); // Ref for the main dropdown
  const dropdownRef1 = useRef(null); // Ref for the first sub-dropdown
  const dropdownRef2 = useRef(null); // Ref for the first sub-dropdown

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleDropdown1 = () => {
    setDropdownVisible1(!dropdownVisible1);
  };

  const toggleDropdown2 = () => {
    setDropdownVisible2(!dropdownVisible2);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) {
        setDropdownVisible1(false);
      }
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
         setDropdownVisible2(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const getWidth = () => {
      return window.innerWidth;
    };

    setIsMobile(getWidth() < 768);

    const elements = document.querySelectorAll('[data-bss-hover-animate]');
    elements.forEach((element) => {
      element.addEventListener('mouseenter', () => {
        element.classList.add('animated', element.dataset.bssHoverAnimate);
      });
      element.addEventListener('mouseleave', () => {
        element.classList.remove('animated', element.dataset.bssHoverAnimate);
      });
    });
  }, []);

  return (
    url_b || url_c ? null : (
      <div>
        <Alarm />
        <div
          style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 100,
            background: '#000000',
          }}
        >
          <div>
            <div
              className="d-flex align-items-lg-center justify-content-start"
              style={{ width: 'auto', height: '50px', background: '#000000' }}
            >
              <button
                className="btn btn-primary"
                data-bss-hover-animate="pulse"
                type="button"
                onClick={navigateToMain}
                style={{
                  background: 'url("img/logo.png") center / contain no-repeat rgba(128,128,128,0)',
                  borderRadius: '0px',
                  borderStyle: 'none',
                  height: '100%',
                  width: '25%',
                }}
              ></button>
              <div style={{ height: 'auto', width: '400px' }} />
              <div
                className="d-lg-flex justify-content-lg-start justify-content-start"
                style={{ height: 'auto', width: '100%' }}
              >
                <div
                  className="btn-group d-lg-flex justify-content-lg-center"
                  role="group"
                  style={{
                    height: 'auto',
                    width: 'auto',
                    fontSize: '14px',
                    maxHeight: 'none',
                    maxWidth: 'none',
                  }}
                >
                  <button
                    className="btn btn-primary text-nowrap"
                    data-bss-hover-animate="pulse"
                    type="button"
                    onClick={navigateToMemberList}
                    style={{ borderStyle: 'none', background: 'rgba(0,0,0,0)' }}
                  >
                    회원관리
                  </button>
                  <button
                    className="btn btn-primary text-nowrap"
                    data-bss-hover-animate="pulse"
                    type="button"
                    onClick={navigateToSchedule}
                    style={{ borderStyle: 'none', background: 'rgba(0,0,0,0)' }}
                  >
                    일정
                  </button>
                  <div ref={dropdownRef1} className="dropdown" style={{ position: 'relative' }}>
                    <button
                      className="btn btn-primary text-nowrap dropdown-toggle"
                      data-bs-toggle="dropdown"
                      data-bss-hover-animate="pulse"
                      aria-expanded={dropdownVisible1}
                      onClick={toggleDropdown1}
                      style={{ borderStyle: 'none', background: 'rgba(0,0,0,0)' }}
                    >
                      게시판
                    </button>
                    <ul className={`dropdown-menu ${dropdownVisible1 ? 'show' : ''}`}>
                      <li>
                        <button
                          className="btn btn-primary text-nowrap"
                          data-bss-hover-animate="pulse"
                          type="button"
                          onClick={navigateToList}
                          style={{
                            borderStyle: 'none',
                            background: 'rgba(0,0,0,0)',
                            color: 'black',
                          }}
                        >
                          공지사항
                        </button>
                      </li>
                      <li>
                        <button
                          className="btn btn-primary text-nowrap"
                          data-bss-hover-animate="pulse"
                          type="button"
                          onClick={navigateToBoard}
                          style={{
                            borderStyle: 'none',
                            background: 'rgba(0,0,0,0)',
                            color: 'black',
                          }}
                        >
                          사내게시판
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div ref={dropdownRef} className="dropdown" style={{ position: 'relative' }}>
                    <button
                      className="btn btn-primary text-nowrap dropdown-toggle"
                      data-bs-toggle="dropdown"
                      data-bss-hover-animate="pulse"
                      aria-expanded={dropdownVisible}
                      onClick={toggleDropdown}
                      style={{ borderStyle: 'none', background: 'rgba(0,0,0,0)' }}
                    >
                      통합관리
                    </button>
                    <ul className={`dropdown-menu ${dropdownVisible ? 'show' : ''}`}>
                      <li>
                        <button
                          className="btn btn-primary text-nowrap"
                          data-bss-hover-animate="pulse"
                          type="button"
                          onClick={navigateToEmpList}
                          style={{
                            borderStyle: 'none',
                            background: 'rgba(0,0,0,0)',
                            color: 'black',
                          }}
                        >
                          급여
                        </button>
                      </li>
                      <li>
                        <button
                          className="btn btn-primary text-nowrap"
                          data-bss-hover-animate="pulse"
                          type="button"
                          onClick={navigateToHrm}
                          style={{
                            borderStyle: 'none',
                            background: 'rgba(0,0,0,0)',
                            color: 'black',
                          }}
                        >
                          인사
                        </button>
                      </li>
                      <li>
                        <button
                          className="btn btn-primary text-nowrap"
                          data-bss-hover-animate="pulse"
                          type="button"
                          onClick={navigateToCommute}
                          style={{
                            borderStyle: 'none',
                            background: 'rgba(0,0,0,0)',
                            color: 'black',
                          }}
                        >
                          근태
                        </button>
                      </li>
                    </ul>
                  </div>
                  <button
                    className="btn btn-primary text-nowrap"
                    data-bss-hover-animate="pulse"
                    type="button"
                    onClick={navigateToApprovalList}
                    style={{ borderStyle: 'none', background: 'rgba(0,0,0,0)' }}
                  >
                    결재
                  </button>

                  <div ref={dropdownRef2} className="dropdown" style={{ position: 'relative' }}>
                                      <button
                                        className="btn btn-primary text-nowrap dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        data-bss-hover-animate="pulse"
                                        aria-expanded={dropdownVisible2}
                                        onClick={toggleDropdown2}
                                        style={{ borderStyle: 'none', background: 'rgba(0,0,0,0)' }}
                                      >
                                        콘텐츠관리
                                      </button>
                                      <ul className={`dropdown-menu ${dropdownVisible2 ? 'show' : ''}`}>
                                        <li>
                                          <button
                                            className="btn btn-primary text-nowrap"
                                            data-bss-hover-animate="pulse"
                                            type="button"
                                            onClick={navigateToMovieList}
                                            style={{
                                              borderStyle: 'none',
                                              background: 'rgba(0,0,0,0)',
                                              color: 'black',
                                            }}
                                          >
                                            콘텐츠
                                          </button>
                                        </li>
                                        <li>
                                          <button
                                            className="btn btn-primary text-nowrap"
                                            data-bss-hover-animate="pulse"
                                            type="button"
                                            onClick={navigateToServiceMovieList}
                                            style={{
                                              borderStyle: 'none',
                                              background: 'rgba(0,0,0,0)',
                                              color: 'black',
                                            }}
                                          >
                                            서비스콘텐츠
                                          </button>
                                        </li>
                                      </ul>
                                    </div>

                </div>
              </div>
              <div className="d-lg-flex justify-content-lg-end" style={{ height: 'auto', width: '100%' }}>
                <button
                  className="btn btn-primary text-nowrap"
                  data-bss-hover-animate="pulse"
                  type="button"
                  onClick={navigateToMessageList}
                  style={{
                    borderStyle: 'none',
                    height: '35px',
                    background: 'url("img/message.png") center / contain no-repeat',
                    width: '30px',
                  }}
                ></button>
                <button
                  className="btn btn-primary text-nowrap"
                  data-bss-hover-animate="pulse"
                  type="button"
                  onClick={logout}
                  style={{ borderStyle: 'none', background: 'rgba(0,0,0,0)', width: '90px' }}
                >
                  로그아웃
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Header;
