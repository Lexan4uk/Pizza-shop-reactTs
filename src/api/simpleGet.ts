import { api } from "@api/api";


export const apiTags = {
    menu_categories: () => `menu_categories?city=${getCityId()}`,
    menu: () => `products/menu?city=${getCityId()}`,
    promotions: "promotion",
    promotionById: (id: string | undefined) => `promotion/${id}`,
    productById: (id: string | undefined) => `products/menu/${id}?city=${getCityId()}`,
    city: "delivery/city/filter_city",
    deliver_points: "delivery/delivery_point/get",
    pickup_points: () =>  `organizations/city/${getCityId()}`,
    order_types: "order_types"
};

const getCityId = (): string => {
    const city = localStorage.getItem("city");
    if (city) {
        return JSON.parse(city).cityId;
    }
    else {
        window.location.href = '/city'
        return "Выбор города"
    }
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
