export interface IDeliveryAddress {
    house: string;
    id: number;
    latitude: number;
    longitude: number;
    street: IStreet
}
export interface IPickupAddress {
    code: number;
    id: number;
    inn: string;
    latitude: number;
    longitude: number;
    name: string;
    public_key: string;
    restaurant_address: string;
    service_id: number;
    uuid: string;
}
export class CPickupAddress implements IPickupAddress {
    code: number;
    id: number;
    inn: string;
    latitude: number;
    longitude: number;
    name: string;
    public_key: string;
    restaurant_address: string;
    service_id: number;
    uuid: string;
    constructor(data: Partial<IPickupAddress>) {
        this.code = data.code ?? 0;
        this.id = data.id ?? 0;
        this.inn = data.inn ?? "";
        this.latitude = data.latitude ?? 0;
        this.longitude = data.longitude ?? 0;
        this.name = data.name ?? "";
        this.public_key = data.public_key ?? "";
        this.restaurant_address = this.processAddress(data.restaurant_address || "") ?? "";
        this.service_id = data.service_id ?? 0;
        this.uuid = data.uuid ?? "";
    
      }

      private processAddress(address: string): string {
        const words = address.split(" ");
        return words.slice(2).join(" ");
      }
}
export interface IStreet {
    city: ICity;
    id: string;
    name: string
}

export interface ICity {
    classifier_id: string;
    id: string;
    name: string
}
export interface IDeliveryTypes {
    id: string;
    name: string;
    order_service_type: string;
}
export interface IAddressComp {
    delivery_type: string;
    delivery_id: string;
}

