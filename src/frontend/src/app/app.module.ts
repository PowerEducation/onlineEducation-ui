import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CKEditorModule } from 'ng2-ckeditor';
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
import {AppRoutingModule} from './app.router';
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
       MatCheckboxModule, MatMenuModule, MatCardModule, MatIconModule,MatDialogModule, MatButtonToggleModule, MatStepperModule,MatProgressBarModule, 
       MatExpansionModule, MatNativeDateModule, MatDatepickerModule} from '@angular/material';
import { QuestionManagerComponentComponent } from './component/question-manager-component/question-manager-component.component';
import { SingleValuedModalComponent } from './component/modal/single-valued-modal/single-valued-modal.component';
import { AddQuestionsComponent } from './component/add-questions/add-questions.component';

import { QuestionPanelComponent } from './component/add-questions/question-panel/question-panel.component';
import { ImportQuestionsXlsComponent } from './component/import-questions-xls/import-questions-xls.component';
import { ManageEntityComponent } from './component/manage-entity/manage-entity.component';
import { TestManagerViewComponent } from './component/test-manager-view/test-manager-view.component';
import { TestCategogyViewComponent } from './component/test-categogy-view/test-categogy-view.component';
import { ViewAllTestsComponent } from './component/view-all-tests/view-all-tests.component';
import { AddProductViewComponent } from './component/add-product-view/add-product-view.component'
// import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import {NgIdleModule} from '@ng-idle/core';
import { MomentModule } from 'angular2-moment';
import { CandidateHomeComponent } from './component/candidate-home/candidate-home.component';
import { CandidateSearchComponent } from './component/candidate-home/candidate-search/candidate-search.component';
import { CandidateProfileComponent } from './component/candidate-home/candidate-profile/candidate-profile.component';
import { CandidateExamHistoryComponent } from './component/candidate-home/candidate-exam-history/candidate-exam-history.component';
import { CandidatePaymentInfoComponent } from './component/candidate-home/candidate-payment-info/candidate-payment-info.component';
import { ProductHomeComponent } from './component/product-home/product-home.component';
import { AddNewProductComponent } from './component/product-home/add-new-product/add-new-product.component';
import { ViewAllProductComponent } from './component/product-home/view-all-product/view-all-product.component';
import { ProductDiscountComponent } from './component/product-home/product-discount/product-discount.component';
import { ProductPaymentComponent } from './component/product-home/product-payment/product-payment.component'; // optional, provides moment-style pipes for date formatting

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
    TestCategogyViewComponent,
    ViewAllTestsComponent,
    AddProductViewComponent,
    CandidateHomeComponent,
    CandidateSearchComponent,
    CandidateProfileComponent,
    CandidateExamHistoryComponent,
    CandidatePaymentInfoComponent,
    ProductHomeComponent,
    AddNewProductComponent,
    ViewAllProductComponent,
    ProductDiscountComponent,
    ProductPaymentComponent
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
     CKEditorModule,
    // RouterModule.forRoot(api_routes, {useHash:false}),
    AppRoutingModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    CaptchaModule,DataTableModule, SharedModule,EditorModule, ProgressSpinnerModule,
    MatButtonModule, MatMenuModule, GalleriaModule,
    MatCardModule, MatIconModule, MatProgressBarModule, MatExpansionModule, MatNativeDateModule,
    MatDialogModule, MatSelectModule, MatRadioModule, MatTooltipModule, 
    MatInputModule, MatSidenavModule, MatButtonToggleModule,MatStepperModule, 
    MatSnackBarModule, MatToolbarModule, MatCheckboxModule, MatDatepickerModule,
    NgIdleModule.forRoot()
  ],
  providers: [DefinedConstants,
  CommonApiService,
  CommonUtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
