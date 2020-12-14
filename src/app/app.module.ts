import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryListComponent } from './components/country-list.component';
import { CountryWineDetailsComponent } from './components/country-wine-details.component';
import { WineService } from './wine.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    CountryWineDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [WineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
