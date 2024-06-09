import { IPhone } from './IPhone';

export interface ICartItem {
  phoneId: string;
  quantity: number;
  phone?: IPhone;
}

export interface IPhoneInCart {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  discount: number;
}
