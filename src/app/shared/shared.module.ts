import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CollapseModule, ModalModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap';
import { PrettyJsonModule } from 'angular2-prettyjson';

import { MatomoModule } from 'ngx-matomo';

/**
 * The Shared module contains general modules and components to be used in feature modules.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CollapseModule,
    ModalModule,
    PaginationModule,
    PrettyJsonModule,
    MatomoModule,
  ],
  declarations: [
  ],
  exports: [
    // external shared modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule,
    ModalModule,
    PaginationModule,
    PrettyJsonModule,
    MatomoModule,
  ],
})
export class SharedModule {
}
