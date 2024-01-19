import { Observable, Subject } from "rxjs"
import { finalize } from "rxjs/operators"
import { prepare } from "./prrepare.operator"

export const indicate = <T>(indicator: Subject<boolean>) => {
  return (source: Observable<T>): Observable<T> => source.pipe(
    prepare(() => indicator.next(true)),
    finalize(() => indicator.next(false))
  )
}