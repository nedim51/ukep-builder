import { Inject, Injectable, InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { map, take, tap } from "rxjs/operators";

export const OBJECT_ID: InjectionToken<number> = new InjectionToken('OBJECT_ID_TOKEN');

@Injectable()
export class GridObjectIdService {

    constructor(@Inject(OBJECT_ID) private objectId: BehaviorSubject<number>) { }

    private init(): void {
        // Todo. When switch between templates
    }

    public next(increment: number = 1): number {
        const current = this.objectId.getValue();
        this.objectId.next(current + increment);
        return this.objectId.getValue();
    }

    public next$(increment: number = 1): Observable<number> {
        return this.objectId.pipe(
            take(1),
            map(current => current + increment),
            tap(newId => this.objectId.next(newId)),
        );
    }
}