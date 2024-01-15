import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherRoutingModule } from './other-routing.module';
import { OtherComponent } from './other.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    OtherComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    OtherRoutingModule
  ]
})
export class OtherModule { }
 