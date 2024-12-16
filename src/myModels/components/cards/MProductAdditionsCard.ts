import { IProductModifier, IModifier, IModdedModifier } from '@myModels/pages/MProduct';

  export interface IProductAdditionsCard {
    addition: IProductModifier;
    updateAddition: (prevAdditions: (modifiers: IModdedModifier[]) => IModdedModifier[]) => void;
}