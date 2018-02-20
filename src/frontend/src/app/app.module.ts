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
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
import { LoginModalComponent } from './component/modal/login-modal/login-modal.component';
import {routes} from './app.router';
import { BrowseCoursesViewComponent } from './component/browse-courses-view/browse-courses-view.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { MasterPageComponent } from './component/master-page/master-page.component';
import { BrowseLectureComponent } from './component/browse-lecture/browse-lecture.component';
import { TestSeriesComponent } from './component/test-series/test-series.component';
import { SliderUtilComponent } from './component/util/slider-util/slider-util.component';
import { NgClass } from '@angular/common';
import {GalleriaModule, CaptchaModule,DataTableModule,SharedModule,EditorModule,ProgressSpinnerModule } from 'primeng/primeng';
import { StartExamModalComponent } from './component/modal/start-exam-modal/start-exam-modal.component';
import { BeginTestComponentComponent } from './component/begin-test-component/begin-test-component.component';
import { AdminPanelComponentComponent } from './component/admin-panel-component/admin-panel-component.component';
import {MatButtonModule, MatSelectModule, MatInputModule, MatSidenavModule, MatSnackBarModule, MatToolbarModule, MatRadioModule, MatTooltipModule,
       MatCheckboxModule, MatMenuModule, MatCardModule, MatIconModule,MatDialogModule, MatButtonToggleModule, MatStepperModule} from '@angular/material';
import { QuestionManagerComponentComponent } from './component/question-manager-component/question-manager-component.component';
import { SingleValuedModalComponent } from './component/modal/single-valued-modal/single-valued-modal.component';
import { AddQuestionsComponent } from './component/add-questions/add-questions.component';

import { QuestionPanelComponent } from './component/add-questions/question-panel/question-panel.component';
import { ImportQuestionsXlsComponent } from './component/import-questions-xls/import-questions-xls.component';
import { ManageEntityComponent } from './component/manage-entity/manage-entity.component';
import { TestManagerViewComponent } from './component/test-manager-view/test-manager-view.component';
import { TestCategogyViewComponent } from './component/test-categogy-view/test-categogy-view.component'

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
    SliderUtilComponent,
    StartExamModalComponent,
    BeginTestComponentComponent,
    AdminPanelComponentComponent,
    QuestionManagerComponentComponent,
    SingleValuedModalComponent,
    AddQuestionsComponent,
    QuestionPanelComponent,
    ImportQuestionsXlsComponent,
    ManageEntityComponent,
    TestManagerViewComponent,
    TestCategogyViewComponent
  ],
  entryComponents:[
    LoginModalComponent,
    StartExamModalComponent,
    SingleValuedModalComponent],
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
    CaptchaModule,DataTableModule, SharedModule,EditorModule, ProgressSpinnerModule,
    GalleriaModule,
    MatButtonModule, MatMenuModule,
    MatCardModule, MatIconModule,
    MatDialogModule, MatSelectModule, MatRadioModule,       MatTooltipModule,
    MatInputModule, MatSidenavModule, MatButtonToggleModule,MatStepperModule, 
    MatSnackBarModule, MatToolbarModule, MatCheckboxModule
  ],
  providers: [DefinedConstants,
  CommonApiService,
  CommonUtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
