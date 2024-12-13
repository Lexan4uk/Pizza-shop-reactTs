import { IProductModifier } from "./MProduct";

export interface IProduct {
    id: string;
    parent_group: {
        name: string;
    };
    name: string;
    description: string;
    additional_info: string;
    tags: string[];
    image_links: {
        [key: string]: any; // Необходимо уточнить структуру image_links
    };
}

export interface ICartModifier {
    amount: number;
    price: number;
    product_modifier: {
        id: number;
        product: IProduct;
    };
    position_id: string;
}

export interface ICartProduct {
    id: number;
    position_id: string;
    amount: number;
    price: number;
    cost: number;
    product: IProduct;
    cart_modifiers: ICartModifier[];
    complements_id: number;
}

export interface IGiftCartProduct {
    id: number;
    position_id: string;
    price: number;
    amount: number;
    product: IProduct;
}

export interface IDeletedCartProduct {
    id: number;
    position_id: string;
    amount: number;
    price: number;
    cost: number;
    product: IProduct;
    cart_modifiers: ICartModifier[];
    complements_id: number;
}

export interface IBasket {
    user_phone: string;
    price: number;
    applied_coupon: string;
    is_coupon_valid: boolean;
    spend_bonuses: number;
    bonuses_max_sum: number;
    cart_products: ICartProduct[];
    gift_cart_products: IGiftCartProduct[];
    deleted_cart_products: IDeletedCartProduct[];
}

export interface IBasketEdit {
    products: string;
    amount: number;
    cartModifiers?: IBasketModifiersEdit[];
}

export interface IBasketModifiersEdit {
    productModifier: number | string;
    amount: number;
}