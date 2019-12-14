import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CollapseModule, BsDropdownModule } from 'ngx-bootstrap';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { MatomoModule } from 'ngx-matomo';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { NavModule } from './nav/nav.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    MatomoModule,
    CoreModule,
    NavModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
