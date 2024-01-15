import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, filter, map, mergeMap } from 'rxjs';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { IRouterData } from './interfaces/router/router-data.interface';
import { NgUkepIconsRegistry } from 'ng-ukep-icons';
import { completeIconSet } from 'ng-ukep-icons-builder';
import { ThemeService } from './services/core/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {  

  public routeData$: Observable<IRouterData> = this.router.events.pipe(
    filter(e => e instanceof NavigationEnd), 
    map(() => this.activatedRoute), 
    map((route) => { while(route.firstChild) { route = route.firstChild } return route }), 
    // map((route) => { return route.firstChild}), // -- !!!
    mergeMap((route) => route!.data), 
    map((data) => { return { 
      sidebar: [undefined, null, true].includes(data['sidebar']),
      header: [undefined, null, true].includes(data['header']),
      title: data['title'],
      icon: data['icon']
    }})
  )

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private ukepIconsRegistry: NgUkepIconsRegistry,
    private themeService: ThemeService) {
    this.themeService.loadTheme();
    this.ukepIconsRegistry.registerIcons(completeIconSet); // completeSet потом перебрать обязательно !!!
  }
}
