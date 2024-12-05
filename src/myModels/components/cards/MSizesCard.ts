import { INormalizedProduct } from 'src/myModels/pages/MProduct';

export interface ISizesCard {
    data: INormalizedProduct[];
    selectedThickness: string;
    setSelectedIdBySize: (id: string) => void;
    selectedIdBySize: string | undefined;
    setCurrentPrice: (price: number) => void;
}
export interface IOptions {
    thickness: string;
    size: number;
    id: string;
    min_price: number;
}
export class COptions implements IOptions {
    thickness: string;
    size: number;
    id: string;
    min_price: number;

    constructor(data: Partial<IOptions> = {}) {
        this.thickness = data.thickness ?? "thin";
        this.size = data.size ?? 0;
        this.id = data.id ?? "";
        this.min_price = data.min_price ?? 0;
    }
}