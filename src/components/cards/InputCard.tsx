import '@styles/cards/InputCard.scss';
import { InputMask } from '@react-input/mask';
import { useFormContext, FieldError } from "react-hook-form";
import { useState } from "react";
import { IInputCard, CInputCard } from '@myModels/components/cards/MInputCard';

const InputCard = ({
    type = "Input",
    dataName = "",
    mask = "",
    replacement = undefined,
    isShowMask = false,
    inputType = "text",
    setPlaceholder = "",
    validationRules = {},
    setValue = "",
    setOnChange = undefined,
    setIcon = undefined,
    additionClass = "",
    maxlength = 100
}: Partial<IInputCard>) => {

    const cardData = new CInputCard({
        type,
        dataName,
        mask,
        replacement,
        isShowMask,
        inputType,
        setPlaceholder,
        validationRules,
        setValue,
        setOnChange,
        setIcon,
        additionClass,
        maxlength
    });

    const formContext = useFormContext();
    const register = formContext ? formContext.register : () => { };
    const errors = formContext ? formContext.formState.errors : {};

    let inputElement;
    const [rows, setRows] = useState(5);

    switch (cardData.type) {
        case "Input":
            inputElement = (
                <div className="inputcard__main-box f-column gap-4">
                    <div className={`inputcard__input-border ${errors[cardData.dataName] && "inputcard__input-border_error"}`}>
                        <input
                            {...register(cardData.dataName, cardData.validationRules)}
                            className="inputcard__input"
                            type={cardData.inputType}
                            placeholder={cardData.setPlaceholder}
                        />
                    </div>
                    {errors[cardData.dataName] && <span className="inputcard__error text-m text-red">{(errors[cardData.dataName] as FieldError).message || 'Ошибка ввода'}</span>}
                </div>
            );
            break;
        case "InputMask":
            inputElement = (
                <div className="inputcard__main-box f-column gap-4">
                    <div className={`inputcard__input-border ${errors[cardData.dataName] && "inputcard__input-border_error"}`}>
                        <InputMask
                            {...register(cardData.dataName, cardData.validationRules)}
                            className="inputcard__input"
                            mask={cardData.mask}
                            replacement={cardData.replacement}
                            showMask={cardData.isShowMask}
                            type={cardData.inputType}
                            placeholder={cardData.setPlaceholder}
                        />
                    </div>
                    {errors[cardData.dataName] && <span className="inputcard__error text-m text-red">{(errors[cardData.dataName] as FieldError).message || 'Ошибка ввода'}</span>}
                </div>
            );
            break;
        case "SimpleInput":
            inputElement = (
                <div className="inputcard__main-box f-column gap-4">
                    <div className={`inputcard__input-border`}>
                        <input
                            maxLength={cardData.maxlength}
                            type={cardData.inputType}
                            className="inputcard__input"
                            placeholder={cardData.setPlaceholder}
                            value={cardData.setValue}
                            onChange={cardData.setOnChange}
                        />
                        {cardData.setIcon && cardData.setIcon}
                    </div>
                </div>
            );
            break;
        case "AddAddressInput":
            inputElement = (
                <div className={`inputcard__main-box f-column gap-4 ${cardData.additionClass}`}>
                    <div className={`inputcard__input-border`}>
                        <input
                            maxLength={cardData.maxlength}
                            {...register(cardData.dataName, cardData.validationRules)}
                            type={cardData.inputType}
                            className="inputcard__input"
                            placeholder={cardData.setPlaceholder}
                            defaultValue={cardData.setValue}
                        />
                    </div>
                </div>
            );
            break;
        case "AddAddressTextArea":
            inputElement = (
                <div className={`inputcard__main-box f-column gap-4 ${cardData.additionClass}`}>
                    <div className={`inputcard__input-border`}>
                        <textarea
                            maxLength={cardData.maxlength}
                            {...register(cardData.dataName, cardData.validationRules)}
                            className="inputcard__input inputcard__input-textarea text-m"
                            placeholder={cardData.setPlaceholder}
                            defaultValue={cardData.setValue}
                            rows={rows}
                            onInput={(e) => {
                                const textarea = e.target as HTMLTextAreaElement;
                                const textareaLineHeight = 16;
                                textarea.rows = 5;
                                const currentRows = Math.ceil(textarea.scrollHeight / textareaLineHeight);
                                setRows(currentRows > 5 ? currentRows : 5);
                                textarea.rows = currentRows;
                            }}
                        />
                    </div>
                </div>
            );
            break;
        default:
            inputElement = null;
            break;
    }

    return inputElement;
}

export default InputCard;
