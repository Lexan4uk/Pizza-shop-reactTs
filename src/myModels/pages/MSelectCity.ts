export interface IRawCities {
    code: number;
    items: ICity[];
}
export interface ICity {
    id: string;
    name: string;
    classifier_id: string;
    is_show_banner: boolean;
    monday: IWorkDay;
    tuesday: IWorkDay;
    wednesday: IWorkDay;
    thursday: IWorkDay;
    friday: IWorkDay;
    saturday: IWorkDay;
    sunday: IWorkDay;
}
interface IWorkDay {
    work_from: string;
    work_to: string;
}
export interface ICityNormalized  {
    id: string;
    name: string;
    classifier_id: string;
}
export class CCityNormalized implements ICityNormalized {
    id: string;
    name: string;
    classifier_id: string;

    constructor(data: Partial<ICityNormalized> = {}) {
        this.id = data.id ?? "";
        this.name = data.name ?? "";
        this.classifier_id = data.classifier_id ?? "";
    }
}