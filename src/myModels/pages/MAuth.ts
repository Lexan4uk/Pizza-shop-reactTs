export interface IAuthData {
    phoneNumber: string;
    password: string;
}
export class CAuthData implements IAuthData {
    phoneNumber: string;
    password: string;

    constructor(data: Partial<IAuthData> = {}) {
        this.phoneNumber = data.phoneNumber ?? "";
        this.password = data.password ?? "";
    }
}