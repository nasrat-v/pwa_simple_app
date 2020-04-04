import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'apero-list',
        loadChildren: () => import('../pages/apero-list/apero-list.module').then(m => m.AperoListPageModule)
      },
      {
        path: 'apero-details',
        loadChildren: () => import('../pages/apero-details/apero-details.module').then(m => m.AperoDetailsPageModule)
      },
      {
        path: 'apero-details/:id',
        loadChildren: () => import('../pages/apero-details/apero-details.module').then(m => m.AperoDetailsPageModule)
      },
      {
        path: 'map',
        loadChildren: () => import('../map/map.module').then(m => m.MapPageModule)
      },
      {
        path: 'map/:lat/:lon',
        loadChildren: () => import('../map/map.module').then(m => m.MapPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/apero-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
