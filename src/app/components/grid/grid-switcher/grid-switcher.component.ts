import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GridContainerService } from '../../../services/grid-container.service';
import { Observable } from 'rxjs';
import { ColumnDisplayType } from '../../../interfaces/column.type';

@Component({
  selector: 'app-grid-switcher',
  templateUrl: './grid-switcher.component.html',
  styleUrl: './grid-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridSwitcherComponent {

  containers$: Observable<Array<ColumnDisplayType>>
  currentDisplay$: Observable<ColumnDisplayType>

  constructor(private gridContainer: GridContainerService) {
    this.containers$ = this.gridContainer.selectDisplays();
    this.currentDisplay$ = this.gridContainer.selectDisplay();
  }

  onSelectionChange(event: any) {
    if(event && event.target && event.target.value) {
      this.gridContainer.setContainer(event.target.value)
    }
  }
}
