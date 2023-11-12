import {Cookies} from 'react-cookie';

const cookies = new Cookies();

export const setRefreshToken = (refreshToken) => {
    const today = new Date();
    const expireDate = today.setDate(today.getDate() + 7);

    return cookies.set('Authorization', refreshToken, {sameSite: 'strict', path: "/", expires: new Date(expireDate)});
};

export const getCookieToken = () => {
    return cookies.get('Authorization');
};

export const removeCookieToken = () => {
    return cookies.remove('Authorization', {sameSite: 'strict', path: "/"})
}