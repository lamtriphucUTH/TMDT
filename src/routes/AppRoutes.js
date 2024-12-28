import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import TableUsers from '../components/TableUsers';
import Login from '../components/login';
//import Register from './components/register';
const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<TableUsers />} />
                <Route path="/login" element={<Login />} />
                {/* <Route path="/register" element={<Register />} /> */}

            </Routes>
        </>
    )
}

export default AppRoutes;