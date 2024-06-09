import { IPhone } from '../../interfaces/IPhone';
import { IFormPhoneData } from './IFormPhoneData';

export function transformFromPhoneDataToFormPhoneData(
  phone: IPhone
): IFormPhoneData {
  return {
    name: phone.name,
    manufacturer: phone.manufacturer.name,
    model: phone.model,
    price: phone.price,
    id: phone.id,
    discount: phone.discount,
    ram: parseInt(phone.specification.RAM),
    camera: parseInt(phone.specification.Camera),
    battery: parseInt(phone.specification.Battery),
    screen: parseInt(phone.specification.Screen),
    image: phone.image,
  } as IFormPhoneData;
}

export function transformFromFormPhoneDataToPhoneData(
  data: IFormPhoneData
): IPhone {
  return {
    id: Math.random().toString(36).substring(3, 10),
    name: data.manufacturer + ' ' + data.model,
    model: data.model,
    manufacturer: {
      name: data.manufacturer,
    },
    image: data.image,
    specification: {
      RAM: `${data.ram}GB`,
      Battery: `${data.battery}mAh`,
      Screen: `${data.screen}\"`,
      Camera: `${data.camera}MP`,
    },
    discount: data.discount,
    price: data.price,
  };
}
