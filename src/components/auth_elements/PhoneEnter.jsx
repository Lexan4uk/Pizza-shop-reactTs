import '@styles/pages/Auth.scss';
import { useState, useEffect } from 'react';
import { InputMask } from '@react-input/mask';
import { simplePost, apiTags } from "@api/simplePost"


const PhoneEnter = ({ setLabel, setAuthData }) => {
    const [rawPhone, setRawPhone] = useState('');
    const [normalizedPhone, setNormalizedPhone] = useState('');
    const [isPhoneComplete, setIsPhoneComplete] = useState(false)
    const [isQuerry, setIsQuerry] = useState(false)

    useEffect(() => {
        const normalizedPhoneBuffer = rawPhone.replace(/[^+\d]/g, '');
        
        if (normalizedPhoneBuffer.length === 12) {
            setIsPhoneComplete(true);
            setNormalizedPhone(normalizedPhoneBuffer)
        } else {
            setIsPhoneComplete(false);
        }
    }, [rawPhone]);

    const handleStep = async () => {
        setIsQuerry(true)
        const data = {
            "phone": `${normalizedPhone}`
        };
        
        const response = await simplePost(apiTags.phone_enter, data);
        setIsQuerry(false)
        switch (response.code) {
            case 201:
                setAuthData({
                    "phoneNumber": `${normalizedPhone}`
                })
                setLabel(2)
                break
            case 200:
                console.log("Регистрация")
                break
            case 300:
                console.log(response.message)
            default:
                console.log(response.code)
                break
        }
    };

    return (
        <>
            <main className="auth">
                <div className="auth__content-holder block-normalizer">
                    <div className="auth__content f-column">
                        <h1 className="auth__article title-m">Авторизация</h1>
                        <span className="auth__top-text text-l">Для отслеживания и управления заказами укажите свой номер</span>
                        <div className="auth__input-holder f-row">
                            <InputMask className="auth__input" mask='+7 (___) ___-__-__' replacement={{ _: /\d/ }} showMask type='tel' onChange={(e) => { setRawPhone(e.target.value)}}/>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="auth footer footer_props">
                <nav className="footer__nav">
                    <button className={`button-l footer__auth-btn ${(!isPhoneComplete || isQuerry) && "footer__auth-btn_inactive"}`} onClick={handleStep}>Продолжить</button>
                </nav>
            </footer>
        </>

    );
};
export default PhoneEnter;