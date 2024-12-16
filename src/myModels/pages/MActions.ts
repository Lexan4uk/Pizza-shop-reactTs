export interface IPromotion {
    cover: string;
    description: string;
    end_date: string;
    href: string;
    id: number;
    short_description: string;
    start_date: string;
    title: string;
}

export class CPromotion implements IPromotion {
    cover: string;
    description: string;
    end_date: string;
    href: string;
    id: number;
    short_description: string;
    start_date: string;
    title: string;

    constructor(data: Partial<IPromotion> = {}) {
        this.cover = data.cover ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s";
        this.description = data.description ?? "";
        this.end_date = data.end_date ?? "";
        this.href = data.href ?? "";
        this.id = data.id ?? 0;
        this.short_description = data.short_description ?? "";
        this.start_date = data.start_date ?? "";
        this.title = data.title ?? "";
    }
}
