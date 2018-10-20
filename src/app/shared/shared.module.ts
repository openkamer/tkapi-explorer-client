import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CollapseModule, ModalModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap';
import { PrettyJsonModule } from 'angular2-prettyjson';

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
  ],
})
export class SharedModule {
}
