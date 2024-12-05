export interface IGoodsQuery {
    code: number;
    count: number;
    items: IGood[];
}
export interface IGood {
    code: string;
    description: string;
    href: string;
    id: string;
    image_links: string[];
    is_supported: boolean;
    menu_category: boolean;
    min_price: number;
    name: string;
    parent_group: IParentGroup;
    tags: string[];
}
export class CGood implements IGood {
    code: string;
    description: string;
    href: string;
    id: string;
    image_links: string[];
    is_supported: boolean;
    menu_category: boolean;
    min_price: number;
    name: string;
    parent_group: IParentGroup;
    tags: string[];

    constructor(data: Partial<IGood>) {
        this.code = data.code ?? '';
        this.description = data.description ?? '';
        this.href = data.href ?? `product/${data.id}`
        this.id = data.id ?? "";
        this.image_links = data.image_links ?? [];
        this.is_supported = data.is_supported ?? false;
        this.menu_category = data.menu_category ?? false;
        this.min_price = data.min_price ?? 0;
        this.name = data.name ?? '';
        this.parent_group = data.parent_group ? new CParentGroup(data.parent_group) : new CParentGroup({});
        this.tags = data.tags ?? [];
    }
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
export class CParentGroup implements IParentGroup {
    id: string;
    code: string;
    name: string;
    menu_category: boolean;
    color: string;
    tags: string[];
    image_links: string[];

    constructor(data: Partial<IParentGroup>) {
        this.id = data.id ?? "";
        this.code = data.code ?? "";
        this.name = data.name ?? "";
        this.menu_category = data.menu_category ?? false;
        this.color = data.color ?? "defaultColor";
        this.tags = data.tags ?? [];
        this.image_links = data.image_links ?? []
    }
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
export class CPromotion implements IPromotion {
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
        this.href = data.href ?? `actions/${data.id}`;
    }
}

export interface IGroupedOption {
    id: string;
    name: string;
    color: string;
    items: IGood[];
  }

