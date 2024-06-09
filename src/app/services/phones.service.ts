import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPhone } from '../interfaces/IPhone';
import { filter, map, Observable } from 'rxjs';
import { IPhonesQueryParams } from '../interfaces/IPhonesQueryParams';
import { ICartItem, IPhoneInCart } from '../interfaces/ICartItem';

@Injectable({
  providedIn: 'root',
})
export class PhonesService {
  baseUrl: string = 'http://localhost:3000/phones';

  constructor(private http: HttpClient) {}

  getPhones(
    phoneQueryParams: IPhonesQueryParams | null = null
  ): Observable<IPhone[]> {
    return this.http.get<IPhone[]>(this.baseUrl).pipe(
      map((phones: IPhone[]) => {
        let temp = phones;

        if (phoneQueryParams) {
          let { keyword, sortType } = phoneQueryParams;
          if (keyword) {
            temp = phones.filter((x) =>
              x.name.toLowerCase().includes(keyword.toLowerCase())
            );
          }
          if (sortType) {
            temp = this.sortPhonesByParams(temp, sortType);
          }
        }

        return temp;
      })
    );
  }

  getPhone(id: string): Observable<IPhone> {
    return this.http.get<IPhone>(this.baseUrl + `/${id}`);
  }

  transferArrayOfIdsToPhoneObjectsArray(
    userCartItems: ICartItem[]
  ): Observable<IPhoneInCart[]> {
    return this.http.get<IPhone[]>(this.baseUrl).pipe(
      map((phones: IPhone[]) => {
        // return phones.filter((phone) => {
        //   return ids.includes(phone.id);
        // });

        let cartItemsWithPhoneObjectData = userCartItems.map((item) => {
          item.phone = phones.find((x) => x.id == item.phoneId);
          return item;
        });

        let arr: IPhoneInCart[] = cartItemsWithPhoneObjectData.map(
          (item: ICartItem) => {
            return this.transformIPhoneToIPhoneInCart(item);
          }
        );
        return arr;
      })
    );
  }

  transformIPhoneToIPhoneInCart(cartItem: ICartItem): IPhoneInCart {
    let { phone, quantity } = cartItem;
    phone = phone as IPhone;
    return {
      id: phone.id,
      price: +phone.price,
      discount: +phone.discount,
      name: phone.name,
      quantity: quantity,
      image: phone.image,
    } as IPhoneInCart;
  }

  sortPhonesByParams(phones: IPhone[], sortType: string): IPhone[] {
    let [property, type, propertyType] = sortType.split('_');

    let compareStrings = (a: IPhone, b: IPhone) => {
      return type == 'asc'
        ? (a as any)[property].localeCompare((b as any)[property])
        : (b as any)[property].localeCompare((a as any)[property]);
    };

    let compareNumbers = (a: IPhone, b: IPhone) => {
      return type == 'asc'
        ? (a as any)[property] - (b as any)[property]
        : (b as any)[property] - (a as any)[property];
    };

    let compareFn = propertyType == 'string' ? compareStrings : compareNumbers;

    return phones.slice().sort(compareFn);
  }
}
