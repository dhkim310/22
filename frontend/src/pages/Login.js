import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import {loginApi} from '../api/Login';
import {useCookies} from 'react-cookie';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/animate.min.css'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies(['Authorization']);
    const {register, formState: {errors}, handleSubmit} = useForm();
    const [isMobile, setIsMobile] = useState(false);
    const [hoverAnimationList, setHoverAnimationList] = useState([]);

    const onValid = async ({empEmail, password}) => {
        await loginApi({empEmail, password})
            .then((res) => {
                if (res.status === 200) {
//                setCookie('Authorization', 'Bearer ' + res.data.token)
                    localStorage.setItem('empId', res.data.empId);
                    alert('로그인 성공');
                    return navigate('/main')
                }
                console.log(res);
            })
            .catch((err) => {
                alert("아이디, 비밀번호를 확인해주세요");
            })
    };

    useEffect(() => {
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
    }, []);

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center"
                 style={{
                     height: '800px',
                     background: 'url("img/loginpaper.png") center / contain no-repeat, white',
                     marginTop: '100px',
                 }}
            >
                <div style={{width: '350px', height: '450px', background: 'rgba(0,0,0,0.0)'}}>
                    <div className="d-flex justify-content-center align-items-end"
                         style={{height: '100px'}}>
                    </div>
                    <div className="justify-content-center align-items-center" style={{height: '350px'}}>
                        <div className="d-flex justify-content-center" style={{width: '100%', height: '70%'}}>
                            <form className="text-start" id="form-login" onSubmit={handleSubmit(onValid)}>
                                <div className="mb-3"><label className="form-label" id="lbl-usuario"
                                                             htmlFor="txt-usuario"
                                                             style={{color: 'black'}}>Email</label><input
                                    className="form-control" type="text" id="txt-usuario" {...register('empEmail')}
                                    style={{width: '245px'}}/></div>
                                <div className="mb-3"><label className="form-label" id="lbl-password"
                                                             htmlFor="txt-password"
                                                             style={{color: 'black'}}>Password</label><input
                                    className="form-control" type="password" id="txt-password" {...register('password')}
                                    style={{width: '245px'}}/></div>
                                <div className="d-flex justify-content-center"
                                     style={{width: '100%', height: '30%'}}>
                                    <button className="btn btn-primary" data-bss-hover-animate="pulse" type="submit"
                                            style={{
                                                width: '245px',
                                                height: '36px',
                                                background: 'black',
                                                borderRadius: '6px',
                                                borderStyle: 'ridge',
                                                borderColor: 'black'
                                            }}>Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default Login;