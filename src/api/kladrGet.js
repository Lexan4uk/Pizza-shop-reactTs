import { kladrapi } from "@api/api";


export async function kladrGet(params) {
    if (params) {
        const response = await kladrapi.get(`api.php?${params}`);
        return response.data;
    }
    else {
        console.log("Неверная форма запроса")
        return null
    }

}
export default kladrGet