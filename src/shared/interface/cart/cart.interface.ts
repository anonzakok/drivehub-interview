export interface ICarItem {
  carId: string;
  carTitle: string;
  carPrice: number;
  carPhoto: string;
  carTotal: number;
}

export interface ICart {
  car_list: ICarItem[];
  cart: {
    total: number;
    discount: number;
    grandTotal: number;
  };
}
