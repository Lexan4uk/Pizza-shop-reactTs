import '@styles/pages/Auth.scss';
import { useState, useEffect } from 'react';
import { simplePost, apiTags as postTags } from "@api/simplePost"
import getSvg from '@images/svg';
import useAuth from '@scripts/custom_hooks/useAuth';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';



const LoginPass = ({ authData }) => {
    const [password, setPassword] = useState("")
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const {
        eye
    } = getSvg()
    const {
        initUser
    } = useAuth()
    const navigate = useNavigate();

    const handleStep = async () => {
        setLoading(true)
        setError(false)
        const completeAuthData = {
            phoneNumber: authData.phoneNumber,
            password: password
        };

        const responseToken = await simplePost(postTags.get_token, completeAuthData);
        if (responseToken) {
            setLoading(false)
            if (responseToken.token) {
                localStorage.setItem('token', responseToken.token);
                await initUser()
                navigate("/")
            }
            else {
                setError(true)
                setErrorMessage(responseToken.message)
            }
        }


    };

    return (
        <>
            <main className="auth">
                <div className="auth__content-holder block-normalizer">
                    <div className="auth__content f-column">
                        <h1 className="auth__article title-m">Введите пароль</h1>
                        <div className={`auth__input-holder f-row ${error && "auth__input-holder_error"}`}>
                            <input className="auth__input" placeholder="Введите пароль" type={`${showPass ? "text" : "password"}`} onChange={(e) => { setPassword(e.target.value) }} />
                            <button className={`auth__password-switcher simple-button ${showPass && "auth__password-switcher_active"}`} onClick={() => { setShowPass(!showPass) }}>{eye()}</button>
                        </div>
                        {error && <span className="auth__error-message text-s text-red">{errorMessage}</span>}
                    </div>
                </div>
            </main>
            <footer className="auth footer footer_props">
                <nav className="footer__nav">
                    <button className={`button-l footer__auth-btn ${(password === "" || loading) && "footer__auth-btn_inactive"}`} onClick={handleStep}>Продолжить</button>
                </nav>
            </footer>
        </>

    );
};
export default LoginPass;