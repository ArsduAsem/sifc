import {Injectable} from "@angular/core";
import {combineLatest, Observable} from "rxjs";
import {Incoming, Item, ItemRow, ItemStats, Outgoing, WithId} from "../../../../../types";
import {map} from "rxjs/operators";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable()
export class ItemsStatsService {

  constructor(
    private firestore: AngularFirestore
  ) {}

  get(): Observable<ItemStats[]> {
    return combineLatest(
      this.firestore.collection<Item>('lab1-items').get(),
      this.firestore.collection<Item>('lab1-incomings').get(),
      this.firestore.collection<Item>('lab1-outgoings').get(),
    ).pipe(
      map(([ items, incomings, outgoings ]) => [
        items.docs.map(item => ({...item.data(), id: item.id})),
        incomings.docs.map(item => ({...item.data(), id: item.id})),
        outgoings.docs.map(item => ({...item.data(), id: item.id})),
      ]),
      map(([items, incoming, outgoings]: [WithId<Item>[], WithId<Incoming>[], WithId<Outgoing>[]]) => [
        new Map<string, ItemStats>(items.map(item => [item.id, {
          name: item.name,
          producer: item.producer,
          date: item.date.toDate(),
          totalSells: 0,
          totalSellsMoney: 0,
          totalBuys: 0,
          totalBuysMoney: 0,
          buyAvgPrice: 0,
          sellAvgPrice: 0,
          totalProfit: 0,
          sellPrices: [],
          sells: [],
          buyPrices: [],
          buys: [],
        }])),
        incoming,
        outgoings,
      ]),
      map(([items, incomings, outgoings]: [Map<string, ItemStats>, WithId<Incoming>[], WithId<Outgoing>[]]): Map<string, ItemStats> => {
        incomings.forEach((incoming: Incoming) => {
          incoming.items.forEach((item: ItemRow) => {
            if (!items.has(item.itemId.id)) return;

            const itemStats = items.get(item.itemId.id);

            itemStats.totalBuys += item.quantity
            itemStats.totalBuysMoney += item.quantity * item.price
            itemStats.buyPrices.push(item.price)
            itemStats.buys.push({
              date: incoming.date.toDate(),
              price: item.price,
              quantity: item.quantity
            })
          })
        })

        outgoings.forEach((outgoing: Outgoing) => {
          outgoing.items.forEach((item: ItemRow) => {
            if (!items.has(item.itemId.id)) return;

            const itemStats = items.get(item.itemId.id);

            itemStats.totalSells += item.quantity
            itemStats.totalSellsMoney += item.quantity * item.price
            itemStats.sellPrices.push(item.price)
            itemStats.sells.push({
              date: outgoing.date.toDate(),
              price: item.price,
              quantity: item.quantity
            })
          })
        })

        return items
      }),
      map((items: Map<string, ItemStats>) => [...items.values()]),
      map((items: ItemStats[]) => items.map(item => ({
        ...item,
        totalProfit: item.totalBuysMoney - item.totalSellsMoney,
        sellAvgPrice: item.sellPrices.reduce((total, x) => total+x, 0) / item.sellPrices.length,
        buyAvgPrice: item.buyPrices.reduce((total, x) => total+x, 0) / item.buyPrices.length,
      })))
    )
  }
}
