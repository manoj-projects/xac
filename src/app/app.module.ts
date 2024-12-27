import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { SharedService } from './services/shared.service';
import { CommonService } from './services/common.service';
import { LayoutModule } from './views/layout/layout.module';
import { AuthGuard } from './core/guard/auth.guard';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import {KeyFilterModule} from 'primeng/keyfilter';
import {DropdownModule} from 'primeng/dropdown';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataService } from './services/data.service';
import { UserSessionService } from './services/usersession.service';
import { NavigationService } from './services/navigation.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RegulatorCompilanceComponent } from './views/pages/regulator-compilance/regulator-compilance.component';
// import { GeneralInformationComponent } from './views/pages/regulator-compilance/general-information/general-information.component';
import {PasswordModule} from 'primeng/password';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import { HttpInterceptorService } from './services/interceptor.service';
import { AlertService } from './services/alert.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { CounsellingService } from './views/pages/counselling/counselling.service';
import { DashboardService } from './views/pages/dashboard/dashboard.service';



@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    // RegulatorCompilanceComponent,
    // GeneralInformationComponent,
    // StudentComponent,
    // SchoolComponent,
    // ApprovalsComponent,
    // ModelSchoolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    KeyFilterModule,
    PasswordModule,
    TableModule,
    TabViewModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: "toast-top-right",
      preventDuplicates: true,
    }),
    
  ],
  providers: [
    AuthGuard,
    DatePipe,
    DataService,
    AuthenticationService,
    UserSessionService,
    NavigationService, 
    AlertService,
    ToastrService,
    MessageService,
    ConfirmationService,
    CounsellingService,
    DashboardService,
    SharedService,
    CommonService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
