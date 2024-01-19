import { Inject, Injectable, InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { map, take, tap } from "rxjs/operators";

export const GLOBAL_OBJECT_ID: InjectionToken<number> = new InjectionToken('GLOBAL_OBJECT_ID_TOKEN');

@Injectable()
export class GlobalObjectIdService {

    constructor(@Inject(GLOBAL_OBJECT_ID) private globalObjectId: BehaviorSubject<number>) { }

    private init(): void {
        // Todo. When switch between templates
    }

    public next(increment: number = 1): number {
        const current = this.globalObjectId.getValue();
        this.globalObjectId.next(current + increment);
        return this.globalObjectId.getValue();
    }

    public next$(increment: number = 1): Observable<number> {
        return this.globalObjectId.pipe(
            take(1),
            map(current => current + increment),
            tap(newId => this.globalObjectId.next(newId)),
        );
    }
}