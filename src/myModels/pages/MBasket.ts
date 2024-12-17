import { IProductModifier } from "@myModels/pages/MProduct"

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
        [key: string]: any;
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
export class CBacket implements IBasket {
    user_phone: string;
    price: number;
    applied_coupon: string;
    is_coupon_valid: boolean;
    spend_bonuses: number;
    bonuses_max_sum: number;
    cart_products: ICartProduct[];
    gift_cart_products: IGiftCartProduct[];
    deleted_cart_products: IDeletedCartProduct[];

    constructor(data: Partial<IBasket> = {}) {
        this.user_phone = data.user_phone ?? "";
        this.price = data.price ?? 0;
        this.applied_coupon = data.applied_coupon ?? "";
        this.is_coupon_valid = data.is_coupon_valid ?? false;
        this.spend_bonuses = data.spend_bonuses ?? 0;
        this.bonuses_max_sum = data.bonuses_max_sum ?? 0;
        this.cart_products = data.cart_products ?? [];
        this.gift_cart_products = data.gift_cart_products ?? [];
        this.deleted_cart_products = data.deleted_cart_products ?? [];
    }
}

export interface IBasketEdit {
    products: string;
    amount: number;
    cartModifiers?: IBasketModifiersEdit[];
}

export interface IBasketModifiersEdit {
    productModifier: number;
    amount: number;
}
export class CBasketEdit implements IBasketEdit {
    products: string;
    amount: number;
    cartModifiers?: IBasketModifiersEdit[];

    constructor(data: Partial<IBasketEdit> = {}) {
        this.products = data.products ?? "";
        this.amount = data.amount ?? 0;
        this.cartModifiers = data.cartModifiers?.map(modifier => ({
            productModifier: modifier.productModifier ?? 0,
            amount: modifier.amount ?? 0
        })) ?? [];
    }
}
