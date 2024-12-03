import { api } from "@api/api";


export async function login() {
    const response = await api.get("user/profile");
    return response.data;
}