import { ChangeDetectionStrategy, Component, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, filter, map, mergeMap } from 'rxjs';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { IRouterData } from './interfaces/router/router-data.interface';
import { DialogService } from './services/core/dialog.service';

// Столкнулся с такой ошибкой что standalone components не удавалось вкладывать друг в друга, 
// так и не понял с чем это связано, не мог понять почему проект валится когда нажимаешь начать (строятся простые строки и колонки) и на этом валится
// с ошибкой "Cannot read properties of undefined (reading 'ɵcmp')", 
// в итоге решил попробовать вынести все grid... components в один модуль и все заработало (вложение rows в cols component)

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {  

  routeData$: Observable<IRouterData> = this.router.events.pipe(
    filter(e => e instanceof NavigationEnd), 
    map(() => this.activatedRoute), 
    map((route) => { while(route.firstChild) { route = route.firstChild } return route }), 
    // map((route) => { return route.firstChild }), // -- !!!
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
    private dialog: DialogService,
    private viewContainerRef: ViewContainerRef,
    private activatedRoute: ActivatedRoute) {
    this.dialog.setRootViewContainerRef(this.viewContainerRef)
  }
}