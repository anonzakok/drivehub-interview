import { ICarItem, ICart} from './cart.interface';

export const INITAL_CAR_ITEM: ICarItem = {
  carId: '',
  carTitle: '',
  carPrice: 0,
  carPhoto: '',
  carTotal: 0,
}
export const INITIAL_CART: ICart = {
  car_list: [],
  cart: {
    total: 0,
    discount: 0,
    grandTotal: 0,
  }
};
