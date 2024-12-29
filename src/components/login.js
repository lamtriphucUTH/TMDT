import { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { handleLoginRedux } from '../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);

    const isLoading = useSelector(state => state.user.isLoading);
    const account = useSelector(state => state.user.account);



    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            // loginContext(email);
            navigate("/");
        }
    }, [])

    const handlePressEnter = (event) => {
        if (event && event.key === 'Enter') {
            handleLogin();
        }
    }

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Invalid email or password!");
            return;
        }

        dispatch(handleLoginRedux(email, password));
    }


    const handleGoBack = () => {
        navigate("/");
    }


    useEffect(() => {

        if (account && account.auth === true) {
            navigate("/");
        }
    }, [account]);
    return (
        <>
            <div className="login-container col-12 col-sm-4" >
                <div className="title">Login</div>
                <div className="text"> Email or Usersname  (eve.holt@reqres.in) </div>
                <input

                    type="text"
                    placeholder="Email or Username..."
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <div className='input-2'>
                    <input
                        type={isShowPassword === true ? "text" : "password"}
                        placeholder="Password..."
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event) => handlePressEnter(event)}
                    />
                    <i className={isShowPassword === true ? "fas fa-eye" : "fas fa-eye-slash"}
                        onClick={() => setIsShowPassword(!isShowPassword)}
                    ></i>
                </div>

                <button
                    className={email && password ? "active" : ""}
                    disabled={email && password ? false : true}
                    onClick={() => handleLogin()}
                >
                    {isLoading && isLoading === true && <i className="fas fa-sync fa-spin"></i>}
                    &nbsp;Login
                </button>
                <div className="back">
                    <i className="fas fa-chevron-left"></i>
                    <span onClick={() => handleGoBack("/")}> &nbsp; Go back</span>
                </div>
            </div >

        </>
    );
}

export default Login;