import { useRecoilState } from 'recoil';
import { isAuthorisedState } from '@scripts/atoms/authState';
import { login } from "@api/login"
import { accDataAtom } from '@scripts/atoms/accDataAtom'
import { isFooterLoaded as footerAtom } from '@scripts/atoms/isFooterLoaded';


function useAuth() {
  const [isAuthorised, setIsAuthorised] = useRecoilState(isAuthorisedState);
  const [accData, setAccData] = useRecoilState(accDataAtom)
  const [isFooterLoaded, setIsFooterLoaded] = useRecoilState(footerAtom)



  const initUser = async () => {
    const token = localStorage.getItem('token');
    if (!isAuthorised && token) {
      const responseLogin = await login();
      if (responseLogin) {
        setIsAuthorised(true);
        setAccData(responseLogin.item);
      }
    }
    else {
      setIsAuthorised(false)
    }
    setIsFooterLoaded(true)
  }

  return {
    isAuthorised,
    initUser,
    accData,
    isFooterLoaded
  };
}

export default useAuth;
