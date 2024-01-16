import { Injectable, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({ 
  providedIn: 'root' 
})
export class Destroy extends Observable<void> implements OnDestroy {
  private readonly destroy$ = new ReplaySubject<void>(1);

  constructor() {
    super((subscriber) => this.destroy$.subscribe(subscriber));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
