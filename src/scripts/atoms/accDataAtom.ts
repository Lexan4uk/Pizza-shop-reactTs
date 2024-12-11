import { atom } from 'recoil';
import { ILoginData } from '@myModels/api/MLogin';

export const accDataAtom = atom<ILoginData>({
    key: 'accDataKey',
    default: {
        birth_day: "",
        email: "",
        first_name: "",
        id: "",
        phone_number: "",
        wallets: [{
            id: 0,
            name: "",
            balance: 0,

        }]
    }
});