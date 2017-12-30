import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import {AppComponent} from './app.component';
import { MainComponent } from './component/main/main.component';
import { BrowseCoursesViewComponent } from './component/browse-courses-view/browse-courses-view.component';
import { BeginTestComponentComponent } from './component/begin-test-component/begin-test-component.component';


export const router: Routes =[
     {
         path:'',
         redirectTo:'/home', 
         pathMatch:'full'
    },{
        path:'home',
        component:MainComponent,
    },{
        path:'browseCourses',
        component:BrowseCoursesViewComponent
    },{
        path:'beginTest',
        component:BeginTestComponentComponent
    }
    ];


export const routes: ModuleWithProviders = RouterModule.forRoot(router);