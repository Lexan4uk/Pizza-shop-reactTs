export interface IGoodsQuery {
    code: number;
    count: number;
    items: IGoods[];
}
export interface IGoods {
    code: string;
    description: string;
    id: string;
    image_links: string[];
    is_supported: boolean;
    menu_category: boolean;
    min_price: number;
    name: string;
    parent_group: IParentGroup;
}

export interface IParentGroup {
    id: string;
    code: string;
    name: string;
    menu_category: boolean;
    color: string;
    tags: string[];
    image_links: string[];
}
export interface ISortedGoods {
    parent_group_id: string,
    name: string,
    color: string,
    items: IGoods[]
}


export interface IOptionsQuery {
    code: number;
    count: number;
    items: IOption[];
}
export interface IOption {
    id: string;
    code: string;
    name: string;
    tags: string[];
    image_links: string[];
    color: string;
    menu_category: boolean;
}


export interface IPromotionsQuery {
    code: number;
    count: number;
    items: IPromotion[];
}
export interface IPromotion {
    id: number;
    title: string;
    cover: string;
    description: string;
    short_description: string;
    start_date: string;
    end_date: string;
    href: string;
}
export class СPromotion implements IPromotion {
    id: number;
    title: string;
    cover: string;
    description: string;
    short_description: string;
    start_date: string;
    end_date: string;
    href: string;

    constructor(data: Partial<IPromotion>) {
        this.id = data.id ?? 0;
        this.title = data.title ?? '';
        this.cover = data.cover ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s';
        this.description = data.description ?? '';
        this.short_description = data.short_description ?? '';
        this.start_date = data.start_date ?? '';
        this.end_date = data.end_date ?? '';
        this.href = data.href ?? `actions/${String(data.id)}`;
    }
}


