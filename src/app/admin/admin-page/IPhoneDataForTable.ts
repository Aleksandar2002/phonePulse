export interface IBaseTableData {
  id: string;
}

export interface IPhoneDataForTable extends IBaseTableData {
  name: string;
  image: string;
  price: string;
  discount: string;
  manufacturer: string;
  specification: string;
}
