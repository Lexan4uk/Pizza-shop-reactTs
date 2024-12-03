import { api } from "@api/api";

export const apiTags = {
    phone_enter: "user/login",
    get_token: "authentication_token",
    edit_user: "user/profile"
};

export async function simplePost(path, data) {
    if (path && data) {
        const response = await api.post(path, data);
        return response.data;
    }
    else {
        console.log("Неверная форма запроса")
        return null
    }
}
export default simplePost