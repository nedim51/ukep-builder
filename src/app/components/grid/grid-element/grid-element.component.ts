import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Input, SimpleChanges } from '@angular/core';
import { IGridElement, INITIAL_GRID_ELEMENT } from '../interfaces/grid-element.interface';
import { GridSelectionService } from '../services/grid-selection.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-grid-element',
  templateUrl: './grid-element.component.html',
  styleUrl: './grid-element.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridElementComponent {

  @Input({ alias: 'element' })
  element: IGridElement = INITIAL_GRID_ELEMENT

  selectedElement$: Observable<IGridElement | undefined> = of(undefined)
  
  @HostBinding('attr.tabindex') tabindex: number = 0;

  @HostListener('focus', ['$event'])
  onElementFocus(event: any) {
    this.gridSelection.setSelection(this.element);
  }

  constructor(private gridSelection: GridSelectionService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['element'].firstChange) {
      this.selectedElement$ = this.gridSelection.selectByType('elements', changes['element'].currentValue.id) as Observable<IGridElement | undefined>;
    }
  }
}
