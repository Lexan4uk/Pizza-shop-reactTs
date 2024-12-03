//import { api } from "@api/api";
import { api } from '../../src/api/api';


export const apiTags = {
    menu_categories: () => `menu_categories?city=${getCityId()}`,
    menu: () => `products/menu?city=${getCityId()}`,
    promotions: "promotion",
    promotionById: (id: number) => `promotion/${id}`,
    productById: (id: number) => `products/menu/${id}`,
    city: "delivery/city/filter_city",
    deliver_points: "delivery/delivery_point/get"
};

const getCityId = (): string => {
    const city = localStorage.getItem("city");
    if (!city) {
        throw new Error("City ID not found in localStorage");
    }
    return JSON.parse(city).cityId;
}

export async function simpleGet(url: string | null | keyof typeof apiTags): Promise<any> {
    if (url) {
        const response = await api.get(url);
        return response.data;
    } else {
        console.log("Неверная форма запроса");
        return null;
    }
}

export default simpleGet;
