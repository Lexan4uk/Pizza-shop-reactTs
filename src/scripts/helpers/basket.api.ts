import { IBasket, IBasketEdit, IBasketModifiersEdit } from "@myModels/pages/MBasket";
import { simpleGet, apiTags as getApiTags } from '@api/simpleGet';
import { simplePost, apiTags as postApiTags } from '@api/simplePost';
import { BaseApiResponseType } from '@myModels/api/BaseApiTypes';
import useSWR from 'swr';
import { api } from "@api/api";
import { ISimplePost } from "@myModels/api/MSimplePost";
/*import { BaseApiResponseType } from "../../constants/types";
import { api, apiLog } from "./api";
import { IPaymentType } from "./payment.api";*/

export interface IBasketCalculate {
  // orderType: string;
  // organization?: string;
  // deliveryPoint?: string;
  spendBonuses: number;
  appliedCoupon: string;
}

export async function basketList() {
  const response = await api.get<BaseApiResponseType & { item: IBasket }>(getApiTags.cart);

  if (response.ok && response.data) {
    if (response.data.code === 200) {
      return response.data.item;
    } else {
      return response.data.message || "Неизвестная ошибка от API";
    }
  } else {
    return response.problem || "Ошибка сети или сервера";
  }
}

export async function basketEdit(data: IBasketEdit[]) {
  const response = await simplePost({ path: postApiTags.edit_cart, data: { cartProducts: data } } as ISimplePost);

  if (response) {
    if (response.code === 200) {
      return response.payload
    }
    else {
      console.log("Ошибка: " + response.message)
      return response.message
    }
  }
  else
    return "Ошибка редактирования"

}
/*export async function basketCalculateList(data: IBasketCalculate) {
  const response = await api.post<
    BaseApiResponseType & {
      item: { cart: IBasket; available_payment_types?: Array<IPaymentType> };
    }
  >("cart/calculate", data);

  // console.log(`---- ${response.config.url} ---`);
  // console.log(JSON.stringify(data));
  // console.log(JSON.stringify(response.data));
  // console.log(`---- ${response.config.url} ---`);

  if (!response.ok || !response.data?.item?.cart?.cart_products) {
    const responseBase = await basketList();

    responseBase.isValid = false;

    return responseBase;
  }

  if (response.data?.item?.available_payment_types) {
    response.data.item.cart.available_payment_types =
      response.data.item.available_payment_types;
  }

  response.data.item.cart.isValid = true;

  return response.data.item?.cart;
}

export async function basketEdit(data: IBasketEdit[]) {
  const response = await api.post<BaseApiResponseType & { item: IBasket }>(
    `cart`,
    { cartProducts: data }
  );

  // console.log(`---- ${response.config.url} ---`);
  // console.log(JSON.stringify(data));
  // console.log(JSON.stringify(response.data));
  // console.log(`---- ${response.config.url} ---`);

  if (!response.ok || response.data.code !== 200) {
    return false;
  }

  return response.data.item;
}*/
