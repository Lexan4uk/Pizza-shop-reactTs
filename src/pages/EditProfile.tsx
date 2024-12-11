import '@styles/pages/EditProfile.scss';
import InputCard from '@components/cards/InputCard'

import { useState } from 'react';
import { simplePost, apiTags } from "@api/simplePost"
import getSvg from '@images/svg'
import useAuth from '@scripts/custom_hooks/useAuth';
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { IQuerryResult, CQuerryResult, IEditData, INormalizedEditData } from '@myModels/pages/MEditProfile';
import { ISimplePost } from '@myModels/api/MSimplePost';

function EditProfile() {
    const [isQuerry, setIsQuerry] = useState(false)
    const [querryResult, setQuerryResult] = useState<IQuerryResult>(new CQuerryResult())

    const {
        arrow
    } = getSvg()

    const {
        initUser
    } = useAuth()


    const methods = useForm<IEditData>();
    const { handleSubmit, trigger, formState: { errors } } = methods;


    const handleSaveClick = async () => {
        const isValid = await trigger();
        if (isValid) {
            handleSubmit(onSubmit)();
        }
        else {
            setQuerryResult({ text: "Исправьте введённые данные!" })
        }
    };

    const onSubmit = async (data: IEditData) => {
        console.log(data)
        setIsQuerry(true)

        const [day = "00", month = "00", year = "0000"] = data.birthday.split('-');
        const normalizedData: INormalizedEditData = {
            phone: data.phone.replace(/[+]/g, '').replace(/[^0-9]/g, ''),
            email: data.email,
            birthday: {
                year: parseInt(year, 10),
                month: parseInt(month, 10),
                day: parseInt(day, 10)
            }
        }
        const response = await simplePost({ path: apiTags.edit_user, data: normalizedData } as ISimplePost);
        if (response) {
            if (response.code === 200) {
                setQuerryResult({ text: "Изменения применены!", code: response.code })
                initUser()
            }
            else {
                if (response.payload) {
                    const errorMessages = response.payload
                    setQuerryResult({
                        text: `Ошибка ${response.code}! ${errorMessages}`,
                        code: response.code
                    });
                }
            }
        }
        console.log(response)

        setIsQuerry(false)
    }

    return (
        <>
            <header className="editprofile header">
                <div className="header__holder block-normalizer f-row">
                    <button className="editprofile__header-arrow simple-button" onClick={() => window.history.back()}>{arrow()}</button>
                    <h1 className="editprofile__header-title title-xs">Личные данные</h1>
                </div>
            </header>
            <main className="editprofile">
                <div className="editprofile__content-holder block-normalizer">
                    <FormProvider {...methods} >
                        <form className="editprofile__form f-column gap-16" onSubmit={handleSubmit(onSubmit)}>
                            <div className="editprofile__form-element f-column gap-4">
                                <h2 className="editprofile__form-element-title text-m">Ваш номер телефона</h2>
                                <InputCard type="InputMask" dataName="phone" mask='+7 (___) ___-__-__' replacement={{ _: /\d/ }} isShowMask={true} inputType="tel" validationRules={{
                                    required: "Телефон обязателен для заполнения",
                                    pattern: {
                                        value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                                        message: "Некорректный формат номера телефона"
                                    }
                                }} />
                            </div>
                            <div className="editprofile__form-element f-column gap-4">
                                <h2 className="editprofile__form-element-title text-m">Ваш email</h2>
                                <InputCard type="Input" dataName="email" inputType="email" setPlaceholder="Введите ваш email" validationRules={{
                                    required: "Email обязателен для заполнения",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Некорректный формат email"
                                    }
                                }} />
                            </div>
                            <div className="editprofile__form-element f-column gap-4">
                                <h2 className="editprofile__form-element-title text-m">Дата рождения</h2>
                                <InputCard type="InputMask" dataName="birthday" mask='ДД-ММ-ГГГГ' replacement={{ Д: /\d/, М: /\d/, Г: /\d/ }} isShowMask={true} inputType="text" validationRules={{
                                    required: "Дата рождения обязательна для заполнения",
                                    pattern: {
                                        value: /^\d{2}-\d{2}-\d{4}$/,
                                        message: "Некорректный формат даты"
                                    }
                                }} />
                            </div>
                            <span className={`editprofile__result text-l ${(querryResult.code && querryResult.code !== 200) && "text-red"}`}>{querryResult.text}</span>
                        </form>
                    </FormProvider>
                </div>
            </main>
            <footer className="editprofile footer footer_props">
                <nav className="footer__nav">
                    <button className={`button-l footer__auth-btn ${isQuerry && "footer__auth-btn_inactive"}`} onClick={handleSaveClick}>Сохранить</button>
                </nav>
            </footer>
        </>
    )
}
export default EditProfile;
