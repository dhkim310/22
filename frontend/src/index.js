import React, {useEffect} from 'react';
import App from './App';
import './index.css';
import store from './store';
import {Provider} from 'react-redux';
import {CookiesProvider, useCookies} from 'react-cookie';
import {createRoot} from 'react-dom/client';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const RootComponent = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['Authorization']);

    useEffect(() => {

        const expirationTime = 3600000;
        const timer = setTimeout(() => {
            removeCookie('Authorization');
            localStorage.removeItem('empId');
        }, expirationTime);

        return () => {
            clearTimeout(timer);
        };
    }, [removeCookie]);

    return (
        <CookiesProvider>
            <Provider store={store}>
                <App/>
            </Provider>
        </CookiesProvider>
    );
};

root.render(<RootComponent/>);