import { ICartProduct } from "@myModels/pages/MBasket"

export interface IBasketProductCard {
    data: ICartProduct,
    update: React.Dispatch<React.SetStateAction<boolean>>,
    loading: React.Dispatch<React.SetStateAction<boolean>>
}