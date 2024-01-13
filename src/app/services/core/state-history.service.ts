import { BehaviorSubject, Observable, map } from "rxjs";
import { StateService } from "./state.service";
import { deepCopy } from "../../utils/helper";

export class StateHistoryService<T> extends StateService<T> {

    private initialState: T;
    private currentIndex$: BehaviorSubject<number> = new BehaviorSubject(0);
    private history$: BehaviorSubject<Partial<T>[]>;

    protected get history(): Partial<T>[] {
        return this.history$.getValue()
    }

    protected get currentIndex(): number {
        return this.currentIndex$.getValue()
    }

    constructor(initialState: T) {
        super(initialState)
        this.history$ = new BehaviorSubject<Partial<T>[]>([{ ...initialState }])
        this.initialState = initialState;
    }

    public undo(): void {
        if (this.currentIndex > 0) {
            this.currentIndex$.next(this.currentIndex - 1);
            this.updateStateFromHistory()
        }
    }

    public redo(): void {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex$.next(this.currentIndex + 1);
            this.updateStateFromHistory()
        }
    }

    private updateStateFromHistory(): void {
        const previousState = this.history[this.currentIndex - 1] || this.initialState;
        const currentState = this.history[this.currentIndex];

        const change = this.calculateChange(previousState as any, currentState);

        this.state$.next({ ...previousState, ...change })
    }

    public canUndo(): Observable<boolean> {
        return this.currentIndex$.asObservable()
            .pipe(map(currentIndex => currentIndex > 0))
    }

    public canRedo(): Observable<boolean> {
        return this.currentIndex$.asObservable()
            .pipe(map(currentIndex => currentIndex < this.history.length - 1))
    }

    protected override setState(newState: Partial<T | T[]>): void {
        const previousState = this.state;
        const change = this.calculateChange(deepCopy(previousState), deepCopy(newState));

        this.state$.next({
            ...this.state,
            ...newState
        })

        const newHistory = [...this.history];
        newHistory.splice(this.currentIndex + 1);
        newHistory.push(change);
        this.history$.next(newHistory);
        this.currentIndex$.next(newHistory.length - 1);
    }

    private calculateChange(previousState: T, newState: Partial<T | T[]>): T {
        const change: Partial<T> = {};

        (Object.keys(newState) as Array<keyof T>).forEach((key: keyof T) => {
            const previousValue = (previousState as any)[key];
            const newValue = (newState as any)[key];

            if (Array.isArray(previousValue) && Array.isArray(newValue)) {
                const arrayChanges = this.calculateArrayChange(previousValue, newValue);
                if (Object.keys(arrayChanges).length > 0) {
                    (change as any)[key] = arrayChanges;
                }
            } else if (previousValue !== newValue) {
                (change as any)[key] = newValue;
            }
        });

        return { ...previousState, ...change } as T;
    }

    private calculateArrayChange(previousArray: any[], newArray: any[]): Partial<any> {
        const arrayChanges: Partial<any>[] = [];

        newArray.forEach((newItem, index) => {
            const prevItem = previousArray[index];
            if (prevItem !== newItem) {
                arrayChanges.push(newItem);
            }
        });

        return arrayChanges;
    }
}
