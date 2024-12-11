import '@styles/pages/Addresses.scss';
import { Link } from "react-router-dom";
import getSvg from '@images/svg'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DeliveryComp from '@components/addresses_elements/DeliveryComp'
import PickupComp from '@components/addresses_elements/PickupComp';
import { simpleGet, apiTags } from "@api/simpleGet"
import useSWR from 'swr';
import { BaseApiResponseType } from '@myModels/api/BaseApiTypes';
import { IDeliveryTypes } from '@myModels/pages/MAdresses';

function Addresses() {
    const [activeDelivery, setActiveDelivery] = useState("Самовывоз");
    const { data: orderTypes, isLoading: otIsLoading } = useSWR<BaseApiResponseType & { items: IDeliveryTypes[] }>(apiTags.order_types, simpleGet);
    const orderTypeTuple: [IDeliveryTypes | undefined, IDeliveryTypes | undefined] = [undefined, undefined];

    if (orderTypes?.items) {
        orderTypeTuple[0] = orderTypes.items.find(item => item.name.toLowerCase().includes("самовывоз"));
        orderTypeTuple[1] = orderTypes.items.find(item => item.name.toLowerCase().includes("курьером"));
    }

    const navigate = useNavigate();
    const {
        arrow
    } = getSvg()
    const handleDeliveryClick = (buttonName: string) => {
        setActiveDelivery(buttonName);
    };

    return (
        <>
            <main className="addresses">
                <header className="addresses__header">
                    <div className="header__holder block-normalizer f-row">
                        <button className="addresses__header-arrow simple-button" onClick={() => navigate("/")}>{arrow()}</button>
                        <h1 className="addresses__header-title title-xs">Адреса {activeDelivery === "Самовывоз" ? "самовывоза" : "доставки"}</h1>
                    </div>
                </header>
                <section className="addresses__content block-normalizer f-column">
                    <div className="addresses__delivery-options f-row">
                        <button className={`addresses__delivery-option button-text ${activeDelivery === 'Самовывоз' ? 'addresses__delivery-option_active' : ''}`} onClick={() => handleDeliveryClick('Самовывоз')}>
                            Самовывоз
                        </button>
                        <button className={`addresses__delivery-option button-text ${activeDelivery === 'Доставка' ? 'addresses__delivery-option_active' : ''}`} onClick={() => handleDeliveryClick('Доставка')} >
                            Доставка
                        </button>
                    </div>
                    {orderTypeTuple[0] && orderTypeTuple[1] && (
                        activeDelivery === "Самовывоз"
                            ? (<PickupComp delivery_type={orderTypeTuple[0].order_service_type} delivery_id={orderTypeTuple[0].id} />)
                            : (<DeliveryComp delivery_type={orderTypeTuple[1].order_service_type} delivery_id={orderTypeTuple[1].id}/>)
                    )}
                </section>
                {activeDelivery === "Доставка" && (
                    <footer className="addresses footer_props search__footer">
                        <nav className="footer__nav">
                            <Link to="/profile/addresses/add" className={`footer__auth-btn button-l`} >Добавить адрес</Link>
                        </nav>
                    </footer>)}
            </main>

        </>
    )
}
export default Addresses;