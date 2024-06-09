import { IManufacturer } from './IManufacturer';
import { ISpecification } from './ISpecification';

export interface IPhone {
  model: string;
  image: string;
  price: number;
  discount: string;
  manufacturer: IManufacturer;
  specification: ISpecification;
  name: string;
  id: string;
}
