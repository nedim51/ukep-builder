import { ChangeDetectionStrategy, Component, HostBinding, OnInit, WritableSignal, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ISidebarItems, ISidebarItem } from './sidebar-item.interface';
import { CommonModule } from '@angular/common';
import { Observable, debounceTime, map, takeUntil, tap } from 'rxjs';
import { SidebarDataService } from './sidebar-data.service';
import { IAnimationDuration, collapseItems, collapseWidth, collapseWidthItems } from './sidebar.animations';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';
import { IThemeColors } from '../../interfaces/theme/theme.interface';
import { Destroy } from '../../services/core/destroy.service';
import { NgUkepIconsModule } from 'ng-ukep-icons';
import { ThemeService } from '../../services/core/theme.service';
import { AuthService } from '../../services/auth/auth.service';
import { IUser } from '../../interfaces/user/user.interface';

const DEFAULT_DURATION: IAnimationDuration = { duration: 150, durationType: 'ms' };
const DEFAULT_SEARCH_DEBOUNCE_TIME: number = 800;
 
@Component({ 
  selector: '[ukep-sidebar]',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule, NgUkepIconsModule, NgbTooltipModule], 
  providers: [SidebarDataService],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    collapseItems(DEFAULT_DURATION.duration, DEFAULT_DURATION.durationType),
    collapseWidthItems(DEFAULT_DURATION.duration, DEFAULT_DURATION.durationType),
    collapseWidth(DEFAULT_DURATION.duration, DEFAULT_DURATION.durationType)
  ]
})
export class SidebarComponent implements OnInit {

  // Animations
  @HostBinding('@collapseWidthItems') collapseWidthItems: boolean = true
  @HostBinding('@collapseWidth') collapseWidthItems2: boolean = true

  @HostBinding('class.bg-body-tertiary') sidebarBgColor: boolean = true;
  
  public applicationThemeName$: Observable<IThemeColors>;

  public items$: Observable<ISidebarItems>
  public itemsId$: Observable<number[]>

  public opened: WritableSignal<Set<number>> = signal(new Set<number>());
  public found: WritableSignal<ISidebarItems> = signal([]);

  public form: FormGroup = new FormGroup({
    search: new FormControl()
  });

  user$: Observable<IUser>;

  constructor(
    private auth: AuthService,
    private destroy$: Destroy,
    private themeService: ThemeService,
    private sidebarData: SidebarDataService) {
    this.items$ = this.sidebarData.selectItems();
    this.itemsId$ = this.items$.pipe(map(items => items.map(item => item.id)));
    this.applicationThemeName$ = this.themeService.selectCurrentThemeName();
    this.user$ = this.auth.user;
  }

  ngOnInit(): void {
    this.form.controls['search'].valueChanges.pipe(
      debounceTime(DEFAULT_SEARCH_DEBOUNCE_TIME), 
      tap(searchValue => this.search(searchValue)),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  private matcher = function(searchValue: string, item: ISidebarItem) {
    return item.title.toLowerCase().includes(searchValue.toLowerCase())
  }

  public selectItemsAtParent$(parentId: number): Observable<ISidebarItems> {
    return this.items$.pipe(
      map(items => items.filter(item => parentId ? item.parent_id === parentId : !item.parent_id))
    );
  }

  public toggle(id: number): void {
    this.hasChildren$(id).pipe(
      filter(item => item != undefined),
      tap(item => this.opened().has(id) ? this.opened().delete(id) : !this.opened().add(id)),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  public hasChildren$(id: number): Observable<ISidebarItem | undefined> {
    return this.items$.pipe(map(items => items.find(item => item.parent_id === id)));
  }

  public search(searchValue: string): void {
    if(!searchValue) {
      this.searchReset()
      return; 
    }

    this.items$.pipe(
      map(items => items.filter(item => this.matcher.call(this, searchValue, item))),
      tap(items => this.found.set(items)),
      map(items => items.map(item => item.parent_id).filter(parent_id => parent_id != undefined) as number[]),
      tap(parentIds => parentIds.forEach(parentId => this.opened().add(parentId))),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  public searchReset(): void {
    this.found.set([]);
  }

  public collapseAll(): void {
    this.opened().clear();
  }

  public expandAll(): void {
    this.itemsId$.pipe(
      tap(itemsId => this.opened.set(new Set(itemsId))),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  public logout(): void {
    this.auth.logout()
  }
}
