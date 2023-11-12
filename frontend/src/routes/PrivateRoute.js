import {Navigate, Outlet} from 'react-router';
import {useLocation} from 'react-router-dom';
import {CheckToken} from '../auth/CheckTokenl';

export default function PrivateRoute() {
    const location = useLocation();
    const {isAuth} = CheckToken(location.key);

    if (isAuth === 'Failed') {
        return (
            <Navigate to="/login" state={{from: location}}/>
        )
    } else if (isAuth === 'Success') {
        return <Outlet/>;
    }
    return <Outlet/>
}