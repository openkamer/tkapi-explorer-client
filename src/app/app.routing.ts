import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullLayoutComponent } from './nav/full-layout.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'entities',
        pathMatch: 'full'
      },
      {
        path: 'entities',
        loadChildren: './entities/entities.module#EntitiesModule',
      },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes, { enableTracing: false }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
