import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TdDownArrowComponent } from './down-arrow/down-arrow.component';
import { TdHeaderComponent } from './header/header.component';
import { TdProjectsComponent } from './projects/projects.component';
import { TdScrollDirective } from './scroll.directive';
import { TdScrollService } from './scroll.service';
import { TdJprdyComponent } from './jprdy/jprdy.component';
import { DCLDirective } from './DCLDirective';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    DCLDirective,
    TdDownArrowComponent,
    TdHeaderComponent,
    TdJprdyComponent,
    TdProjectsComponent,
    TdScrollDirective,
  ],
  entryComponents: [
    TdJprdyComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    TdScrollService,
  ],
})
export class AppModule { }
