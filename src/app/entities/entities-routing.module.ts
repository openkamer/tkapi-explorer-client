import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExplorerComponent } from './explorer.component';
import { EntitiesUrlComponent } from './entities-url.component';
import { EntitiesTypeComponent } from './entities-type.component';

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
    path: 'type',
    component: EntitiesTypeComponent,
    data: {
      title: 'TKAPI Entity Type'
    },
  },
  {
    path: 'list',
    component: EntitiesUrlComponent,
    data: {
      title: 'TKAPI Entities'
    },
  }
];


@NgModule({
  imports: [ RouterModule.forChild(mapRoutes) ],
  exports: [ RouterModule ]
})
export class EntitiesRoutingModule {}
