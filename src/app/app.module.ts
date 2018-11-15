import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TdDownArrowComponent } from './down-arrow/down-arrow.component';
import { TdHeaderComponent } from './header/header.component';
import { TdJprdyComponent } from './jprdy/jprdy.component';
import { TdPasswdComponent } from './passwd/passwd.component';
import { TdProjectsComponent } from './projects/projects.component';
import { TdResizeDirective } from './resize.directive';
import { TdScrollDirective } from './scroll.directive';
import { TdScrollService } from './scroll.service';
import { DCLDirective } from './DCLDirective';
import { UtilityService } from './utility.service';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    DCLDirective,
    TdDownArrowComponent,
    TdHeaderComponent,
    TdJprdyComponent,
    TdPasswdComponent,
    TdProjectsComponent,
    TdResizeDirective,
    TdScrollDirective,
  ],
  entryComponents: [
    TdJprdyComponent,
    TdPasswdComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    TdScrollService,
    UtilityService,
  ],
})
export class AppModule { }
