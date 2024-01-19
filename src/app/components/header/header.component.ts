import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { IThemeColors, IThemeSwitcherItem, IThemeSwitcherItems } from '../../interfaces/theme/theme.interface';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ThemeService } from '../../services/root/theme.service';
import { NgbPopoverModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgUkepIconsModule } from 'ng-ukep-icons';
import { ukepIcons } from '../../../../dist/ng-ukep-icons-builder/build/ukep-icons.model';

@Component({
  selector: 'ukep-header, [ukep-header]',
  standalone: true, 
  imports: [CommonModule, NgUkepIconsModule, NgbPopoverModule, NgbTooltipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
 
  @HostBinding('class') 
  classes: string = 'navbar navbar-expand-lg navbar-light bg-body-tertiary';

  @Input('title')
  title: string | undefined = undefined;

  @Input('icon')
  icon: ukepIcons | undefined = undefined;

  currentTheme$: Observable<IThemeSwitcherItem>
  currentThemeName$: Observable<IThemeColors>
  themeList$: Observable<IThemeSwitcherItems>

  constructor(
    private themeService: ThemeService) {  
    this.currentTheme$ = this.themeService.selectCurrentTheme();
    this.currentThemeName$ = this.themeService.selectCurrentThemeName();
    this.themeList$ = this.themeService.selectThemeList();
  }

  onThemeChange(item: IThemeSwitcherItem): void {
    this.themeService.setTheme(item.code);
  }
}
