import { useRecoilState } from 'recoil';
import { isCityAddedState } from '@scripts/atoms/isCityAdded';
import { cityData as cityDataAtom} from '@scripts/atoms/cityData';
import { useNavigate } from 'react-router-dom';



function useCity() {
  const [isCityAdded, setIsCityAdded] = useRecoilState(isCityAddedState);
  const [cityData, setCityData] = useRecoilState(cityDataAtom)
  const navigate = useNavigate();

  const initCity = async () => {
    const city = localStorage.getItem('city');
    if (city) {
        setIsCityAdded(true)
        setCityData(JSON.parse(city))
    }
    else {
      navigate("/city")
    }
  }

  return {
    initCity,
    isCityAdded,
    cityData
  };
}

export default useCity;
