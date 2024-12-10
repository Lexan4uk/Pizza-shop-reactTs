import '@styles/pages/AddAddress.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import getSvg from '@images/svg'
import { kladrGet } from "@api/kladrGet"
import useSWR from 'swr';
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import InputCard from '@components/cards/InputCard'
import useCity from '@scripts/custom_hooks/useCity';
import { useEffect, useState } from 'react';
import { IAddressState, CAddressState } from '@myModels/pages/MAddAddress';


function AddAddress() {
    const {
        arrow
    } = getSvg()
    const {
        cityData
    } = useCity()
    const location = useLocation();
    const navigate = useNavigate();
    const methods = useForm();
    const { handleSubmit, trigger, formState: { errors }, register } = methods;

    const [addressState, setAddressState] = useState<CAddressState>();

    useEffect(() => {
        const initialData = new CAddressState(location.state || "");
        setAddressState(initialData);
        //console.log(location.state)
    }, [location.state]);
    const [street, setStreet] = useState<string>();
    const [house, setHouse] = useState<string>();

    useEffect(() => {
        console.log(addressState)
        if (addressState) {
            setStreet(addressState.selectedStreetId);
            setHouse(addressState.selectedHouseName);
        }
    }, [addressState]);
    useEffect(() => {
        //console.log(house)
    }, [house])



    const handleSaveClick = async () => {
        const isValid = await trigger();
        if (isValid) {
            handleSubmit(onSubmit)();
        }
    };

    const onSubmit = async (data: any) => {
        console.log(data)
    }

    return (
        <>
            <main className="add-address">
                <header className="add-address header">
                    <div className="header__holder block-normalizer f-row">
                        <button className="add-address__header-arrow simple-button" onClick={() => navigate("/profile/addresses")}>{arrow()}</button>
                        <h1 className="add-address__header-title title-xs">Адреса доставки</h1>
                    </div>
                </header>
                <section className="add-address__content block-normalizer">
                    <FormProvider {...methods} >
                        <form className="add-address__form f-column gap-16">
                            <div className="add-address__input-holder f-column gap-4">
                                <h2 className="add-address__input-article text-m">Населённый пункт</h2>
                                <div className={`inputcard__input-border add-address__unactive-input`}>
                                    <input className="inputcard__input" defaultValue={cityData.cityName} />
                                </div>
                            </div>
                            <div className="add-address__input-holder f-column gap-4">
                                <h2 className="add-address__input-article text-m">Улица</h2>
                                <div className={`inputcard__main-box f-column gap-4`}>
                                    <div className={`inputcard__input-border`}>
                                        <input defaultValue={street} className="inputcard__input" placeholder="Улица" onClick={() => navigate("street")} />
                                    </div>
                                </div>
                            </div>
                            <div className="add-address__input-holder-grid gap-16">
                                <div className={`add-address__input-holder f-column gap-4 ${street ? "" : "add-address__input-inactive"}`}>
                                    <h2 className="add-address__input-article text-m">Дом</h2>
                                    <div className={`inputcard__main-box f-column gap-4`}>
                                        <div className={`inputcard__input-border`}>
                                            <input defaultValue={house} className="inputcard__input" placeholder="Дом" onClick={() => navigate("house", {
                                                state: {
                                                    selectedStreetId: addressState?.selectedStreetId || '',
                                                }
                                            })} />
                                        </div>
                                    </div>
                                </div>
                                <div className={`add-address__input-holder f-column gap-4 add-address__optional-input ${!house && "add-address__input-inactive"}`}>
                                    <h2 className="add-address__input-article text-m">Квартира</h2>
                                    <InputCard dataName="flat" type="AddAddressInput" setPlaceholder="Квартира" />
                                </div>
                                <div className={`add-address__input-holder f-column gap-4 add-address__optional-input ${!house && "add-address__input-inactive"}`}>
                                    <h2 className="add-address__input-article text-m">Подъезд</h2>
                                    <InputCard dataName="entrance" type="AddAddressInput" setPlaceholder="Подъезд" />
                                </div>
                                <div className={`add-address__input-holder f-column gap-4 add-address__optional-input ${!house && "add-address__input-inactive"}`}>
                                    <h2 className="add-address__input-article text-m">Этаж</h2>
                                    <InputCard dataName="floor" type="AddAddressInput" setPlaceholder="Этаж" />
                                </div>
                            </div>
                            <div className={`add-address__input-holder f-column gap-4 add-address__optional-input ${!house && "add-address__input-inactive"}`}>
                                <h2 className="add-address__input-article text-m">Код домофора</h2>
                                <InputCard dataName="doorphone" type="AddAddressInput" setPlaceholder="Код домофона" />
                            </div>
                            <div className={`add-address__input-holder f-column gap-4 add-address__optional-input ${!house && "add-address__input-inactive"}`}>
                                <h2 className="add-address__input-article text-m">Комментарии</h2>
                                <InputCard dataName="comment" type="AddAddressTextArea" setPlaceholder="Комментарии об адресе доставки" />
                            </div>
                        </form>
                    </FormProvider>
                </section>
                <footer className="add-address footer_props search__footer">
                    <nav className="footer__nav">
                        <button className={`footer__auth-btn button-l`} onClick={handleSaveClick}>Сохранить</button>
                    </nav>
                </footer>
            </main>

        </>
    )
}
export default AddAddress;