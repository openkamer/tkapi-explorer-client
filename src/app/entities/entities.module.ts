import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { EntitiesRoutingModule } from './entities-routing.module';
import { EntitiesComponent } from './entities.component';
import { EntitiesTypeComponent } from './entities-type.component';
import { ExplorerComponent } from './explorer.component';
import { EntitiesCardComponent } from './entities-card.component';
import { EntityCardComponent } from './entity-card.component';

@NgModule({
  imports: [
    SharedModule,
    EntitiesRoutingModule,
  ],
  declarations: [
    ExplorerComponent,
    EntitiesComponent,
    EntitiesTypeComponent,
    EntitiesCardComponent,
    EntityCardComponent,
  ],
})
export class EntitiesModule { }
