import { ChangeDetectionStrategy, Component, WritableSignal, signal } from '@angular/core';
import { Observable, filter, map, takeUntil, tap } from 'rxjs';
import { IThemeColors } from '../../../interfaces/theme/theme.interface';
import { Router } from '@angular/router';
import { ukepIcons } from 'ng-ukep-icons-builder';
import { Destroy } from '../../../services/core/destroy.service';
import { TreeListDataService } from './tree-list-data.service';
import { ThemeService } from '../../../services/root/theme.service';
import { ITreeListItem, ITreeListItems } from './tree-list.interface';

export interface IDropdownOpenItem {
  icon_name: ukepIcons;
  id: number;
  code: string;
  title: string;
  icon_class_list: string;
}

@Component({ 
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {

  themeName$: Observable<IThemeColors>;
  treeListData$: Observable<ITreeListItems>
  public opened: WritableSignal<Set<number>> = signal(new Set<number>());
  public found: WritableSignal<ITreeListItems> = signal([]);

  readonly appendThisDirectoryItems = appendThisDirectoryItems;
  readonly downloadThisDirectoryItems = downloadThisDirectoryItems;

  constructor(
    private router: Router,
    private destroy$: Destroy,
    private treeListData: TreeListDataService,
    private themeService: ThemeService) {
    this.treeListData$ = this.treeListData.selectItems();
    this.themeName$ = this.themeService.selectCurrentThemeName();
  }

  public selectItemsAtParent$(parentId: number): Observable<ITreeListItems> {
    return this.treeListData$.pipe(
      map(items => items.filter(item => item.parent_id === parentId ))
    );
  }

  public hasChildren$(id: number): Observable<ITreeListItem | undefined> {
    return this.treeListData$.pipe(map(items => items.find(item => item.parent_id === id)));
  }

  public toggle(id: number): void {
    this.hasChildren$(id).pipe(
      filter(item => item != undefined),
      tap(item => this.opened().has(id) ? this.opened().delete(id) : !this.opened().add(id)),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  parentId: WritableSignal<number | undefined> = signal(undefined);
  rootId: WritableSignal<number | undefined> = signal(undefined);
  public breadcrumbs: WritableSignal<Array<any>> = signal([]);

  getdown(downItem: ITreeListItem, parentId: number | undefined): void {
    if(downItem.type === 'file') {
      this.router.navigate(['document'], { queryParams: { doc_id: downItem.id }});
      return;
    }
    this.rootId.set(downItem.id);
    this.breadcrumbs.update((items) => [...items, downItem])
    this.parentId.set(parentId)
  }

  getup(currentId: number | undefined): void {
    this.breadcrumbs.update((items) => items.filter(item => item.id != currentId))
    this.rootId.set(this.parentId());
  }

  getupByBreadcrumb(id: number | undefined): void {
    if(id != undefined) {
      const breadcrumbIdx = this.breadcrumbs().findIndex(i => i.parent_id === id);
      this.breadcrumbs.update((items) => items.splice(breadcrumbIdx, items.length - breadcrumbIdx))
    } 
    else {
      this.breadcrumbs.set([]);
    }

    this.rootId.set(id);
  }
}

const appendThisDirectoryItems: Array<IDropdownOpenItem> = [
  {
    id: 1,
    code: 'new_form',
    title: 'Добавить форму',
    icon_name: 'file_plus',
    icon_class_list: 'svg-icon svg-icon-md',
  },
  {
    id: 2,
    code: 'new_directory',
    title: 'Добавить папку',
    icon_name: 'folder_plus',
    icon_class_list: 'svg-icon svg-icon-md',
  },
  {
    id: 3,
    code: 'upload_file',
    title: 'Загрузить форму',
    icon_name: 'upload',
    icon_class_list: 'svg-icon svg-icon-md',
  }
]

const downloadThisDirectoryItems: Array<IDropdownOpenItem> = [
  {
    id: 1,
    code: 'new_file',
    title: 'Скачать форму [*.json]',
    icon_name: 'download',
    icon_class_list: 'svg-icon svg-icon-md',
  },
  {
    id: 2,
    code: 'new_file',
    title: 'Скачать директорию архивом [*.zip]',
    icon_name: 'downloads_folder',
    icon_class_list: 'svg-icon svg-icon-md',
  },
];
