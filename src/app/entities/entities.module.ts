import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { EntitiesRoutingModule } from './entities-routing.module';
import { ExplorerComponent } from './explorer.component';
import { EntitiesCardComponent } from './entities-card.component';
import { EntitiesComponent } from './entities.component';

@NgModule({
  imports: [
    SharedModule,
    EntitiesRoutingModule,
  ],
  declarations: [
    ExplorerComponent,
    EntitiesComponent,
    EntitiesCardComponent
  ],
})
export class EntitiesModule { }
