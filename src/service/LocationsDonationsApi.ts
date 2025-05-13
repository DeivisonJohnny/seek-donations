import Api from ".";

export type LocationsDonationsType = {
  id: string;
  name: string;
  address: string;
  city: string;
  url: string;
  createdAt?: string;
  updateAt?: string;
};

export default class LocationsDonationsApi {
  static async create(data: LocationsDonationsType) {
    return Api.post("/locations-donations", data);
  }

  static async list(): Promise<LocationsDonationsType[]> {
    return Api.get("/locations-donations");
  }
}
