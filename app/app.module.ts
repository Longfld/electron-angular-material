import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MyMaterialModule} from './my.material.module';
import 'hammerjs/hammer';

import { AppComponent }   from './app.component';

@NgModule({
  imports:      [ BrowserModule,BrowserAnimationsModule,
    MyMaterialModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
