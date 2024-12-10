import '@styles/pages/Auth.scss';
import { useState, useEffect } from 'react';
import LoginPass from '@components/auth_elements/LoginPass'
import PhoneEnter from '@components/auth_elements/PhoneEnter'
import { IAuthData, CAuthData} from '@myModels/pages/MAuth';


const Auth = () => {

    const [label, setLabel] = useState(1);
    const [authData, setAuthData] = useState<IAuthData>(new CAuthData())
    let content;
    switch (label) {
        case 1:
            content = <PhoneEnter setLabel={setLabel} setAuthData={setAuthData}/>;
            break;
        case 2:
            content = <LoginPass authData={authData}/>;
            break;
        default:
            content = <h1>Неизвестный тип</h1>;
            break;
    }

    return (
        <>
            {content}
        </>

    );
};
export default Auth;