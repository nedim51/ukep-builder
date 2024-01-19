import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GridContainerService } from '../services/grid-container.service';
import { Observable } from 'rxjs';
import { ColumnDisplayType } from '../../interfaces/column.type';
import { ThemeService } from '../../services/root/theme.service';
import { IThemeColors } from '../../interfaces/theme/theme.interface';

@Component({
  selector: 'app-grid-switcher',
  templateUrl: './grid-switcher.component.html',
  styleUrl: './grid-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridSwitcherComponent {

  containers$: Observable<Array<ColumnDisplayType>>
  currentDisplay$: Observable<ColumnDisplayType>
  themeName$: Observable<IThemeColors>

  constructor(private gridContainer: GridContainerService, 
    private themeService: ThemeService) {
    this.themeName$ = this.themeService.selectCurrentThemeName()
    this.containers$ = this.gridContainer.selectDisplays();
    this.currentDisplay$ = this.gridContainer.selectDisplay();
  }

  onSelectionChange(container: ColumnDisplayType) {
    this.gridContainer.setContainer(container)
  }
}
