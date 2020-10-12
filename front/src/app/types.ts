import {firestore} from "firebase";

export type WithId<T> = T & { id: string }

export interface Provider {
  name: string;
  address: string;
  phone: string;
  date: firestore.Timestamp;
}

export interface Client {
  name: string;
  address: string;
  phone: string;
  date: firestore.Timestamp;
}

export interface Item {
  name: string;
  producer: string;
  date: firestore.Timestamp
}

export interface ItemMoveStats {
  date: Date;
  price: number;
  quantity: number;
}

export interface ItemStats {
  name: string;
  producer: string;
  date: Date;
  totalSells: number;
  totalSellsMoney: number;
  totalBuys: number;
  buyPrices: number[];
  sellPrices: number[];
  buyAvgPrice: number;
  sellAvgPrice: number;
  totalBuysMoney: number;
  totalProfit: number;
  sells: ItemMoveStats[];
  buys: ItemMoveStats[];
}

export interface PopulatedItem {
  name: string;
  producer: string;
  date: Date;
}

export interface ItemRow {
  itemId: firestore.DocumentReference<Item>;
  quantity: number;
  price: number;
}

export interface Incoming {
  number: number;
  provider: firestore.DocumentReference<Provider>;
  date: firestore.Timestamp;
  items: ItemRow[];
}

export interface Outgoing {
  number: number;
  client: firestore.DocumentReference<Client>;
  date: firestore.Timestamp;
  items: ItemRow[];
}

export interface PopulatedIncoming {
  number: number;
  provider: string;
  date: Date;
  items: (ItemRow & { name: string })[];
  count: number;
  total: number;
}

export interface PopulatedOutgoing {
  number: number;
  client: string;
  date: Date;
  items: (ItemRow & { name: string })[];
  count: number;
  total: number;
}

export interface PopulatedProvider {
  name: string;
  address: string;
  phone: string;
  date: Date;
}

export interface PopulatedClient {
  name: string;
  address: string;
  phone: string;
  date: Date;
}
