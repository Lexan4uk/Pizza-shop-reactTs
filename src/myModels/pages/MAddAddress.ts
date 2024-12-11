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
export interface IFormData {
  flat: string;
  entrance: string;
  floor: string;
  doorphone: string;
  comment: string;
}

export interface IAddressState {
  selectedStreetName: string;
  selectedStreetShortName: string;
  selectedStreetId: string;
  selectedHouseName: string;
  selectedHouseId: string;
}
export class CAddressState implements IAddressState {
  selectedStreetName: string;
  selectedStreetShortName: string;
  selectedStreetId: string;
  selectedHouseName: string;
  selectedHouseId: string;

  constructor(data: Partial<IAddressState> = {}) {
    this.selectedStreetName = data.selectedStreetName ?? '';
    this.selectedStreetShortName = data.selectedStreetShortName ?? '';
    this.selectedStreetId = data.selectedStreetId ?? '';
    this.selectedHouseName = data.selectedHouseName ?? '';
    this.selectedHouseId = data.selectedHouseId ?? '';
  }
}