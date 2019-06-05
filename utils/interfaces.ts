import { Entry, Asset } from "contentful";

export interface IProduct {
  title: string;
  brand: Entry<IBrand>;
  categories: Entry<ICategory>[];
  photos: Asset[];
}
export interface IBrand {
  name: string;
  url: string;
}
export interface ICategory {
  title: string;
}
