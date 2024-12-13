import '@styles/pages/AddAddress.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import getSvg from '@images/svg'
import { kladrGet } from "@api/kladrGet"
import useSWR from 'swr';
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import InputCard from '@components/cards/InputCard'
import useCity from '@scripts/custom_hooks/useCity';
import { useEffect, useState } from 'react';
import { CAddressState, IFormData, IAddAddressData } from '@myModels/pages/MAddAddress';
import { Dialog } from '@headlessui/react'
import SearchPage from '@pages/SearchPage';
import {simplePost, apiTags} from '@api/simplePost';
import { ISimplePost } from '@myModels/api/MSimplePost';

function AddAddress() {
    const [openStreetWindow, setOpenStreetWindow] = useState(false)
    const [openHouseWindow, setOpenHouseWindow] = useState(false)

    const [street, setStreet] = useState<string>();
    const [house, setHouse] = useState<string>();

    const [querry, setQuerry] = useState(false)

    const {
        arrow
    } = getSvg()
    const {
        cityData
    } = useCity()

    const location = useLocation();
    const navigate = useNavigate();
    const methods = useForm();
    const { handleSubmit, trigger } = methods;

    const [addressState, setAddressState] = useState<CAddressState>();

    useEffect(() => {
        const initialData = new CAddressState(location.state || "");
        setAddressState(initialData);
    }, [location.state]);

    useEffect(() => {
        if (addressState) {
            setStreet(addressState.selectedStreetName);
            setHouse(addressState.selectedHouseName);
        }
    }, [addressState]);



    const handleSaveClick = async () => {
        const isValid = await trigger();
        if (isValid) {
            handleSubmit(onSubmit)();
        }
    };

    const onSubmit = async (data: any) => {
        setQuerry(true)
        const querryData: IAddAddressData = {
            ...data,
            house: location.state.selectedHouseId,
            street: location.state.selectedStreetId,
            latitude: 0,
            longitude: 0,
            zipIndex: ""
        };
        const response = await simplePost({path: apiTags.add_delivery_point, data: querryData} as ISimplePost);
        setQuerry(false)
        navigate(-1)

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
                                        <input defaultValue={street} className="inputcard__input" placeholder="Улица" onClick={() => setOpenStreetWindow(true)} />
                                    </div>
                                </div>
                                <Dialog open={openStreetWindow} onClose={() => setOpenStreetWindow(false)} className="add-address__input-dialog">
                                    <SearchPage type={"street"} isOpen={setOpenStreetWindow} />
                                </Dialog>
                            </div>
                            <div className="add-address__input-holder-grid gap-16">
                                <div className={`add-address__input-holder f-column gap-4 ${street ? "" : "add-address__input-inactive"}`}>
                                    <h2 className="add-address__input-article text-m">Дом</h2>
                                    <div className={`inputcard__main-box f-column gap-4`}>
                                        <div className={`inputcard__input-border`}>
                                            <input defaultValue={house} className="inputcard__input" placeholder="Дом" onClick={() => setOpenHouseWindow(true)} />
                                        </div>
                                    </div>
                                    <Dialog open={openHouseWindow} onClose={() => setOpenHouseWindow(false)} className="add-address__input-dialog">
                                        <SearchPage type={"house"} isOpen={setOpenHouseWindow} />
                                    </Dialog>
                                </div>
                                <div className={`add-address__input-holder f-column gap-4 add-address__optional-input ${!house && "add-address__input-inactive"}`}>
                                    <h2 className="add-address__input-article text-m">Квартира</h2>
                                    <InputCard dataName="flat" type="AddAddressInput" setPlaceholder="Квартира" inputType="number" />
                                </div>
                                <div className={`add-address__input-holder f-column gap-4 add-address__optional-input ${!house && "add-address__input-inactive"}`}>
                                    <h2 className="add-address__input-article text-m">Подъезд</h2>
                                    <InputCard dataName="entrance" type="AddAddressInput" setPlaceholder="Подъезд"  inputType="number" />
                                </div>
                                <div className={`add-address__input-holder f-column gap-4 add-address__optional-input ${!house && "add-address__input-inactive"}`}>
                                    <h2 className="add-address__input-article text-m">Этаж</h2>
                                    <InputCard dataName="floor" type="AddAddressInput" setPlaceholder="Этаж" inputType="number"/>
                                </div>
                            </div>
                            <div className={`add-address__input-holder f-column gap-4 add-address__optional-input ${!house && "add-address__input-inactive"}`}>
                                <h2 className="add-address__input-article text-m">Код домофора</h2>
                                <InputCard dataName="doorphone" type="AddAddressInput" setPlaceholder="Код домофона" inputType="number"/>
                            </div>
                            <div className={`add-address__input-holder f-column gap-4 add-address__optional-input ${!house && "add-address__input-inactive"}`}>
                                <h2 className="add-address__input-article text-m">Комментарии</h2>
                                <InputCard dataName="comment" type="AddAddressTextArea" setPlaceholder="Комментарии об адресе доставки" maxlength={200}/>
                            </div>
                        </form>
                    </FormProvider>
                </section>
                {!(openStreetWindow || openHouseWindow) && (
                    <footer className="add-address footer_props search__footer">
                        <nav className="footer__nav">
                            <button className={`footer__auth-btn button-l ${(!house || querry) && "button-inactive"}`} onClick={handleSaveClick}>Сохранить</button>
                        </nav>
                    </footer>
                )}

            </main>

        </>
    )
}
export default AddAddress;