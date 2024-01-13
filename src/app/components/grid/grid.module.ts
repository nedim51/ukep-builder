import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GridColComponent } from './grid-col/grid-col.component';
import { GridContainerComponent } from './grid-container/grid-container.component';
import { GridElementComponent } from './grid-element/grid-element.component';
import { GridRowComponent } from './grid-row/grid-row.component';
import { GridSwitcherComponent } from './grid-switcher/grid-switcher.component';
import { DraggableDropzoneDirective } from '../../directives/draggable-dropzone/draggable-dropzone.directive';
import { DraggableDirective } from '../../directives/draggable/draggable.directive';
import { GridSelectionService } from './services/grid-selection.service';
import { BehaviorSubject } from 'rxjs';
import { GLOBAL_OBJECT_ID, GlobalObjectIdService } from './services/grid-global-object-id.service';
import { GridTemplateService } from './services/grid-template.service';



@NgModule({
  declarations: [
    GridContainerComponent,
    GridRowComponent,
    GridColComponent,
    GridElementComponent,
    GridSwitcherComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    
    DraggableDirective,
    DraggableDropzoneDirective
  ],
  exports: [
    GridContainerComponent
  ],
  providers: [
    { 
      provide: GLOBAL_OBJECT_ID, 
      useValue: new BehaviorSubject<number>(0) 
    },
    { 
      provide: GlobalObjectIdService, 
      useClass: GlobalObjectIdService 
    },
    { 
      provide: GridSelectionService, 
      useClass: GridSelectionService 
    },
    { 
      provide: GridTemplateService, 
      useClass: GridTemplateService 
    }
  ]
})
export class GridModule { }
