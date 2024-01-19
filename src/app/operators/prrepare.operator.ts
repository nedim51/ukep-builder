import { Observable, defer } from "rxjs"

export const prepare = <T>(callback: () => void) => {
  return (source: Observable<T>): Observable<T> => defer(() => {
    callback();
    return source;
  });
}

// export const toClass = <T>(ClassType: { new(): T }) => (source: Observable<T>) => source.pipe(
//   map(val => Object.assign(new ClassType(), val))
// )