import { atom } from 'recoil';
import { ICityDataAtom } from '@myModels/custom_hooks/MUseCity';

export const cityData = atom<ICityDataAtom>({
  key: 'cityData',
  default: {
    cityId: "",
    cityName: "",
    classifier_id: "",
  },
});