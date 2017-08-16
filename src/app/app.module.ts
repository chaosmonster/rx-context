import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RxContextModule} from '../lib/rx-context.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RxContextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
