export interface IQuerryResult {
    text: string;
    code?: number;
}
export class CQuerryResult implements IQuerryResult {
    text: string;
    code?: number;

    constructor(data: Partial<IQuerryResult> = {}) {
        this.text = data.text ?? "";
        this.code = data.code ?? 0;
    }
}
export interface IEditData {
    phone: string;
    email: string;
    birthday: string
}

export interface INormalizedEditData {
    phone: string;
    email: string;
    birthday: {
        year: number;
        month: number;
        day: number;
    };
}
