import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuilderRoutingModule } from './builder-routing.module';
import { BuilderComponent } from './builder.component';
import { HeaderComponent } from '../components/header/header.component';
import { NgUkepIconsModule } from 'ng-ukep-icons';
import { GridDrawComponent } from './components/grid-draw/grid-draw.component';
import { ClassDataService } from '../services/class-data.service';
import { DraggableDropzoneDirective } from '../directives/draggable-dropzone/draggable-dropzone.directive';
import { ResizableDirective } from '../directives/resizable/resizable.directive';
import { DraggableDirective } from '../directives/draggable/draggable.directive';
import { GridModule } from '../components/grid/grid.module';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColClassPipe } from './pipes/col-class.pipe';


@NgModule({
  declarations: [
    BuilderComponent,
    GridDrawComponent,
    ColClassPipe,
  ],
  imports: [
    CommonModule,
    HeaderComponent,
    BuilderRoutingModule,
    NgUkepIconsModule,
    DraggableDropzoneDirective, 
    ResizableDirective, 
    DraggableDirective,
    NgbDropdownModule,
    NgbTooltipModule,
    GridModule, 
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: ClassDataService,
      useFactory: () => {
        const classDataService = new ClassDataService();
        classDataService.initState();
        return classDataService;
      },
    }
  ]
})
export class BuilderModule { }
