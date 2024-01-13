import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export interface ILogEntry {
    action: string;
    timestamp: Date;
    payload?: any;
}

export type ILogEntries = Array<ILogEntry>;

@Injectable({
    providedIn: 'root',
})
export class LogService {
    private logSubject: BehaviorSubject<ILogEntries> = new BehaviorSubject<ILogEntries>([]);
    log$: Observable<ILogEntries> = this.logSubject.asObservable();

    private enableConsoleLogging: boolean = false

    logAction(action: string, payload?: any): void {
        const logEntry: ILogEntry = { action, timestamp: new Date(), payload };
        const newLog = [...this.logSubject.getValue(), logEntry];
        this.logSubject.next(newLog);
    
        if (this.enableConsoleLogging) {
            console.log(`Action: ${action}, Timestamp: ${logEntry.timestamp}, Payload:`, payload);
        }
    }

    filterLogs(filter: (logEntry: ILogEntry) => boolean): ILogEntries {
        return this.logSubject.getValue().filter(filter);
    }

    clearLog(): void {
        this.logSubject.next([]);
    }
}