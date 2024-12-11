import { api } from "@api/api";
import { BaseApiResponseType } from "@myModels/api/BaseApiTypes";
import { ILoginData } from "@myModels/api/MLogin";

export async function login() {
    const response = await api.get<BaseApiResponseType & { item: ILoginData }>("user/profile");
    return response.data;
}