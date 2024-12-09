import '@styles/pages/Addresses.scss';
import { simpleGet, apiTags as getTags } from "@api/simpleGet"
import useSWR from 'swr';
import { BaseApiResponseType } from '@myModels/api/BaseApiTypes';
import {
    IPickupAddress, IAddressComp,
    CPickupAddress
} from '@myModels/pages/MAdresses';
import { IOption } from '@myModels/pages/MMain';
import { useState, useEffect } from 'react';
import getSvg from '@images/svg'
import { simplePost, apiTags as postTags } from "@api/simplePost"
import { ISimplePost } from "@myModels/api/MSimplePost";


const PickupComp = ({ delivery_type, delivery_id }: IAddressComp) => {

    const { data: addresses, error: adError, isLoading: adIsLoading } = useSWR<BaseApiResponseType & { items: IPickupAddress[] }>(getTags.pickup_points, simpleGet);
    let normalizedAddresses: IPickupAddress[] = []
    if (addresses?.items) {
        normalizedAddresses = addresses?.items?.map(item => new CPickupAddress(item));
    }
    const [activeAddress, setActiveAddress] = useState<string>();
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

    const handleAddressClick = (buttonId: string) => {
        setActiveAddress(buttonId);
        if (!savePossible)
            setSavePossible(true)
    };
    const handleSaveClick = async (data: IPickupAddress) => {
        setSavePossible(false)
        const setDeliveryType = await simplePost({
            path: postTags.userSetDeliveryType(delivery_id),
            data: {
                currentDeliveryPoint: delivery_id,
                currentOrderType: delivery_type
            }
        } as ISimplePost);

        const setPickUpPoint = await simplePost({
            path: postTags.userSetPickUpPoint(data.uuid),
            data: data.uuid,
        } as ISimplePost)
        if (setDeliveryType?.code == 200 && setPickUpPoint?.code == 200) {
            localStorage.setItem("deliveryData", JSON.stringify({ 'deliveryType': delivery_type, 'pointUUID': data.uuid, "deliveryText": data.restaurant_address}));
        }
        else {
            console.log(`Ошибка запроса. setDeliveryType: ${setDeliveryType}\nsetPickUpPoint: ${setPickUpPoint}`)
        }


    }
    const {
        done
    } = getSvg()

    return (
        <div className='addresses__addresses-holder f-column'>
            {normalizedAddresses.map(address => (
                <div key={address.id} className="addresses__address-button-holder">
                    <button className={`addresses__address-button simple-button text-l ${activeAddress === address.uuid ? 'addresses__delivery-option_active' : ''}`} onClick={() => handleAddressClick(address.uuid)}>
                        {address.restaurant_address}
                    </button>
                    {activeAddress === address.uuid && savePossible && <button className='simple-button addresses__address-button-save' onClick={() => handleSaveClick(address)}>{done()}</button>}
                </div>
            ))}
        </div>
    )
}
export default PickupComp