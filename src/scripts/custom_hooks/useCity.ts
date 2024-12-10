import { useRecoilState } from 'recoil';
import { isCityAddedState } from '@scripts/atoms/isCityAdded';
import { cityData as cityDataAtom} from '@scripts/atoms/cityData';
import { useNavigate } from 'react-router-dom';
import { ICityDataAtom } from '@myModels/custom_hooks/MUseCity';


function useCity() {
  const [isCityAdded, setIsCityAdded] = useRecoilState(isCityAddedState);
  const [cityData, setCityData] = useRecoilState(cityDataAtom)
  const navigate = useNavigate();

  const initCity = async () => {
    const city = localStorage.getItem('city');
    if (city) {
      try {
        const parsedCity: ICityDataAtom = JSON.parse(city);

        if (parsedCity.cityId && parsedCity.cityName && parsedCity.classifier_id) {
          setIsCityAdded(true);
          setCityData(parsedCity);
        } else {
          console.error("City data structure is invalid:", parsedCity);
          navigate("/city");
        }
      } catch (error) {
        console.error("Failed to parse city data from localStorage:", error);
        navigate("/city");
      }
    } else {
      navigate("/city");
    }
  };


  return {
    initCity,
    isCityAdded,
    cityData
  };
}

export default useCity;
