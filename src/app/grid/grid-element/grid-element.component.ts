import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Input, SimpleChanges } from '@angular/core';
import { IGridElement, INITIAL_GRID_ELEMENT } from '../interfaces/grid-element.interface';
import { GridSelectionService } from '../services/grid-selection.service';
import { Observable, filter, map } from 'rxjs';
import { ElementType, GridElementService } from '../services/grid-element.service';
import { IControlChecbox } from '../../interfaces/template/control-check-box.interface';
import { IDictItems } from '../../interfaces/template/dict.interface';
import { ElementEnum } from '../services/grid-element.data';
import { ControlTypeEnum } from '../../interfaces/template/control-type.enum';

@Component({
  selector: 'app-grid-element',
  templateUrl: './grid-element.component.html',
  styleUrl: './grid-element.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridElementComponent {

  @Input({ alias: 'element' })
  element: IGridElement = INITIAL_GRID_ELEMENT;

  readonly elementEnum = ElementEnum;

  element$?: Observable<ElementType | undefined>;
  dictItems$?: Observable<IDictItems | undefined>;
  selectedElement$?: Observable<IGridElement | undefined>;
  
  @HostBinding('attr.tabindex') tabindex: number = 0;

  @HostListener('focus', ['$event'])
  onElementFocus(event: any) {
    this.gridSelection.setSelection(this.element);
  }

  constructor(
    private gridElement: GridElementService,
    private gridSelection: GridSelectionService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['element'].firstChange) {
      this.selectedElement$ = this.gridSelection.selectByType('elements', changes['element'].currentValue.id) as Observable<IGridElement | undefined>;
      
      this.element$ = this.gridElement.selectElementById(changes['element'].currentValue.id);

      this.dictItems$ = this.element$.pipe(
        filter(element => element !== undefined && element.type === ControlTypeEnum.Dict), 
        map(element => (element as IControlChecbox).dict_items)
      );
    }
  }
}
