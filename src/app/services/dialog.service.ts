import { ComponentRef, Injectable, ViewContainerRef } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    public rootViewContainer!: ViewContainerRef;

    // Удаление компонента
    public removeDynamicComponent(component: any) {
        component.destroy();
    }

    // Сборка компонента
    public createComponent(component: any): ComponentRef<any> {
        if(!this.rootViewContainer) {
            console.warn('Need a rootViewContainer');
        }
        
        return this.rootViewContainer.createComponent(component);
    }

    // Контейнер куда будет внедряться форма
    public setRootViewContainerRef(viewContainerRef: any) {
        this.rootViewContainer = viewContainerRef;
    }
}