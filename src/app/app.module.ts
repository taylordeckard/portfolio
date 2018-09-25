import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TdDownArrowComponent } from './down-arrow/down-arrow.component';
import { TdHeaderComponent } from './header/header.component';
import { TdProjectsComponent } from './projects/projects.component';
import { TdScrollDirective } from './scroll.directive';
import { TdScrollService } from './scroll.service';


@NgModule({
  declarations: [
    AppComponent,
    TdDownArrowComponent,
    TdHeaderComponent,
    TdProjectsComponent,
    TdScrollDirective,
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    TdScrollService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
