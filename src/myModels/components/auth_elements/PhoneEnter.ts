import { IAuthData } from "@myModels/pages/MAuth";

export interface IPhoneEnter {
    setLabel: (price: number) => void;
    setAuthData: React.Dispatch<React.SetStateAction<IAuthData>>;   
}