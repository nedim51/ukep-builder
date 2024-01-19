import { Injectable } from "@angular/core";
import { DialogService } from "../services/dialog.service";
import { Observable, tap } from "rxjs";
import { GridDrawComponent } from "./components/grid-draw/grid-draw.component";

@Injectable({
    providedIn: 'root'
})
export class BuilderDialogService {

    constructor(private dialog: DialogService) {}

    drawGridDialog(title: string): Observable<any> {
        const component = this.dialog.createComponent(GridDrawComponent);

        component.instance.title = title;

        this.dialog.rootViewContainer.insert(component.hostView);
        
        return component.instance.close.pipe(tap(_ => this.dialog.removeDynamicComponent(component)))
    }
}