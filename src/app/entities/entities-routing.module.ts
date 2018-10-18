import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExplorerComponent } from './explorer.component';
import { EntitiesComponent } from './entities.component';

const mapRoutes: Routes = [
  {
    path: '',
    redirectTo: 'explore',
  },
  {
    path: 'explore',
    component: ExplorerComponent,
    data: {
      title: 'TKAPI Explorer'
    }
  },
  {
    path: 'detail',
    component: EntitiesComponent,
    data: {
      title: 'TKAPI EntityCollection'
    },
  }
];


@NgModule({
  imports: [ RouterModule.forChild(mapRoutes) ],
  exports: [ RouterModule ]
})
export class EntitiesRoutingModule {}
