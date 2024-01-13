import { Injectable } from "@angular/core";
import { StateService } from "./core/state.service";

@Injectable({
    providedIn: 'root'
})
export class GridElementService extends StateService<any> {
    
    constructor() {
        super([])
    }
}