export interface IInputCard {
    type: string;
    dataName: string;
    mask: string;
    replacement: { [key: string]: RegExp };
    isShowMask: boolean;
    inputType: string;
    setPlaceholder: string;
    validationRules: object;
    setValue: string;
    setOnChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
    setIcon: JSX.Element | undefined;
    additionClass: string;
    maxlength: number;
}
export class CInputCard implements IInputCard {
    type: string;
    dataName: string;
    mask: string;
    replacement: { [key: string]: RegExp };
    isShowMask: boolean;
    inputType: string;
    setPlaceholder: string;
    validationRules: object;
    setValue: string;
    setOnChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
    setIcon: JSX.Element | undefined;
    additionClass: string;
    maxlength: number;

    constructor(data: Partial<IInputCard> = {}) {
        this.type = data.type ?? "Input";
        this.dataName = data.dataName ?? "";
        this.mask = data.mask ?? ""; 
        this.replacement = data.replacement ?? {}; 
        this.isShowMask = data.isShowMask ?? false; 
        this.inputType = data.inputType ?? "text";
        this.setPlaceholder = data.setPlaceholder ?? ""; 
        this.validationRules = data.validationRules ?? {};
        this.setValue = data.setValue ?? "";
        this.setOnChange = data.setOnChange ?? undefined;
        this.setIcon = data.setIcon; 
        this.additionClass = data.additionClass ?? ""; 
        this.maxlength = data.maxlength ?? 100
    }
}