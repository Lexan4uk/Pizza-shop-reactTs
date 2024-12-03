import '@styles/cards/InputCard.scss';
import { InputMask } from '@react-input/mask';
import { useFormContext } from "react-hook-form";
import { useState } from "react"; // Импортируем useState





function InputCard({ type = "Input",
    dataName = "",
    mask = '',
    replacement = null,
    isShowMask = false,
    inputType = "text",
    setPlaceholder = "",
    validationRules = {},
    setValue = "",
    setOnChange = "",
    setIcon = undefined,
    additionClass = "" }) {
    const formContext = useFormContext();
    const register = formContext ? formContext.register : () => { };
    const errors = formContext ? formContext.formState.errors : {};

    let inputElement;
    const [rows, setRows] = useState(5);
    switch (type) {
        case "Input":
            inputElement = (
                <div className="inputcard__main-box f-column gap-4">
                    <div className={`inputcard__input-border ${errors[dataName] && "inputcard__input-border_error"}`}>
                        <input
                            {...register(dataName, validationRules)}
                            className="inputcard__input"
                            type={inputType}
                            placeholder={setPlaceholder}
                        />
                    </div>
                    {errors[dataName] && <span className="inputcard__error text-m text-red">{errors[dataName].message}</span>}
                </div>
            );
            break;
        case "InputMask":
            inputElement = (
                <div className="inputcard__main-box f-column gap-4">
                    <div className={`inputcard__input-border ${errors[dataName] && "inputcard__input-border_error"}`}>
                        <InputMask
                            {...register(dataName, validationRules)}
                            className="inputcard__input"
                            mask={mask}
                            replacement={replacement}
                            showMask={isShowMask}
                            type={inputType}
                            placeholder={setPlaceholder}
                        />
                    </div>
                    {errors[dataName] && <span className="inputcard__error text-m text-red">{errors[dataName].message}</span>}
                </div>
            );
            break;
        case "SimpleInput":
            inputElement = (
                <div className="inputcard__main-box f-column gap-4">
                    <div className={`inputcard__input-border`}>
                        <input type={inputType} className="inputcard__input" placeholder={setPlaceholder} value={setValue} onChange={setOnChange} />
                        {setIcon && setIcon}
                    </div>
                </div>
            );
            break;
        case "AddAddressInput":
            inputElement = (
                <div className={`inputcard__main-box f-column gap-4 ${additionClass}`}>
                    <div className={`inputcard__input-border`}>
                        <input {...register(dataName, validationRules)} type={inputType} className="inputcard__input" placeholder={setPlaceholder} defaultValue={setValue} />
                    </div>
                </div>
            );
            break;
        case "AddAddressTextArea":
            inputElement = (
                <div className={`inputcard__main-box f-column gap-4 ${additionClass}`}>
                    <div className={`inputcard__input-border`}>
                        <textarea
                            {...register(dataName, validationRules)}
                            className="inputcard__input inputcard__input-textarea text-m"
                            placeholder={setPlaceholder}
                            defaultValue={setValue}
                            rows={rows}
                            onInput={(e) => {
                                const textareaLineHeight = 16;
                                e.target.rows = 5;
                                const currentRows = Math.ceil(e.target.scrollHeight / textareaLineHeight);
                                setRows(currentRows > 5 ? currentRows : 5);
                                e.target.rows = currentRows;
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