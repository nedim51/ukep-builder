import { Injectable } from "@angular/core";
import { StateService } from "../../services/core/state.service";
import { IControlTextbox, INITIAL_CONTROL_TEXTBOX } from "../../interfaces/template/control-text-box.interface";
import { IControlTextArea, INITIAL_CONTROL_TEXT_AREA } from "../../interfaces/template/control-text-area.interface";
import { IControlChecbox, INITIAL_CONTROL_CHECKBOX } from "../../interfaces/template/control-check-box.interface";
import { IControlRadioButton, INITIAL_CONTROL_RADIO_BUTTON } from "../../interfaces/template/control-radio-button.interface";
import { IControlFile, INITIAL_CONTROL_FILE } from "../../interfaces/template/control-file-input.interface";
import { IControlCombobox, INITIAL_CONTROL_COMBOBOX } from "../../interfaces/template/control-combo-box.interface";
import { IControlTable, INITIAL_CONTROL_TABLE } from "../../interfaces/template/control-table.interface";
import { ElementEnum } from "./grid-element.data";
import { Observable, map } from "rxjs"; 
import { IElementState, INITIAL_ELEMENT_STATE } from "../interfaces/element-state.interface";
import { IGridElement } from "../interfaces/grid-element.interface";

export type ElementType = IControlTextbox | IControlTextArea | IControlChecbox | IControlRadioButton | IControlFile | IControlCombobox | IControlTable;
export type ElementTypeIdx = keyof ElementType;
export const FIELD_NAME_PREFIX: string = 'field';

@Injectable({
    providedIn: 'root'
})
export class GridElementService extends StateService<IElementState> { 
    
    constructor() {
        super(INITIAL_ELEMENT_STATE)
    }

    updateParam(): void {
        // ... тут нужно подумать как буду обновлять параметры элемента, нужно это сделать как-нибудь гибко
    }

    setElement(element_id: ElementEnum, id: number, order: number = -1): void {
        const newElement = this.createElement(element_id, id, order);

        this.setState({
            elements: [...this.state.elements, newElement]
        })
    }

    removeElement(element: IGridElement): void {
        const newElements = this.state.elements.filter(item => item.name !== `${FIELD_NAME_PREFIX}_${element.id}`);

        this.setState({
            elements: newElements
        })
    }

    createElement(element_id: ElementEnum, id: number, order: number = -1): ElementType {
        switch(element_id) {
            case ElementEnum.TextBox: return this.createTextbox(id, order);
            case ElementEnum.File: return this.createFile(id, order);
            case ElementEnum.CheckBox: return this.createCheckbox(id, order);
            case ElementEnum.RadioButton: return this.createRadioButton(id, order);
            // case ElementEnum.Button: return this.createButton(id, order);
            case ElementEnum.ComboBox: return this.createCombobox(id, order);
            case ElementEnum.Table: return this.createTable(id, order);
            case ElementEnum.TextArea: return this.createTextArea(id, order);
            default: 
                return this.createTextbox(id, order);
        }
    }

    createTextbox(
        id: number,
        order: number = -1
    ): IControlTextbox {
        return {
            ...INITIAL_CONTROL_TEXTBOX,
            name: `${FIELD_NAME_PREFIX}_${id}`,
            caption: `${FIELD_NAME_PREFIX}_${id}`,
            order: order
        }
    }

    createTextArea(
        id: number,
        order: number = -1
    ): IControlTextArea {
        return {
            ...INITIAL_CONTROL_TEXT_AREA,
            name: `${FIELD_NAME_PREFIX}_${id}`,
            caption: `${FIELD_NAME_PREFIX}_${id}`,
            order: order
        }
    }

    createCheckbox(
        id: number,
        order: number = -1
    ): IControlChecbox {
        return {
            ...INITIAL_CONTROL_CHECKBOX,
            name: `${FIELD_NAME_PREFIX}_${id}`,
            caption: `${FIELD_NAME_PREFIX}_${id}`,
            order: order
        }
    }

    createRadioButton(
        id: number,
        order: number = -1
    ): IControlRadioButton {
        return {
            ...INITIAL_CONTROL_RADIO_BUTTON,
            name: `${FIELD_NAME_PREFIX}_${id}`,
            caption: `${FIELD_NAME_PREFIX}_${id}`,
            order: order
        }
    }

    createFile(
        id: number,
        order: number = -1
    ): IControlFile {
        return {
            ...INITIAL_CONTROL_FILE,
            name: `${FIELD_NAME_PREFIX}_${id}`,
            caption: `${FIELD_NAME_PREFIX}_${id}`,
            order: order
        }
    }

    createCombobox(
        id: number,
        order: number = -1
    ): IControlCombobox {
        return {
            ...INITIAL_CONTROL_COMBOBOX,
            name: `${FIELD_NAME_PREFIX}_${id}`,
            caption: `${FIELD_NAME_PREFIX}_${id}`,
            order: order
        }
    }

    createTable(
        id: number,
        order: number = -1
    ): IControlTable {
        return {
            ...INITIAL_CONTROL_TABLE,
            name: `${FIELD_NAME_PREFIX}_${id}`,
            caption: `${FIELD_NAME_PREFIX}_${id}`,
            order: order
        }
    }

    selectState(): Observable<IElementState> {
        return this.select(state => state);
    }
 
    selectElements(): Observable<Array<ElementType>> {
        return this.select(state => state.elements);
    }
 
    selectElementById(id: number): Observable<ElementType | undefined> {
        return this.select(state => state.elements).pipe(
            map(elements => elements.find(element => element.name === `${FIELD_NAME_PREFIX}_${id}`))
        );
    }
} 