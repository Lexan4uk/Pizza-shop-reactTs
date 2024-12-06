import { IProductModifier, IModifier } from '@myModels/pages/MProduct';

  export interface IProductAdditionsCard {
    addition: IProductModifier;
    updateAddition: (prevAdditions: (modifiers: IModifier[]) => IModifier[]) => void;
}