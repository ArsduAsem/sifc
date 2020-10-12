import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {firestore} from "firebase";
import {WithId} from "./types";

export const mapFireSnapItems = <T = firestore.DocumentData>() => (obs: Observable<firestore.QuerySnapshot<T>>): Observable<WithId<T>[]> => obs.pipe(
  map(snap => snap.docs.map(doc => ({ ...doc.data(), id: doc.id })))
)
