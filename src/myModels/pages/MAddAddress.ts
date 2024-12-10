export interface IAddAddressData {
  comment: string;
  latitude: number;
  longitude: number;
  zipIndex: string;
  house: string;
  building: string;
  flat: string;
  entrance: string;
  floor: string;
  doorphone: string;
  street: string;
}

export interface IAddressState {
  selectedStreetName: string;
  selectedStreetId: string;
  selectedHouseName: string;
  selectedHouseId: string;
}
export class CAddressState implements IAddressState {
  selectedStreetName: string;
  selectedStreetId: string;
  selectedHouseName: string;
  selectedHouseId: string;

  constructor(data: Partial<IAddressState> = {}) {
    this.selectedStreetName = data.selectedStreetName ?? '';
    this.selectedStreetId = data.selectedStreetId ?? '';
    this.selectedHouseName = data.selectedHouseName ?? '';
    this.selectedHouseId = data.selectedHouseId ?? '';
    //console.log(data)
  }
}