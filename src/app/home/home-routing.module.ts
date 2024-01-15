import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingComponent } from './components/setting/setting.component';
import { HomeComponent } from './home.component';
import { SuccessComponent } from './components/success/success.component';
import { MonitoringComponent } from './components/monitoring/monitoring.component';
import { ArchiveComponent } from './components/archive/archive.component';
 
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'create',
        data: {
          icon: 'layout_top_panel_1',
          title: 'Создать форму'
        },
        component: CreateComponent
      },
      {
        path: 'register',
        data: {
          icon: 'clipboard_list',
          title: 'Реестр форм'
        },
        component: RegisterComponent
      },
      {
        path: 'success',
        data: {
          icon: 'like',
          title: 'Завершенные формы'
        },
        component: SuccessComponent
      },
      {
        path: 'archive',
        data: {
          icon: 'star',
          title: 'Архив'
        },
        component: ArchiveComponent
      },
      {
        path: 'monitoring',
        data: {
          icon: 'spy',
          title: 'Мониторинг'
        },
        component: MonitoringComponent
      },
      {
        path: 'setting',
        data: {
          icon: 'settings_4',
          title: 'Общие настройки'
        },
        component: SettingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
