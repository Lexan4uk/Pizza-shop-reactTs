export interface IProduct {
    id: string;
    carbohydrates_amount: number;
    carbohydrates_full_amount: number;
    description: string;
    energy_amount: number;
    energy_full_amount: number;
    fat_amount: number;
    fat_full_amount: number;
    image_links: string[];
    min_price: number;
    name: string;
    parent_group: IParentGroupProduct;
    product_modifiers: IProductModifier[];
    tags: string[];
    proteins_amount: number;
    proteins_full_amount: number;
    weight: number;
}
export interface INormalizedProduct {
    id: string;
    isPizza: boolean;
    size: number;
    thickness: string;
    carbohydrates_amount: number;
    carbohydrates_full_amount: number;
    description: string;
    energy_amount: number;
    energy_full_amount: number;
    fat_amount: number;
    fat_full_amount: number;
    image_links: string[];
    min_price: number;
    name: string;
    parent_group: IParentGroupProduct;
    product_modifiers: IProductModifier[];
    tags: string[];
    proteins_amount: number;
    proteins_full_amount: number;
    weight: number;
}
export class CNormalizedProduct implements INormalizedProduct {
    id: string;
    isPizza: boolean;
    size: number;
    thickness: string;
    carbohydrates_amount: number;
    carbohydrates_full_amount: number;
    description: string;
    energy_amount: number;
    energy_full_amount: number;
    fat_amount: number;
    fat_full_amount: number;
    image_links: string[];
    min_price: number;
    name: string;
    parent_group: IParentGroupProduct;
    product_modifiers: IProductModifier[];
    tags: string[];
    proteins_amount: number;
    proteins_full_amount: number;
    weight: number;

    constructor(data: Partial<INormalizedProduct> = {}) {
        this.id = data.id || "default-id";
        this.isPizza = data.isPizza || false;
        this.size = data.size || 0; 
        this.thickness = data.thickness || "thin";  
        this.carbohydrates_amount = data.carbohydrates_amount || 0;
        this.carbohydrates_full_amount = data.carbohydrates_full_amount || 0;
        this.description = data.description || "Описание отсутствует";
        this.energy_amount = data.energy_amount || 0;
        this.energy_full_amount = data.energy_full_amount || 0;
        this.fat_amount = data.fat_amount || 0;
        this.fat_full_amount = data.fat_full_amount || 0;
        this.image_links = data.image_links || [];
        this.min_price = data.min_price || 0;
        this.name = data.name || "Без названия";
        this.parent_group = data.parent_group || { id: "default-id", is_supported: false, name: "Неизвестная группа", parent_group: {id: "default-id", name:"Неизвестная группа", tags: []} };
        this.product_modifiers = data.product_modifiers || [];
        this.tags = data.tags || [];
        this.proteins_amount = data.proteins_amount || 0;
        this.proteins_full_amount = data.proteins_full_amount || 0;
        this.weight = data.weight || 0;

        this.normalizeProductData();
    }
    private normalizeProductData(): void {
        if (this.parent_group.parent_group.name === "Пицца") {
            this.isPizza = true;

            if (this.name.includes("40см")) {
                this.size = 40;
            } else if (this.name.includes("33см")) {
                this.size = 33;
            } else if (this.name.includes("25см")) {
                this.size = 25;
            }

            if (this.name.includes("ТТ")) {
                this.thickness = "thin";
            } else {
                this.thickness = "traditional";
            }
        }
    }
}

interface IParentGroupProduct {
    id: string;
    is_supported: boolean;
    name: string;
    parent_group: IParentGroup
}
interface IParentGroupModifier {
    id: string;
    name: string;
    parent_group: IParentGroup
}
interface IParentGroup {
    id: string;
    name: string;
    tags: string[]
}
export interface IProductModifier {
    id: number;
    default_amount: number;
    min_amount: number;
    max_amount: number;
    product: IModifier;
}

export interface IModifier {
    id: string;
    carbohydrates_amount: number;
    carbohydrates_full_amount: number;
    description: string;
    energy_amount: number;
    energy_full_amount: number;
    fat_amount: number;
    fat_full_amount: number;
    image_links: string[];
    min_price: number;
    name: string;
    parent_group: IParentGroupModifier;
    tags: string[];
    proteins_amount: number;
    proteins_full_amount: number;
    weight: number;
}
export interface IModdedModifier {
    id: string;
    addition_id: number;
    carbohydrates_amount: number;
    carbohydrates_full_amount: number;
    description: string;
    energy_amount: number;
    energy_full_amount: number;
    fat_amount: number;
    fat_full_amount: number;
    image_links: string[];
    min_price: number;
    name: string;
    parent_group: IParentGroupModifier;
    tags: string[];
    proteins_amount: number;
    proteins_full_amount: number;
    weight: number;
}

