import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CreateComponent } from './components/create/create.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingComponent } from './components/setting/setting.component';
import { SuccessComponent } from './components/success/success.component';
import { MonitoringComponent } from './components/monitoring/monitoring.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { NgUkepIconsModule } from 'ng-ukep-icons';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { WellcomeComponent } from './components/wellcome/wellcome.component';


@NgModule({
  declarations: [
    HomeComponent,
    CreateComponent,
    RegisterComponent,
    SettingComponent,
    SuccessComponent,
    MonitoringComponent,
    ArchiveComponent,
    WellcomeComponent
  ],
  imports: [
    CommonModule,
    NgUkepIconsModule,
    NgbDropdownModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
