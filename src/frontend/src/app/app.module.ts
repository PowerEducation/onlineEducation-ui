import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {CommonApiService} from './services/common-api.service';
import {CommonUtilService} from './services/common-util.service';
import {DefinedConstants} from './app.defined.constants';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { MainComponent } from './component/main/main.component';
import { FooterComponent } from './component/footer/footer.component';
import { LeftComponent } from './component/left/left.component';
import { Routes, RouterModule } from '@angular/router';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { LoginModalComponent } from './component/modal/login-modal/login-modal.component';
import {routes} from './app.router';
import { BrowseCoursesViewComponent } from './component/browse-courses-view/browse-courses-view.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { MasterPageComponent } from './component/master-page/master-page.component';
import { BrowseLectureComponent } from './component/browse-lecture/browse-lecture.component';
import { TestSeriesComponent } from './component/test-series/test-series.component';
import { SliderUtilComponent } from './component/util/slider-util/slider-util.component';
import { NgClass } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    LeftComponent,
    LoginModalComponent,
    BrowseCoursesViewComponent,
    HomePageComponent,
    MasterPageComponent,
    BrowseLectureComponent,
    TestSeriesComponent,
    SliderUtilComponent
  ],
  entryComponents:[LoginModalComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // RouterModule.forRoot(api_routes, {useHash:false}),
    routes,
    ModalModule.forRoot(),
    BootstrapModalModule,
    
  ],
  providers: [DefinedConstants,
  CommonApiService,
  CommonUtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
