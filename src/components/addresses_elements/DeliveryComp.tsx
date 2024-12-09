import '@styles/pages/Addresses.scss';
import { BaseApiResponseType } from '@myModels/api/BaseApiTypes';
import { simpleGet, apiTags } from "@api/simpleGet"
import useSWR from 'swr';
import { IAddressComp, IDeliveryAddress } from '@myModels/pages/MAdresses';
import { useEffect, useState } from 'react';
import getSvg from '@images/svg'
import { simplePost, apiTags as postTags } from "@api/simplePost"
import { ISimplePost } from "@myModels/api/MSimplePost";

const DeliveryComp = ({ delivery_type, delivery_id }: IAddressComp) => {
    const { data: addresses, error: adError, isLoading: adIsLoading } = useSWR<BaseApiResponseType & { items: IDeliveryAddress[] }>(apiTags.deliver_points, simpleGet);

    const [activeAddress, setActiveAddress] = useState<number>();
    const [savePossible, setSavePossible] = useState(false);

    useEffect(() => {
        const deliveryData = localStorage.getItem("deliveryData");
        if (deliveryData) {
            const { deliveryType, pointUUID } = JSON.parse(deliveryData);
            if (deliveryType === delivery_type) {
                setActiveAddress(pointUUID);
            }
        }
    }, [delivery_type]);

    const handleAddressClick = (buttonId: number) => {
        setActiveAddress(buttonId);
        if (!savePossible)
            setSavePossible(true)
    };
    const handleSaveClick = async (data: IDeliveryAddress) => {
        setSavePossible(false)
        const setDeliveryType = await simplePost({
            path: postTags.userSetDeliveryType(delivery_id),
            data: {
                currentDeliveryPoint: delivery_id,
                currentOrderType: delivery_type
            }
        } as ISimplePost);

        const setDeliveryPoint = await simplePost({
            path: postTags.userSetDeliveryPoint(data.id),
            data: data.id,
        } as ISimplePost)
        if (setDeliveryType?.code == 200 && setDeliveryPoint?.code == 200) {
            localStorage.setItem("deliveryData", JSON.stringify({ 'deliveryType': delivery_type, 'pointUUID': data.id, "deliveryText": `${data.street.city.name}, ${data.street.name}, ${data.house}`}));
        }
        else {
            console.log(`Ошибка запроса. setDeliveryType: ${setDeliveryType}\nsetDeliveryPoint: ${setDeliveryPoint}`)
        }


    }
    const {
        done
    } = getSvg()

    return (
        <div className='addresses__addresses-holder f-column'>
            {addresses?.items.map(address => (
                <div key={address.id} className="addresses__address-button-holder">
                    <button className={`addresses__address-button simple-button text-l ${activeAddress === address.id ? 'addresses__delivery-option_active' : ''}`} onClick={() => handleAddressClick(address.id)}>
                        {`${address.street.city.name}, ${address.street.name}, ${address.house}`}
                    </button>
                    {activeAddress === address.id && savePossible && <button className='simple-button addresses__address-button-save' onClick={() => handleSaveClick(address)}>{done()}</button>}
                </div>
            ))}
        </div>
    )
}
export default DeliveryComp